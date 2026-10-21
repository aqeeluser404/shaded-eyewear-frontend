<template>
  <AuthCard :icon="icon" :title="title" :subtitle="subtitle">
    <!-- verifying -->
    <div v-if="loading" class="flex flex-center q-py-md">
      <q-spinner-dots size="40px" color="primary" />
    </div>

    <!-- verified -->
    <q-btn
      v-else-if="success"
      rounded
      no-caps
      to="/"
      label="Go to home"
      text-color="dark"
      class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold"
      style="width: 100%"
    />

    <!-- failed -->
    <q-btn
      v-else
      rounded
      no-caps
      to="/resend-verification"
      label="Resend verification email"
      text-color="dark"
      class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold"
      style="width: 100%"
    />
  </AuthCard>
</template>

<script>
import AuthCard from "src/components/elements/AuthCard.vue";
import EmailService from "src/services/EmailService";

export default {
  name: "VerifyEmailPage",

  components: { AuthCard },

  data() {
    return {
      loading: true,
      success: false,
      message: "",
    };
  },

  computed: {
    icon() {
      if (this.loading) return "fa-solid fa-envelope";
      return this.success
        ? "fa-solid fa-circle-check"
        : "fa-solid fa-circle-xmark";
    },
    title() {
      if (this.loading) return "VERIFYING EMAIL";
      return this.success ? "EMAIL VERIFIED" : "VERIFICATION FAILED";
    },
    subtitle() {
      if (this.loading) return "Hang tight while we confirm your email.";
      return this.message;
    },
  },

  async created() {
    await this.verifyEmail();
  },

  methods: {
    async verifyEmail() {
      const token = this.$route.query.token;

      if (!token) {
        this.message = "Invalid verification link.";
        this.loading = false;
        return;
      }

      try {
        const response = await EmailService.verifyEmail(token);

        if (response) {
          this.success = true;
          this.message = "Your email has been verified. You're all set.";
        } else {
          this.message =
            "Error verifying email. The token may be invalid or expired.";
        }
      } catch (error) {
        this.message =
          "Error verifying email. The token may be invalid or expired.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
