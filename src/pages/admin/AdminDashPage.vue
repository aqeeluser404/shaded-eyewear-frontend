<template>
  <q-page>
    <section class="bg-dark q-px-md text-light q-md-px-0">
      <div class="section-spacer-sm"></div>
      <div class="constrain">
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)">
          <div class="overline-tight text-dimmed text-caption">
            SHADED OPERATIONS
          </div>
          <div class="row justify-between items-center">
            <div
              class="font-size-responsive-giant archivo col-md-8 col-12"
              :class="$q.screen.gt.sm ? 'q-mb-none' : 'q-mb-md'"
            >
              CONTROL ROOM.
            </div>
            <q-btn
              rounded
              no-caps
              outline
              label="Back to site"
              color="grey"
              text-color="grey"
              to="/"
              class="q-px-lg q-py-sm text-subtitle1 rounded-button text-bold"
            />
          </div>
          <div class="section-spacer-xs"></div>
        </div>

        <div class="section-spacer-xs"></div>

        <div class="row justify-start full-width admin-shell-row">
          <!-------------------------------------------------------- SIDEBAR -------------------------------------------------------->
          <div
            class="bg-transparent sidebar-collapsible"
            :class="$q.screen.gt.sm ? 'q-pr-md' : 'q-pr-none'"
          >
            <div class="sidebar-menu-list">
              <q-item
                clickable
                class="menu-item"
                :class="{
                  'menu-item--active':
                    currentPageComponent === 'OverviewComponent',
                }"
                @click="changePage('Overview', 'OverviewComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-grid-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label"
                  >Overview</q-item-section
                >
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{
                  'menu-item--active': currentPageComponent === 'UserComponent',
                }"
                @click="changePage('Customers', 'UserComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-people-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label"
                  >Customers</q-item-section
                >
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{
                  'menu-item--active':
                    currentPageComponent === 'SunglassesComponent',
                }"
                @click="changePage('Inventory', 'SunglassesComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-eye-off-2-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label"
                  >Inventory</q-item-section
                >
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{
                  'menu-item--active':
                    currentPageComponent === 'OrdersComponent',
                }"
                @click="changePage('Orders', 'OrdersComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-clipboard-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label"
                  >Orders</q-item-section
                >
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{
                  'menu-item--active':
                    currentPageComponent === 'ReturnsComponent',
                }"
                @click="changePage('Return', 'ReturnsComponent')"
              >
                <q-item-section avatar>
                  <q-icon name="eva-calendar-outline" size="18px" />
                </q-item-section>
                <q-item-section class="text-subtitle1 menu-label"
                  >Returns</q-item-section
                >
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
    };
  },

  methods: {
    capitalizeFirstLetter: Helper.capitalizeFirstLetter,
    changePage(title, component) {
      this.currentPageTitle = title;
      this.currentPageComponent = component;
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
// =================================================================================
// SHELL LAYOUT — row stacks on mobile, side-by-side on desktop

.admin-shell-row
  flex-wrap: wrap

  @media (min-width: 1024px)
    flex-wrap: nowrap

.admin-content-panel
  flex: 1 1 auto
  min-width: 0


// =================================================================================
// SIDEBAR — icon tabs on mobile, collapsible rail on desktop

.sidebar-collapsible
  // ---------- MOBILE (default, no media query) ----------
  // everything here applies below 1024px
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

    // hide the whole label section on mobile
    .q-item__section:not(.q-item__section--avatar)
      display: none !important

  .menu-item--active
    background-color: rgba(255, 255, 255, 0.04)
    border-left: none
    border-bottom: 2px solid var(--q-primary)
    padding-left: 0 !important

  // ---------- DESKTOP (>= 1024px) ----------
  // overrides everything above
  @media (min-width: 1024px)
    flex: 0 0 64px
    max-width: 64px
    border-right: 1px solid rgba(255, 255, 255, 0.2)
    border-bottom: none
    transition: flex 0.28s ease

    .sidebar-menu-list
      display: block
      border-bottom: 1px solid rgba(255, 255, 255, 0.2)

      .section-spacer-sm,
      .section-spacer-xs
        display: block

    .sidebar-user-block
      display: block

    // UNDO the mobile label hiding
    .menu-item .q-item__section:not(.q-item__section--avatar)
      display: block !important

    // UNDO the mobile icon centering
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

    // labels: visible but collapsed until hover
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

    &:hover
      flex: 0 0 240px
      max-width: 240px

      .menu-label
        opacity: 1
        width: auto
</style>
