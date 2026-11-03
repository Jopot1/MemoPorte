import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    // 1. Dynamic Web App Manifest Injection (Blob / Data URI with vector SVG icon)
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
        <rect width="512" height="512" rx="112" fill="#0f172a"/>
        <rect x="110" y="70" width="292" height="372" rx="16" fill="#1e293b" stroke="#38bdf8" stroke-width="16"/>
        <circle cx="340" cy="256" r="24" fill="#fbbf24"/>
        <path d="M340 256 L380 256" stroke="#fbbf24" stroke-width="14" stroke-linecap="round"/>
        <circle cx="130" cy="140" r="14" fill="#f59e0b"/>
        <circle cx="130" cy="372" r="14" fill="#f59e0b"/>
      </svg>
    `.trim();

    const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgIcon)}`;

    const manifestData = {
      id: '/',
      name: 'MémoPorte - Quincaillerie & Portes',
      short_name: 'MémoPorte',
      description: 'Référence technique chantier pour le sens de porte ANSI/BHMA et serrures commerciales.',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#0f172a',
      theme_color: '#0f172a',
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192 512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: svgDataUri,
          sizes: '512x512',
          type: 'image/svg+xml',
          purpose: 'any',
        },
      ],
    };

    const manifestBlob = new Blob([JSON.stringify(manifestData)], { type: 'application/json' });
    const manifestUrl = URL.createObjectURL(manifestBlob);

    let manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement | null;
    if (!manifestLink) {
      manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      document.head.appendChild(manifestLink);
    }
    manifestLink.href = manifestUrl;

    // 2. Mobile Safari & Android Standalone Detection
    const standaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(standaloneMode);

    const ua = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(ua);
    setIsIOS(iosDevice);

    // 3. BeforeInstallPrompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      URL.revokeObjectURL(manifestUrl);
    };
  }, []);

  const triggerInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsStandalone(true);
          setDeferredPrompt(null);
          return true;
        }
      } catch (err) {
        console.error('Install prompt error:', err);
      }
    }
    // Otherwise open instructions modal
    setIsModalOpen(true);
    return false;
  };

  return {
    isInstallable: !!deferredPrompt,
    isStandalone,
    isIOS,
    isOnline,
    isModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
    triggerInstall,
  };
}
