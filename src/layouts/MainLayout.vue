<template>
  <q-layout view="hHh lpR fff">

    <!-- =================================== HEADER DECLARATION, TITLE & IMG -->
    <q-header class="bg-white text-black">
      <q-toolbar class="constrain">
        <q-toolbar-title>
          <!-- title -->
          <router-link to="/" class="text-remove-decoration q-mr-md">
            Shaded Eyewear
          </router-link>
          <!-- img -->
          <q-avatar>
            <img src="../assets/sunglasses-icon.png" />
          </q-avatar>
          <!-- username -->
          <span v-if="isLoggedIn" class="q-ml-lg font-size-responsive-xs">
            Hi, {{ userDetails.username }}
            <q-btn
              to="/user/dashboard"
              size="12px"
              icon="eva-edit-outline"
              flat
              dense
              round
            />
          </span>
        </q-toolbar-title>

        <!-- =================================== BIG SCREEN CONTENT -->
        <!-- public -->
        <div class="row justify-evenly items-center">
          <q-btn
          to="/"
          size="12px"
          class="custom-button large-screen-only"
          label="Home"
          flat
        />
        <q-btn
          to="/sunglasses"
          size="12px"
          class="custom-button large-screen-only"
          label="Catalogue"
          flat
        />
        <!-- profiles -->
        <q-btn
          v-if="userDetails && userDetails.userType != null && userDetails.userType == 'admin'"
          to="/admin/dashboard"
          size="12px"
          icon="eva-activity-outline"
          class="custom-button large-screen-only"
          label="Admin Panel"
          flat
        />
        <!-- Authentication -->
        <q-btn v-if="!isLoggedIn"
          to="/auth/login"
          size="12px"
          class="custom-button large-screen-only"
          label="Login"
          flat
        />
        <q-btn
          v-else
          @click="logout"
          size="12px"
          class="custom-button large-screen-only"
          label="Logout"
          flat
        />
        <!-- cart -->
        <q-btn
          to="/cart"
          size="12px"
          icon="eva-shopping-cart large-screen-only"
          flat
        />
        </div>


        <!-- =================================== SMALL SCREEN CONTENT -->
        <q-btn-dropdown
          class="small-screen-only"
          icon="menu"
          flat
        >
          <q-list style="width: 200px">
            <q-item clickable v-close-popup to="/">
              <q-item-section>Home</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/sunglasses">
              <q-item-section>Catalogue</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/admin/dashboard" v-if="userDetails && userDetails.userType != null && userDetails.userType == 'admin'">
              <q-item-section>Admin Panel</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/auth/login" v-if="!isLoggedIn">
              <q-item-section>Login</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logout" v-else>
              <q-item-section>Logout</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/cart">
              <q-item-section>Cart</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <!-- =================================== BODY -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- =================================== FOOTER -->
    <q-footer class="bg-white text-black">
      <q-toolbar class="constrain">
        <q-toolbar-title>
          <q-avatar>
            <!-- <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" /> -->
          </q-avatar>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import OrderService from 'src/services/OrderService';
import UserService from 'src/services/UserService';

export default {
  name: "MainLayout",

  data() {
    return {
      order: {},
      userDetails: {
        _id: '',
        username: '',
        userType: ''
      },
      isLoggedIn: false,
      burgerMenuShown: false,
    }
  },
  mounted() {
    this.getCurrentOrder()
  },
  created() {
    this.checkLoginStatus()
  },
  watch: {
    // push status to the other pages
    '$route': 'checkLoginStatus'
  },
  methods: {

    // =================================== FUNCTIONS
    async cancelOrder(orderId) {
      const response = await OrderService.cancelOrder(orderId)
      if (response) {
        await OrderService.deleteOrder(orderId)
        localStorage.removeItem('currentOrderId')
      }
    },

    // =================================== GET DATA
    async getCurrentOrder() {
      const orderId = localStorage.getItem('currentOrderId')
      if (orderId) {
        const response = await OrderService.findOrderById(orderId)
        this.order = response

        // automatically remove order once paid for
        if (this.order.status === 'paid') {
          localStorage.removeItem('currentOrderId')
        }
      } else {
        console.log("No order has been placed")
      }
      console.log( "current orderId: ", this.order._id)
    },

    // 1. check if logged in
    checkLoginStatus() {
      let token = localStorage.getItem('auth-token')
      this.isLoggedIn = !!token

      // 2. fetch user details to determine usertype
      if (this.isLoggedIn == true) {
        this.fetchUserDetails()
      }
    },

    // 2.1 fetch user details to determine usertype
    async fetchUserDetails() {
      const response = await UserService.FindUserByToken()
      this.userDetails = response
    },

    // 3. logout and clear local storage
    async logout() {
      this.$q.dialog({
        title: 'Logout', message: `You are about to logout, continue?`, color: 'primary', cancel: true, persistent: true
      }).onOk(async () => {
        // cancel order function
        await this.getCurrentOrder()
        await this.cancelOrder(this.order._id)

        const response = await UserService.logout(this.userDetails._id)
        if (response) {
          this.$q.notify({ type: 'positive', color: 'primary', message: 'You have successfully logged out!' })
          this.$router.push('/')
          this.isLoggedIn = false
          window.location.reload()
        } else {
          this.$q.notify({ type: 'negative', message: 'Logout failed. Please try again.' })
        }
      })
    }
  }
};
</script>
