<template>
  <q-page>
    <div class="register-shell row no-wrap">
      <!----------------------------------------------------------- LEFT PANEL (image) -------------------------------------------------->
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
      <div class="col-md-7 col-12 right-panel column q-pa-xl">
        <div class="full-width" style="margin: auto 0">
          <div class="constrain-more">
            <div
              class="font-size-responsive-xxxl archivo text-light text-bold q-mb-md text-center"
            >
              CREATE AN ACCOUNT
            </div>
            <div
              class="font-size-responsive-md text-dimmed q-mb-xl text-center"
            >
              You are few moments away from getting started!
            </div>

            <div class="section-spacer-xs"></div>

            <q-form @submit="onSubmit" class="q-gutter-lg">
              <div class="row">
                <div
                  class="col-12 col-md-6"
                  :class="$q.screen.gt.sm ? 'q-pr-md' : 'q-pr-none q-mb-lg'"
                >
                  <div class="overline text-dimmed text-caption q-mb-xs">
                    FIRST NAME
                  </div>
                  <q-input
                    filled
                    dark
                    v-model="user.firstName"
                    placeholder="Jane"
                    class="custom-input"
                    input-style="color: white;"
                  />
                </div>

                <div class="col-12 col-md-6">
                  <div class="overline text-dimmed text-caption q-mb-xs">
                    LAST NAME
                  </div>
                  <q-input
                    filled
                    dark
                    v-model="user.lastName"
                    placeholder="Doe"
                    class="custom-input"
                    input-style="color: white;"
                  />
                </div>
              </div>

              <div class="row">
                <div
                  class="col-12 col-md-6"
                  :class="$q.screen.gt.sm ? 'q-pr-md' : 'q-pr-none q-mb-lg'"
                >
                  <div class="overline text-dimmed text-caption q-mb-xs">
                    USERNAME
                  </div>
                  <q-input
                    filled
                    dark
                    v-model="user.username"
                    placeholder="janedoe"
                    class="custom-input"
                    input-style="color: white;"
                  />
                </div>

                <div class="col-12 col-md-6">
                  <div class="overline text-dimmed text-caption q-mb-xs">
                    EMAIL ADDRESS
                  </div>
                  <q-input
                    filled
                    dark
                    v-model="user.email"
                    placeholder="you@example.com"
                    class="custom-input"
                    input-style="color: white;"
                  />
                </div>
              </div>

              <div>
                <div class="overline text-dimmed text-caption q-mb-xs">
                  PHONE NUMBER
                </div>
                <q-input
                  filled
                  dark
                  v-model="user.phone"
                  placeholder="082 123 4567"
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
                  placeholder="At least 8 characters"
                  :type="showPassword ? 'text' : 'password'"
                  class="custom-input"
                  input-style="color: white;"
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

              <div>
                <div class="section-spacer-xs"></div>
                <div class="text-dimmed font-size-responsive-sm text-center">
                  By signing up you agree to Shaded Eyewear's Terms of Service.
                </div>

                <q-btn
                  rounded
                  no-caps
                  label="Create your account"
                  type="submit"
                  text-color="dark"
                  class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold q-mt-md q-mb-md"
                  style="width: 100%"
                />

                <div class="text-center font-size-responsive-sm text-dimmed">
                  Already a member?
                  <router-link
                    to="/auth/login"
                    class="text-primary"
                    style="text-decoration: none"
                  >
                    Sign in
                  </router-link>
                </div>
              </div>
            </q-form>

            <div class="section-spacer-xs"></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import UserService from "src/services/UserService";
import Helper from "src/services/utils";
import { UiAlerts } from "src/services/UiAlerts";

export default {
  name: "RegisterPage",

  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        username: "",
        password: "",
      },
      showPassword: false,
    };
  },

  methods: {
    validateText: Helper.validateText,
    validateEmail: Helper.validateEmail,
    validatePhone: Helper.validatePhone,
    validateUsername: Helper.validateUsername,
    validatePassword: Helper.validatePassword,

    validateFields() {
      const details = this.user;
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "username",
        "password",
      ];

      if (requiredFields.every((key) => details[key] === "")) {
        UiAlerts.error("Please fill in all the fields.");
        return false;
      }
      if (details.firstName && !this.validateText(details.firstName)) {
        UiAlerts.error(
          "First name must be at least 5 characters long and start with an uppercase."
        );
        return false;
      }
      if (details.lastName && !this.validateText(details.lastName)) {
        UiAlerts.error(
          "Last name must be at least 5 characters long and start with an uppercase."
        );
        return false;
      }
      if (details.email && !this.validateEmail(details.email)) {
        UiAlerts.error("Please enter a valid email address.");
        return false;
      }
      if (details.phone && !this.validatePhone(details.phone)) {
        UiAlerts.error("Please enter a valid 10-digit phone number.");
        return false;
      }
      if (details.username && !this.validateUsername(details.username)) {
        UiAlerts.error(
          "Username must be 3-15 characters long and contain only letters and numbers."
        );
        return false;
      }
      if (details.password && !this.validatePassword(details.password)) {
        UiAlerts.error(
          "Password must be at least 8 characters long and include at least one letter and one number."
        );
        return false;
      }
      return true;
    },

    async onSubmit() {
      try {
        if (this.validateFields()) {
          const response = await UserService.register(this.user);
          if (response) {
            UiAlerts.success("Please check your email to verify your account.");
            setTimeout(() => {
              this.$router.push("/auth/login");
            }, 2000);
          } else {
            UiAlerts.error("Registration failed. Please try again!");
            this.onReset();
          }
        }
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 400)
        ) {
          UiAlerts.error("Username or Email already exists. Please try again!");
        } else {
          UiAlerts.error("Registration failed. Please try again!");
        }
      }
    },

    onReset() {
      this.user.firstName = "";
      this.user.lastName = "";
      this.user.email = "";
      this.user.phone = "";
      this.user.username = "";
      this.user.password = "";
    },
  },
};
</script>

<style lang="sass" scoped>
.register-shell
  min-height: 100vh
  background-color: #000000

// ---------- LEFT PANEL ----------
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
  height: 100vh
  overflow-y: auto
  overflow-x: hidden

  &::-webkit-scrollbar
    width: 6px
  &::-webkit-scrollbar-thumb
    background: rgba(255, 255, 255, 0.15)
    border-radius: 3px
  &::-webkit-scrollbar-track
    background: transparent

// ---------- MOBILE ----------
@media (max-width: 1023px)
  .right-panel
    padding-top: 48px
    padding-bottom: 48px
</style>
