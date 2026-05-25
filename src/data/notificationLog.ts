export type NotificationAction = "created" | "converted" | "checkout";

export type StoredNotification = {
  id: string;
  action: NotificationAction;
  eventName: string;
  eventDate?: string;
  createdAt: string;
};

const STORAGE_KEY = "eventflow/notifications";
const MAX_NOTIFICATIONS = 30;

function readStoredNotifications(): StoredNotification[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredNotifications(notifications: StoredNotification[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
}

export function getStoredNotifications() {
  return readStoredNotifications().sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function addStoredNotification(
  action: NotificationAction,
  eventName: string,
  eventDate?: string,
) {
  const notification: StoredNotification = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    action,
    eventName,
    eventDate,
    createdAt: new Date().toISOString(),
  };

  const notifications = [notification, ...readStoredNotifications()].slice(
    0,
    MAX_NOTIFICATIONS,
  );

  writeStoredNotifications(notifications);
}
