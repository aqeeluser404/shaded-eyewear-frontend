<template>
  <div class="personal-details q-pl-lg">
    <!-- Heading -->

    <div>
      <div class="font-size-responsive-xl archivo text-light text-bold">
        PERSONAL DETAILS
      </div>
      <div class="text-subtitle1 text-dimmed q-mt-sm">
        These fields are illustrative and are not saved.
      </div>
    </div>

    <div class="section-spacer-sm"></div>

    <q-form @submit="updateUser" class="q-gutter-md">
      <!-- First + Last name -->
      <div class="row">
        <div
          class="col-12 col-md-6"
          :class="$q.screen.gt.sm ? 'q-pr-sm' : 'q-pr-none'"
        >
          <div class="overline text-dimmed text-caption q-mb-xs">
            FIRST NAME
          </div>
          <q-input
            filled
            dark
            v-model="userDetails.firstName"
            placeholder="Your first name"
            class="custom-input"
            input-style="color: white;"
            :rules="[(val) => !!val || 'First name is required']"
          />
        </div>

        <div class="col-12 col-md-6">
          <div class="overline text-dimmed text-caption q-mb-xs">LAST NAME</div>
          <q-input
            filled
            dark
            v-model="userDetails.lastName"
            placeholder="Your last name"
            class="custom-input"
            input-style="color: white;"
            :rules="[(val) => !!val || 'Last name is required']"
          />
        </div>
      </div>

      <!-- Email + Phone -->
      <div class="row">
        <div
          class="col-12 col-md-6"
          :class="$q.screen.gt.sm ? 'q-pr-sm' : 'q-pr-none'"
        >
          <div class="row items-center justify-between q-mb-xs">
            <div class="overline text-dimmed text-caption">EMAIL ADDRESS</div>
            <div
              v-if="userDetails && userDetails.verification"
              class="row items-center text-caption"
            >
              <template v-if="userDetails.verification.isVerified">
                <span class="text-secondary">Verified</span>
                <q-icon
                  color="secondary"
                  name="eva-checkmark-circle-2-outline"
                  size="14px"
                  class="q-ml-xs"
                />
              </template>
              <template v-else>
                <span class="text-negative">Not Verified</span>
                <q-icon
                  color="negative"
                  name="eva-alert-circle-outline"
                  size="14px"
                  class="q-ml-xs"
                />
              </template>
            </div>
          </div>
          <q-input
            filled
            dark
            v-model="userDetails.email"
            placeholder="you@example.com"
            class="custom-input"
            input-style="color: white;"
            :rules="[(val) => !!val || 'Email is required']"
          />
        </div>

        <div class="col-12 col-md-6">
          <div class="overline text-dimmed text-caption q-mb-xs">
            PHONE NUMBER
          </div>
          <q-input
            filled
            dark
            v-model="userDetails.phone"
            placeholder="082 123 4567"
            class="custom-input"
            input-style="color: white;"
            :rules="[(val) => !!val || 'Phone is required']"
          />
        </div>
      </div>

      <!-- Username (full width) -->
      <div>
        <div class="overline text-dimmed text-caption q-mb-xs">USERNAME</div>
        <q-input
          filled
          dark
          v-model="userDetails.username"
          placeholder="Choose a display name"
          class="custom-input"
          input-style="color: white;"
          :rules="[(val) => !!val || 'Username is required']"
        />
      </div>

      <!-- Actions -->
      <div class="row items-center q-gutter-md">
        <q-btn
          rounded
          no-caps
          label="Save changes"
          type="submit"
          text-color="dark"
          class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold"
          :loading="saving"
        />

        <q-btn
          v-if="
            userDetails &&
            userDetails.verification &&
            !userDetails.verification.isVerified
          "
          rounded
          no-caps
          outline
          label="Verify email"
          color="grey"
          text-color="grey"
          class="q-px-xl q-py-md rounded-button text-subtitle1 text-bold"
          @click="resendVerificationEmail"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import EmailService from "src/services/EmailService";
import UserService from "src/services/UserService";
import Helper from "src/services/utils";

export default {
  name: "ProfileComponent",

  data() {
    return {
      userDetails: {},
      userTokenDetails: { _id: "", username: "", userType: "" },
      saving: false,
    };
  },

  methods: {
    validateText: Helper.validateText,
    validateEmail: Helper.validateEmail,
    validatePhone: Helper.validatePhone,
    validateUsername: Helper.validateUsername,

    validateFields() {
      const details = this.userDetails;
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "username",
      ];

      if (requiredFields.some((key) => !details[key])) {
        this.$q.notify({
          type: "negative",
          message: "Please fill in all the fields.",
        });
        return false;
      }
      if (!this.validateText(details.firstName)) {
        this.$q.notify({
          type: "negative",
          message:
            "First name must be at least 5 characters long and start with an uppercase.",
        });
        return false;
      }
      if (!this.validateText(details.lastName)) {
        this.$q.notify({
          type: "negative",
          message:
            "Last name must be at least 5 characters long and start with an uppercase.",
        });
        return false;
      }
      if (!this.validateEmail(details.email)) {
        this.$q.notify({
          type: "negative",
          message: "Please enter a valid email address.",
        });
        return false;
      }
      if (!this.validatePhone(details.phone)) {
        this.$q.notify({
          type: "negative",
          message: "Please enter a valid 10-digit phone number.",
        });
        return false;
      }
      if (!this.validateUsername(details.username)) {
        this.$q.notify({
          type: "negative",
          message:
            "Username must be 3-15 characters long and contain only letters and numbers.",
        });
        return false;
      }
      return true;
    },

    async resendVerificationEmail() {
      try {
        const response = await EmailService.resendVerificationEmail(
          this.userDetails.email
        );
        if (response) {
          this.$q.notify({
            type: "positive",
            color: "primary",
            message: "Please check your email for the verification link.",
          });
          this.getUserDetails();
        }
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: "Error resending verification email.",
        });
      }
    },

    async updateUser() {
      if (!this.validateFields()) return;

      this.$q
        .dialog({
          title: "Confirm",
          message: "You are about to update your profile, continue?",
          color: "primary",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          this.saving = true;
          const updatedUser = {
            firstName: this.userDetails.firstName,
            lastName: this.userDetails.lastName,
            email: this.userDetails.email,
            phone: this.userDetails.phone,
            username: this.userDetails.username,
            userType: this.userDetails.userType,
            location: this.userDetails.location,
            loginInfo: this.userDetails.loginInfo,
            order: this.userDetails.order,
          };

          try {
            const response = await UserService.updateUserDetails(
              this.userDetails._id,
              updatedUser
            );
            if (response) {
              this.$q.notify({
                type: "positive",
                color: "primary",
                message: "Update successful!",
              });
              this.getUserDetails();
            } else {
              this.$q.notify({
                type: "negative",
                message: "Update failed. Please try again.",
              });
            }
          } catch (error) {
            this.$q.notify({
              type: "negative",
              message: "Update failed. Please try again.",
            });
          } finally {
            this.saving = false;
          }
        })
        .onCancel(() => {
          this.getUserDetails();
        });
    },

    async getUserDetails() {
      const id = await UserService.FindUserByToken();
      this.userTokenDetails = id;
      const user = await UserService.findUserById(this.userTokenDetails._id);
      this.userDetails = user;
    },
  },

  created() {
    this.getUserDetails();
  },
};
</script>

<style lang="sass" scoped>
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

  :deep(.q-field__control:after)
    display: none

  :deep(.q-field--error .q-field__control)
    box-shadow: 0 0 0 2px var(--negative, #c10015)
    border-radius: 10px

  :deep(.q-field__marginal)
    height: 52px

.overline
  letter-spacing: 0.15em
  font-weight: 600
</style>
