<template>
  <q-page>
    <div class="login-shell row no-wrap">
      <!----------------------------------------------------------- LEFT PANEL (image placeholder) -------------------------------------------------->
      <div class="col-md-5 left-panel gt-sm">
        <div class="left-image-frame">
          <q-img
            src="~src/assets/gallery/persons/g10.jpg"
            class="left-image"
            fit="cover"
          />
          <div class="left-overlay"></div>
        </div>
      </div>

      <!----------------------------------------------------------- RIGHT PANEL (form) -------------------------------------------------->
      <div class="col-md-7 col-12 right-panel column justify-center q-pa-xl">
        <div class="full-width">
          <div class="constrain-more">
            <div class="q-mb-xl">
              <q-btn
                dense
                no-caps
                flat
                label="Back to shop"
                to="/"
                icon="eva-arrow-back-outline"
                class="custom-button icon-btn font-size-responsive-sm text-light"
              />
            </div>

            <div
              class="font-size-responsive-xxxl archivo text-light text-bold q-mb-md text-center"
            >
              WELCOME BACK
            </div>
            <div
              class="font-size-responsive-md text-dimmed q-mb-xl text-center"
            >
              Sign in to keep track of your orders
            </div>

            <div class="section-spacer-xs"></div>

            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg">
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

              <div class="">
                <div class="section-spacer-xs"></div>
                <div class="row justify-between items-center">
                  <q-checkbox
                    v-model="rememberMe"
                    label="Remember me"
                    dense
                    color="primary"
                    align="center"
                    class="text-dimmed font-size-responsive-sm outlined-checkbox"
                  />
                  <router-link
                    to="/forgot-password"
                    class="text-dimmed font-size-responsive-sm"
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
                  class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold q-mt-sm q-mb-md"
                  style="width: 100%"
                />

                <!-- Divider -->
                <div class="row items-center q-mb-md">
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

                <div class="text-center font-size-responsive-sm text-dimmed">
                  New to Shaded Eyewear?
                  <router-link
                    to="/auth/register"
                    class="text-primary"
                    style="text-decoration: none"
                  >
                    Create an account
                  </router-link>
                </div>
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
import { UiAlerts } from "src/services/UiAlerts";

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
      guestLoading: false,
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
          UiAlerts.success("Login successful!");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          UiAlerts.error("Login failed. Please try again!");
          this.onReset();
        }
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 400)
        ) {
          UiAlerts.error("Login failed. Incorrect username or password.");
        } else {
          UiAlerts.error("Login failed. Please try again!");
        }
        this.onReset();
      }
    },

    async loginAsGuest() {
      this.guestLoading = true;
      try {
        const response = await UserService.guestLogin();

        if (response) {
          UiAlerts.success("Logged in as guest");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          UiAlerts.error("Guest login failed. Please try again!");
        }
      } catch (error) {
        if (error.response && error.response.status === 429) {
          UiAlerts.error("Too many guest logins. Please try again later.");
        } else {
          UiAlerts.error("Guest login failed. Please try again!");
        }
      } finally {
        this.guestLoading = false;
      }
    },

    onReset() {
      this.user.usernameOrEmail = "";
      this.user.password = "";
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

.outlined-checkbox
  :deep(.q-checkbox__inner)
    // This centers the actual square box
    display: flex
    align-items: center

  :deep(.q-checkbox__label)
    // This ensures the text doesn't drop below the baseline
    line-height: 1
</style>
