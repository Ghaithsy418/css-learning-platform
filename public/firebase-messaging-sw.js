importScripts(
  'https://www.gstatic.com/firebasejs/12.2.1/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging-compat.js',
);

let messagingPromise = null;

function getMessagingInstance() {
  if (!messagingPromise) {
    messagingPromise = fetch('/api/firebase-config')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load firebase config');
        }
        return response.json();
      })
      .then((config) => {
        if (!self.firebase.apps.length) {
          self.firebase.initializeApp({
            apiKey: config.apiKey,
            authDomain: config.authDomain,
            projectId: config.projectId,
            storageBucket: config.storageBucket,
            messagingSenderId: config.messagingSenderId,
            appId: config.appId,
          });
        }

        return self.firebase.messaging();
      })
      .catch((error) => {
        console.error(
          'Failed to initialize firebase messaging service worker',
          error,
        );
        return null;
      });
  }

  return messagingPromise;
}

getMessagingInstance().then((messaging) => {
  if (!messaging) {
    return;
  }

  messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title || 'إشعار جديد';
    const body = payload.notification?.body || '';
    const link = payload.data?.link || '/';

    self.registration.showNotification(title, {
      body,
      data: { link },
    });
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const link = event.notification.data?.link || '/';
  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients) => {
        for (const client of clients) {
          if ('focus' in client) {
            client.navigate(link);
            return client.focus();
          }
        }

        if (self.clients.openWindow) {
          return self.clients.openWindow(link);
        }

        return undefined;
      }),
  );
});
