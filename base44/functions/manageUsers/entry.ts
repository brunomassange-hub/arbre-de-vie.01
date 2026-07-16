import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const admin = await base44.auth.me();
    if (!admin) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (admin.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const { action } = body;
    const sr = base44.asServiceRole;

    // ---- List all users ----
    if (action === 'list') {
      const users = await sr.entities.User.list('-created_date', 500);
      return Response.json({
        users: users.map(u => ({
          id: u.id,
          email: u.email,
          full_name: u.full_name,
          role: u.role,
          banned: u.banned || false,
          created_date: u.created_date,
          updated_date: u.updated_date,
          bilan_date: u.bilan_date || null,
        }))
      });
    }

    // ---- Get a user's detailed data (read-only) ----
    if (action === 'getUserData') {
      const { userId } = body;
      const [cp, events, links, beliefs, posEvents, posLinks, posBeliefs, bigFive, analysisItems, journal, treeProfile, branches, goals, activities] = await Promise.all([
        sr.entities.CognitiveProfile.filter({ created_by_id: userId }),
        sr.entities.TraumaticEvent.filter({ created_by_id: userId }),
        sr.entities.Link.filter({ created_by_id: userId }),
        sr.entities.LimitingBelief.filter({ created_by_id: userId }),
        sr.entities.PositiveEvent.filter({ created_by_id: userId }),
        sr.entities.PositiveLink.filter({ created_by_id: userId }),
        sr.entities.PositiveBelief.filter({ created_by_id: userId }),
        sr.entities.BigFiveProfile.filter({ created_by_id: userId }),
        sr.entities.AnalysisItem.filter({ created_by_id: userId }),
        sr.entities.JournalEntry.filter({ created_by_id: userId }),
        sr.entities.TreeProfile.filter({ created_by_id: userId }),
        sr.entities.Branch.filter({ created_by_id: userId }),
        sr.entities.Goal.filter({ created_by_id: userId }),
        sr.entities.Activity.filter({ created_by_id: userId }),
      ]);

      const targetUser = await sr.entities.User.get(userId);

      return Response.json({
        user: {
          id: targetUser.id,
          email: targetUser.email,
          full_name: targetUser.full_name,
          role: targetUser.role,
          banned: targetUser.banned || false,
          created_date: targetUser.created_date,
          updated_date: targetUser.updated_date,
          bilan_date: targetUser.bilan_date || null,
        },
        cognitiveProfile: cp[0] ? {
          mbti_type: cp[0].mbti_type || null,
          enneagram_type: cp[0].enneagram_type || null,
          attachment_style: cp[0].attachment_style || null,
        } : null,
        counts: {
          traumaticEvents: events.length,
          links: links.length,
          limitingBeliefs: beliefs.length,
          positiveEvents: posEvents.length,
          positiveLinks: posLinks.length,
          positiveBeliefs: posBeliefs.length,
          journalEntries: journal.length,
          analysisItems: analysisItems.length,
          branches: branches.length,
          goals: goals.length,
          activities: activities.length,
        },
        hasBigFive: bigFive.length > 0,
        hasTreeProfile: treeProfile.length > 0,
      });
    }

    // ---- Update a user's role ----
    if (action === 'updateRole') {
      const { userId, role } = body;
      if (role !== 'admin' && role !== 'user') {
        return Response.json({ error: 'Rôle invalide' }, { status: 400 });
      }
      if (userId === admin.id) {
        return Response.json({ error: 'Vous ne pouvez pas modifier votre propre rôle' }, { status: 400 });
      }
      await sr.entities.User.update(userId, { role });
      return Response.json({ success: true });
    }

    // ---- Ban / unban a user (deactivate) ----
    if (action === 'setBanned') {
      const { userId, banned } = body;
      if (userId === admin.id) {
        return Response.json({ error: 'Vous ne pouvez pas désactiver votre propre compte' }, { status: 400 });
      }
      await sr.entities.User.update(userId, { banned: !!banned });
      return Response.json({ success: true });
    }

    // ---- Reset a user's data (keep account active) ----
    if (action === 'resetData') {
      const { userId } = body;
      await deleteAllUserData(sr, userId);
      await sr.entities.User.update(userId, { bilan_report: null, bilan_date: null, bilan_fingerprint: null });
      return Response.json({ success: true });
    }

    // ---- Delete a user account + all data ----
    if (action === 'deleteUser') {
      const { userId } = body;
      if (userId === admin.id) {
        return Response.json({ error: 'Vous ne pouvez pas supprimer votre propre compte' }, { status: 400 });
      }
      await deleteAllUserData(sr, userId);
      await sr.entities.User.delete(userId);
      return Response.json({ success: true });
    }

    return Response.json({ error: 'Action invalide' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function deleteAllUserData(sr, userId) {
  await Promise.all([
    sr.entities.CognitiveProfile.deleteMany({ created_by_id: userId }),
    sr.entities.TraumaticEvent.deleteMany({ created_by_id: userId }),
    sr.entities.Link.deleteMany({ created_by_id: userId }),
    sr.entities.LimitingBelief.deleteMany({ created_by_id: userId }),
    sr.entities.PositiveEvent.deleteMany({ created_by_id: userId }),
    sr.entities.PositiveLink.deleteMany({ created_by_id: userId }),
    sr.entities.PositiveBelief.deleteMany({ created_by_id: userId }),
    sr.entities.BigFiveProfile.deleteMany({ created_by_id: userId }),
    sr.entities.AnalysisItem.deleteMany({ created_by_id: userId }),
    sr.entities.JournalEntry.deleteMany({ created_by_id: userId }),
    sr.entities.TreeProfile.deleteMany({ created_by_id: userId }),
    sr.entities.Branch.deleteMany({ created_by_id: userId }),
    sr.entities.Goal.deleteMany({ created_by_id: userId }),
    sr.entities.Activity.deleteMany({ created_by_id: userId }),
  ]);
}