<template>
  <q-page>
    <q-img src="~src/assets/theme/abstract1.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
      <div class="absolute-full column justify-center items-center text-black">
        <q-card bordered flat class="q-pa-lg">
          <div class="column text-center">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">Resend Verification Email</p>
            <br>
            <q-input filled v-model="email" label="Enter email for the verification code" style="width: 100%;" class="q-mb-md"/>
            <q-btn rounded @click="resendVerificationEmail" icon="eva-email-outline " color="black" text-color="white" label="Send Verification" class="q-py-sm q-px-lg custom-button font-size-responsive-md" />
          </div>
          <p class="text-h6 caveat " v-if="message">
            <br>
            {{ message }}
          </p>
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
      email: '',
      message: ''
    }
  },
  methods: {
    async resendVerificationEmail() {
      const response = await EmailService.resendVerificationEmail(this.email)
      if (response) {
        this.$q.notify({ type: 'positive', color: 'primary', message: 'Verification email resent successfully!' })
        this.message = 'Verification email resent successfully!'
      } else {
        this.$q.notify({ type: 'negative', message: 'Error resending verification email.' })
        this.message = 'Error resending verification email.'
      }
    }
  }
}
</script>
