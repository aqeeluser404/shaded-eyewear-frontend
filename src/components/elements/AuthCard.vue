<template>
  <q-page class="auth-shell column items-center justify-center q-pa-md">
    <div class="auth-wrap">
      <q-btn
        v-if="showBack"
        dense
        no-caps
        flat
        :label="backLabel"
        :to="backTo"
        icon="eva-arrow-back-outline"
        class="custom-button icon-btn font-size-responsive-sm text-light q-mb-lg"
      />

      <div class="auth-card">
        <div v-if="icon" class="icon-badge">
          <q-icon :name="icon" size="22px" />
        </div>

        <div
          class="auth-title font-size-responsive-xxl archivo text-light text-bold q-mb-md text-center"
        >
          {{ title }}
        </div>
        <div
          v-if="subtitle"
          class="font-size-responsive-sm text-dimmed q-mb-xl text-center"
        >
          {{ subtitle }}
        </div>

        <!-- form goes here -->
        <slot />

        <!-- optional links under the form, e.g. "Didn't get it? Resend" -->
        <div
          v-if="$slots.footer"
          class="auth-footer text-center text-subtitle1 text-dimmed"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AuthCard",

  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    icon: { type: String, default: "" },
    backTo: { type: String, default: "/auth/login" },
    backLabel: { type: String, default: "Back to login" },
    showBack: { type: Boolean, default: true },
  },
};
</script>

<style lang="sass" scoped>
.auth-shell
  background-color: #000000

.auth-wrap
  width: 100%
  max-width: 520px

.auth-card
  padding: 48px 40px
  background-color: rgba(255, 255, 255, 0.03)
  border: 1px solid rgba(255, 255, 255, 0.1)
  border-radius: 16px

  @media (max-width: 600px)
    padding: 32px 20px

.auth-title
  line-height: 1.2

.icon-badge
  width: 56px
  height: 56px
  display: flex
  align-items: center
  justify-content: center
  margin: 0 auto 24px
  border-radius: 50%
  border: 1px solid rgba(255, 255, 255, 0.12)
  color: var(--q-primary)

.auth-footer
  margin-top: 24px
</style>
