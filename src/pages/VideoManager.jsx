import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Trash2, Upload, Link2 } from "lucide-react";
import VideoCategorySelector from "@/components/video/VideoCategorySelector";
import { getVideoTagLabel } from "@/lib/videoCategories";

const SERIF = "'Playfair Display', Georgia, serif";

export default function VideoManager() {
  const { user, isLoadingAuth } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title: "", url: "", category_tags: [] });
  const [uploadMode, setUploadMode] = useState("link");

  useEffect(() => {
    if (user?.role === "admin") loadVideos();
    else setLoading(false);
  }, [user]);

  const loadVideos = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.Video.list("-created_date");
      setVideos(data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  const handleFileUpload = async (file) => {
    setSubmitting(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm(prev => ({ ...prev, url: file_url }));
    } catch { /* ignore */ }
    setSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.url.trim()) return;
    setSubmitting(true);
    try {
      await base44.entities.Video.create({
        title: form.title.trim(),
        url: form.url.trim(),
        category_tags: form.category_tags,
      });
      setForm({ title: "", url: "", category_tags: [] });
      await loadVideos();
    } catch { /* ignore */ }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    await base44.entities.Video.delete(id);
    setVideos(videos.filter(v => v.id !== id));
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a1628" }}>
        <Loader2 className="w-6 h-6 animate-spin text-green-400" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "#faf6f0" }}>
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: SERIF, color: "#3e2723" }}>🎬 Gestion des vidéos</h1>
        <p className="text-sm mb-6" style={{ color: "#8d6e63" }}>Ajoutez des vidéos et associez-les à des catégories cliniques</p>

        {/* Form */}
        <div className="rounded-xl p-4 mb-6 border space-y-3" style={{ background: "#f5f0e8", borderColor: "#e0d6c8" }}>
          <h2 className="text-sm font-bold" style={{ color: "#3e2723", fontFamily: SERIF }}>Ajouter une vidéo</h2>

          <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Titre de la vidéo"
            className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50" />

          {/* Mode toggle */}
          <div className="flex gap-1.5">
            <button onClick={() => setUploadMode("link")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] border transition"
              style={{
                background: uploadMode === "link" ? "#5d7a3a" : "transparent",
                borderColor: uploadMode === "link" ? "#5d7a3a" : "#e0d6c8",
                color: uploadMode === "link" ? "#fff" : "#8d6e63",
              }}>
              <Link2 className="w-3 h-3" /> Lien externe
            </button>
            <button onClick={() => setUploadMode("file")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] border transition"
              style={{
                background: uploadMode === "file" ? "#5d7a3a" : "transparent",
                borderColor: uploadMode === "file" ? "#5d7a3a" : "#e0d6c8",
                color: uploadMode === "file" ? "#fff" : "#8d6e63",
              }}>
              <Upload className="w-3 h-3" /> Fichier
            </button>
          </div>

          {uploadMode === "link" ? (
            <Input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=... ou https://vimeo.com/..."
              className="bg-white/60 border-[#e0d6c8] text-[#3e2723] placeholder:text-[#8d6e63]/50" />
          ) : (
            <div>
              <input type="file" accept="video/*" onChange={e => e.target.files[0] && handleFileUpload(e.target.files[0])}
                className="text-xs text-[#5d4037] file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-[#5d7a3a] file:text-white file:cursor-pointer" />
              {form.url && <p className="text-[10px] mt-1" style={{ color: "#5d7a3a" }}>✓ Fichier téléversé</p>}
              {submitting && uploadMode === "file" && <p className="text-[10px] mt-1" style={{ color: "#8d6e63" }}>Téléversement...</p>}
            </div>
          )}

          <div>
            <p className="text-[10px] font-bold mb-1.5" style={{ color: "#5d4037" }}>Catégories associées</p>
            <VideoCategorySelector
              value={form.category_tags}
              onChange={(tags) => setForm({ ...form, category_tags: tags })}
            />
          </div>

          <Button onClick={handleSubmit} disabled={submitting || !form.title.trim() || !form.url.trim()}
            className="w-full bg-[#5d7a3a] hover:bg-[#4d6a2a] text-white">
            {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            {submitting ? "Ajout..." : "Ajouter la vidéo"}
          </Button>
        </div>

        {/* List */}
        <h2 className="text-sm font-bold mb-3" style={{ color: "#3e2723", fontFamily: SERIF }}>
          Vidéos existantes ({videos.length})
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="w-5 h-5 mx-auto animate-spin" style={{ color: "#8d6e63" }} />
          </div>
        ) : videos.length === 0 ? (
          <p className="text-center py-8 text-sm" style={{ color: "#8d6e63" }}>Aucune vidéo pour le moment.</p>
        ) : (
          <div className="space-y-2">
            {videos.map(v => (
              <div key={v.id} className="rounded-xl border p-3" style={{ background: "#fff", borderColor: "#e0d6c8" }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: "#3e2723", fontFamily: SERIF }}>{v.title}</p>
                    <a href={v.url} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] truncate block mt-0.5" style={{ color: "#5d7a3a" }}>
                      {v.url}
                    </a>
                    {v.category_tags && v.category_tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {v.category_tags.map(tag => (
                          <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "#e0d6c860", color: "#5d4037" }}>
                            {getVideoTagLabel(tag)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => handleDelete(v.id)} className="flex-shrink-0" style={{ color: "#a1887f" }}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}