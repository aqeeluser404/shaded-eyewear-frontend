<template>
  <q-page>
    <q-img src="~src/assets/theme/abstract1.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
      <div class="absolute-full column justify-center items-center text-black">
        <q-card bordered flat class="q-pa-lg">
          <div class="column text-center">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">Verify Email</p>
            <br>
            <p v-if="message" class="text-h6 caveat">{{ message }}</p>
            <q-btn rounded v-if="success" to="/" color="black" text-color="white" label="Home" class="q-py-sm q-px-lg custom-button font-size-responsive-md" />
            <q-btn rounded v-if="!success" to="/resend-verification" color="black" text-color="white" icon="eva-email-outline" label="Resend Verification Email" class="q-py-sm q-px-lg custom-button font-size-responsive-md" />
          </div>
        </q-card>
      </div>
    </q-img>
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
        const response = await EmailService.verifyEmail(token)
        if (response) {
          this.$q.notify({ type: 'positive', color: 'primary', message: 'Email verified successfully!' })
          this.message = 'Email verified successfully!';
          this.success = true;
        } else {
          this.$q.notify({ type: 'negative', message: 'The token may be invalid or expired. Please try again.' })
          this.message = 'Error verifying email. The token may be invalid or expired.'
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
