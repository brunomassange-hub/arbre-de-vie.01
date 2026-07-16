import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, RotateCcw, Ban, Trash2, Loader2 } from "lucide-react";

const SERIF = "'Playfair Display', Georgia, serif";

function CountRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span style={{ color: "#8d6e63" }}>{label}</span>
      <span className="font-bold" style={{ color: "#3e2723" }}>{value}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-lg p-3 border" style={{ background: "#f5f0e8", borderColor: "#e0d6c8" }}>
      <h3 className="text-xs font-bold mb-2" style={{ color: "#3e2723", fontFamily: SERIF }}>{title}</h3>
      {children}
    </div>
  );
}

export default function UserDetailDialog({
  userData, loading, onClose,
  onUpdateRole, onResetData, onToggleBan, onDeleteUser, actionLoading
}) {
  const open = loading || !!userData;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md" style={{ background: "#fff" }}>
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#8d6e63" }} />
          </div>
        ) : userData ? (
          <>
            <DialogHeader>
              <DialogTitle style={{ fontFamily: SERIF, color: "#3e2723" }}>
                {userData.user.full_name || userData.user.email}
              </DialogTitle>
            </DialogHeader>

            {/* User info */}
            <div className="space-y-1 text-xs" style={{ color: "#5d4037" }}>
              <p><span className="font-semibold">Email :</span> {userData.user.email}</p>
              <p><span className="font-semibold">Créé le :</span> {new Date(userData.user.created_date).toLocaleDateString('fr-FR')}</p>
              <p><span className="font-semibold">Dernière activité :</span> {userData.user.updated_date ? new Date(userData.user.updated_date).toLocaleDateString('fr-FR') : "—"}</p>
              <p>
                <span className="font-semibold">Rôle :</span> {userData.user.role}
                <span className="ml-2 font-semibold">Statut :</span> {userData.user.banned ? "Désactivé" : "Actif"}
              </p>
            </div>

            {/* Cognitive profile */}
            <Section title="Profil cognitif">
              {userData.cognitiveProfile ? (
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <p className="text-[10px]" style={{ color: "#8d6e63" }}>MBTI</p>
                    <p className="font-bold" style={{ color: "#3e2723" }}>{userData.cognitiveProfile.mbti_type || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px]" style={{ color: "#8d6e63" }}>Ennéagramme</p>
                    <p className="font-bold" style={{ color: "#3e2723" }}>{userData.cognitiveProfile.enneagram_type || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px]" style={{ color: "#8d6e63" }}>Attachement</p>
                    <p className="font-bold" style={{ color: "#3e2723" }}>{userData.cognitiveProfile.attachment_style || "—"}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs" style={{ color: "#8d6e63" }}>Aucun profil renseigné</p>
              )}
            </Section>

            {/* Data counts */}
            <Section title="Données saisies">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                <CountRow label="Blessures" value={userData.counts.traumaticEvents} />
                <CountRow label="Croyances limit." value={userData.counts.limitingBeliefs} />
                <CountRow label="Relations" value={userData.counts.links} />
                <CountRow label="Événements positifs" value={userData.counts.positiveEvents} />
                <CountRow label="Croyances pos." value={userData.counts.positiveBeliefs} />
                <CountRow label="Liens positifs" value={userData.counts.positiveLinks} />
                <CountRow label="Journal" value={userData.counts.journalEntries} />
                <CountRow label="Items analyse" value={userData.counts.analysisItems} />
              </div>
              <div className="flex gap-3 mt-2 text-[10px]" style={{ color: "#8d6e63" }}>
                <span>Big Five : {userData.hasBigFive ? "✓" : "—"}</span>
                <span>Profil arbre : {userData.hasTreeProfile ? "✓" : "—"}</span>
              </div>
            </Section>

            {/* Bilan */}
            <Section title="Bilan d'analyse">
              <p className="text-xs" style={{ color: "#5d4037" }}>
                {userData.user.bilan_date
                  ? `Généré le ${new Date(userData.user.bilan_date).toLocaleDateString('fr-FR')}`
                  : "Non généré"}
              </p>
            </Section>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2 border-t" style={{ borderColor: "#e0d6c8" }}>
              <button onClick={() => onUpdateRole(userData.user.id, userData.user.role === 'admin' ? 'user' : 'admin')} disabled={actionLoading}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border" style={{ borderColor: "#e0d6c8", color: "#5d4037", background: "#fff" }}>
                <Shield className="w-3 h-3" /> {userData.user.role === 'admin' ? '→ Utilisateur' : '→ Admin'}
              </button>
              <button onClick={() => onResetData(userData.user.id)} disabled={actionLoading}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border" style={{ borderColor: "#e0d6c8", color: "#5d4037", background: "#fff" }}>
                <RotateCcw className="w-3 h-3" /> Réinitialiser
              </button>
              <button onClick={() => onToggleBan(userData.user.id, userData.user.banned)} disabled={actionLoading}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border" style={{ borderColor: "#e0d6c8", color: "#5d4037", background: "#fff" }}>
                <Ban className="w-3 h-3" /> {userData.user.banned ? 'Réactiver' : 'Désactiver'}
              </button>
              <button onClick={() => onDeleteUser(userData.user.id)} disabled={actionLoading}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border ml-auto" style={{ borderColor: "#c62828", color: "#c62828", background: "#fff" }}>
                {actionLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />} Supprimer
              </button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}