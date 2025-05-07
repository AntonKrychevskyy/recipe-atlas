export const NotificationType = {
  info: 'INFO',
  warning: 'WARNING',
  error: 'ERROR',
} as const;

export const NotificationTypeSign = {
  [NotificationType.info]: '🔔',
  [NotificationType.warning]: '🚩',
  [NotificationType.error]: '🚨',
} as const;
