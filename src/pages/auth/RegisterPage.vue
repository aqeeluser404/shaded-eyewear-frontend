<template>
  <q-page>
    <q-img src="~src/assets/theme/abstract1.jpg" alt="Hero Image" style="width: 100%; height: 100vh;">
      <div class="absolute-full row justify-center items-center text-black">

        <q-card class="column q-pa-lg bg-white" style="max-width: 430px;">
          <div class="row justify-center">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">CREATE A NEW ACCOUNT</p>
          </div>
          <br>
          <div class="q-gutter-lg q-mb-md">
            <div style="display: flex;" class="justify-start ">
              <q-input filled label-color="black" color="black" v-model="user.firstName" label="First Name *" class="q-mr-md" />
              <q-input filled label-color="black" color="black" v-model="user.lastName" label="Last Name *" class="" />
            </div>
            <div style="display: flex;" class="justify-start ">
              <q-input filled label-color="black" color="black" v-model="user.username" label="Username *" class="q-mr-md" />
              <q-input filled label-color="black" color="black" v-model="user.email" label="Email *" class="" />
            </div>

            <div class="row justify-start">
              <q-input filled label-color="black" color="black" v-model="user.phone" label="Phone Number *" class="col-12" />
            </div>

            <div class="row justify-start">
              <q-input filled label-color="black" color="black" v-model="user.password" label="Password *" type="password" class="col-12" />
            </div>
          </div>

          <div class="column col-12 col-md-4 text-center">
            <div class="q-mb-sm">
              <router-link to="/auth/login" class="text-h6 caveat" style="text-decoration: underline; color: black;">
                Already a member, login instead?
              </router-link>
            </div>
            <div>
              <p class="text-caption">By signing up, you acknowledge and agree to Shaded Eyewear’s Terms of Service.</p>
              <q-btn rounded label="Create your account" @click="onSubmit" color="black" text-color="white" class="q-px-lg q-py-sm custom-button font-size-responsive-md" style="width: 100%;" />
            </div>
          </div>
        </q-card>
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
    methods: {
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
      async onSubmit() {
        if (this.validateFields()) {
          const response = await UserService.register(this.user)
          if (response) {
            this.$q.notify({ type: 'positive', color: 'primary', message: 'Please check your email to verify your account.' })
            this.$router.push('/auth/login')
          } else {
            this.$q.notify({ type: 'negative', message: 'Username or Email already exists. Please try again!' })
            // this.onReset()
          }
        }
      },
      onReset() {
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
