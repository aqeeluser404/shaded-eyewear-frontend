<template>
  <q-layout view="hHh lpR fff">
    <div class="noise-overlay"></div>

     <!---------------- HEADER ----------------->
    <q-header :class="[headerClass, colorShiftClass]">

      <q-toolbar class="q-px-lg row items-center justify-between">

        <!-- TITLE AND AVATAR -->
        <q-toolbar-title class="col-md-6 row items-center ">

          <q-avatar class="q-mr-sm responsive-avatar">
            <img :src="logoSrc"/>
          </q-avatar>
          <router-link to="/" :class="colorShiftClass" class="text-remove-decoration font-size-responsive-lg q-mr-sm" >Shaded Eyewear ™ </router-link>
          <span v-if="isLoggedIn" class="q-ml-md font-size-responsive-xl caveat ">
            Hi, {{ userDetails.username }}
          </span>
          <span v-else class="q-ml-md font-size-responsive-xl caveat ">
            Hi valued customer
          </span>
        </q-toolbar-title>

        <!-- TEXT CAROUSEL -->
        <!-- <div class="col-md-0 row large-screen-only justify-center">
          <div class="text-carousel q-ml-lg font font-size-responsive-xs">
            <q-btn flat icon="eva-arrow-ios-back-outline" @click="prevText" />
            <span class="q-mx-sm">{{ texts[currentIndex] }}</span>
            <q-btn flat icon="eva-arrow-ios-forward-outline" @click="nextText" />
          </div>
        </div> -->

        <div class="col-md-6">

          <!------------ DESKTOP NAV ------------->
          <div class="row justify-end items-center">
            <q-btn to="/" class="custom-button large-screen-only font-size-responsive-xs" label="Home" flat rounded />
            <q-btn to="/sunglasses" class="custom-button large-screen-only font-size-responsive-xs" label="Catalogue" flat rounded />
            <q-btn v-if="!isLoggedIn" to="/auth/login" class="custom-button large-screen-only font-size-responsive-xs" label="Login" flat rounded />
            <q-btn v-else @click="logout" class="custom-button large-screen-only font-size-responsive-xs" label="Logout" flat rounded />
            <q-btn @click="openDash" class="custom-button large-screen-only font-size-responsive-xs" icon="eva-person-outline" flat rounded />
            <q-btn v-if="userDetails && userDetails.userType != null && userDetails.userType == 'admin'" to="/admin/dashboard" icon="eva-pie-chart-outline" class="custom-button large-screen-only font-size-responsive-xs" flat rounded />
            <q-btn to="/cart" icon="eva-shopping-bag-outline" class="large-screen-only font-size-responsive-xs" flat rounded />
          </div>

          <!------------ MOBILE NAV ------------->
          <q-btn-dropdown class="small-screen-only" icon="menu" flat>
            <q-list style="width: 200px">
              <!-- <q-item>
                <q-item-section>
                  <span v-if="isLoggedIn" class="font-size-responsive-xxl caveat small-screen-only">
                    Hi, {{ userDetails.username }}
                  </span>
                </q-item-section>
              </q-item> -->
              <q-item clickable v-close-popup to="/">
                <q-item-section class="anton-regular font-size-responsive-xxl">Home</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/sunglasses">
                <q-item-section class="anton-regular font-size-responsive-xxl">Catalogue</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/auth/login" v-if="!isLoggedIn">
                <q-item-section class="anton-regular font-size-responsive-xxl">Login</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="logout" v-else>
                <q-item-section class="anton-regular font-size-responsive-xxl">Logout</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="openDash">
                <q-item-section class="anton-regular font-size-responsive-xxl">User Profile</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/admin/dashboard" v-if="userDetails && userDetails.userType != null && userDetails.userType == 'admin'">
                <q-item-section class="anton-regular font-size-responsive-xxl">Admin Panel</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/cart">
                <q-item-section class="anton-regular font-size-responsive-xxl">Cart</q-item-section>
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
          <div class="row justify-center">
            <!-- Developed By Section -->
            <div class="col-12 col-md-4 items-center">
              <q-card flat class="q-pa-md bg-transparent">
                <div class="font-size-responsive-xxl anton-regular">SHORTCUT LINKS</div>
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
                <div class="font-size-responsive-xxl anton-regular">GET IN CONTACT</div>
                <br>
                <div>
                  <div class="font-size-responsive-sm">
                    <q-form @submit="submitContactForm" style="width: 75%;">
                      <q-input filled label-color=white color="white" v-model="userContact.firstName" label="Your Name" class="q-mb-xs font-size-responsive-sm" required
                      style="background-color: #121212;" input-style="color: white;" />
                      <q-input filled label-color=white color="white" v-model="userContact.email" label="Your Email" class="q-mb-xs" required
                      style="background-color: #121212;" input-style="color: white;" />
                      <q-input filled label-color=white color="white" v-model="message" label="Message" type="textarea" class="q-mb-xs" required
                      style="background-color: #121212;" input-style="color: white;"  />
                      <q-btn type="submit" label="Send Message" style="background-color: #121212;" />
                    </q-form>
                  </div>
                </div>
              </q-card>
            </div>
            <!-- Follow Us Section -->
            <div class="col-12 col-md-4">
              <q-card flat class="q-pa-md bg-transparent">
                <div class="font-size-responsive-xxl anton-regular">FOLLOW US</div>
                <br>
                <div class="row items-center q-gutter-md">
                  <div>
                    <span class=""><q-btn flat round icon="mdi-instagram" style="border: 1px solid;" class="text-white font-size-responsive-lg" @click="openInstagram" /></span>
                  </div>
                  <div>
                    <div class="font-size-responsive-xs">Follow us on Instagram</div>
                    <div class="font-size-responsive-xs">For the newest arrivals</div>
                    <div class="font-size-responsive-xs">Sunglasses and Eyewear Shop</div>
                  </div>
                </div>
              </q-card>
            </div>
          </div>
          <div class="row justify-center">
            <q-separator class="q-my-md" style="background-color: #121212; width: 75%;"></q-separator>
          </div>
          <div class="row justify-center items-center font-size-responsive-xs q-pa-md">
            <q-avatar class="responsive-avatar-2">                                                                   <!-- avatar -->
              <img src="/src/assets/logos/logo-white.png"/>
            </q-avatar>
            Shaded Eyewear ™ | Est. 2023 | Sunglasses & Eyewear Shop | <span class=" q-ml-xs caveat font-size-responsive-sm" > Developed by <a href="https://aqeel-dev-portfolio.web.app" target="_blank" style="text-decoration: none; color: inherit; font-weight: bold;">Aqeel</a></span>
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
        "Sunglasses and Eyewear Shop",
        "Discover our latest collections",
        "Follow us on Instagram for the newest arrivals",
        "Established in 2023"
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
// .text-carousel-toolbar
//   background-color: #f5f5f5
//   padding: 10px 0
// .font-size-responsive-xl
//   @media (min-width: 1320px)
//     font-size: 1.25rem
//   @media (min-width: 1320px)
//     font-size: 1rem

// .font-size-responsive-xs
//   @media (min-width: 1320)
//     font-size: 0.75rem

.responsive-avatar
  width: clamp(1.975rem, 5vw, 3.125rem) // 30px to 50px
  height: clamp(1.975rem, 5vw, 3.125rem) // 30px to 50px

.responsive-avatar-2
  width: clamp(1.2rem, 5vw, 3.125rem) // 30px to 50px
  height: clamp(1.2rem, 5vw, 3.125rem) // 30px to 50px
</style>
