<template>
  <q-page>
    <div class="register-shell row no-wrap">

      <!----------------------------------------------------------- LEFT PANEL (image) -------------------------------------------------->
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
            JOIN THE CLUB.
          </div>
          <div class="font-size-responsive-giant archivo text-gradient-primary text-bold">
            SEE THE SUN DIFFERENTLY.
          </div>
          <div class="text-subtitle1 text-dimmed q-mt-md">
            Save your favourite frames, track orders and get early access to new drops.
          </div>
        </div>
      </div>

      <!----------------------------------------------------------- RIGHT PANEL (form) -------------------------------------------------->
      <div class="col-md-6 col-12 right-panel column q-pa-xl">
        <div class="full-width" style="margin: auto 0;">
          <div class="constrain-more">

            <div class="section-spacer-xs"></div>

            <div class="row justify-between items-center q-mb-xl">
              <q-btn
                dense
                no-caps
                flat
                label="Back to login"
                to="/auth/login"
                icon="eva-arrow-back-outline"
                class="custom-button icon-btn font-size-responsive-sm text-light text-dimmed"
              />
              <!-- <div class="row items-center text-caption text-dimmed">
                <q-icon name="lock_outline" size="14px" class="q-mr-xs" />
                MEMBER ACCOUNT
              </div> -->
            </div>

            <div class="overline text-primary text-caption q-mb-sm">
              WELCOME BACK
            </div>
            <div class="font-size-responsive-giant archivo text-light text-bold q-mb-md">
              CREATE YOUR ACCOUNT
            </div>
            <div class="text-subtitle1 text-dimmed q-mb-xl">
              Takes a minute. Keep your details, orders and favourites all in one place.
            </div>

            <q-form @submit="onSubmit" class="q-gutter-md">

              <div>
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
                  :rules="[(val) => !!val || 'First name is required']"
                >
                  <!-- <template #prepend>
                    <q-icon name="eva-email-outline" size="18px" />
                  </template> -->
                </q-input>
              </div>

              <div>
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
                  :rules="[(val) => !!val || 'Last name is required']"
                >
                  <!-- <template #prepend>
                    <q-icon name="eva-email-outline" size="18px" />
                  </template> -->
                </q-input>
              </div>

              <div>
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
                  :rules="[(val) => !!val || 'Username is required']"
                >
                </q-input>
              </div>

              <div>
                <div class="overline text-dimmed text-caption q-mb-xs">
                  Email ADDRESS
                </div>
                <q-input
                  filled
                  dark
                  v-model="user.email"
                  placeholder="you@example.com"
                  class="custom-input"
                  input-style="color: white;"
                  :rules="[(val) => !!val || 'Email is required']"
                >
                </q-input>
              </div>

              <!-- Phone -->
              <div>
                <div class="overline text-dimmed text-caption q-mb-xs">PHONE NUMBER</div>
                <q-input
                  filled
                  dark
                  v-model="user.phone"
                  placeholder="082 123 4567"
                  class="custom-input"
                  input-style="color: white;"
                  :rules="[(val) => !!val || 'Required']"
                />
              </div>

              <!-- Password -->
              <div>
                <div class="overline text-dimmed text-caption q-mb-xs">PASSWORD</div>
                <q-input
                  filled
                  dark
                  v-model="user.password"
                  placeholder="At least 8 characters"
                  :type="showPassword ? 'text' : 'password'"
                  class="custom-input"
                  input-style="color: white;"
                  :rules="[(val) => !!val || 'Required']"
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

              <div class="text-dimmed text-subtitle1">
                By signing up you agree to Shaded Eyewear's Terms of Service.
              </div>

              <q-btn
                rounded
                no-caps
                label="Create your account"
                type="submit"
                text-color="dark"
                class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold q-mt-md"
                style="width: 100%"
              />

              <div class="text-center text-subtitle1 text-dimmed q-mt-md">
                Already a member?
                <router-link
                  to="/auth/login"
                  class="text-primary"
                  style="text-decoration: none"
                >
                  Sign in
                </router-link>
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
      const requiredFields = ["firstName", "lastName", "email", "phone", "username", "password"];

      if (requiredFields.every((key) => details[key] === "")) {
        this.$q.notify({ type: "negative", message: "Please fill in all the fields." });
        return false;
      }
      if (details.firstName && !this.validateText(details.firstName)) {
        this.$q.notify({ type: "negative", message: "First name must be at least 5 characters long and start with an uppercase." });
        return false;
      }
      if (details.lastName && !this.validateText(details.lastName)) {
        this.$q.notify({ type: "negative", message: "Last name must be at least 5 characters long and start with an uppercase." });
        return false;
      }
      if (details.email && !this.validateEmail(details.email)) {
        this.$q.notify({ type: "negative", message: "Please enter a valid email address." });
        return false;
      }
      if (details.phone && !this.validatePhone(details.phone)) {
        this.$q.notify({ type: "negative", message: "Please enter a valid 10-digit phone number." });
        return false;
      }
      if (details.username && !this.validateUsername(details.username)) {
        this.$q.notify({ type: "negative", message: "Username must be 3-15 characters long and contain only letters and numbers." });
        return false;
      }
      if (details.password && !this.validatePassword(details.password)) {
        this.$q.notify({ type: "negative", message: "Password must be at least 8 characters long and include at least one letter and one number." });
        return false;
      }
      return true;
    },

    async onSubmit() {
      try {
        if (this.validateFields()) {
          const response = await UserService.register(this.user);
          if (response) {
            this.$q.notify({
              type: "positive",
              color: "primary",
              message: "Please check your email to verify your account.",
            });
            this.$router.push("/auth/login");
          } else {
            this.$q.notify({ type: "negative", message: "Registration failed. Please try again!" });
            this.onReset();
          }
        }
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
          this.$q.notify({ type: "negative", color: "red", message: "Username or Email already exists. Please try again!" });
        } else {
          this.$q.notify({ type: "negative", color: "red", message: "Registration failed. Please try again!" });
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
  height: 100vh
  overflow: hidden
  background-color: #000000

.left-panel
  position: relative
  overflow: hidden
  background-color: #0a0a0a
  height: 100vh

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

.constrain-more
  max-width: 600px
  margin: 0 auto

// @media (max-width: 1023px)
//   .right-panel
//     padding-top: 48px
//     padding-bottom: 48px

.overline
  letter-spacing: 0.15em
  font-weight: 600

// ---------- MOBILE ----------
@media (max-width: 1023px)
  .right-panel
    padding-top: 48px
    padding-bottom: 48px

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
