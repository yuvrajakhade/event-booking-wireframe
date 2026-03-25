import React, { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Check if already dismissed
    const dismissed = localStorage.getItem("installPromptDismissed");
    if (dismissed === "true") return;

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return; // Already installed as PWA
    }

    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Detect Android
    const android = /Android/.test(navigator.userAgent);
    setIsAndroid(android);

    // Show banner for mobile users
    if (iOS || android) {
      // Delay showing banner for 2 seconds
      setTimeout(() => setShowBanner(true), 2000);
    }

    // Listen for beforeinstallprompt event (Chrome/Edge on Android)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Chrome/Edge on Android - show native prompt
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setShowBanner(false);
      }
    }
    // For iOS, banner already shows instructions
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("installPromptDismissed", "true");
  };

  if (!showBanner) return null;

  return (
    <div style={styles.banner}>
      <button onClick={handleDismiss} style={styles.closeButton}>
        ×
      </button>

      <div style={styles.content}>
        <div style={styles.icon}>📱</div>

        <div style={styles.text}>
          <h3 style={styles.title}>Install EventFlow App</h3>

          {isIOS && (
            <p style={styles.description}>
              Tap <strong>Share</strong> <span style={styles.shareIcon}>⎙</span>{" "}
              then <strong>"Add to Home Screen"</strong>
            </p>
          )}

          {isAndroid && !deferredPrompt && (
            <p style={styles.description}>
              Tap the menu <strong>⋮</strong> and select{" "}
              <strong>"Add to Home Screen"</strong>
            </p>
          )}

          {deferredPrompt && (
            <p style={styles.description}>
              Access EventFlow faster with one tap from your home screen
            </p>
          )}
        </div>

        {deferredPrompt && (
          <button onClick={handleInstall} style={styles.installButton}>
            Install
          </button>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  banner: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0f766e",
    color: "white",
    padding: "16px",
    boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
    zIndex: 9999,
    animation: "slideUp 0.3s ease-out",
  },
  closeButton: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "none",
    border: "none",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
    padding: "4px 8px",
    lineHeight: 1,
  },
  content: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  icon: {
    fontSize: "32px",
    flexShrink: 0,
  },
  text: {
    flex: 1,
  },
  title: {
    margin: "0 0 4px 0",
    fontSize: "16px",
    fontWeight: "600",
  },
  description: {
    margin: 0,
    fontSize: "13px",
    opacity: 0.95,
    lineHeight: "1.4",
  },
  shareIcon: {
    fontSize: "16px",
  },
  installButton: {
    backgroundColor: "white",
    color: "#0f766e",
    border: "none",
    padding: "8px 20px",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    flexShrink: 0,
  },
};
