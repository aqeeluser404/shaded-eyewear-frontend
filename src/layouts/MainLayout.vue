<template>
  <q-layout view="hHh lpR fff">
    <div class="noise-overlay"></div>
    <q-header :class="[headerClass, colorShiftClass]">                                                            <!---------------- HEADER ----------------->
      <q-toolbar class="q-px-lg row items-center">

        <q-toolbar-title class="row items-center col-4">
          <q-avatar size="50px" class="q-mr-md">                                                                   <!-- avatar -->
            <img :src="logoSrc"/>
          </q-avatar>
          <router-link to="/" :class="colorShiftClass" class="text-remove-decoration q-mr-md" >Shaded Eyewear ™ </router-link>       <!-- title -->
          <span v-if="isLoggedIn" class="q-ml-lg font-size-responsive-lg caveat">                                  <!-- welcome message -->
            Hi, {{ userDetails.username }}
          </span>
        </q-toolbar-title>

        <div class="col-4 row justify-center">                                                                    <!-- text carousel -->
          <div class="text-carousel q-ml-lg font font-size-responsive-xs">
            <q-btn flat icon="eva-arrow-ios-back-outline" @click="prevText" />
            <span class="q-mx-sm">{{ texts[currentIndex] }}</span>
            <q-btn flat icon="eva-arrow-ios-forward-outline" @click="nextText" />
          </div>
        </div>

        <div class="col-4">
          <div class="row justify-end items-center">                                                    <!------------ DESKTOP NAV ------------->
          <q-btn to="/" size="12px" class="custom-button large-screen-only " label="Home" flat />                                                    <!-- home -->
          <q-btn to="/sunglasses" size="12px" class="custom-button large-screen-only" label="Catalogue" flat />                                     <!-- catalogue -->
          <q-btn v-if="!isLoggedIn"
            to="/auth/login" size="12px" class="custom-button large-screen-only" label="Login" flat />                                              <!-- login -->
          <q-btn v-else
            @click="logout" size="12px" class="custom-button large-screen-only" label="Logout" flat />
          <q-btn @click="openDash" size="12px" icon="eva-person-outline" flat />                                                  <!-- logout -->
          <q-btn v-if="userDetails && userDetails.userType != null && userDetails.userType == 'admin'"
            to="/admin/dashboard" size="12px" icon="eva-pie-chart-outline" class="custom-button large-screen-only" flat/>         <!-- admin dash -->
          <q-btn to="/cart" size="12px" icon="eva-shopping-bag-outline large-screen-only" flat />                                                          <!-- cart -->
        </div>

        <q-btn-dropdown class="small-screen-only" icon="menu" flat>                                     <!------------ MOBILE NAV ------------->
          <q-list style="width: 200px">
            <q-item clickable v-close-popup to="/">
              <q-item-section>Home</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/sunglasses">
              <q-item-section>Catalogue</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/auth/login" v-if="!isLoggedIn">
              <q-item-section>Login</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logout" v-else>
              <q-item-section>Logout</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="openDash">
              <q-item-section>User Profile</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/admin/dashboard" v-if="userDetails && userDetails.userType != null && userDetails.userType == 'admin'">
              <q-item-section>Admin Panel</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/cart">
              <q-item-section>Cart</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container style="transform: translateY(-50px);">                                                                                 <!------------ PAGES CONTAINER ------------->
      <router-view />
    </q-page-container>

    <q-footer class="bg-black text-white" style="transform: translateY(-50px);">                                                              <!------------ FOOTER ------------->
      <q-toolbar class=" constrain">
        <q-toolbar-title>
          <q-card flat class="q-pa-md bg-transparent">

            Follow Us
            <q-avatar size="50px" class="q-mr-md">                                                                   <!-- avatar -->
              <img src="src/assets/logos/logo-white.png"/>
            </q-avatar>
          </q-card>
          <q-separator class="q-mb-md" />
          <div class="row">
            <q-card class="col-3 q-pa-md bg-transparent">

              Get in contact:
              <div>
                Email us
              </div>
              <div>

              </div>

            </q-card>
            <!-- <q-card class="col-3 q-pa-md">Hi</q-card>
            <q-card class="col-3 q-pa-md">Hi</q-card>
            <q-card class="col-3 q-pa-md">Hi</q-card> -->
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import OrderService from 'src/services/OrderService'
import UserService from 'src/services/UserService'
import Helper from 'src/services/utils'
import logoWhite from 'src/assets/logos/logo-white.png'
import logoBlack from 'src/assets/logos/logo-black.png'

export default {
  name: "MainLayout",

  computed: {
    isSpecificPage() {
      return this.$route.path.includes('/sunglasses/view/') || this.$route.path.includes('/user/dashboard')
    }
  },

  data() {
    return {
      texts: [
        "Welcome, Please login to view your account",
        "Discover our latest collections",
        "Enjoy exclusive member benefits",
        "Stay updated with our newsletter"
      ],
      currentIndex: 0,
      order: {},
      userDetails: {
        _id: '',
        username: '',
        userType: ''
      },
      isLoggedIn: false,
      burgerMenuShown: false,

      // css stuff
      headerClass: 'header-transparent',
      colorShiftClass: 'transparent-white',
      logoSrc: logoWhite
    }
  },
  mounted() {
    this.getCurrentOrder()
    this.checkLoginStatus()
    this.changeTextAutomatically()
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll(); // Ensure the correct header state on initial load
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    '$route'() {
      this.checkLoginStatus();
      this.handleScroll(); // Ensure the correct header state on route change
    }
  },
  methods: {
    handleScroll() {
      if (this.isSpecificPage) {
        this.headerClass = 'header-solid';
        this.colorShiftClass = 'transparent-black';
        this.logoSrc = logoBlack;
      } else if (window.scrollY > 50) {
        this.headerClass = 'header-solid';
        this.colorShiftClass = 'transparent-black';
        this.logoSrc = logoBlack;
      } else {
        this.headerClass = 'header-transparent';
        this.colorShiftClass = 'transparent-white';
        this.logoSrc = logoWhite;
      }
    },
    prevText() {
      this.currentIndex = (this.currentIndex - 1 + this.texts.length) % this.texts.length
    },
    nextText() {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length
    },
    changeTextAutomatically() {
      setInterval(() => {
        this.nextText()
      }, 10000)
    },
    checkLoginStatus() {                                        // 1. check if logged in
      const token = Helper.getCookie('token')
      this.isLoggedIn = !!token

      if (this.isLoggedIn == true) {                           // 2. fetch user details to determine usertype
        this.fetchUserDetails()
      }
    },
    async fetchUserDetails() {                                // 2.1 fetch user details to determine usertype
      const response = await UserService.FindUserByToken()
      this.userDetails = response
    },
    async logout() {                                          // 3. logout and clear local storage
      this.$q.dialog({
        title: 'Logout', message: `You are about to logout, continue?`, color: 'primary', cancel: true, persistent: true
      }).onOk(async () => {

        if (this.order._id) {
          await this.getCurrentOrder()                          // get order in local store
          await this.cancelOrder(this.order._id)                // cancel order function
        }

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
    },
    async getCurrentOrder() {
      const orderId = localStorage.getItem('currentOrderId')
      if (orderId) {
        const response = await OrderService.findOrderById(orderId)
        this.order = response

        if (this.order.status === 'paid') {                   // automatically remove order once paid for
          localStorage.removeItem('currentOrderId')
        }
      } else {
        console.log("No order has been placed")
      }
      console.log( "current orderId: ", this.order._id)
    },
    async openDash() {
      if (this.isLoggedIn == true) {
        this.$router.push('/user/dashboard')
      } else {
        this.$q.notify({ type: 'negative', message: 'Please login to continue.' })
      }
    },
    async cancelOrder(orderId) {
      const response = await OrderService.cancelOrder(orderId)
      if (response) {
        await OrderService.deleteOrder(orderId)
        localStorage.removeItem('currentOrderId')
      }
    },
  }
}
</script>

<style lang="sass">
</style>
