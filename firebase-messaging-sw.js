// Firebase Messaging Service Worker for Swarajya Flutter Web
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const notificationTitle = data.notification?.title || '🚨 स्वराज्य आपत्कालीन अलर्ट (SWARAJYA SOS)';
    const notificationOptions = {
      body: data.notification?.body || 'तातडीची मदत आवश्यक आहे!',
      icon: '/assets/assets/images/pwa-192x192.png',
      badge: '/assets/assets/images/pwa-192x192.png',
      data: data.data || {}
    };
    event.waitUntil(
      self.registration.showNotification(notificationTitle, notificationOptions)
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

