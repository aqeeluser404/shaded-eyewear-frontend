<template>
  <q-page>
    <div class="login-shell row no-wrap">
      <!----------------------------------------------------------- LEFT PANEL (image placeholder) -------------------------------------------------->
      <div class="col-md-5 left-panel gt-sm">
        <q-img
          src="~src/assets/homepage/stock1.jpg"
          class="left-image"
          fit="cover"
        />

        <div class="left-overlay column justify-end q-pa-xl">
          <div class="overline text-light q-mb-md">
            <q-icon name="star" color="primary" size="16px" class="q-mr-xs" />
            CAPE TOWN SUN CLUB
          </div>
          <div class="font-size-responsive-giant archivo text-light text-bold">
            MADE FOR GLARE.
          </div>
          <div
            class="font-size-responsive-giant archivo text-gradient-primary text-bold"
          >
            BUILT TO BE SEEN.
          </div>
          <div class="text-subtitle1 text-dimmed q-mt-md">
            Keep your favourite frames, orders and collection details together
            in one place.
          </div>
        </div>
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
              <!-- <div class="row items-center text-caption text-dimmed">
                <q-icon name="lock_outline" size="14px" class="q-mr-xs" />
                MEMBER ACCOUNT
              </div> -->
            </div>

            <!-- <div class="overline text-primary text-caption q-mb-sm">
              WELCOME BACK
            </div> -->
            <div
              class="font-size-responsive-xxl archivo text-light text-bold q-mb-md text-center"
            >
              WELCOME BACK
            </div>
            <div class="font-size-responsive-sm text-dimmed q-mb-xl text-center">
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
                >
                  <!-- <template #prepend>
                    <q-icon name="eva-email-outline" size="18px" />
                  </template> -->
                </q-input>
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
                  <!-- <template #prepend>
                    <q-icon name="eva-lock-outline" size="18px" />
                  </template> -->
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
.left-panel
  position: relative
  overflow: hidden
  background-color: #0a0a0a
  min-height: 100vh

.left-image
  position: absolute
  inset: 0
  width: 100%
  height: 100%

.left-overlay
  position: absolute
  inset: 0
  z-index: 2
  background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%)

// ---------- RIGHT PANEL ----------
.right-panel
  background-color: #000000

// ---------- MOBILE ----------
@media (max-width: 1023px)
  .right-panel
    padding-top: 48px
    padding-bottom: 48px

.constrain-narrow
  max-width: 460px
  width: 100%
  margin: 0 auto

.overline
  letter-spacing: 0.15em
  font-weight: 600


// ---------- INPUT STYLE ----------
.outlined-checkbox
  :deep(.q-checkbox__bg)
    border: 1px solid rgba(255, 255, 255, 0.4)
    border-radius: 3px
    background: transparent !important
  :deep(.q-checkbox__inner--truthy .q-checkbox__bg)
    border-color: var(--q-primary)

.custom-input
  :deep(.q-field__control)
    background-color: #121212
    border-radius: 10px
    padding: 0 14px
    transition: background-color 0.2s ease

  :deep(.q-field__native),
  :deep(.q-field__input)
    color: #ffffff !important

  :deep(.q-field__control:before)
    border: 1px solid rgba(255, 255, 255, 0.1)
    border-radius: 10px
    transition: border-color 0.2s ease

  :deep(.q-field__control:hover:before)
    border-color: rgba(255, 255, 255, 0.25)

  :deep(.q-field--focused .q-field__control)
    background-color: #161616
    box-shadow: 0 0 0 2px var(--q-primary)
    border-radius: 10px

  // kill Quasar's built-in filled-input underline
  :deep(.q-field__control:after)
    display: none

  // error state — same treatment as focus but red
  :deep(.q-field--error .q-field__control)
    box-shadow: 0 0 0 2px var(--negative, #c10015)
    border-radius: 10px

  :deep(.q-field__prepend),
  :deep(.q-field__append)
    color: rgba(255, 255, 255, 0.45)

  :deep(.q-field--focused .q-field__prepend)
    color: var(--q-primary)

  :deep(.q-field__marginal)
    height: 52px
</style>
