<template>
  <q-page>
    <q-img src="~src/assets/theme/abstract1.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
      <div class="absolute-full column justify-center items-start text-black">
        <q-card bordered flat class="column q-pa-lg constrain" style="">
          <div class="row justify-center">
            <p class="font-size-responsive-xxxl anton-regular q-mb-md">RETURNING CUSTOMER</p>
          </div>
          <br>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" style="min-width: 280px;">
            <q-input filled label-color=black color="black" v-model="user.usernameOrEmail" label="Username or Email *" />
            <q-input filled label-color=black color="black" v-model="user.password" label="Password *" type="password" />

            <div class="text-right q-my-none" style="transform: translateY(-1px);">
              <router-link to="/forgot-password" class="text-h6 caveat " style="text-decoration: underline; color: black;">
                Forgot password?
              </router-link>
            </div>
            <div class="">
              <q-btn rounded label="Sign In" color="black" text-color="white" type="submit" class="custom-button q-px-lg q-py-sm q-mb-md font-size-responsive-md" style="width: 100%;"/>
              <q-btn rounded label="Create Account" to="/auth/register" color="white" text-color="black" class="custom-button q-px-lg q-py-sm font-size-responsive-md" style="width: 100%;"/>
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
        try {
          const response = await UserService.login(this.user.usernameOrEmail, this.user.password);
          if (response.status === 200) {
            this.$q.notify({ type: 'positive', color: 'primary', message: 'Login successful!' });
            this.$router.push('/');
          } else {
            // Handle unexpected status codes
            this.$q.notify({ type: 'negative', color: 'red', message: 'Login failed. Please try again!' });
            this.onReset();
          }
        } catch (error) {
          if (error.response && (error.response.status === 401 || error.response.status === 400)) {
            this.$q.notify({ type: 'negative', color: 'red', message: 'Login failed. Incorrect username or password.' });
          } else {
            this.$q.notify({ type: 'negative', color: 'red', message: 'Login failed. Please try again!' });
          }
          this.onReset();
        }
      },

      onReset() {
        this.user.usernameOrEmail = '',
        this.user.password = ''
      }
    }
  }
</script>

