<template>
  <q-layout view="hHh lpR fff">
    <div class="noise-overlay"></div>

    <div v-if="!cookieAccepted" class="cookie-consent-banner">
      <div class="q-pa-lg bg-black text-white q-mb-sm">
        <span class="font-size-responsive-xs"
          >This website uses cookies to ensure you get the best
          experience.</span
        >
        <q-btn
          rounded
          dense
          @click="acceptCookies"
          label="Accept"
          color="white"
          class="q-px-md q-py-sm q-ml-lg font-size-responsive-xs"
          flat
        ></q-btn>
      </div>
    </div>

    <!----------------------------------------------------------- HEADER SECTION -------------------------------------------------->
    <q-header
      v-if="showHeader"
      :class="[headerClass, colorShiftClass]"
      :style="{ height: '75px' }"
      class="row items-center"
      style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
    >
      <q-toolbar
        class="row items-center q-px-none constrain"
        :class="$q.screen.gt.md ? 'q-px-none' : 'q-px-sm'"
      >
        <!-- ============================== LEFT: logo + brand ============================== -->
        <div class="col-md-4 col-6 row items-center">
          <q-avatar class="q-mr-sm responsive-avatar">
            <img :src="logoSrc" />
          </q-avatar>
          <router-link
            to="/"
            :class="colorShiftClass"
            class="text-remove-decoration font-size-responsive-md archivo"
          >
            SHADED EYEWEAR
          </router-link>
        </div>

        <!-- ============================== MIDDLE: desktop nav ============================== -->
        <div class="col-md-4 row items-center justify-center large-screen-only">
          <div class="row items-center justify-center">
            <q-btn
              to="/"
              class="custom-button q-py-sm font-size-responsive-sm"
              label="Home"
              :ripple="false"
              no-caps
              flat
              rounded
            />
            <q-btn
              to=""
              class="custom-button q-py-sm font-size-responsive-sm"
              label="About"
              :ripple="false"
              no-caps
              flat
              rounded
            />
            <q-btn
              to="/sunglasses"
              class="custom-button q-py-sm font-size-responsive-sm"
              label="Catalogue"
              :ripple="false"
              no-caps
              flat
              rounded
            />
          </div>
        </div>

        <!-- ============================== RIGHT: cart + profile ============================== -->
        <div class="col-md-4 col-6 row items-center justify-end">
          <q-btn
            to="/cart"
            icon="eva-shopping-bag-outline"
            class="custom-button q-py-sm text-body2"
            :ripple="false"
            no-caps
            flat
            rounded
          />

          <UniversalMenu
            v-if="isLoggedIn !== null"
            :items="profileItems"
            :hover="false"
            class="large-screen-only"
            :offset="[0, 19]"
          >
            <template #trigger>
              <q-btn
                class="custom-button q-py-sm text-caption"
                icon="fa-regular fa-circle-user"
                :ripple="false"
                no-caps
                flat
                rounded
              />
            </template>
          </UniversalMenu>

          <!-- mobile burger -->
          <q-btn
            flat
            class="small-screen-only"
            :icon="menuOpen ? 'eva-close-outline' : 'eva-menu-outline'"
            @click="menuOpen = !menuOpen"
          />
        </div>

        <!-- ============================== MOBILE MENU ============================== -->
        <Teleport to="body">
          <div
            v-show="menuOpen"
            class="mobile-nav-backdrop"
            @click="menuOpen = false"
          ></div>

          <q-list v-show="menuOpen" class="mobile-nav-list">
            <q-item clickable v-close-popup @click="menuOpen = false" to="/">
              <q-item-section class="font-size-responsive-md"
                >Home</q-item-section
              >
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="menuOpen = false"
              to="/sunglasses"
            >
              <q-item-section class="font-size-responsive-md"
                >About</q-item-section
              >
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="menuOpen = false"
              to="/sunglasses"
            >
              <q-item-section class="font-size-responsive-md"
                >Catalogue</q-item-section
              >
            </q-item>
          </q-list>
        </Teleport>
      </q-toolbar>
    </q-header>

    <!----------------------------------------------------------- PAGES SECTION -------------------------------------------------->
    <div class="bg-dark">
      <q-page-container :style="pageContainerStyle">
        <router-view />
      </q-page-container>
    </div>

    <!----------------------------------------------------------- FOOTER SECTION -------------------------------------------------->
    <q-footer
      class="bg-dark text-white"
      v-if="showHeader"
      style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
    >
      <div class="section-spacer-md"></div>
      <q-toolbar class="q-pa-none">
        <q-toolbar-title>
          <div class="row justify-center items-start constrain">
            <!-- Developed By Section -->
            <div
              class="col-12 col-md-4 items-center"
              :class="$q.screen.gt.md ? 'q-px-none' : 'q-px-md'"
            >
              <q-card flat class="bg-transparent q-mr-none q-mr-md-xl q-mb-xl">
                <div class="overline text-dimmed text-caption">
                  SHORTCUT LINKS
                </div>
                <div class="section-spacer-sm"></div>
                <div class="font-size-responsive-md">
                  <div
                    class="bg-transparent q-py-sm"
                    style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                  >
                    <router-link
                      to="/"
                      class="text-remove-decoration font-size-responsive-md archivo text-light"
                      >HOME</router-link
                    >
                  </div>
                  <div
                    class="bg-transparent q-py-sm"
                    style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                  >
                    <router-link
                      to="/"
                      class="text-remove-decoration font-size-responsive-md archivo text-light"
                      >ABOUT</router-link
                    >
                  </div>
                  <div
                    class="bg-transparent q-py-sm"
                    style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                  >
                    <router-link
                      to="/"
                      class="text-remove-decoration font-size-responsive-md archivo text-light"
                      >CATALOGUE</router-link
                    >
                  </div>
                  <div
                    class="bg-transparent q-py-sm"
                    style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                  >
                    <router-link
                      to="/"
                      class="text-remove-decoration font-size-responsive-md archivo text-light"
                      >CART</router-link
                    >
                  </div>
                </div>
              </q-card>
            </div>

            <!-- Contact Section -->
            <div
              class="col-12 col-md-4"
              :class="$q.screen.gt.md ? 'q-px-none' : 'q-px-md'"
            >
              <q-card flat class="bg-transparent q-mr-none q-mr-md-xl q-mb-xl">
                <div class="overline text-dimmed text-caption">
                  SHORTCUT LINKS
                </div>
                <div class="section-spacer-sm"></div>
                <div>
                  <div class="font-size-responsive-sm">
                    <q-form @submit="submitContactForm">
                      <q-input
                        filled
                        label-color="white"
                        color="white"
                        v-model="userContact.firstName"
                        placeholder="Your name"
                        stack-label
                        class="q-mb-sm font-size-responsive-sm"
                        required
                        style="background-color: #121212"
                        input-style="color: white;"
                      />
                      <q-input
                        filled
                        label-color="white"
                        color="white"
                        v-model="userContact.email"
                        placeholder="Your email"
                        stack-label
                        class="q-mb-sm font-size-responsive-sm"
                        required
                        style="background-color: #121212"
                        input-style="color: white;"
                      />
                      <q-input
                        filled
                        label-color="white"
                        color="white"
                        v-model="message"
                        placeholder="Message"
                        type="textarea"
                        stack-label
                        class="font-size-responsive-sm"
                        required
                        style="background-color: #121212"
                        input-style="color: white;"
                      />
                      <div class="section-spacer-xs"></div>
                      <q-btn
                        dense
                        type="submit"
                        label="Send Message"
                        no-caps
                        text-color="dark"
                        class="btn-gradient-primary q-px-xl q-py-md q-mr-lg text-subtitle1 rounded-button text-bold"
                      />
                    </q-form>
                  </div>
                </div>
              </q-card>
            </div>

            <!-- Follow Us Section -->
            <div
              class="col-12 col-md-4"
              :class="$q.screen.gt.md ? 'q-px-none' : 'q-px-md'"
            >
              <q-card flat class="bg-transparent q-mr-none q-mr-md-xl">
                <div class="overline text-dimmed text-caption">FOLLOW US</div>
                <div class="section-spacer-sm"></div>

                <div
                  class="row items-center justify-center mouse-cursor q-pa-md"
                  style="border: 1px solid rgba(255, 255, 255, 0.2)"
                  @click="openInstagram"
                >
                  <div class="col-md-2 row justify-start q-mr-sm">
                    <q-icon name="mdi-instagram" color="primary" size="36px" />
                    <!-- <q-btn  round icon="mdi-instagram" class="text-white font-size-responsive-lg"  /> -->
                  </div>
                  <div class="col-md-9">
                    <p
                      class="font-size-responsive-md archivo"
                      style="opacity: 1"
                    >
                      <span class="hind font-size-responsive-lg">@</span
                      >shadedeyewearza
                    </p>
                    <div
                      class="text-subtitle1 text-dimmed q-mt-sm"
                      style="opacity: 1"
                    >
                      New arrivals, drop and fit guides
                    </div>
                  </div>
                </div>

                <div class="section-spacer-sm"></div>
                <div class="text-subtitle1 text-dimmed q-mb-sm">
                  65 Stockley Road, Kenwyn,
                </div>
                <div class="text-subtitle1 text-dimmed q-mb-sm">
                  Cape Town, 7779
                </div>
                <div class="text-subtitle1 text-dimmed">Open 08:00 – 17:00</div>
              </q-card>
            </div>
          </div>

          <div class="section-spacer-sm large-screen-only"></div>
          <div class="section-spacer-md small-screen-only"></div>

          <section
            class="bg-dark q-py-md"
            style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div
              class="constrain row justify-between items-center q-px-md q-md-px-0"
            >
              <div class="col-md-6 col-12 row items-center">
                <q-avatar class="footer-avatar q-mr-xs">
                  <img
                    src="../assets/resources/logos/logo-white.png"
                    alt="Logo"
                  />
                </q-avatar>
                <span class="text-caption text-dimmed"
                  >Shaded Eyewear ™ · Est. 2023 · Cape Town</span
                >
              </div>

              <div class="col-md-6 col-12 text-caption text-dimmed">
                Founded by Amaan Ebrahim · Built by
                <a
                  href="https://aqeel-dev-portfolio.web.app"
                  target="_blank"
                  style="text-decoration: none; color: inherit"
                  >Aqeel Hanslo</a
                >
              </div>
            </div>
          </section>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import OrderService from "src/services/OrderService";
import UserService from "src/services/UserService";
import Helper from "src/services/utils";
import logoWhite from "../assets/resources/logos/logo-white.png";
import logoBlack from "../assets/resources/logos/logo-black.png";
import EmailService from "src/services/EmailService";
import UniversalMenu from "src/components/elements/UniversalMenu.vue";

export default {
  name: "MainLayout",

  computed: {
    isSpecificPage() {
      return (
        this.$route.path.includes("/sunglasses/view/") ||
        this.$route.path.includes("/cart") ||
        this.$route.path.includes("/buy/review") ||
        this.$route.path.includes("/user/dashboard") ||
        this.$route.path.includes("/admin/dashboard")
      );
    },
    showHeader() {
      const hiddenRoutes = [
        "/server-loading",
        "/auth/login",
        "/auth/register",
        // "/cart",
        // "/buy/review",
        "/payment-success",
        "/payment-cancel",
        "/payment-failure",
        "/verify-email",
        "/resend-verification",
        "/forgot-password",
        "/reset-password",
      ];
      return !hiddenRoutes.includes(this.$route.path);
    },
    profileItems() {
      const items = [];
      if (
        this.userDetails &&
        this.userDetails.userType != null &&
        this.userDetails.userType === "admin"
      ) {
        items.push({ label: "Admin Panel", to: "/admin/dashboard" });
      }
      if (this.isLoggedIn) {
        items.push(
          { label: "Account Settings", to: "/user/dashboard" },
          { label: "Logout", handler: () => this.logout() }
        );
      } else {
        items.push({ label: "Login", to: "/auth/login" });
      }
      return items;
    },

    pageContainerStyle() {
      return {
        marginTop: this.$route.path === "/" ? "-75px" : "0px",
      };
    },
  },

  components: { UniversalMenu },

  data() {
    return {
      // isLoading: false,
      menuOpen: false,
      texts: [
        "Sunglasses and Eyewear Shop",
        "Discover our latest collections",
        "Follow us on Instagram for the newest arrivals",
        "Established in 2023",
      ],
      currentIndex: 0,
      order: {},
      userDetails: {
        _id: "",
        username: "",
        userType: "",
      },
      isLoggedIn: null,
      burgerMenuShown: false,

      // css stuff
      headerClass: "header-transparent",
      colorShiftClass: "transparent-white",
      logoWhite,
      logoBlack,
      logoSrc: logoWhite,

      // cookies
      cookieAccepted: !!localStorage.getItem("cookieAccepted"),

      // send message
      userContact: {
        firstName: "",
        email: "",
      },
      message: "",
    };
  },
  async mounted() {
    await this.checkLoginStatus();
    this.changeTextAutomatically();
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    async $route() {
      await this.checkLoginStatus();
      this.handleScroll();
    },
    "userDetails._id"(newId) {
      if (newId) this.getCurrentOrder();
    },
    "userContact.firstName": function (newVal) {
      this.userContact.firstName = newVal.toLowerCase();
    },
  },
  methods: {
    acceptCookies() {
      this.cookieAccepted = true;
      localStorage.setItem("cookieAccepted", "true");
    },
    handleScroll() {
      if (window.scrollY > 50) {
        this.headerClass = "header-transparent";
      } else {
        this.headerClass = "bg-dark-dynamic";
        this.colorShiftClass = "transparent-white";
        this.logoSrc = logoWhite;
      }

      // if (this.isSpecificPage) {
      //   this.headerClass = "bg-dark-dynamic";
      //   this.colorShiftClass = "transparent-white";

      //   // this.headerClass = "header-solid";
      //   // this.colorShiftClass = "transparent-black";
      //   // this.logoSrc = logoBlack;
      //   this.logoSrc = logoWhite;
      // } else if (window.scrollY > 50) {
      //   this.headerClass = "header-transparent";
      //   // this.colorShiftClass = 'bg-light';
      //   // this.logoSrc = logoBlack;
      // } else {

      // }
    },
    prevText() {
      this.currentIndex =
        (this.currentIndex - 1 + this.texts.length) % this.texts.length;
    },
    nextText() {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
    },
    changeTextAutomatically() {
      setInterval(() => {
        this.nextText();
      }, 10000);
    },
    // async checkLoginStatus() {
    //   const isLoggedIn = await Helper.checkCookie();

    //   if (isLoggedIn) {
    //     const token = await Helper.getCookie("token");

    //     if (token) {
    //       try {
    //         // Check if the token is still valid and fetch user details
    //         const user = await UserService.FindUserByToken();
    //         const userDetails = await UserService.findUserById(user._id);

    //         // Compare tokens to detect if the user logged in from another browser
    //         if (token === userDetails.loginInfo.loginToken) {
    //           this.isLoggedIn = true;
    //           this.fetchUserDetails();
    //         } else {
    //           // If tokens do not match, handle logout
    //           this.isLoggedIn = false;
    //           this.handleLogout();
    //         }
    //       } catch (error) {
    //         console.error("Error checking login status:", error);
    //         this.isLoggedIn = false;
    //         this.handleLogout();
    //       }
    //     } else {
    //       this.isLoggedIn = false;
    //       this.handleLogout();
    //     }
    //   }
    // },

    async checkLoginStatus() {
      const isLoggedIn = await Helper.checkCookie();

      if (!isLoggedIn) {
        this.isLoggedIn = false;
        this.handleLogout();
        return;
      }

      const token = await Helper.getCookie("token");

      if (!token) {
        this.isLoggedIn = false;
        this.handleLogout();
        return;
      }

      try {
        const user = await UserService.FindUserByToken();
        const userDetails = await UserService.findUserById(user._id);

        if (token === userDetails.loginInfo.loginToken) {
          await this.fetchUserDetails(); // wait for userDetails to actually populate
          this.isLoggedIn = true;
          await this.getCurrentOrder(); // only now try to resolve the cart order
        } else {
          this.isLoggedIn = false;
          this.handleLogout();
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        this.isLoggedIn = false;
        this.handleLogout();
      }
    },
    handleLogout() {
      Helper.removeCookie("token");
      this.cancelOrder();
    },
    async fetchUserDetails() {
      const response = await UserService.FindUserByToken();
      this.userDetails = response;
    },
    async logout() {
      this.$q
        .dialog({
          title: "Logout",
          message: `You are about to logout, continue?`,
          color: "primary",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          if (this.order._id) {
            this.cancelOrder();
          }
          const response = await UserService.logout(this.userDetails._id);
          if (response) {
            this.$q.notify({
              type: "positive",
              color: "primary",
              message: "You have successfully logged out!",
            });
            this.$router.push("/");
            this.isLoggedIn = false;
            window.location.reload();
          } else {
            this.$q.notify({
              type: "negative",
              message: "Logout failed. Please try again.",
            });
          }
        });
    },
    async getCurrentOrder() {
      let orderId = localStorage.getItem("currentOrderId");
      if (!orderId) {
        if (this.userDetails._id) {
          const findAllOrders = await OrderService.findAllMyOrders(
            this.userDetails._id
          );
          for (const order of findAllOrders) {
            const detailedOrder = await OrderService.findOrderById(order._id);

            if (detailedOrder.status === "pending") {
              orderId = detailedOrder._id;
              localStorage.setItem("currentOrderId", orderId);
              break;
            }
          }
        }
      }
      if (orderId) {
        const response = await OrderService.findOrderById(orderId);
        this.order = response;
        if (this.order.status === "paid") {
          localStorage.removeItem("currentOrderId");
        }
      }
      // else {
      //   console.log("No order has been placed")
      // }
      // console.log( "current orderId: ", this.order._id)
    },
    async openDash() {
      if (this.isLoggedIn == true) {
        this.$router.push("/user/dashboard");
      } else {
        this.$q.notify({
          type: "negative",
          message: "Please login to continue.",
        });
      }
    },
    async cancelOrder() {
      localStorage.removeItem("currentOrderId");
    },
    openInstagram() {
      window.open("https://www.instagram.com/shadedeyewearza/", "_blank");
    },
    async submitContactForm() {
      try {
        const response = await EmailService.GetInContact(
          this.userContact,
          this.message
        );
        if (response) {
          this.$q.notify({
            type: "positive",
            color: "primary",
            message: "Message sent successfully!",
          });
          this.userContact.firstName = "";
          this.userContact.email = "";
          this.message = "";
        } else {
          this.$q.notify({
            type: "negative",
            message: "Error sending message.",
          });
        }
      } catch (error) {
        this.$q.notify({ type: "negative", message: "Error sending message." });
      }
    },
  },
};
</script>

<style lang="sass" scoped>

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

.no-border
  border-top: none !important
  box-shadow: none !important
</style>
