<template>
  <q-page>
    <q-img src="~src/assets/abstract5.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
      <div class="absolute-full column justify-center items-center text-black">
        <q-card bordered flat class="q-pa-lg">
          <div class="column items-center">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">Verify Email</p>
            <p v-if="message">{{ message }}</p>
            <q-btn rounded dense v-if="success" to="/auth/login" icon="eva-log-in-outline" label="Go to Login" size="12px" class="q-py-sm q-px-lg" />
            <q-btn rounded dense v-if="!success" to="/resend-verification" icon="eva-email-outline" label="Resend Verification Email" size="12px" class="q-py-sm q-px-lg" />
          </div>
        </q-card>
      </div>
    </q-img>
  </q-page>
    <!-- <div class="">
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
    </div> -->
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
