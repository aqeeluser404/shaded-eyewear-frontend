<template>
  <q-card-section>                                                                                   <!---------------- USER DETAILS COMPONENET ----------------->
    <div class="text-h6 text-white">Personal Details</div>
  </q-card-section>

    <q-card class="q-mb-md">
      <q-card-section>
        <q-item>
          <q-item-section class="text-left">First Name</q-item-section>
          <q-item-section class="text-left">
            <q-input v-model="userDetails.firstName" />
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <q-item>
          <q-item-section class="text-left">Last Name</q-item-section>
          <q-item-section class="text-left">
            <q-input v-model="userDetails.lastName" />
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <q-item>
          <q-item-section class="text-left">
            <span>Email
              <span class="q-ml-md" v-if="userDetails && userDetails.verification && userDetails.verification.isVerified">
                isVerified <q-icon color="secondary" name="eva-checkmark-circle-2-outline" />
              </span>
            </span>

          </q-item-section>
          <q-item-section class="text-left">
            <q-input v-model="userDetails.email" />
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <q-item>
          <q-item-section class="text-left">Phone</q-item-section>
          <q-item-section class="text-left">
            <q-input v-model="userDetails.phone" />
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <q-item>
          <q-item-section class="text-left">Username</q-item-section>
          <q-item-section class="text-left">
            <q-input v-model="userDetails.username" />
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>


    <div class="q-gutter-md">
      <q-btn rounded dense label="Save Changes" color="primary" size="12px" class="q-py-sm q-px-lg" @click="updateUser" />
      <q-btn rounded dense label="Verify Email" color="primary" size="12px" class="q-py-sm q-px-lg" @click="resendVerificationEmail" v-if="userDetails && userDetails.verification && !userDetails.verification.isVerified" />
    </div>

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
