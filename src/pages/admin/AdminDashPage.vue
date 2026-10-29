<template>
  <q-page>
    <section class="bg-dark q-px-md text-light q-md-px-0">
      <div class="section-spacer-sm"></div>
      <div class="constrain">
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)">
          <div class="row justify-between items-center">
            <div
              class="font-size-responsive-giant archivo col-md-8 col-12"
              :class="$q.screen.gt.sm ? 'q-mb-none' : 'q-mb-md'"
            >
              Command Center
            </div>

            <div class="col-12 col-md-auto">
              <q-btn
                rounded
                no-caps
                outline
                label="Back to site"
                color="grey"
                text-color="grey"
                to="/"
                class="q-px-lg q-py-sm text-subtitle1 rounded-button text-bold full-width"
              />
            </div>
          </div>
          <div class="section-spacer-xs"></div>
        </div>

        <div class="section-spacer-xs"></div>

        <div class="row justify-start full-width admin-shell-row">
          <!-------------------------------------------------------- SIDEBAR -------------------------------------------------------->
          <div
            class="bg-transparent sidebar-collapsible"
            :class="[
              $q.screen.gt.sm ? 'q-pr-md' : 'q-pr-none',
              { 'is-expanded': sidebarOpen },
            ]"
          >
            <div class="sidebar-menu-list">
              <!-- ALL TABS NOW USE THE SAME HANDLER -->
              <q-item
                clickable
                class="menu-item"
                :class="{ 'menu-item--active': currentPageComponent === 'OverviewComponent' }"
                @click="handleTabClick('Overview', 'OverviewComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-grid-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label">Overview</q-item-section>
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{ 'menu-item--active': currentPageComponent === 'UserComponent' }"
                @click="handleTabClick('Customers', 'UserComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-people-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label">Customers</q-item-section>
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{ 'menu-item--active': currentPageComponent === 'SunglassesComponent' }"
                @click="handleTabClick('Inventory', 'SunglassesComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-glasses" size="16px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label">Inventory</q-item-section>
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{ 'menu-item--active': currentPageComponent === 'OrdersComponent' }"
                @click="handleTabClick('Orders', 'OrdersComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-clipboard-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label">Orders</q-item-section>
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{ 'menu-item--active': currentPageComponent === 'ReturnsComponent' }"
                @click="handleTabClick('Return', 'ReturnsComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-calendar-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label">Returns</q-item-section>
              </q-item>
              <div class="section-spacer-sm"></div>
            </div>

            <div class="section-spacer-xs"></div>
            <div class="sidebar-user-block menu-label">
              <div class="overline-tight text-dimmed text-caption q-mb-sm">
                SIGNED IN AS
              </div>
              <div class="text-subtitle1 text-light text-bold">
                {{ userDetails.firstName }} {{ userDetails.lastName }}
              </div>
              <div class="text-caption text-light text-dimmed">
                {{ capitalizeFirstLetter(userDetails.userType) }} Account Type
              </div>
            </div>
          </div>

          <!-------------------------------------------------------- COMPONENT PANEL -------------------------------------------------------->
          <div class="admin-content-panel">
            <component :is="currentPageComponent"></component>
          </div>
        </div>
      </div>
      <div class="section-spacer-md"></div>
    </section>
  </q-page>
</template>

<script>
import UserService from "src/services/UserService";
import UserComponent from "../../components/admin/UserComponent.vue";
import SunglassesComponent from "../../components/admin/SunglassesComponent.vue";
import OrdersComponent from "../../components/admin/OrdersComponent.vue";
import ReturnsComponent from "../../components/admin/ReturnsComponent.vue";
import OverviewComponent from "src/components/admin/OverviewComponent.vue";
import Helper from "../../services/utils.js";

export default {
  name: "AdminDashPage",

  components: {
    UserComponent,
    SunglassesComponent,
    OrdersComponent,
    ReturnsComponent,
    OverviewComponent,
  },

  data() {
    return {
      currentUser: { _id: "" },
      userDetails: {},
      currentPageTitle: "Overview",
      currentPageComponent: "OverviewComponent",
      sidebarOpen: false,
    };
  },

  methods: {
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,

    // Unified handler for all tabs
    handleTabClick(title, component) {
      // 1. If we are clicking a DIFFERENT tab, switch the page and OPEN the sidebar
      if (this.currentPageComponent !== component) {
        this.currentPageTitle = title;
        this.currentPageComponent = component;
        this.sidebarOpen = true;
      }
      // 2. If we click the tab we are ALREADY on, just toggle the sidebar open/closed
      else {
        this.sidebarOpen = !this.sidebarOpen;
      }
    },

    async fetchUserDetails() {
      const userId = await UserService.FindUserByToken();
      this.currentUser = userId;

      const user = await UserService.findUserById(this.currentUser._id);
      this.userDetails = user;
    },
  },

  created() {
    this.fetchUserDetails();
  },

  beforeRouteEnter: Helper.beforeRouteEnter,
};
</script>

<style lang="sass" scoped>
.admin-shell-row
  flex-wrap: wrap
  @media (min-width: 1024px)
    flex-wrap: nowrap

.admin-content-panel
  flex: 1 1 auto
  min-width: 0

.sidebar-collapsible
  // ---------- MOBILE ----------
  flex: 1 1 100%
  max-width: 100%
  border-bottom: 1px solid rgba(255, 255, 255, 0.2)

  .sidebar-user-block
    display: none

  .menu-label
    display: none

  .sidebar-menu-list
    display: flex
    flex-direction: row
    justify-content: space-around
    border-bottom: none

    .section-spacer-sm,
    .section-spacer-xs
      display: none

  .menu-item
    flex: 1 1 auto
    min-width: 0
    margin-bottom: 0
    padding: 12px 0 !important
    justify-content: center
    align-items: center

    .q-item__section--avatar
      display: flex
      align-items: center
      justify-content: center
      min-width: 0
      padding: 0
      margin: 0

    .q-item__section:not(.q-item__section--avatar)
      display: none !important

  .menu-item--active
    background-color: rgba(255, 255, 255, 0.04)
    border-left: none
    border-bottom: 2px solid var(--q-primary)
    padding-left: 0 !important

  // ---------- DESKTOP ----------
  @media (min-width: 1024px)
    flex: 0 0 64px
    max-width: 64px
    border-right: 1px solid rgba(255, 255, 255, 0.2)
    border-bottom: none
    overflow: hidden
    transition: flex 0.28s ease, max-width 0.28s ease

    .sidebar-menu-list
      display: block
      border-bottom: 1px solid rgba(255, 255, 255, 0.2)

      .section-spacer-sm,
      .section-spacer-xs
        display: block

    .sidebar-user-block
      display: block

    .menu-item .q-item__section:not(.q-item__section--avatar)
      display: block !important

    .menu-item
      flex: initial
      padding: 0 16px !important
      justify-content: flex-start
      align-items: center
      margin-bottom: 4px

      .q-item__section--avatar
        display: block
        align-items: initial
        justify-content: initial
        min-width: 32px
        padding: initial
        margin: initial

    .menu-label
      display: block
      opacity: 0
      width: 0
      overflow: hidden
      transition: opacity 0.15s ease

    .menu-item--active
      background-color: #1a1a1a
      border-left: 3px solid var(--q-primary)
      border-bottom: none
      padding-left: calc(16px - 3px) !important

    &.is-expanded
      flex: 0 0 240px
      max-width: 240px

      .menu-label
        opacity: 1
        width: auto
</style>
