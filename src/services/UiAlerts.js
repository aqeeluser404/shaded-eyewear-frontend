import { Dialog, Notify } from 'quasar';

export const UiAlerts = {
  // ==========================================
  // 1. NOTIFICATIONS (Top-Right Popups)
  // ==========================================
  success(message, caption = null) {
    Notify.create({
      type: 'positive',
      color: 'primary',
      message: message,
      caption: caption,
      icon: 'eva-checkmark-circle-2-outline',
      position: 'top-right',
      timeout: 3000,
      textColor: 'dark',
    });
  },

  error(message, caption = null) {
    Notify.create({
      type: 'negative',
      color: 'negative',
      message: message,
      caption: caption,
      icon: 'eva-alert-circle-outline',
      position: 'top-right',
      timeout: 4500,
      textColor: 'white',
    });
  },

  info(message, caption = null) {
    Notify.create({
      type: 'info',
      color: 'grey-9',
      message: message,
      caption: caption,
      icon: 'eva-info-outline',
      position: 'top-right',
      timeout: 3000,
      textColor: 'white',
    });
  },

  // ==========================================
  // 2. CONFIRMATIONS (Yes/No Dialogs)
  // ==========================================
  confirm(title, message, okLabel = 'Confirm', color = 'primary') {
    return Dialog.create({
      title,
      message,
      persistent: true,
      class: 'shaded-dialog',
      ok: {
        label: okLabel,
        color: color,
        rounded: true,
        noCaps: true,
        textColor: color === 'primary' ? 'dark' : 'white',
        class: 'text-bold'
      },
      cancel: {
        label: 'Cancel',
        color: 'grey-6',
        flat: true,
        rounded: true,
        noCaps: true,
      },
    });
  },

  confirmDelete(title = 'Are you sure?', message = 'This action cannot be undone.', okLabel = 'Delete') {
    return Dialog.create({
      title,
      message,
      persistent: true,
      class: 'shaded-dialog',
      ok: {
        label: okLabel,
        color: 'negative',
        rounded: true,
        noCaps: true,
        textColor: 'white',
        class: 'text-bold'
      },
      cancel: {
        label: 'Cancel',
        color: 'grey-6',
        flat: true,
        rounded: true,
        noCaps: true,
      },
    });
  },

  // ==========================================
  // 3. ALERTS & CUSTOM
  // ==========================================
  alert(title, message, color = 'primary') {
    return Dialog.create({
      title,
      message,
      persistent: true,
      class: 'shaded-dialog',
      ok: {
        label: 'Got it',
        color: color,
        rounded: true,
        noCaps: true,
        textColor: color === 'primary' ? 'dark' : 'white',
        class: 'text-bold'
      },
    });
  },

  custom(title, message, okLabel, okColor = 'primary', cancelLabel = 'Cancel') {
    return Dialog.create({
      title,
      message,
      persistent: true,
      class: 'shaded-dialog',
      ok: {
        label: okLabel,
        color: okColor,
        rounded: true,
        noCaps: true,
        textColor: okColor === 'primary' ? 'dark' : 'white',
        class: 'text-bold'
      },
      cancel: {
        label: cancelLabel,
        color: 'grey-6',
        flat: true,
        rounded: true,
        noCaps: true,
      },
    });
  }
};
