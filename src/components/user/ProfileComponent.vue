<template>
  <q-card-section>
    <div class="text-h6 text-black">Personal Details</div>
  </q-card-section>

  <q-card flat bordered class="q-mb-md ">
    <q-item>
      <q-item-section class="text-left text-subtitle1">First Name</q-item-section>
      <q-item-section class="text-left">
        <q-input v-model="userDetails.firstName" />
      </q-item-section>
    </q-item>
  </q-card>

  <q-card flat bordered class="q-mb-md text-subtitle1">
    <q-item>
      <q-item-section class="text-left">Last Name</q-item-section>
      <q-item-section class="text-left">
        <q-input v-model="userDetails.lastName" />
      </q-item-section>
    </q-item>
  </q-card>

  <q-card flat bordered class="q-mb-md text-subtitle1">
    <q-item>
      <q-item-section class="text-left">
        <span>Email
          <span class="q-ml-md" v-if="userDetails && userDetails.verification && userDetails.verification.isVerified">
            Verified <q-icon color="secondary" name="eva-checkmark-circle-2-outline" />
          </span>
          <span class="q-ml-md" v-else>
            Not Verified <q-icon color="negative" name="eva-alert-circle-outline" />
          </span>
        </span>
      </q-item-section>
      <q-item-section class="text-left">
        <q-input v-model="userDetails.email" />
      </q-item-section>
    </q-item>
  </q-card>

  <q-card flat bordered class="q-mb-md text-subtitle1">
    <q-item>
      <q-item-section class="text-left">Phone</q-item-section>
      <q-item-section class="text-left">
        <q-input v-model="userDetails.phone" />
      </q-item-section>
    </q-item>
  </q-card>

  <q-card flat bordered class="q-mb-md text-subtitle1">
    <q-item>
      <q-item-section class="text-left">Username</q-item-section>
      <q-item-section class="text-left">
        <q-input v-model="userDetails.username" />
      </q-item-section>
    </q-item>
  </q-card>

  <div class="q-gutter-md">
    <q-btn rounded dense label="Save Changes" color="black" text-color="white" class="q-py-sm q-px-lg custom-button font-size-responsive-md" @click="updateUser" />
    <q-btn rounded dense label="Verify Email" color="white" text-color="black" class="q-py-sm q-px-lg custom-button font-size-responsive-md" @click="resendVerificationEmail" v-if="userDetails && userDetails.verification && !userDetails.verification.isVerified" />
  </div>
</template>

<script>
import EmailService from '../../services/EmailService'
import UserService from 'src/services/UserService'
import Helper from 'src/services/utils';

export default {
  data() {
    return {
      userDetails: {},
      userTokenDetails: { _id : '', username: '', userType: '' }
    }
  },
  methods: {
    validateText: Helper.validateText,
    validateEmail: Helper.validateEmail,
    validatePhone: Helper.validatePhone,
    validateUsername: Helper.validateUsername,
    validatePassword: Helper.validatePassword,
    validateFields() {
        const details = this.userDetails
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'username', 'password']

        if (requiredFields.every(key => details[key] === '')) {
          this.$q.notify({ type: 'negative', message: 'Please fill in all the fields.' })
          return false;
        }
        if (details.firstName && !this.validateText(details.firstName)) {
          this.$q.notify({ type: 'negative', message: 'First name must be at least 5 characters long and start with an uppercase.' })
          return false;
        }
        if (details.lastName && !this.validateText(details.lastName)) {
          this.$q.notify({ type: 'negative', message: 'Last name must be at least 5 characters long and start with an uppercase.' })
          return false;
        }
        if (details.email && !this.validateEmail(details.email)) {
          this.$q.notify({ type: 'negative', message: 'Please enter a valid email address.' })
          return false;
        }
        if (details.phone && !this.validatePhone(details.phone)) {
          this.$q.notify({ type: 'negative', message: 'Please enter a valid 10-digit phone number.'})
          return false;
        }
        if (details.username && !this.validateUsername(details.username)) {
          this.$q.notify({ type: 'negative', message: 'Username must be 3-15 characters long and contain only letters and numbers.' });
          return false;
        }
        if (details.password && !this.validatePassword(details.password)) {
          this.$q.notify({ type: 'negative', message: 'Password must be at least 8 characters long and include at least one letter and one number.' });
          return false;
        }
        return true;
      },
    async resendVerificationEmail() {                                                       // Send verification email function
      try {
        const response = await EmailService.resendVerificationEmail(this.userDetails.email);
        if (response) {
          this.$q.notify({ type: 'negative', message: 'Please check your email for verification link.' })
          this.getUserDetails()
        }
        this.message = 'Verification email resent successfully!';
      } catch (error) {
        this.message = 'Error resending verification email.';
      }
    },
    async updateUser() {                                                                      // Update user function
      const updatedUser = {
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        email: this.userDetails.email,
        phone: this.userDetails.phone,
        username: this.userDetails.username,
        password: this.userDetails.password,
        userType: this.userDetails.userType,
        location: this.userDetails.location,
        loginInfo: this.userDetails.loginInfo,
        order: this.userDetails.order
      }
      if (this.validateFields()) {
        this.$q.dialog({
          title: 'Confirm', message: `You are about to update your profile, continue?`, color: 'primary', cancel: true, persistent: true
        }).onOk(async () => {
          const response = await UserService.updateUserDetails(this.userDetails._id, updatedUser)
          if (response) {
            this.$q.notify({ type: 'positive', color: 'primary', message: 'Update successful!' })
            this.getUserDetails()
          } else {
            this.$q.notify({ type: 'negative', message: 'Update failed. Please try again.' })
          }
        }).onCancel(() => {
          this.getUserDetails()
          return
        })
      }

    },
    async getUserDetails() {                                                                   // Get user details function
      const id = await UserService.FindUserByToken()
      this.userTokenDetails = id
      const user = await UserService.findUserById(this.userTokenDetails._id)
      this.userDetails = user
    },
  },
  created() {
    this.getUserDetails()
  }
};
</script>
