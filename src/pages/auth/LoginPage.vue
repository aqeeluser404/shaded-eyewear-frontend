<template>
  <q-page>                                                                                            <!-- constrains -->

    <q-img src="~src/assets/theme/abstract1.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
      <div class="absolute-full column justify-center items-start text-black">
        <q-card bordered flat class="column q-pa-lg constrain" style="">
          <div class="row justify-start">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">RETURNING <br> CUSTOMER</p>
          </div>
          <br>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg" style="min-width: 280px;">
            <q-input filled label-color=black color="black" v-model="user.usernameOrEmail" label="Username or Email *" />
            <q-input filled label-color=black color="black" v-model="user.password" label="Password *" type="password" />

            <div class="column">
              <router-link to="/forgot-password" class="font-size-responsive-xs" style="text-decoration: underline; color: black;">
                <b>Forgot password?</b>
              </router-link>
              <router-link to="/auth/register" class="font-size-responsive-xs" style="text-decoration: underline; color: black;">
                <b>Don't have an account?</b>
              </router-link>
            </div>
            <div>
              <q-btn rounded dense label="Sign In" color="black" text-color="white" type="submit" class="q-px-lg anton-regular font-size-responsive-md" style="width: 100%;"/>
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

