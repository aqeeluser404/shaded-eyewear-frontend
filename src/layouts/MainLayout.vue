<template>
  <q-layout view="hHh lpR fff">

    <div v-if="!cookieAccepted" class="cookie-consent-banner">
      <div class="q-pa-lg bg-black text-white q-mb-sm">
        <span class="font-size-responsive-xs">This website uses cookies to ensure you get the best experience.</span>
        <q-btn rounded dense @click="acceptCookies" label="Accept" color="white" class="q-px-md q-py-sm q-ml-lg font-size-responsive-xs" flat ></q-btn>
      </div>
    </div>
    <div class="noise-overlay"></div>

    <!----------------------------------------------------------- HEADER SECTION -------------------------------------------------->
    <q-header v-if="showHeader" :class="[headerClass, colorShiftClass]" :style="{ height: '75px' }" class="row items-center" style="border-bottom: 1px solid rgba(255, 255, 255, 0.2);">

      <q-toolbar class="row items-center justify-around constrain">

        <!-- title and avatar -->
        <q-toolbar-title class="col-md-4 row items-center ">
          <q-avatar class="q-mr-sm responsive-avatar">
            <img :src="logoSrc"/>
          </q-avatar>
          <router-link to="/" :class="colorShiftClass" class="text-remove-decoration font-size-responsive-md archivo" >SHADED EYEWEAR</router-link>
        </q-toolbar-title>

        <div class="col-md-4">

          <!----------------------------------------------------------- NAV SECTION -------------------------------------------------->
          <!-- Desktop nav -->
          <div class="row justify-center items-center">
            <q-btn to="/" class="custom-button q-py-sm large-screen-only font-size-responsive-sm" label="Home" :ripple="false" no-caps flat rounded />
            <q-btn to="" class="custom-button q-py-sm large-screen-only font-size-responsive-sm" label="About" :ripple="false" no-caps flat rounded />
            <q-btn to="/sunglasses" class="custom-button q-py-sm large-screen-only font-size-responsive-sm" label="Catalogue" :ripple="false" no-caps flat rounded />
            <!-- <q-btn v-if="!isLoggedIn" to="/auth/login" class="custom-button q-py-sm large-screen-only font-size-responsive-sm" label="Login" :ripple="false" no-caps flat rounded />
            <q-btn v-else @click="logout" class="custom-button q-py-sm large-screen-only font-size-responsive-sm" label="Logout" :ripple="false" no-caps flat rounded /> -->
          </div>
        </div>

        <div class="col-md-4">
          <div class="row justify-end items-center">
            <q-btn to="/cart" icon="eva-shopping-bag-outline" class="custom-button q-py-sm text-body2" :ripple="false" no-caps flat rounded />

            <!-- Home Icons -->
            <UniversalMenu :items="profileItems" :hover="false" class="large-screen-only" >
              <template #trigger>
                <q-btn class="custom-button q-py-sm text-caption" icon="fa-regular fa-circle-user" :ripple="false" no-caps flat rounded />
              </template>
            </UniversalMenu>
          </div>
        </div>

        <div class="col-md-4 small-screen-only">
          <q-btn
            flat
            :icon="menuOpen ? 'eva-close-outline' : 'eva-menu-outline'"
            @click="menuOpen = !menuOpen"
          />
        </div>

        <Teleport to="body">
          <div v-show="menuOpen" class="mobile-nav-backdrop" @click="menuOpen = false"></div>

          <q-list v-show="menuOpen" class="mobile-nav-list">
            <q-item clickable v-close-popup @click="menuOpen = false" to="/">
              <q-item-section class="font-size-responsive-md">Home</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="menuOpen = false" to="/sunglasses">
              <q-item-section class="font-size-responsive-md">About</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="menuOpen = false" to="/sunglasses">
              <q-item-section class="font-size-responsive-md">Catalogue</q-item-section>
            </q-item>
            <!-- <q-item
              clickable
              v-close-popup
              @click="menuOpen = false"
              to="/admin/dashboard"
              v-if="userDetails && userDetails.userType != null && userDetails.userType == 'admin'"
            >
              <q-item-section class="font-size-responsive-md">Admin Panel</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="menuOpen = false" to="/auth/login" v-if="!isLoggedIn">
              <q-item-section class="font-size-responsive-md">Login</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="() => { logout(); menuOpen = false }" v-else>
              <q-item-section class="font-size-responsive-md">Logout</q-item-section>
            </q-item> -->
          </q-list>
        </Teleport>
      </q-toolbar>
    </q-header>

    <!----------------------------------------------------------- PAGES SECTION -------------------------------------------------->
    <div style="background-color: black;">
      <q-page-container :style="pageContainerStyle">
        <router-view style="background-color: white;" />
      </q-page-container>
    </div>

    <!----------------------------------------------------------- FOOTER SECTION -------------------------------------------------->
    <q-footer class="bg-black text-white q-pa-md" v-if="showHeader">
      <q-toolbar class="constrain">
        <q-toolbar-title>
          <div class="row justify-center">

            <!-- Developed By Section -->
            <div  class="col-12 col-md-4 items-center">
              <q-card flat class="q-pa-md bg-transparent">
                <div class="font-size-responsive-xxl anton-regular">SHORTCUT LINKS</div>
                <br>
                <div class="font-size-responsive-md">
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
                <br>
                <div class="text-caption" style="opacity: 0.9;">
                  Shaded Eyewear founded by <span style="text-decoration: underline;" class="text-subtitle1 caveat cursor-pointer"> Amaan Ebrahim</span>
                </div>
                <div class="text-caption" style="opacity: 0.9;">
                  Website developed by
                  <a href="https://aqeel-dev-portfolio.web.app" target="_blank" style="text-decoration: none; color: inherit; text-decoration: underline;" class="text-subtitle1 caveat">Aqeel Hanslo</a>
                </div>
              </q-card>
            </div>

            <!-- Contact Section -->
            <div  class="col-12 col-md-4">
              <q-card flat class="q-pa-md bg-transparent">
                <div class="font-size-responsive-xxl anton-regular">GET IN CONTACT</div>
                <br>
                <div>
                  <div class="font-size-responsive-sm">
                    <q-form @submit="submitContactForm" style="width: 75%;">
                      <q-input filled label-color=white color="white" v-model="userContact.firstName" label="Your Name" stack-label class="q-mb-xs font-size-responsive-sm" required
                      style="background-color: #121212;" input-style="color: white;" />
                      <q-input filled label-color=white color="white" v-model="userContact.email" label="Your Email" stack-label class="q-mb-xs" required
                      style="background-color: #121212;" input-style="color: white;" />
                      <q-input filled label-color=white color="white" v-model="message" label="Message" type="textarea" stack-label class="q-mb-xs" required
                      style="background-color: #121212;" input-style="color: white;"  />
                      <q-btn rounded type="submit" label="Send Message" class="q-px-lg q-py-sm custom-button font-size-responsive-md" style="background-color: #121212;" />
                    </q-form>
                  </div>
                </div>
              </q-card>
            </div>

            <!-- Follow Us Section -->
            <div  class="col-12 col-md-4">
              <q-card flat class="q-pa-md bg-transparent">
                <div class="font-size-responsive-xxl anton-regular">FOLLOW US</div>
                <br>
                <div class="row items-center q-gutter-md">
                  <div>
                    <q-btn flat round icon="mdi-instagram" style="border: 1px solid;" class="text-white q-pa-sm font-size-responsive-lg" @click="openInstagram" />
                  </div>
                  <div>
                    <div class="font-size-responsive-md" style="opacity: 1;">Follow us on Instagram</div>
                    <div class="font-size-responsive-md" style="opacity: 1;">For the newest arrivals</div>
                    <div class="font-size-responsive-md" style="opacity: 1;">Sunglasses and Eyewear Shop</div>
                  </div>
                </div>
              </q-card>
            </div>
          </div>

          <!-- bottom footer -->
          <div v-if="!isPaymentSuccessPage"   class="row justify-center">
            <q-separator class="q-my-md" style="background-color: #121212; width: 75%;"></q-separator>
          </div>
          <div class="row justify-center items-center font-size-responsive-sm q-pa-md">
            <q-avatar class="responsive-avatar-2">
              <img src="../assets/resources/logos/logo-white.png" alt="Logo"/>
            </q-avatar>
            Shaded Eyewear ™ | Est. 2023 | Sunglasses & Eyewear Shop
             <!-- | -->
            <!-- <span class="q-ml-xs">
              Developed by <a href="https://aqeel-dev-portfolio.web.app" target="_blank" style="text-decoration: none; color: inherit; font-weight: bold;" class="caveat font-size-responsive-md">Aqeel</a>
            </span> -->
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
import logoWhite from '../assets/resources/logos/logo-white.png'
import logoBlack from '../assets/resources/logos/logo-black.png'
import EmailService from 'src/services/EmailService'
import UniversalMenu from 'src/components/elements/UniversalMenu.vue'

export default {
  name: "MainLayout",

  computed: {
    isSpecificPage() {
      return this.$route.path.includes('/sunglasses/view/') ||
      this.$route.path.includes('/cart') ||
      this.$route.path.includes('/buy/review') ||
      this.$route.path.includes('/user/dashboard') ||
      this.$route.path.includes('/admin/dashboard')
    },
    showHeader() {
      const hiddenRoutes = [
        "/server-loading",
        "/auth/login",
        "/auth/register",
        "/cart",
        "/buy/review",
        '/payment-success',
        '/payment-cancel',
        '/payment-failure',
        '/verify-email',
        '/resend-verification',
        '/forgot-password',
        '/reset-password'
      ];
      return !hiddenRoutes.includes(this.$route.path);
    },
    profileItems() {
      const items = []
      if (this.isLoggedIn) {
        items.push(
          { label: 'Account Settings', to: '/user/dashboard' },
          { label: 'Logout', handler: () => this.logout() }
        )
      } else {
        items.push(
          { label: 'Login', to: '/auth/login' }
        )
      }
      return items
    },
    isPaymentSuccessPage() {
      return this.$route.path === '/payment-success';
    },
    pageContainerStyle() {
      return {
        transform: this.isPaymentSuccessPage ? 'translateY(0px)' : 'translateY(-75px)'
      };
    },
    headerHeight() {
      const baseHeight = 200
      return baseHeight
    },
  },

  components: {
    UniversalMenu
  },

  data() {
    return {
      // isLoading: false,
      menuOpen: false,
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
      logoWhite, logoBlack,
      logoSrc: logoWhite,

      // cookies
      cookieAccepted: false,

      // send message
      userContact: {
        firstName: '',
        email: ''
      }, message: '',
    }

  },
  mounted() {
    this.getCurrentOrder()
    this.checkLoginStatus()
    this.changeTextAutomatically()
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll(); // Ensure the correct header state on initial load
    if (localStorage.getItem('cookieAccepted') === 'true') {
      this.cookieAccepted = true
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    '$route'() {
      this.checkLoginStatus()
      this.handleScroll() // Ensure the correct header state on route change
      this.getCurrentOrder()
    },
    'userContact.firstName': function(newVal) {
      this.userContact.firstName = newVal.toLowerCase();
    }
  },
  methods: {
    acceptCookies() {
      this.cookieAccepted = true,
      localStorage.setItem('cookieAccepted', true)
    },
    handleScroll() {
      if (this.isSpecificPage) {
        this.headerClass = 'header-solid';
        this.colorShiftClass = 'transparent-black';
        this.logoSrc = logoBlack;
      } else if (window.scrollY > 50) {
        this.headerClass = 'header-transparent';
        // this.colorShiftClass = 'bg-light';
        // this.logoSrc = logoBlack;
      } else {
        this.headerClass = 'bg-dark-dynamic';
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
    async checkLoginStatus() {

      const isLoggedIn = await Helper.checkCookie()

      if (isLoggedIn) {
        const token = await Helper.getCookie('token')

        if (token) {
          try {
            // Check if the token is still valid and fetch user details
            const user = await UserService.FindUserByToken();
            const userDetails = await UserService.findUserById(user._id);

            // Compare tokens to detect if the user logged in from another browser
            if (token === userDetails.loginInfo.loginToken) {
              this.isLoggedIn = true;
              this.fetchUserDetails();
            } else {
              // If tokens do not match, handle logout
              this.isLoggedIn = false;
              this.handleLogout();
            }
          } catch (error) {
            console.error('Error checking login status:', error);
            this.isLoggedIn = false;
            this.handleLogout();
          }
        } else {
          this.isLoggedIn = false;
          this.handleLogout();
        }
      }
    },
    handleLogout() {
      Helper.removeCookie('token')
      this.cancelOrder();
    },
    async fetchUserDetails() {
      const response = await UserService.FindUserByToken()
      this.userDetails = response
    },
    async logout() {
      this.$q.dialog({
        title: 'Logout', message: `You are about to logout, continue?`, color: 'primary', cancel: true, persistent: true
      }).onOk(async () => {

        if (this.order._id) {
          this.cancelOrder()
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
      let orderId = localStorage.getItem('currentOrderId')
      if (!orderId) {
        if (this.userDetails._id) {
          const findAllOrders = await OrderService.findAllMyOrders(this.userDetails._id);
          for (const order of findAllOrders) {
              const detailedOrder = await OrderService.findOrderById(order._id);

              if (detailedOrder.status === 'pending') {
                orderId = detailedOrder._id;
                localStorage.setItem('currentOrderId', orderId)
                break;
              }
          }
        }
      }
      if (orderId) {
        const response = await OrderService.findOrderById(orderId)
        this.order = response
        if (this.order.status === 'paid') {
          localStorage.removeItem('currentOrderId')
        }
      }
      // else {
      //   console.log("No order has been placed")
      // }
      // console.log( "current orderId: ", this.order._id)
    },
    async openDash() {
      if (this.isLoggedIn == true) {
        this.$router.push('/user/dashboard')
      } else {
        this.$q.notify({ type: 'negative', message: 'Please login to continue.' })
      }
    },
    async cancelOrder() {
      localStorage.removeItem('currentOrderId')
    },
    openInstagram() {
      window.open('https://www.instagram.com/shadedeyewearza/', '_blank');
    },
    async submitContactForm() {
      try {
        const response = await EmailService.GetInContact(this.userContact, this.message)
        if (response) {
          this.$q.notify({ type: 'positive', color: 'primary', message: 'Message sent successfully!' });
          this.userContact.firstName = ''
          this.userContact.email = ''
          this.message = ''
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

<style lang="sass" scoped>
// .loading-overlay
//   display: flex
//   flex-direction: column
//   align-items: center
//   justify-content: center
//   height: 100vh
//   background-color: rgba(255, 255, 255, 0.9)
//   position: fixed
//   top: 0
//   left: 0
//   width: 100%
//   z-index: 9999


// .loading-overlay div
//   margin-top: 10px
//   font-size: 1.2em
//   color: #555

.mobile-nav-backdrop
  position: fixed
  inset: 0
  z-index: 999
  background: rgba(0, 0, 0, 0.5)

.mobile-nav-list
  position: fixed
  top: 75px
  left: 0
  right: 0
  width: 100vw
  z-index: 1000
  background-color: rgba(0, 0, 0, 0.8)
  backdrop-filter: blur(10px)
  padding: 0
  margin: 0

  .q-item
    padding: 16px 20px
    border-bottom: 1px solid rgba(255, 255, 255, 0.2)
    color: #ffffff

    &:last-child
      border-bottom: none

    // &:first-child
    //   border-top: 1px solid rgba(255, 255, 255, 0.2)

.text-subtitle1
  line-height: 1
.custom-label
  font-size: 0.1rem
  color: white

.cookie-consent-banner
  position: fixed
  bottom: 0
  left: 0
  right: 0
  z-index: 9999
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  transform: translateY(100%)
  animation: slideIn 0.5s ease-out forwards

@keyframes slideIn
  from
    transform: translateY(100%)
  to
    transform: translateY(0)
.text-carousel-toolbar
  background-color: #f5f5f5
  padding: 10px 0
.font-size-responsive-xl
  @media (min-width: 1320px)
    font-size: 1.25rem
  @media (min-width: 1320px)
    font-size: 1rem

.font-size-responsive-xs
  @media (min-width: 1320)
    font-size: 0.75rem

.responsive-avatar
  width: clamp(1.975rem, 5vw, 3.125rem) // 30px to 50px
  height: clamp(1.975rem, 5vw, 3.125rem) // 30px to 50px

.responsive-avatar-2
  width: clamp(1.2rem, 5vw, 3.125rem) // 30px to 50px
  height: clamp(1.2rem, 5vw, 3.125rem) // 30px to 50px

.custom-input
  background-color: #121212
  color: white !important

.custom-label
  color: white
  font-size: clamp(0.75rem, 2.5vw, 1.25rem)

.custom-textarea
  background-color: #121212
  color: white !important
  font-size: clamp(0.75rem, 2.5vw, 1.25rem)

</style>
