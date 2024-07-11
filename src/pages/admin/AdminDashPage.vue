<template>
  <q-page>
    <div class="constrain">

      <q-card bordered flat class="column flex-center">
        <h4>Admin Dashboard</h4>
      </q-card>

      <!-- admin block -->
      <div class="q-mt-md">
        <q-layout view="lHh Lpr lff" container style="height: 300px" class="shadow-2 rounded-borders">

          <!-- header -->
          <q-header elevated class="bg-white text-black">
            <q-toolbar>
              <q-toolbar-title>{{ currentPageTitle }}</q-toolbar-title>
              <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            </q-toolbar>
          </q-header>

          <!-- =================================== side panel -->
          <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
            <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
              <q-list padding>
                <!-- user tab -->
                <q-item clickable v-ripple @click="changePage('Users', 'UserComponent')">
                  <q-item-section avatar><q-icon name="eva-people-outline" /></q-item-section>
                  <q-item-section>Users</q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>

            <!-- avatar -->
            <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
              <div class="absolute-bottom bg-transparent">
                <q-avatar size="56px" class="q-mb-sm">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
                <div class="text-weight-bold">{{ userDetails.firstName }} {{ userDetails.lastName }}</div>
                <div>{{ userDetails.email }}</div>
              </div>
            </q-img>
          </q-drawer>

          <!-- =================================== panel page -->
          <q-page-container>
            <component :is="currentPageComponent"></component>
          </q-page-container>
        </q-layout>
      </div>
    </div>

  </q-page>
</template>

<script>
import UserService from 'src/services/UserService';
import UserComponent from '../../components/admin/UserComponent.vue'

export default {
  name: "AdminDashPage",

  components: {
    UserComponent
  },

  data() {
    return {
      // user details
      currentUser: {_id: ''},
      userDetails: {},

      drawer: false,
      currentPageTitle: 'Dashboard',
      currentPageComponent: null,
    }
  },
  methods: {
    changePage(title, component) {
      this.currentPageTitle = title;
      this.currentPageComponent = component;
    },
    async fetchUserDetails() {
      // get id from token
      const userId = await UserService.FindUserByToken()
      this.currentUser = userId

      // get user from id
      const user = await UserService.findUserById(this.currentUser._id)
      this.userDetails = user
    }
  },
  created() {
    this.fetchUserDetails()
  },

  // PREVENT PAGE ACCESS IF UNAUTHENTICATED
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      next({ path: '/' });
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      next(false);
    } else {
      next();
    }
  }
}
</script>
