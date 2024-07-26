<template>
  <!-- constrains -->
  <q-page>
    <div class="constrain window-height">

      <!-- =================================== USER HEADER -->
      <q-card bordered flat class="column flex-center q-mb-md">
        <h4>My Account</h4>
      </q-card>

      <!-- =================================== USER CONTROLS -->
      <div class="row q-pa-md q-gutter-lg justify-center">

        <!-- navigation -->
        <q-card class="q-pa-md" >
          <q-item clickable >
            <q-item-section avatar><q-icon name="eva-person-outline" /></q-item-section>
            <q-item-section>Personal Details</q-item-section>
          </q-item>
          <q-item clickable >
            <q-item-section avatar><q-icon name="eva-clipboard-outline" /></q-item-section>
            <q-item-section>Orders</q-item-section>
          </q-item>
          <q-item clickable >
            <q-item-section avatar><q-icon name="eva-credit-card-outline" /></q-item-section>
            <q-item-section>Invoices</q-item-section>
          </q-item>
          <q-item clickable >
            <q-item-section avatar><q-icon name="eva-navigation-2-outline" /></q-item-section>
            <q-item-section>Address Book</q-item-section>
          </q-item>
        </q-card>

        <!-- personal details -->
        <div class="col-12 col-md-4">
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
              <q-item-section class="text-left">Email</q-item-section>
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
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import UserService from 'src/services/UserService';

export default {
  data() {
    return {
      userDetails: {},
      userTokenDetails: {
        _id : '',
        username: '',
        userType: ''
      }
    }
  },
  methods: {
    async getUserDetails() {
      // token details
      const id = await UserService.FindUserByToken()
      this.userTokenDetails = id
      // user details
      const user = await UserService.findUserById(this.userTokenDetails._id)
      this.userDetails = user
    },
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
    }
  },
  created() {
    this.getUserDetails()
  }
};
</script>
