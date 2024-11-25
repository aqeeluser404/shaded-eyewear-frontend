<template>
  <q-page>

    <!-- <div>
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
    </div> -->

    <q-img src="~src/assets/theme/abstract1.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
      <div class="absolute-full column justify-center items-center text-black">
        <q-card bordered flat class="q-pa-lg">
          <div class="column items-center">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">Resend Verification Email</p>
            <q-input filled v-model="email" label="Enter email for the verification code" style="width: 100%;" class="q-mb-md"/>
            <q-btn rounded dense @click="resendVerificationEmail" icon="eva-email-outline " label="Send Verification" class="q-px-lg anton-regular font-size-responsive-md" />
          </div>
          <p v-if="message">{{ message }}</p>
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
