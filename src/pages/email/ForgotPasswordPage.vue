<template>
  <q-page>
    <!-- <div class="constrain window-height">
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
    </div> -->

    <q-img src="~src/assets/abstract5.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
      <div class="absolute-full column justify-center items-center text-black">
        <q-card bordered flat class="q-pa-lg">
          <div class="column items-center">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">Forgot Password</p>
            <q-input filled v-model="email" label="Enter email reset your password" style="width: 100%;" class="q-mb-md" />
            <q-btn rounded dense @click="ForgotPassword" icon="eva-email-outline " label="Reset Password" size="12px" class="q-py-sm q-px-lg" />
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
