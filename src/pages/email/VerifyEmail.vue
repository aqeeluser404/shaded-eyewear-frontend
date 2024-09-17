<template>
  <q-page>
    <div class="constrain window-height">
      <q-card bordered flat class="column flex-center q-mb-md">
        <h4>Verify Email</h4>
      </q-card>
      <q-card bordered flat class="column flex-center q-pa-md">
        <q-card-section>
          <p v-if="message">{{ message }}</p>
          <router-link v-if="success" to="/auth/login">Go to Login</router-link>
          <router-link v-if="!success" to="/resend-verification">Resend Verification Email</router-link>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import EmailService from '../../services/EmailService';

export default {
  data() {
    return {
      message: '',
      success: false
    };
  },
  async created() {
    await this.verifyEmail();
  },
  methods: {
    async verifyEmail() {
      const token = this.$route.query.token;
      if (token) {
        try {
          await EmailService.verifyEmail(token);
          this.message = 'Email verified successfully!';
          this.success = true;
        } catch (error) {
          this.message = 'Error verifying email. The token may be invalid or expired.';
          this.success = false;
        }
      } else {
        this.message = 'Invalid verification link.';
        this.success = false;
      }
    }
  }
};
</script>
