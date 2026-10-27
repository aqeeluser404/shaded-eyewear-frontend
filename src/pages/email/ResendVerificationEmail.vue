<template>
  <AuthCard
    icon="fa-solid fa-envelope"
    title="RESEND VERIFICATION"
    subtitle="Enter your email and we'll send you a new verification link."
  >
    <q-form @submit="onSubmit" class="">
      <div>
        <div class="overline text-dimmed text-caption q-mb-xs">
          EMAIL ADDRESS
        </div>
        <q-input
          filled
          dark
          autofocus
          type="email"
          autocomplete="email"
          v-model="email"
          placeholder="you@example.com"
          class="custom-input"
          input-style="color: white;"
        />
      </div>

      <q-btn
        rounded
        no-caps
        label="Send verification"
        type="submit"
        text-color="dark"
        class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold q-mt-lg"
        style="width: 100%"
        :loading="loading"
      />
    </q-form>
  </AuthCard>
</template>

<script>
import AuthCard from "src/components/elements/AuthCard.vue";
import EmailService from "src/services/EmailService";
import { UiAlerts } from "src/services/UiAlerts";

export default {
  name: "ResendVerificationPage",

  components: { AuthCard },

  data() {
    return {
      email: "",
      loading: false,
    };
  },

  methods: {
    async onSubmit() {
      this.loading = true;
      try {
        const response = await EmailService.resendVerificationEmail(
          this.email.trim()
        );

        if (response) {
          UiAlerts.success(
            "Verification email sent",
            "Check your inbox for the new link."
          );
        } else {
          UiAlerts.error("Error resending verification email.");
        }
      } catch (error) {
        UiAlerts.error("Error resending verification email.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
