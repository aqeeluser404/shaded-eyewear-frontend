<template>
  <q-page>
    <div class="login-shell row no-wrap">
      <!----------------------------------------------------------- LEFT PANEL (image placeholder) -------------------------------------------------->
      <div class="col-md-6 left-panel gt-sm">
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
      <div class="col-md-6 col-12 right-panel column justify-center q-pa-xl">
        <div class="full-width">
          <div class="constrain-more">
            <div class="row justify-between items-center q-mb-xl">
              <q-btn
                dense
                flat
                no-caps
                label="BACK TO SHOP"
                to="/sunglasses"
                icon="eva-arrow-back-outline"
                class="custom-button font-size-responsive-xs text-dimmed"
              />
              <div class="row items-center text-caption text-dimmed">
                <q-icon name="lock_outline" size="14px" class="q-mr-xs" />
                MEMBER ACCOUNT
              </div>
            </div>

            <div class="overline text-primary text-caption q-mb-sm">
              WELCOME BACK
            </div>
            <div
              class="font-size-responsive-giant archivo text-light text-bold q-mb-md"
            >
              CREATE YOUR <br />
              ACCOUNT.
            </div>
            <div class="text-subtitle1 text-dimmed q-mb-xl">
              Sign in to review your saved details and keep track of your
              orders.
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
                      :name="showPassword ? 'visibility_off' : 'visibility'"
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
                  class="text-dimmed outlined-checkbox"
                />
                <router-link
                  to="/forgot-password"
                  class="text-dimmed"
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

              <div class="text-center text-subtitle1 text-dimmed q-mt-md">
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
          this.$router.push("/");
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
  min-height: 100vh          // ← add this

.left-image
  position: absolute          // ← add this
  inset: 0                    // ← add this
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

.constrain-narrow
  max-width: 460px
  width: 100%
  margin: 0 auto

// ---------- INPUT STYLE (matches your footer contact form) ----------
.custom-input
  :deep(.q-field__control)
    background-color: #121212
    border-radius: 4px
  :deep(.q-field__native),
  :deep(.q-field__input)
    color: #ffffff !important
  :deep(.q-field__control:before)
    border: 1px solid rgba(255, 255, 255, 0.1)
  :deep(.q-field__control:hover:before)
    border-color: rgba(255, 255, 255, 0.25)
  :deep(.q-field--focused .q-field__control:after)
    border-color: var(--q-primary)

.overline
  letter-spacing: 0.15em
  font-weight: 600

// ---------- MOBILE ----------
@media (max-width: 1023px)
  .right-panel
    padding-top: 48px
    padding-bottom: 48px

.outlined-checkbox
  :deep(.q-checkbox__bg)
    border: 1px solid rgba(255, 255, 255, 0.4)
    border-radius: 3px
    background: transparent !important
  :deep(.q-checkbox__inner--truthy .q-checkbox__bg)
    border-color: var(--q-primary)
</style>
