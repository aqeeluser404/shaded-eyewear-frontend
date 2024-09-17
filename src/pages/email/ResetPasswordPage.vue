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
      console.log(token)
      if (token) {
        const response = await EmailService.ResetPassword(token, this.password)

        if (response) {
          this.$q.dialog({
            title: 'Success',
            message: 'Your password has been reset successfully!',
            ok: 'OK'
          }).onOk(() => {
            this.$router.push('/auth/login')
          })
        } else {
          this.$q.dialog({
            title: 'Error',
            message: 'Sending email failed. Please try again.',
            ok: 'OK'
          })
          this.onReset()
        }
      }
    },
    onReset() {
      this.password = ''
    }
  }
}
</script>
