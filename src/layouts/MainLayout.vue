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
              label="About"
              :ripple="false"
              no-caps
              flat
              rounded
            />
            <q-btn
              @click="scrollToSection('service-section')"
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
            :items="profileItems"
            :loading="isLoggedIn === null"
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
              @click="
                () => {
                  menuOpen = false;
                  scrollToSection('about-section');
                }
              "
            >
              <q-item-section class="font-size-responsive-md">
                About
              </q-item-section>
            </q-item>
            <q-item
              clickable
              @click="
                () => {
                  menuOpen = false;
                  scrollToSection('service-section');
                }
              "
            >
              <q-item-section class="font-size-responsive-md">
                Services
              </q-item-section>
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

            <q-separator class="nav-divider" />

            <template v-if="isLoggedIn === null">
              <q-item v-for="n in 2" :key="'nav-skel-' + n">
                <q-item-section>
                  <div
                    class="skeleton-line"
                    :class="n === 1 ? 'skeleton-line--md' : 'skeleton-line--sm'"
                  ></div>
                </q-item-section>
              </q-item>
            </template>

            <template v-else>
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
            </template>
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
            <div class="overline-tight text-dimmed text-caption q-mb-lg">
              SHORTCUT LINKS
            </div>

            <div class="footer-link-list">
              <router-link to="/" class="footer-link font-size-responsive-sm">
                <span>Home</span>
                <q-icon
                  name="eva-arrow-forward-outline"
                  size="14px"
                  class="footer-link-arrow"
                />
              </router-link>

              <!-- About Link -->
              <a
                @click="scrollToSection('about-section')"
                class="footer-link font-size-responsive-sm cursor-pointer"
              >
                <span>About</span>
                <q-icon
                  name="eva-arrow-forward-outline"
                  size="14px"
                  class="footer-link-arrow"
                />
              </a>

              <!-- Services Link -->
              <a
                @click="scrollToSection('service-section')"
                class="footer-link font-size-responsive-sm cursor-pointer"
              >
                <span>Services</span>
                <q-icon
                  name="eva-arrow-forward-outline"
                  size="14px"
                  class="footer-link-arrow"
                />
              </a>

              <router-link
                to="/sunglasses"
                class="footer-link font-size-responsive-sm"
              >
                <span>Catalogue</span>
                <q-icon
                  name="eva-arrow-forward-outline"
                  size="14px"
                  class="footer-link-arrow"
                />
              </router-link>

              <router-link
                to="/cart"
                class="footer-link font-size-responsive-sm"
              >
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
            <div class="overline-tight text-dimmed text-caption q-mb-lg">
              GET IN TOUCH
            </div>

            <q-form
              ref="contactForm"
              @submit.prevent="submitContactForm"
              class="q-gutter-sm"
            >
              <q-input
                filled
                dark
                v-model="userContact.firstName"
                placeholder="Your name"
                class="custom-input"
                input-style="color: white;"
              />

              <q-input
                filled
                dark
                v-model="userContact.email"
                placeholder="Your email"
                class="custom-input"
                input-style="color: white;"
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
              />

              <q-btn
                type="submit"
                color="white"
                text-color="dark"
                rounded
                dense
                no-caps
                label="Send Message"
                class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold q-mt-md"
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
            <div class="footer-card footer-card--link" @click="openInstagram">
              <div class="footer-icon">
                <q-icon name="mdi-instagram" size="22px" />
              </div>
              <div class="col">
                <div
                  class="font-size-responsive-sm archivo text-light text-bold"
                >
                  @shadedeyewearza
                </div>
                <div class="font-size-responsive-xs text-dimmed">
                  New arrivals, drops and fit guides
                </div>
              </div>
              <q-icon
                name="eva-arrow-forward-outline"
                size="16px"
                class="footer-card-arrow"
              />
            </div>

            <!-- Address card -->
            <div class="footer-card q-mt-md">
              <div class="footer-icon">
                <q-icon name="fa-solid fa-location-dot" size="18px" />
              </div>
              <div class="col">
                <div class="font-size-responsive-sm text-light text-bold">
                  Open 08:00 – 17:00
                </div>
                <div class="font-size-responsive-xs text-dimmed">
                  65 Stockley Road, Kenwyn
                </div>
                <div class="font-size-responsive-xs text-dimmed">
                  Cape Town, 7779
                </div>
              </div>
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
          <div class="row justify-between items-center q-col-gutter-y-sm">
            <!-- Left Side: Logo + Brand -->
            <div
              class="col-12 col-md-auto row items-center justify-center justify-md-start"
            >
              <q-avatar class="footer-avatar q-mr-sm">
                <img src="../assets/brand/logo-white.png" alt="Logo" />
              </q-avatar>

              <span
                class="text-caption text-dimmed"
                style="line-height: 1; margin-top: 2px"
              >
                Shaded Eyewear ™ · Est. 2023 · Cape Town
              </span>
            </div>

            <!-- Right Side: Credits -->
            <div
              class="col-12 col-md-auto text-center text-md-right text-caption text-dimmed"
            >
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
import logoWhite from "../assets/brand/logo-white.png";
import logoBlack from "../assets/brand/logo-black.png";
import EmailService from "src/services/EmailService";
import UniversalMenu from "src/components/elements/UniversalMenu.vue";
import CartButton from "src/components/elements/CartButton.vue";
import { UiAlerts } from "src/services/UiAlerts";

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
          await this.fetchUserDetails();
          this.isLoggedIn = true;
          await this.getCurrentOrder();
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
      UiAlerts.confirm(
        "Are you logging out?",
        "You can always log back in at any time. If you just want to switch accounts, you can do so on the login screen.",
        "Log out",
        "primary",
        "eva-log-out-outline"
      ).onOk(async () => {
        if (this.order._id) {
          this.cancelOrder();
        }
        const response = await UserService.logout(this.userDetails._id);
        if (response) {
          UiAlerts.success("You have successfully logged out.");
          this.isLoggedIn = false;
          setTimeout(() => {
            this.$router.push("/");
            window.location.reload();
          }, 2000);
        } else {
          UiAlerts.error("Logout failed. Please try again.");
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
        UiAlerts.error("Please login to continue.");
      }
    },
    async cancelOrder() {
      localStorage.removeItem("currentOrderId");
    },
    openInstagram() {
      window.open("https://www.instagram.com/shadedeyewearza/", "_blank");
    },
    async submitContactForm() {
      const isValid = await this.$refs.contactForm.validate();

      if (!isValid) {
        UiAlerts.error("Please fill in all required fields.");
        return;
      }

      try {
        const response = await EmailService.GetInContact(
          this.userContact,
          this.message
        );

        if (response) {
          UiAlerts.success("Message sent successfully!");

          setTimeout(() => {
            this.userContact.firstName = "";
            this.userContact.email = "";
            this.message = "";
            this.$refs.contactForm.resetValidation();
          }, 500);
        } else {
          UiAlerts.error("Error sending message.");
        }
      } catch (error) {
        UiAlerts.error("Error sending message.");
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

.footer-card
  display: flex
  align-items: center
  gap: 16px
  padding: 20px
  background-color: rgba(255, 255, 255, 0.03)
  border: 1px solid rgba(255, 255, 255, 0.1)
  border-radius: 16px
  transition: border-color 0.3s ease, transform 0.3s ease, background-color 0.3s ease

.footer-card--link
  cursor: pointer

  &:hover
    border-color: color-mix(in srgb, var(--q-primary) 60%, transparent)
    background-color: rgba(255, 255, 255, 0.05)
    transform: translateY(-4px)

    .footer-card-arrow
      transform: translateX(4px)
      opacity: 1

.footer-icon
  flex-shrink: 0
  width: 44px
  height: 44px
  display: flex
  align-items: center
  justify-content: center
  border-radius: 50%
  border: 1px solid rgba(255, 255, 255, 0.12)
  color: var(--q-primary)

.footer-card-arrow
  flex-shrink: 0
  opacity: 0
  transition: transform 0.2s ease, opacity 0.2s ease

.footer-bottom
  border-top: 1px solid rgba(255, 255, 255, 0.08)

</style>
