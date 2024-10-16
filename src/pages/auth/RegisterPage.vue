<template>
  <q-page>                                                                                                        <!-- constrains -->
    <div class="constrain window-height">
      <q-card bordered flat class="column flex-center q-mb-md">                                                   <!---------------- HEADER ----------------->
        <h4>Register</h4>
      </q-card>
      <q-card bordered flat class="column flex-center q-pa-md">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg" style="min-width: 400px;" >               <!------------- REGISTER FORM -------------->
          <q-input filled v-model="user.firstName" label="Your first name *" />
          <q-input filled v-model="user.lastName" label="Your last name *" />
          <q-input filled v-model="user.email" label="Your email *" />
          <q-input filled v-model="user.phone" label="Your phone number *" />
          <q-input filled v-model="user.username" label="Your username *" />
          <q-input filled v-model="user.password" label="Your password *" type="password" />
          <div>                                                                                                   <!-- login instead -->
            <router-link to="/auth/login" style="text-decoration: underline; font-size: 14px; color: #1976D2">
              Already have an account?
            </router-link>
          </div>
          <div>                                                                                                   <!-- buttons -->
            <q-btn label="Submit" type="submit" color="primary" class="custom-button"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm custom-button" />
          </div>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
  import UserService from 'src/services/UserService'
  import Helper from 'src/services/utils';

  export default {
    name: "RegisterPage",

    data() {
      return {
        user: { firstName: '', lastName: '', email: '', phone: '', username: '', password: '' }
      }
    },
    methods: {                                                                         // Validation functions
      validateText: Helper.validateText,
      validateEmail: Helper.validateEmail,
      validatePhone: Helper.validatePhone,
      validateUsername: Helper.validateUsername,
      validatePassword: Helper.validatePassword,
      validateFields() {
        const details = this.user
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'username', 'password']

        if (requiredFields.every(key => details[key] === '')) {
          this.$q.notify({ type: 'negative', message: 'Please fill in all the fields.' })
          return false;
        }
        if (details.firstName && !this.validateText(details.firstName)) {
          this.$q.notify({ type: 'negative', message: 'First name must be at least 5 characters long and start with an uppercase.' })
          return false;
        }
        if (details.lastName && !this.validateText(details.lastName)) {
          this.$q.notify({ type: 'negative', message: 'Last name must be at least 5 characters long and start with an uppercase.' })
          return false;
        }
        if (details.email && !this.validateEmail(details.email)) {
          this.$q.notify({ type: 'negative', message: 'Please enter a valid email address.' })
          return false;
        }
        if (details.phone && !this.validatePhone(details.phone)) {
          this.$q.notify({ type: 'negative', message: 'Please enter a valid 10-digit phone number.'})
          return false;
        }
        if (details.username && !this.validateUsername(details.username)) {
          this.$q.notify({ type: 'negative', message: 'Username must be 3-15 characters long and contain only letters and numbers.' });
          return false;
        }
        if (details.password && !this.validatePassword(details.password)) {
          this.$q.notify({ type: 'negative', message: 'Password must be at least 8 characters long and include at least one letter and one number.' });
          return false;
        }
        return true;
      },
      async onSubmit() {                                                              // Register function
        if (this.validateFields()) {
          const response = await UserService.register(this.user)
          if (response) {
            this.$q.notify({ type: 'positive', color: 'primary', message: 'Please check your email to verify your account.' })
            this.$router.push('/auth/login')    // Testpass1
          } else {
            this.$q.notify({ type: 'negative', message: 'Register failed. Please try again!' })
            this.onReset()
          }
        }
      },
      onReset() {                                                                     // Reset function
        this.user.firstName = '',
        this.user.lastName = '',
        this.user.email = '',
        this.user.phone = '',
        this.user.username = '',
        this.user.password = ''
      },

    }
  }
</script>
