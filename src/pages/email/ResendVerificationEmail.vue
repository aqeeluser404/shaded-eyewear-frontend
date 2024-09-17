<template>
  <q-page>
    <div class="constrain window-height">

      <q-card bordered flat class="column flex-center q-mb-md">
        <h4>Resend Verification Email</h4>
      </q-card>

      <q-card bordered flat class="column flex-center q-pa-md">
        <p>Resend Verification Email</p>

        <q-card-section>
          <q-input filled v-model="email" label="Your email *" />
          <br>
          <q-btn label="Send Verification" @click="resendVerificationEmail" color="primary" style="width: 100%;" class="custom-button" />
        </q-card-section>
        <p v-if="message">{{ message }}</p>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import EmailService from '../../services/EmailService';

export default {
  data() {
    return {
      email: '',
      message: ''
    };
  },
  methods: {
    async resendVerificationEmail() {
      try {
        await EmailService.resendVerificationEmail(this.email);

        this.message = 'Verification email resent successfully!';
      } catch (error) {
        this.message = 'Error resending verification email.';
      }
    }
  }
};
</script>
