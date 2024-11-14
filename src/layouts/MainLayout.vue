<template>
  <q-layout view="hHh lpR fff">
    <div class="noise-overlay"></div>

     <!---------------- HEADER ----------------->
    <q-header :class="[headerClass, colorShiftClass]">
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

        <!------------ DESKTOP NAV ------------->
        <div class="col-4">
          <div class="row justify-end items-center">
          <q-btn to="/" size="12px" class="custom-button large-screen-only " label="Home" flat />                                            <!-- home -->
          <q-btn to="/sunglasses" size="12px" class="custom-button large-screen-only" label="Catalogue" flat />                              <!-- catalogue -->
          <q-btn v-if="!isLoggedIn"
            to="/auth/login" size="12px" class="custom-button large-screen-only" label="Login" flat />                                       <!-- login -->
          <q-btn v-else
            @click="logout" size="12px" class="custom-button large-screen-only" label="Logout" flat />
          <q-btn @click="openDash" size="12px" icon="eva-person-outline" flat />                                                             <!-- logout -->
          <q-btn v-if="userDetails && userDetails.userType != null && userDetails.userType == 'admin'"
            to="/admin/dashboard" size="12px" icon="eva-pie-chart-outline" class="custom-button large-screen-only" flat/>                    <!-- admin dash -->
          <q-btn to="/cart" size="12px" icon="eva-shopping-bag-outline large-screen-only" flat />                                            <!-- cart -->
        </div>

        <!------------ MOBILE NAV ------------->
        <q-btn-dropdown class="small-screen-only" icon="menu" flat>
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

    <!-- PAGES -->
    <div style="background-color: black;">
      <q-page-container style="transform: translateY(-50px); ">
        <router-view style="background-color: white;" />
      </q-page-container>
    </div>

    <!-- FOOTER -->
    <q-footer class="bg-black text-white q-pa-md">
      <q-toolbar class="constrain">
        <q-toolbar-title>
          <div class="row">
            <!-- Developed By Section -->
            <div class="col-12 col-md-4">
              <q-card flat class="q-pa-md bg-transparent">
                <div class="text-h5 anton-regular">SHORTCUT LINKS</div>
                <br>
                <div class="font-size-responsive-sm">
                  <q-card class="q-mb-xs q-pa-sm" style="background-color: #121212; width: 75%;">
                    <router-link to="/" class="text-remove-decoration text-white">Home</router-link>
                  </q-card>
                  <q-card class="q-mb-xs q-pa-sm" style="background-color: #121212; width: 75%;">
                    <router-link to="/sunglasses" class="text-remove-decoration text-white">Catalogue</router-link>
                  </q-card>
                  <q-card class="q-mb-xs q-pa-sm" style="background-color: #121212; width: 75%;">
                    <router-link to="/user/dashboard" class="text-remove-decoration text-white">Dashboard</router-link>
                  </q-card>
                  <q-card class="q-mb-xs q-pa-sm" style="background-color: #121212; width: 75%;">
                    <router-link to="/cart" class="text-remove-decoration text-white">Cart</router-link>
                  </q-card>
                </div>
              </q-card>
            </div>
            <!-- Contact Section -->
            <div class="col-12 col-md-4">
              <q-card flat class="q-pa-md bg-transparent">
                <div class="text-h5 anton-regular">GET IN CONTACT</div>
                <br>
                <div>
                  <div class="font-size-responsive-sm">
                    <q-form class="text-white" @submit="submitContactForm" style="width: 75%;">
                      <q-input filled v-model="userContact.firstName" label="Your Name" class="q-mb-xs " required  style="background-color: #121212;"/>
                      <q-input filled v-model="userContact.email" label="Your Email" class="q-mb-xs" required  style="background-color: #121212;"/>
                      <q-input filled v-model="message" label="Message" type="textarea" class="q-mb-xs" required  style="background-color: #121212;" />
                      <q-btn type="submit" label="Send Message" style="background-color: #121212;" />
                    </q-form>

                  </div>
                </div>
              </q-card>
            </div>
            <!-- Follow Us Section -->
            <div class="col-12 col-md-4">
              <q-card flat class="q-pa-md bg-transparent">
                <div class="text-h5 anton-regular">FOLLOW US
                  <br>
                  <span class="q-gutter-md">
                    <q-btn flat round icon="mdi-instagram" style="border: 1px solid;" class="text-white" @click="openInstagram" />
                    <q-btn flat round icon="mdi-facebook" style="border: 1px solid;" class="text-white" @click="openFacebook" />
                    <q-btn flat round icon="mdi-twitter" style="border: 1px solid;" class="text-white" @click="openTwitter" />
                  </span>
                  <br>
                </div>
                <br>
                <div>
                  <div class="font-size-responsive-xs">Fast and reliable service</div>
                  <div class="font-size-responsive-xs">Terms and conditions apply</div>
                </div>
              </q-card>
            </div>
          </div>
          <div class="row justify-center">
            <q-separator class="q-mb-md" style="background-color: #121212; width: 75%;"></q-separator>
          </div>
          <div class="row justify-center font-size-responsive-xs q-pa-md">
            Shaded Eyewear ™ | Est. 2023 | Sunglasses and Eyewear Shop | Developed by <a href="https://aqeel-dev-portfolio.web.app" target="_blank" style="text-decoration: none; color: inherit; font-weight: bold;">Aqeel</a>
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
import EmailService from 'src/services/EmailService'

export default {
  name: "MainLayout",

  computed: {
    isSpecificPage() {
      return this.$route.path.includes('/sunglasses/view/') ||
      this.$route.path.includes('/cart') ||
      this.$route.path.includes('/buy/review')
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
      logoSrc: logoWhite,

      // send message
      userContact: {
        firstName: '',
        email: ''
      }, message: ''
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
    },
    'userContact.firstName': function(newVal) {
      this.userContact.firstName = newVal.toLowerCase();
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
    async checkLoginStatus() {                                        // 1. check if logged in
      const token = Helper.getCookie('token')
      this.isLoggedIn = !!token

      if (this.isLoggedIn === true) {                           // 2. fetch user details to determine usertype
        this.fetchUserDetails()
      } else {
        const orderId = localStorage.getItem('currentOrderId')
        await this.cancelOrder(orderId)
        window.location.reload()
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
          // after removing , access through my-orders, filter with type of delivery
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


      openInstagram() {
        window.open('https://www.instagram.com/shadedeyewearza/', '_blank');
      },
      openFacebook() {
        // window.open('https://www.facebook.com/yourprofile', '_blank');
      },
      openTwitter() {
        // window.open('https://www.twitter.com/yourprofile', '_blank');
      },

    async submitContactForm() {
      try {
        const response = await EmailService.GetInContact(this.userContact, this.message)
        if (response) {
          this.$q.notify({ type: 'positive', message: 'Message sent successfully!' });
        } else {
          this.$q.notify({ type: 'negative', message: 'Error sending message.' });
        }
      } catch (error) {
        this.$q.notify({ type: 'negative', message: 'Error sending message.' });
      }
    }
  }
}
</script>

<style lang="sass">
</style>
