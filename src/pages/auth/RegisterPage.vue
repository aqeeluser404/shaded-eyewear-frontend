<template>
  <q-page>

    <!-- cannot set vertical center without fullscreen height -->
    <div class="constrain">

      <q-card bordered flat class="column flex-center q-mb-md">
        <h4>Register</h4>
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
            v-model="user.firstName"
            label="Your first name *"
          />
          <q-input
            filled
            v-model="user.lastName"
            label="Your last name *"
          />
          <q-input
            filled
            v-model="user.email"
            label="Your email *"
          />
          <q-input
            filled
            v-model="user.phone"
            label="Your phone number *"
          />
          <q-input
            filled
            v-model="user.username"
            label="Your username *"
          />
          <q-input
            filled
            v-model="user.password"
            label="Your password *"
            type="password"
          />
          <div>
            <router-link to="/auth/login" style="text-decoration: underline; font-size: 14px; color: #1976D2">
              Already have an account?
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
    name: "RegisterPage",

    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          username: '',
          password: ''
        }
      }
    },
    methods: {
      async onSubmit() {
        const response = await UserService.register(this.user)
        if (response) {
          this.$q.dialog({
            title: 'Success',
            message: 'Register successful!',
            ok: 'OK'
          }).onOk(() => {
            this.$router.push('/auth/login')
          })
        } else {
          this.$q.dialog({
            title: 'Error',
            message: 'Register failed. Please try again.',
            ok: 'OK'
          })
          this.onReset()
        }
      },
      onReset() {
        this.user.firstName = '',
        this.user.lastName = '',
        this.user.email = '',
        this.user.phone = '',
        this.user.username = '',
        this.user.password = ''
      }
    }
  }
</script>
