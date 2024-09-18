<template>
  <q-page>
    <div class="constrain window-height">
      <q-card bordered flat class="column flex-center q-mb-md">
        <h4>Forgot Password</h4>
      </q-card>
      <q-card bordered flat class="column flex-center q-pa-md">
        <q-card-section>
          <q-input filled v-model="email" label="Your email *" />
          <br>
          <q-btn label="Send Verification" @click="ForgotPassword" color="primary" style="width: 100%;" class="custom-button"/>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import EmailService from 'src/services/EmailService'

export default {
  name: "ForgotPasswordPage",

  data() {
    return {
      email: ''
    }
  },
  methods: {
    async ForgotPassword() {
      const response = await EmailService.ForgotPassword(this.email)
      if (response) {
        this.$q.notify({ type: 'positive', color: 'primary', message: 'An email has been sent to reset your password!' })
        this.$router.push('/')
      } else {
        this.$q.notify({ type: 'negative', message: 'Sending email failed. Please try again.' })
        this.onReset()
      }
    },
    onReset() {
      this.email = ''
    }
  }
}
</script>
