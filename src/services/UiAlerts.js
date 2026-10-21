import { Dialog, Notify } from "quasar";

const dialogBody = (title, message, icon = null, color = "primary") => `
  <div class="column items-center text-center q-pt-md">
    ${
      icon
        ? `<q-icon name="${icon}" size="64px" color="${color}" class="q-mb-md" />`
        : ""
    }
    <div class="text-h6 text-weight-bold text-white q-mb-md">${title}</div>
    <div class="text-body2 text-grey-5" style="line-height: 1.6;">${message}</div>
  </div>
`;

const okButton = (label, color = "primary") => ({
  label,
  rounded: true,
  noCaps: true,
  unelevated: true,
  ...(color === "primary"
    ? {
        textColor: "dark",
        class: "text-bold full-width q-mt-md q-py-md btn-gradient-primary",
      }
    : {
        color,
        textColor: "white",
        class: "text-bold full-width q-mt-md q-py-md",
      }),
});

const cancelButton = (label = "Cancel") => ({
  label,
  color: "grey-7",
  outline: true,
  rounded: true,
  noCaps: true,
  class: "full-width q-mt-sm q-py-sm",
});

export const UiAlerts = {

  // ==========================================
  // 1. NOTIFICATIONS
  // ==========================================
  // Dark surface with a colored icon, styled by .ui-toast in app.sass
  success(message, caption = null) {
    Notify.create({
      type: "positive",
      color: "dark",
      textColor: "white",
      iconColor: "primary",
      classes: "ui-toast",
      message: message,
      caption: caption,
      icon: "eva-checkmark-circle-2-outline",
      position: "top-right",
      timeout: 3000,
      actions: [{ icon: "eva-close", color: "grey-5" }],
    });
  },

  error(message, caption = null) {
    Notify.create({
      type: "negative",
      color: "dark",
      textColor: "white",
      iconColor: "negative",
      classes: "ui-toast",
      message: message,
      caption: caption,
      icon: "eva-alert-circle-outline",
      position: "top-right",
      timeout: 4500,
      actions: [{ icon: "eva-close", color: "grey-5" }],
    });
  },

  info(message, caption = null) {
    Notify.create({
      type: "info",
      color: "dark",
      textColor: "white",
      iconColor: "grey-5",
      classes: "ui-toast",
      message: message,
      caption: caption,
      icon: "eva-info-outline",
      position: "top-right",
      timeout: 3000,
      actions: [{ icon: "eva-close", color: "grey-5" }],
    });
  },

  // ==========================================
  // 2. CONFIRMATIONS (Standard Actions)
  // ==========================================
  confirm(title, message, okLabel = "Confirm", color = "primary", icon = null) {
    return Dialog.create({
      title: null,
      message: dialogBody(title, message, icon, color),
      html: true,
      dark: true,
      persistent: true,
      class: "ui-dialog",
      ok: {
        label: okLabel,
        rounded: true,
        noCaps: true,
        unelevated: true,
        textColor: "dark",
        class: "text-bold full-width q-mt-md q-py-md btn-gradient-primary",
      },
      cancel: {
        label: "Cancel",
        color: "grey-7",
        outline: true,
        rounded: true,
        noCaps: true,
        class: "full-width q-mt-sm q-py-sm",
      },
    });
  },

  // ==========================================
  // 3. DESTRUCTIVE CONFIRMATIONS (Deletions)
  // ==========================================
  confirmDelete(
    title = "Are you sure?",
    message = "This action cannot be undone.",
    okLabel = "Delete"
  ) {
    return Dialog.create({
      title: null,
      message: dialogBody(title, message),
      html: true,
      dark: true,
      persistent: true,
      class: "ui-dialog",
      ok: {
        label: okLabel,
        color: "negative",
        textColor: "white",
        rounded: true,
        noCaps: true,
        unelevated: true,
        class: "text-bold full-width q-mt-md q-py-md",
      },
      cancel: {
        label: "Cancel",
        color: "grey-7",
        outline: true,
        rounded: true,
        noCaps: true,
        class: "full-width q-mt-sm q-py-sm",
      },
    });
  },

  // ==========================================
  // 4. ALERTS & CUSTOM
  // ==========================================
  alert(title, message, color = "primary") {
    return Dialog.create({
      title: null,
      message: dialogBody(title, message),
      html: true,
      dark: true,
      persistent: true,
      class: "ui-dialog",
      ok: okButton("Got it", color),
    });
  },

  custom(title, message, okLabel, okColor = "primary", cancelLabel = "Cancel") {
    return Dialog.create({
      title: null,
      message: dialogBody(title, message),
      html: true,
      dark: true,
      persistent: true,
      class: "ui-dialog",
      ok: okButton(okLabel, okColor),
      cancel: cancelButton(cancelLabel),
    });
  },
};
