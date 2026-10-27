<template>
  <AuthCard
    icon="fa-solid fa-lock"
    title="RESET PASSWORD"
    subtitle="Choose a new password for your account."
  >
    <q-form @submit="onSubmit" class="">
      <div>
        <div class="overline text-dimmed text-caption q-mb-xs">
          NEW PASSWORD
        </div>
        <q-input
          filled
          dark
          autofocus
          autocomplete="new-password"
          v-model="password"
          placeholder="Enter your new password"
          :type="showPassword ? 'text' : 'password'"
          hint="At least 8 characters, with a letter and a number"
          class="custom-input"
          input-style="color: white;"
        >
          <template #append>
            <q-icon
              :name="showPassword ? 'eva-eye-off-outline' : 'eva-eye-outline'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </div>

      <q-btn
        rounded
        no-caps
        label="Change password"
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
import Helper from "src/services/utils";
import { UiAlerts } from "src/services/UiAlerts";

export default {
  name: "ResetPasswordPage",

  components: { AuthCard },

  data() {
    return {
      password: "",
      showPassword: false,
      loading: false,
    };
  },

  methods: {
    validatePassword: Helper.validatePassword,

    async onSubmit() {
      const token = this.$route.query.token;

      if (!token) {
        UiAlerts.error(
          "The token may be invalid or expired. Please try again."
        );
        return;
      }

      this.loading = true;
      try {
        const response = await EmailService.ResetPassword(token, this.password);

        if (response) {
          UiAlerts.success("Password reset successful");

          setTimeout(() => {
            this.$router.push("/auth/login");
          }, 2000);

        } else {
          UiAlerts.error("Password reset failed. Please try again.");
          this.password = "";
        }
      } catch (error) {
        UiAlerts.error("Password reset failed. Please try again.");
        this.password = "";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
