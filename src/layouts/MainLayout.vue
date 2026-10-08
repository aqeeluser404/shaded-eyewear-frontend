<template>
  <q-layout view="hHh lpR fff">
    <div class="noise-overlay"></div>

    <div v-if="!cookieAccepted" class="cookie-consent-banner">
      <div class="cookie-inner row items-center justify-between no-wrap">
        <div class="cookie-text font-size-responsive-sm">
          This website uses cookies to ensure you get the best experience.
        </div>
        <q-btn
          rounded
          no-caps
          flat
          label="Accept"
          color="white"
          class="custom-button q-py-sm font-size-responsive-sm"
          @click="acceptCookies"
          :ripple="false"
        />
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
        <div class="col-md-4 col-6 row items-center no-wrap">
          <q-avatar class="q-mr-sm responsive-avatar">
            <img :src="logoSrc" />
          </q-avatar>
          <router-link
            to="/"
            :class="colorShiftClass"
            class="text-remove-decoration font-size-responsive-md archivo brand-text"
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
              @click="scrollToSection('about-section')"
              class="custom-button q-py-sm font-size-responsive-sm"
              label="Services"
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
          <CartButton :count="cartItemCount" />

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
            <q-item clickable v-close-popup @click="menuOpen = false" to="/">
              <q-item-section class="font-size-responsive-md"
                >Services</q-item-section
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

            <q-separator v-if="isLoggedIn !== null" class="nav-divider" />

            <q-item
              v-for="item in profileItems"
              :key="item.label"
              clickable
              v-close-popup
              :to="item.to"
              @click="
                () => {
                  if (item.handler) item.handler();
                  menuOpen = false;
                }
              "
            >
              <q-item-section class="font-size-responsive-md">{{
                item.label
              }}</q-item-section>
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
    <q-footer class="bg-dark text-white footer-shell" v-if="showHeader">
      <div class="section-spacer-md"></div>

      <div class="constrain">
        <div
          class="row q-col-gutter-xl"
          :class="$q.screen.gt.md ? 'q-px-none' : 'q-px-md'"
        >
          <!-- ============================== SHORTCUT LINKS ============================== -->
          <div class="col-12 col-md-4">
            <div
              class="overline-tight text-dimmed text-caption q-mb-md q-mb-lg"
            >
              SHORTCUT LINKS
            </div>

            <div class="footer-link-list">
              <router-link to="/" class="footer-link">
                <span>Home</span>
                <q-icon
                  name="eva-arrow-forward-outline"
                  size="14px"
                  class="footer-link-arrow"
                />
              </router-link>

              <router-link to="/" class="footer-link">
                <span>Services</span>
                <q-icon
                  name="eva-arrow-forward-outline"
                  size="14px"
                  class="footer-link-arrow"
                />
              </router-link>

              <router-link to="/sunglasses" class="footer-link">
                <span>Catalogue</span>
                <q-icon
                  name="eva-arrow-forward-outline"
                  size="14px"
                  class="footer-link-arrow"
                />
              </router-link>

              <router-link to="/cart" class="footer-link">
                <span>Cart</span>
                <q-icon
                  name="eva-arrow-forward-outline"
                  size="14px"
                  class="footer-link-arrow"
                />
              </router-link>
            </div>
          </div>

          <!-- ============================== CONTACT FORM ============================== -->
          <div class="col-12 col-md-4">
            <div
              class="overline-tight text-dimmed text-caption q-mb-md q-mb-lg"
            >
              GET IN TOUCH
            </div>

            <q-form @submit="submitContactForm" class="q-gutter-sm">
              <q-input
                filled
                dark
                v-model="userContact.firstName"
                placeholder="Your name"
                class="custom-input"
                input-style="color: white;"
                :rules="[(val) => !!val || 'Required']"
                lazy-rules
              />

              <q-input
                filled
                dark
                v-model="userContact.email"
                placeholder="Your email"
                class="custom-input"
                input-style="color: white;"
                :rules="[(val) => !!val || 'Required']"
                lazy-rules
              />

              <q-input
                filled
                dark
                v-model="message"
                placeholder="Message"
                type="textarea"
                rows="4"
                class="custom-input"
                input-style="color: white;"
                :rules="[(val) => !!val || 'Required']"
                lazy-rules
              />
              <q-btn
                color="white"
                text-color="dark"
                rounded
                dense
                no-caps
                label="Send Message"
                class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold"
              />
            </q-form>
          </div>

          <!-- ============================== FOLLOW US ============================== -->
          <div class="col-12 col-md-4">
            <div
              class="overline-tight text-dimmed text-caption q-mb-md q-mb-lg"
            >
              FOLLOW US
            </div>

            <!-- Instagram card -->
            <div class="footer-social-card" @click="openInstagram">
              <q-icon
                name="mdi-instagram"
                color="primary"
                class="footer-social-icon font-size-responsive-xxl"
              />
              <div class="footer-social-content">
                <div class="footer-social-handle">@shadedeyewearza</div>
                <div
                  class="footer-social-caption font-size-responsive-xs text-dimmed"
                >
                  New arrivals, drops and fit guides
                </div>
              </div>
              <q-icon
                name="eva-arrow-forward-outline"
                size="16px"
                class="footer-social-arrow"
              />
            </div>

            <!-- Address -->
            <div class="footer-address">
              <div class="footer-address-line footer-address-hours">
                Open 08:00 – 17:00
              </div>
              <div class="footer-address-line">65 Stockley Road, Kenwyn</div>
              <div class="footer-address-line">Cape Town, 7779</div>
            </div>
          </div>
        </div>

        <div class="section-spacer-md"></div>

        <!-- ============================== BOTTOM BAR ============================== -->
        <div
          class="footer-bottom"
          :class="$q.screen.gt.md ? 'q-px-none' : 'q-px-md'"
        >
          <div class="section-spacer-xs"></div>
          <div class="row justify-between items-center">
            <div class="row items-center">
              <q-avatar class="footer-avatar q-mr-sm">
                <img
                  src="../assets/resources/logos/logo-white.png"
                  alt="Logo"
                />
              </q-avatar>
              <span class="font-size-responsive-xs text-dimmed">
                Shaded Eyewear ™ · Est. 2023 · Cape Town
              </span>
            </div>

            <div class="font-size-responsive-xs text-dimmed">
              Founded by Amaan Ebrahim · Built by
              <a
                href="https://aqeel-dev-portfolio.web.app"
                target="_blank"
                style="text-decoration: none; color: inherit"
              >
                Aqeel Hanslo
              </a>
            </div>
          </div>
          <div class="section-spacer-xs"></div>
        </div>
      </div>
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
import CartButton from "src/components/elements/CartButton.vue";

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
    cartItemCount() {
      // Order comes from localStorage + getCurrentOrder()
      // If the order is loaded and pending, count its items
      if (!this.order || !this.order.sunglasses) return 0;
      return this.order.sunglasses.reduce(
        (sum, s) => sum + (s.quantity || 1),
        0
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

  components: { UniversalMenu, CartButton },

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
    scrollToSection(sectionId) {
      if (this.$route.path !== "/") {
        this.$router.push("/").then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.performScroll(sectionId);
            }, 300);
          });
        });
      } else {
        this.performScroll(sectionId);
      }
    },
    performScroll(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = window.innerHeight * 0.1;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
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

.cookie-consent-banner
  position: fixed
  bottom: 0
  left: 0
  right: 0
  z-index: 9999
  width: 100%
  transform: translateY(100%)
  animation: slideIn 0.5s ease-out forwards

.cookie-inner
  background-color: #000000
  color: #ffffff
  padding: 20px 32px
  gap: 24px
  max-width: 650px
  margin: 0 auto
  border-radius: 12px 12px 0 0

.cookie-text
  flex: 1
  min-width: 0

.cookie-btn
  flex-shrink: 0
  padding: 6px 20px

@keyframes slideIn
  from
    transform: translateY(100%)
  to
    transform: translateY(0)

.text-carousel-toolbar
  background-color: #f5f5f5
  padding: 10px 0

.responsive-avatar
  width: clamp(2.5rem, 5vw, 3.125rem)
  height: clamp(2.5rem, 5vw, 3.125rem)

.responsive-avatar-2
  width: clamp(1.2rem, 5vw, 3.125rem)
  height: clamp(1.2rem, 5vw, 3.125rem)

.brand-text
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  min-width: 0

.footer-shell
  border-top: 1px solid rgba(255, 255, 255, 0.1)

.footer-link-list
  display: flex
  flex-direction: column

.footer-link
  display: flex
  align-items: center
  justify-content: space-between
  padding: 14px 0
  border-bottom: 1px solid rgba(255, 255, 255, 0.08)
  color: #f0f0f0
  text-decoration: none
  font-size: 0.95rem
  font-weight: 500
  letter-spacing: 0.02em
  transition: color 0.2s ease, padding-left 0.2s ease

  &:last-child
    border-bottom: none

  &:hover
    color: var(--q-primary)
    padding-left: 4px

    .footer-link-arrow
      transform: translateX(4px)
      opacity: 1

.footer-link-arrow
  opacity: 0
  transition: transform 0.2s ease, opacity 0.2s ease

.footer-social-card
  display: flex
  align-items: center
  gap: 16px
  padding: 16px
  border: 1px solid rgba(255, 255, 255, 0.1)
  border-radius: 12px
  cursor: pointer
  transition: border-color 0.2s ease, background-color 0.2s ease

  &:hover
    border-color: rgba(255, 255, 255, 0.25)
    background-color: rgba(255, 255, 255, 0.03)

    .footer-social-arrow
      transform: translateX(4px)
      opacity: 1

.footer-social-icon
  flex-shrink: 0

.footer-social-content
  flex: 1
  min-width: 0

// .footer-social-handle
//   font-family: 'Archivo Black', sans-serif
//   font-size: 0.85rem
//   color: #f0f0f0
//   letter-spacing: 0.02em
//   white-space: nowrap
//   overflow: hidden
//   text-overflow: ellipsis

// .footer-social-caption
//   font-size: 0.75rem
//   color: #9b9b9b
//   margin-top: 2px

.footer-social-arrow
  flex-shrink: 0
  opacity: 0
  transition: transform 0.2s ease, opacity 0.2s ease

.footer-address
  margin-top: 20px

.footer-address-line
  font-size: 0.85rem
  color: #9b9b9b
  line-height: 1.6

.footer-address-hours
  color: #f0f0f0
  font-weight: 500
  margin-top: 8px

.footer-bottom
  border-top: 1px solid rgba(255, 255, 255, 0.08)
</style>
