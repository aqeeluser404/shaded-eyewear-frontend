<template>
  <q-page>
    <div class="constrain window-height">
      <q-card bordered flat class="column flex-center q-mb-md">
        <h4>Forgot Password</h4>
      </q-card>
      <q-card bordered flat class="column flex-center q-pa-md">

        <q-card-section>
          <q-input filled v-model="password" label="Enter your new password *" />
          <br>
          <q-btn label="Submit" @click="ResetPassword" color="primary" style="width: 100%;" class="custom-button"/>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import EmailService from 'src/services/EmailService'

export default {
  name: "ResetPasswordPage",

  data() {
    return {
      password: ''
    }
  },
  methods: {
    async ResetPassword() {
      const token = this.$route.query.token;
      if (token) {
        const response = await EmailService.ResetPassword(token, this.password)
        if (response) {
          this.$q.notify({ type: 'positive', color: 'primary', message: 'Password reset successful!' })
          this.$router.push('/auth/login')
        } else {
          this.$q.notify({ type: 'negative', message: 'Password reset failed. Please try again.' })
          this.onReset()
        }
      } else {
        this.$q.notify({ type: 'negative', message: 'The token may be invalid or expired. Please try again.' })
      }
    },
    onReset() {
      this.password = ''
    }
  }
}
</script>
