<template>
  <q-page>

    <!-- cannot set vertical center without fullscreen height -->
    <div class="constrain">

      <q-card bordered flat class="column flex-center q-mb-md">
        <h4>Login</h4>
      </q-card>

      <q-card bordered flat class="column flex-center q-pa-md">
        <!-- form -->
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-lg"
          style="min-width: 400px;"
        >
          <q-input
            filled
            v-model="user.usernameOrEmail"
            label="Your username or email *"
          />
          <q-input
            filled
            v-model="user.password"
            label="Your password *"
            type="password"
          />
          <div>
            <router-link to="/auth/register" style="text-decoration: underline; font-size: 14px; color: #1976D2">
              Don't have an account?
            </router-link>
          </div>
          <div>
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
          this.$q.dialog({
            title: 'Success',
            message: 'Login successful!',
            ok: 'OK'
          }).onOk(() => {
            this.$router.push('/')
          })
        } else {
          this.$q.dialog({
            title: 'Error',
            message: 'Login failed. Please try again.',
            ok: 'OK'
          })
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

