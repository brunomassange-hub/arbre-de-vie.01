import { useEffect } from "react";

/**
 * Verrouille l'application en orientation portrait sur mobile.
 * Demande le plein écran puis verrouille l'orientation au premier geste
 * utilisateur (l'API d'orientation nécessite le plein écran sur la plupart
 * des navigateurs). Ré-applique le verrou si l'utilisateur tourne l'appareil.
 * Sans effet sur desktop / navigateurs ne supportant pas l'API.
 */
export function usePortraitLock() {
  useEffect(() => {
    const orientation = screen?.orientation;
    if (!orientation || typeof orientation.lock !== "function") return;

    let locked = false;

    const doLock = async () => {
      try {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen().catch(() => {});
        }
        if (!locked) {
          await orientation.lock("portrait").catch(() => {});
          locked = true;
        }
      } catch {
        /* ignore — navigateur non supporté ou plein écran refusé */
      }
    };

    const onChange = () => {
      if (orientation.type && orientation.type.startsWith("landscape")) {
        orientation.lock("portrait").catch(() => {});
      }
    };

    // L'API exige un geste utilisateur pour le plein écran.
    window.addEventListener("touchend", doLock, { once: true, passive: true });
    window.addEventListener("click", doLock, { once: true });
    orientation.addEventListener?.("change", onChange);

    return () => {
      window.removeEventListener("touchend", doLock);
      window.removeEventListener("click", doLock);
      orientation.removeEventListener?.("change", onChange);
      if (locked) {
        orientation.unlock?.().catch(() => {});
        if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
      }
    };
  }, []);
}