<template>
  <AuthCard
    icon="fa-solid fa-key"
    title="FORGOT PASSWORD"
    subtitle="Enter the email on your account and we'll send you a code to reset your password."
  >
    <q-form @submit="onSubmit" class="q-gutter-md">
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
          :rules="[
            (val) => !!val || 'Email is required',
            (val) => /.+@.+\..+/.test(val) || 'Enter a valid email',
          ]"
        />
      </div>

      <q-btn
        rounded
        no-caps
        label="Send code"
        type="submit"
        text-color="dark"
        class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold q-mt-md"
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
  name: "ForgotPasswordPage",

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
        const response = await EmailService.ForgotPassword(this.email.trim());

        if (response) {
          UiAlerts.success(
            "Email sent",
            "Check your inbox to reset your password."
          );

          setTimeout(() => {
            this.$router.push("/");
          }, 2000);

        } else {
          UiAlerts.error("Sending email failed. Please try again.");
        }
      } catch (error) {
        UiAlerts.error("Sending email failed. Please try again.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
