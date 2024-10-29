<template>
  <q-page>                                                                                            <!-- constrains -->

    <q-img src="~src/assets/abstract5.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
      <div class="absolute-full column justify-center items-start text-black">
        <q-card bordered flat class="column q-pa-lg constrain" style="">
          <div class="row justify-center">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">LOGIN TO YOUR ACCOUNT</p>
          </div>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg" style="min-width: 300px;">
            <q-input filled v-model="user.usernameOrEmail" label="Your username or email *" />
            <q-input filled v-model="user.password" label="Your password *" type="password" />
            <div class="column">                                                                                        <!-- register instead -->
              <router-link to="/auth/register" style="text-decoration: underline; font-size: 14px; color: #1976D2">
                Don't have an account?
              </router-link>
              <router-link to="/forgot-password" style="text-decoration: underline; font-size: 14px; color: #1976D2">
                Forgot password?
              </router-link>
            </div>
            <div>                                                                                                       <!-- buttons -->
              <q-btn label="Submit" type="submit" color="primary" class="custom-button"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm custom-button" />
            </div>
          </q-form>
        </q-card>
      </div>
    </q-img>

  </q-page>
</template>

<script>
  import UserService from 'src/services/UserService'

  export default {
    name: "LoginPage",

    data() {
      return {
        user: {
          usernameOrEmail: '',
          password: ''
        }
      }
    },
    methods: {
      async onSubmit() {
        const response = await UserService.login(this.user.usernameOrEmail, this.user.password)
        if (response) {
          this.$q.notify({ type: 'positive', color: 'primary', message: 'Login successful!' })
          this.$router.push('/')
        } else {
          this.$q.notify({ type: 'negative', message: 'Login failed. Please try again!' })
          this.onReset()
        }
      },
      onReset() {
        this.user.usernameOrEmail = '',
        this.user.password = ''
      }
    }
  }
</script>

