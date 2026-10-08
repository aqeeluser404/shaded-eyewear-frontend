<template>
  <q-page>
    <div class="login-shell row no-wrap">
      <!----------------------------------------------------------- LEFT PANEL (image placeholder) -------------------------------------------------->
      <div class="col-md-5 left-panel gt-sm">
        <!-- blurred backdrop layer -->
        <!-- <q-img
          src="~src/assets/homepage/stock1.jpg"
          class="left-backdrop"
          fit="cover"
        /> -->

        <div class="left-image-frame">
          <q-img
            src="~src/assets/homepage/stock1.jpg"
            class="left-image"
            fit="cover"
          />
          <div class="left-overlay"></div>
        </div>

        <!-- <div class="left-content column justify-end q-pa-xl">
          <div class="glass-panel">
            <div class="font-size-responsive-sm text-light">
              "Ordered on a Tuesday, had them in Cape Town by Thursday. <br>They've been on
              my face every sunny day since."
            </div>

            <div class="q-mt-sm">
              <div class="font-size-responsive-sm text-light text-bold">
                Jessica Rudal
              </div>
              <div class="text-caption text-dimmed">Customer since 2023</div>
            </div>
          </div>
        </div> -->
      </div>

      <!----------------------------------------------------------- RIGHT PANEL (form) -------------------------------------------------->
      <div class="col-md-7 col-12 right-panel column justify-center q-pa-xl">
        <div class="full-width">
          <div class="constrain-more">
            <div class="row justify-between items-center q-mb-xl">
              <q-btn
                dense
                no-caps
                flat
                label="Back to shop"
                to="/sunglasses"
                icon="eva-arrow-back-outline"
                class="custom-button icon-btn font-size-responsive-sm text-light text-dimmed"
              />
            </div>

            <div
              class="font-size-responsive-xxl archivo text-light text-bold q-mb-md text-center"
            >
              WELCOME BACK
            </div>
            <div
              class="font-size-responsive-sm text-dimmed q-mb-xl text-center"
            >
              Sign in to keep track of your orders
            </div>

            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <div>
                <div class="overline text-dimmed text-caption q-mb-xs">
                  EMAIL ADDRESS
                </div>
                <q-input
                  filled
                  dark
                  v-model="user.usernameOrEmail"
                  placeholder="you@example.com"
                  class="custom-input"
                  input-style="color: white;"
                  :rules="[(val) => !!val || 'Email is required']"
                />
              </div>

              <div>
                <div class="overline text-dimmed text-caption q-mb-xs">
                  PASSWORD
                </div>
                <q-input
                  filled
                  dark
                  v-model="user.password"
                  placeholder="Enter your password"
                  :type="showPassword ? 'text' : 'password'"
                  class="custom-input"
                  input-style="color: white;"
                  :rules="[(val) => !!val || 'Password is required']"
                >
                  <template #append>
                    <q-icon
                      :name="
                        showPassword ? 'eva-eye-off-outline' : 'eva-eye-outline'
                      "
                      class="cursor-pointer"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>
              </div>

              <div class="row justify-between items-center">
                <q-checkbox
                  v-model="rememberMe"
                  label="Remember me"
                  dense
                  color="primary"
                  class="text-dimmed text-subtitle1 outlined-checkbox"
                />
                <router-link
                  to="/forgot-password"
                  class="text-dimmed text-subtitle1"
                  style="text-decoration: none"
                >
                  Forgot password?
                </router-link>
              </div>

              <q-btn
                rounded
                no-caps
                label="Sign in"
                type="submit"
                text-color="dark"
                class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold q-mt-md"
                style="width: 100%"
              />

              <!-- Divider -->
              <div class="row items-center">
                <q-separator color="grey-9" class="col" />
                <div class="text-caption text-dimmed q-px-md">OR</div>
                <q-separator color="grey-9" class="col" />
              </div>

              <!-- Guest + register -->
              <q-btn
                rounded
                no-caps
                outline
                color="grey"
                text-color="grey"
                label="Continue as guest"
                class="q-px-xl q-py-md rounded-button text-subtitle1 q-mb-md"
                style="width: 100%"
                @click="loginAsGuest"
                :loading="guestLoading"
              />

              <div class="text-center text-subtitle1 text-dimmed">
                New to Shaded Eyewear?
                <router-link
                  to="/auth/register"
                  class="text-primary"
                  style="text-decoration: none"
                >
                  Create an account
                </router-link>
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import UserService from "src/services/UserService";

export default {
  name: "LoginPage",

  data() {
    return {
      user: {
        usernameOrEmail: "",
        password: "",
      },
      rememberMe: false,
      showPassword: false,
    };
  },

  methods: {
    async onSubmit() {
      try {
        const response = await UserService.login(
          this.user.usernameOrEmail,
          this.user.password
        );

        if (response) {
          this.$q.notify({
            type: "positive",
            color: "primary",
            message: "Login successful!",
          });
          window.location.href = "/";
        } else {
          this.$q.notify({
            type: "negative",
            color: "red",
            message: "Login failed. Please try again!",
          });
          this.onReset();
        }
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 400)
        ) {
          this.$q.notify({
            type: "negative",
            color: "red",
            message: "Login failed. Incorrect username or password.",
          });
        } else {
          this.$q.notify({
            type: "negative",
            color: "red",
            message: "Login failed. Please try again!",
          });
        }
        this.onReset();
      }
    },

    async loginAsGuest() {
      try {
        const response = await UserService.guestLogin();

        if (response) {
          this.$q.notify({
            type: "positive",
            color: "primary",
            message: "Logged in as guest",
          });
          window.location.href = "/";
        } else {
          this.$q.notify({
            type: "negative",
            color: "red",
            message: "Guest login failed. Please try again!",
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 429) {
          this.$q.notify({
            type: "negative",
            color: "red",
            message: "Too many guest logins. Please try again later.",
          });
        } else {
          this.$q.notify({
            type: "negative",
            color: "red",
            message: "Guest login failed. Please try again!",
          });
        }
      }
    },

    onReset() {
      (this.user.usernameOrEmail = ""), (this.user.password = "");
    },
  },
};
</script>

<style lang="sass" scoped>
.login-shell
  min-height: 100vh
  background-color: #000000

// ---------- LEFT PANEL ----------
.left-backdrop
  position: absolute
  inset: 0
  width: 100%
  height: 100%
  filter: blur(15px) saturate(120%) brightness(1)
  transform: scale(1.1)
  z-index: 0

  &::after
    content: ''
    position: absolute
    inset: 0
    background: radial-gradient(circle at 50% 50%, transparent 15%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 0.95) 100%)

.left-panel
  position: relative
  display: flex
  align-items: center
  justify-content: center
  min-height: 100vh
  padding: 10px

.left-image-frame
  position: relative
  width: 100%
  height: 100%
  border-radius: 30px
  overflow: hidden
  box-shadow: 0 60px 140px -20px rgba(0, 0, 0, 1)

.left-image
  width: 100%
  height: 100%
  animation: image-grow 12s ease-in-out infinite alternate

@keyframes image-grow
  from
    transform: scale(1)
  to
    transform: scale(1.15)

.left-overlay
  position: absolute
  inset: 0
  z-index: 2
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.3) 100%)

.left-content
  position: absolute
  inset: 0
  z-index: 3
  padding: 48px
  pointer-events: none
  display: flex
  align-items: flex-start
  justify-content: flex-end

.glass-panel
  pointer-events: auto
  width: fit-content
  padding: 32px 28px
  border-radius: 24px
  background: rgba(10, 10, 10, 0.3)
  backdrop-filter: blur(20px) saturate(140%)
  -webkit-backdrop-filter: blur(20px) saturate(140%)
  border: 1px solid rgba(255, 255, 255, 0.08)
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04)
  position: relative
  overflow: hidden

  &::before
    content: ''
    position: absolute
    inset: 0
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 40%)
    pointer-events: none

// ---------- RIGHT PANEL ----------
.right-panel
  background-color: #000000

// ---------- MOBILE ----------
@media (max-width: 1023px)
  .right-panel
    padding-top: 48px
    padding-bottom: 48px
</style>
