<template>
  <q-page>                                                                                                     <!-- constrains -->
    <q-img src="~src/assets/abstract5.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >

      <div class="absolute-full row justify-center items-center text-black">
        <q-card bordered flat class="column q-pa-lg q-mr-md" style="">
          <div class="row justify-center">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">CREATE A NEW ACCOUNT</p>
          </div>
          <br>
          <div class="">
            <q-form class="q-gutter-lg col-12 col-md-6" >               <!------------- REGISTER FORM -------------->
              <q-input borderless filled v-model="user.firstName" label="Your first name *" />
              <q-input borderless filled v-model="user.lastName" label="Your last name *" />
              <q-input borderless filled v-model="user.email" label="Your email *" />
              <q-input borderless filled v-model="user.phone" label="Your phone number *" />
              <q-input borderless filled v-model="user.username" label="Your username *" />
              <q-input borderless filled v-model="user.password" label="Your password *" type="password" />
            </q-form>
          </div>
        </q-card>

        <div bordered flat class="column col-12 col-md-3 " style="">
          <q-card>
            <div class="q-pa-lg">
              <p>
                By signing up, you acknowledge and agree to Shaded Eyewear’s Terms of Service.
              </p>


              <div>                                                                                                   <!-- login instead -->
                <router-link to="/auth/login" class="caveat font-size-responsive-lg" style="text-decoration: underline; color: black;">
                  <b>Already a member, login instead?</b>
                </router-link>
              </div>

            </div>
          </q-card>
          <br>

            <div class="row q-mb-md">                                                                                                   <!-- buttons -->
                <q-btn rounded dense label="Create your account" @click="onSubmit" color="white" text-color="black" class="q-px-md anton-regular q-mr-md font-size-responsive-md"/>
              </div>

          <!-- <q-separator vertical class="q-mx-lg" /> -->

        </div>
      </div>
    </q-img>
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
