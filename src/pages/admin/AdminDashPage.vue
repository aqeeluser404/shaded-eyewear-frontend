<template>
  <q-page>
    <!-- =================================== ADMIN CONTROLS -->
    <!-- <q-img src="~src/assets/abstract5.jpg" alt="Hero Image" style="width: 100%; height: 100%;" > -->

      <div class="text-black q-pa-md" style="width: 100%; height: 100%; background-color: #f0f0f0;">
        <div style="height: 50px;"></div>
        <q-layout view="lHh Lpr lff" container style="height: 90vh;" class="shadow-2 bg-white">

          <!-- page header -->
          <q-header elevated class="bg-white text-black">
            <q-toolbar>
              <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
              <q-toolbar-title>{{ currentPageTitle }}</q-toolbar-title>
            </q-toolbar>
          </q-header>

          <!-- =================================== DRAWER PANEL -->
          <q-drawer v-model="drawer" class="" show-if-above :width="200" :breakpoint="400">
            <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
              <q-list padding>
                <!-- user tab -->
                <q-item clickable v-ripple @click="changePage('User Panel', 'UserComponent')">
                  <q-item-section avatar><q-icon name="eva-people-outline" /></q-item-section>
                  <q-item-section>User</q-item-section>
                </q-item>
                <!-- sunglasses tab -->
                <q-item clickable v-ripple @click="changePage('Sunglasses Panel', 'SunglassesComponent')">
                  <q-item-section avatar><q-icon name="eva-eye-off-2-outline" /></q-item-section>
                  <q-item-section>Sunglasses</q-item-section>
                </q-item>
                <!-- orders tab -->
                <q-item clickable v-ripple @click="changePage('Order Panel', 'OrdersComponent')">
                  <q-item-section avatar><q-icon name="eva-clipboard-outline" /></q-item-section>
                  <q-item-section>Orders</q-item-section>
                </q-item>
                <q-item clickable v-ripple @click="changePage('Return Panel', 'ReturnsComponent')">
                  <q-item-section avatar><q-icon name="eva-calendar-outline" /></q-item-section>
                  <q-item-section>Returns</q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>

            <!-- avatar header -->
            <q-img class="absolute-top zoomed-image" src="~src/assets/theme/dark-background.jpg" style="height: 150px; ">
              <div class="absolute-bottom bg-transparent">
                <!-- profile img -->
                <q-avatar size="60px" class="" style="transform: translateX(-10px);">
                  <img src="~src/assets/logos/logo-white.png">
                </q-avatar>
                <!-- name and email -->
                <div class="text-weight-bold">
                  {{ userDetails.firstName }}
                  {{ userDetails.lastName }}
                  <span>
                    <q-btn
                      to="/user/dashboard"
                      size="12px"
                      icon="eva-edit-outline"
                      flat
                      dense
                      round
                    />
                  </span>
                </div>
                <div>{{ userDetails.email }}</div>

              </div>
            </q-img>
          </q-drawer>

          <!-- =================================== DRAWER PAGES -->
          <q-page-container>
            <component :is="currentPageComponent"></component>
          </q-page-container>
        </q-layout>
      </div>
    <!-- </q-img> -->
  </q-page>
</template>

<script>
import UserService from 'src/services/UserService'
import UserComponent from '../../components/admin/UserComponent.vue'
import SunglassesComponent from '../../components/admin/SunglassesComponent.vue'
import OrdersComponent from '../../components/admin/OrdersComponent.vue'
import ReturnsComponent from '../../components/admin/ReturnsComponent.vue'
import Helper from '../../services/utils.js'

export default {
  name: "AdminDashPage",

  components: {
    UserComponent,
    SunglassesComponent,
    OrdersComponent,
    ReturnsComponent
  },
  data() {
    return {
      currentUser: {_id: ''},
      userDetails: {},

      drawer: false,
      currentPageTitle: 'User Panel',
      currentPageComponent: 'UserComponent',
    }
  },
  methods: {
    changePage(title, component) {
      this.currentPageTitle = title;
      this.currentPageComponent = component;
      this.drawer = false
    },
    async fetchUserDetails() {
      const userId = await UserService.FindUserByToken()
      this.currentUser = userId

      const user = await UserService.findUserById(this.currentUser._id)
      this.userDetails = user
    }
  },
  created() {
    this.fetchUserDetails()
  },
  beforeRouteEnter: Helper.beforeRouteEnter
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
