<template>
  <q-page>
    <q-img src="~src/assets/theme/abstract1.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
      <div class="absolute-full column justify-center items-center text-black">
        <q-card bordered flat class="q-pa-lg">
          <div class="column text-center">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">Reset Password</p>
            <br>
            <q-input filled v-model="password" label="Enter your new password *" style="width: 100%;" class="q-mb-md"/>
            <q-btn rounded @click="ResetPassword" icon="eva-email-outline " color="black" text-color="white" label="Change Password" class="q-py-sm q-px-lg custom-button font-size-responsive-md" />
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
import EmailService from 'src/services/EmailService'
import Helper from '../../services/utils'

export default {
  name: "ResetPasswordPage",

  data() {
    return {
      password: ''
    }
  },
  methods: {
    validatePassword: Helper.validatePassword,
    validateFields() {
      if (this.password && !this.validatePassword(this.password)) {
        this.$q.notify({ type: 'negative', message: 'Password must be at least 8 characters long and include at least one letter and one number.' });
        return false;
      }
      return true;
    },
    async ResetPassword() {
      const token = this.$route.query.token;
      if (this.validateFields()) {
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
      }
    },
    onReset() {
      this.password = ''
    }
  }
}
</script>
