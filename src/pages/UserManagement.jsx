import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { ArrowLeft, Loader2, Search } from "lucide-react";
import UserDetailDialog from "@/components/admin/UserDetailDialog";

const SERIF = "'Playfair Display', Georgia, serif";

export default function UserManagement() {
  const { user, isLoadingAuth } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user?.role === "admin") loadUsers();
    else setLoading(false);
  }, [user]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke('manageUsers', { action: 'list' });
      setUsers(res.data.users || []);
    } catch { /* ignore */ }
    setLoading(false);
  };

  const openUserDetail = async (userId) => {
    setDetailLoading(true);
    setSelectedUserData(null);
    try {
      const res = await base44.functions.invoke('manageUsers', { action: 'getUserData', userId });
      setSelectedUserData(res.data);
    } catch { /* ignore */ }
    setDetailLoading(false);
  };

  const refreshDetail = async (userId) => {
    setDetailLoading(true);
    try {
      const res = await base44.functions.invoke('manageUsers', { action: 'getUserData', userId });
      setSelectedUserData(res.data);
    } catch { /* ignore */ }
    setDetailLoading(false);
  };

  const handleUpdateRole = async (userId, newRole) => {
    setActionLoading(true);
    try {
      await base44.functions.invoke('manageUsers', { action: 'updateRole', userId, role: newRole });
      await loadUsers();
      await refreshDetail(userId);
    } catch { /* ignore */ }
    setActionLoading(false);
  };

  const handleResetData = async (userId) => {
    if (!window.confirm("Réinitialiser toutes les données de cet utilisateur (arbres, tests, bilan) ? Le compte restera actif. Action irréversible.")) return;
    setActionLoading(true);
    try {
      await base44.functions.invoke('manageUsers', { action: 'resetData', userId });
      await loadUsers();
      await refreshDetail(userId);
    } catch { /* ignore */ }
    setActionLoading(false);
  };

  const handleToggleBan = async (userId, currentlyBanned) => {
    if (!currentlyBanned && !window.confirm("Désactiver ce compte ? L'utilisateur ne pourra plus se connecter.")) return;
    setActionLoading(true);
    try {
      await base44.functions.invoke('manageUsers', { action: 'setBanned', userId, banned: !currentlyBanned });
      await loadUsers();
      await refreshDetail(userId);
    } catch { /* ignore */ }
    setActionLoading(false);
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Supprimer définitivement ce compte et toutes ses données ?")) return;
    if (!window.confirm("Êtes-vous absolument sûr ? Cette suppression est définitive et irréversible.")) return;
    setActionLoading(true);
    try {
      await base44.functions.invoke('manageUsers', { action: 'deleteUser', userId });
      setSelectedUserData(null);
      await loadUsers();
    } catch { /* ignore */ }
    setActionLoading(false);
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#faf6f0" }}>
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#8d6e63" }} />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const filteredUsers = users.filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "#faf6f0" }}>
      <div className="max-w-xl mx-auto">
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-sm mb-6 hover:underline" style={{ color: "#5d7a3a" }}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l'arbre
        </Link>

        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: SERIF, color: "#3e2723" }}>👥 Gestion des utilisateurs</h1>
        <p className="text-sm mb-6" style={{ color: "#8d6e63" }}>Consultez et gérez les comptes utilisateurs</p>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#8d6e63" }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par email ou nom..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border text-sm"
            style={{ background: "#fff", borderColor: "#e0d6c8", color: "#3e2723" }}
          />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="w-5 h-5 mx-auto animate-spin" style={{ color: "#8d6e63" }} />
          </div>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center py-8 text-sm" style={{ color: "#8d6e63" }}>Aucun utilisateur trouvé.</p>
        ) : (
          <div className="space-y-2">
            {filteredUsers.map(u => (
              <button key={u.id} onClick={() => openUserDetail(u.id)}
                className="w-full text-left rounded-xl border p-3 transition hover:shadow-md"
                style={{ background: "#fff", borderColor: "#e0d6c8" }}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "#3e2723", fontFamily: SERIF }}>
                      {u.full_name || u.email}
                    </p>
                    <p className="text-xs truncate" style={{ color: "#8d6e63" }}>{u.email}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#a1887f" }}>
                      Créé le {new Date(u.created_date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    {u.role === 'admin' && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: "#5d7a3a20", color: "#5d7a3a" }}>ADMIN</span>
                    )}
                    {u.banned && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: "#c6282820", color: "#c62828" }}>DÉSACTIVÉ</span>
                    )}
                    {u.bilan_date && (
                      <span className="text-[9px]" style={{ color: "#a1887f" }}>✓ Bilan</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <UserDetailDialog
        userData={selectedUserData}
        loading={detailLoading}
        onClose={() => setSelectedUserData(null)}
        onUpdateRole={handleUpdateRole}
        onResetData={handleResetData}
        onToggleBan={handleToggleBan}
        onDeleteUser={handleDeleteUser}
        actionLoading={actionLoading}
      />
    </div>
  );
}