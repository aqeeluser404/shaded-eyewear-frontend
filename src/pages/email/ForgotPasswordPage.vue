<template>
  <q-page>
    <q-img src="~src/assets/theme/abstract1.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
      <div class="absolute-full column justify-center items-center text-black">
        <q-card bordered flat class="q-pa-lg">
          <div class="column">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">Forgot Password</p>
            <br>
            <q-input filled label-color=black color="black" v-model="email" label="Email to reset your password" style="width: 100%;" class="q-mb-md" />
            <q-btn rounded @click="ForgotPassword" icon="eva-email-outline" color="black" text-color="white" label="Send Code" class="custom-button q-py-sm q-px-lg font-size-responsive-md q-mb-md" />
            <q-btn rounded to='auth/login' color="white" text-color="black" label="Return to Login" class="custom-button q-py-sm q-px-lg font-size-responsive-md" />
          </div>
        </q-card>
      </div>
    </q-img>
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
      if (this.email === '' || null) {
        this.$q.notify({ type: 'negative', message: 'Please fill in the email field.' })
      } else {
        const response = await EmailService.ForgotPassword(this.email)
        if (response) {
          this.$q.notify({ type: 'positive', color: 'primary', message: 'An email has been sent to reset your password!' })
          this.$router.push('/')
        } else {
          this.$q.notify({ type: 'negative', message: 'Sending email failed. Please try again.' })
          this.onReset()
        }
      }
    },
    onReset() {
      this.email = ''
    }
  }
}
</script>
