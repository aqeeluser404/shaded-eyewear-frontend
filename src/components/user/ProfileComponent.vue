<template>
  <q-card-section>
    <div class="text-h6">Personal Details</div>
  </q-card-section>
  <q-card>
    <q-item class="">
      <q-item-section class="text-left">Your Name</q-item-section>
      <q-item-section class="text-left">
        <q-input v-model="userDetails.firstName" />
      </q-item-section>
    </q-item>
  </q-card>
  <br>
  <q-card>
    <q-item class="">
      <q-item-section class="text-left">Last Name</q-item-section>
      <q-item-section class="text-left">
        <q-input v-model="userDetails.lastName" />
      </q-item-section>
    </q-item>
  </q-card>
  <br>
  <q-card>
    <q-item class="">
      <q-item-section class="text-left">
        <span>Email</span>
        <span v-if="userDetails && userDetails.verification && userDetails.verification.isVerified === true">
          isVerified <q-icon color="secondary" name="eva-checkmark-circle-2-outline" />
        </span>
      </q-item-section>
      <q-item-section class="text-left">
        <q-input v-model="userDetails.email" />
      </q-item-section>
    </q-item>
  </q-card>
  <br>
  <q-card>
    <q-item class="">
      <q-item-section class="text-left">Phone</q-item-section>
      <q-item-section class="text-left">
        <q-input v-model="userDetails.phone" />
      </q-item-section>
    </q-item>
  </q-card>
  <br>
  <q-card>
    <q-item class="">
      <q-item-section class="text-left">Username</q-item-section>
      <q-item-section class="text-left">
        <q-input v-model="userDetails.username" />
      </q-item-section>
    </q-item>
  </q-card>
  <br>
  <q-card flat>
    <q-card-actions>
      <q-btn label="Save Changes" color="primary" @click="updateUser"  />
      <q-btn label="Verify Email" @click="resendVerificationEmail" v-if="userDetails && userDetails.verification && userDetails.verification.isVerified === false" />
    </q-card-actions>
  </q-card>
</template>

<script>
import EmailService from '../../services/EmailService'
import UserService from 'src/services/UserService'
export default {
  data() {
    return {
      userDetails: {},
      userTokenDetails: { _id : '', username: '', userType: '' }
    }
  },
  methods: {

    async resendVerificationEmail() {
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

    // =================================== FUNCTIONS
    async updateUser() {
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
      this.$q.dialog({
        title: 'Confirm',
        message: `You are about to update your profile, continue?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await UserService.updateUserDetails(this.userDetails._id, updatedUser)
          this.getUserDetails()
        } catch(error) {
          console.error(error);
        }
      }).onCancel(() => {
        this.getUserDetails()
        return
      }).onDismiss(() => {});
    },

    // =================================== GET DATA
    async getUserDetails() {
      const id = await UserService.FindUserByToken()
      this.userTokenDetails = id
      const user = await UserService.findUserById(this.userTokenDetails._id)
      this.userDetails = user
    }
  },
  created() {
    this.getUserDetails()
  }
};
</script>
