<template>
  <q-layout view="hHh lpR fff">
    <!-- header -->
    <q-header class="bg-white text-black">
      <q-toolbar class="constrain">
        <q-toolbar-title>
          <router-link to="/" class="text-remove-decoration q-mr-md">
            Shaded Eyewear
          </router-link>
          <q-avatar>
            <img src="../assets/sunglasses-icon.png" />
          </q-avatar>
          <span v-if="isLoggedIn" class="q-ml-lg font-size-responsive-xs">
            Hi, {{ userDetails.username }}
          </span>
        </q-toolbar-title>

        <!-- =================================== big screen -->
        <q-btn
          to="/"
          size="14px"
          class="custom-button large-screen-only"
          label="Home"
          flat
        />
        <q-btn
          to="/sunglasses"
          size="14px"
          class="custom-button large-screen-only"
          label="Catalogue"
          flat
        />

        <!-- profiles -->
        <q-btn
          v-if="userDetails && userDetails.userType != null && userDetails.userType == 'admin'"
          to="/admin/dashboard"
          size="14px"
          class="custom-button large-screen-only"
          label="Admin"
          flat
        />
        <q-btn
          v-if="userDetails && userDetails.userType != null && userDetails.userType == 'user'"
          to="/user/dashboard"
          size="14px"
          class="custom-button large-screen-only"
          label="User"
          flat
        />

        <!-- Authentication -->
        <q-btn v-if="!isLoggedIn"
          to="/auth/login"
          size="14px"
          class="custom-button large-screen-only"
          label="Login"
          flat
        />
        <q-btn
          v-else
          @click="logout"
          size="14px"
          class="custom-button large-screen-only"
          label="Logout"
          flat
        />

        <!-- cart -->
        <q-btn
          to="/cart"
          size="12px"
          icon="eva-shopping-cart large-screen-only"
          flat
        />

        <!-- =================================== small screen -->
        <q-btn-dropdown
          class="small-screen-only"
          icon="menu"
          flat
        >
          <q-list style="width: 200px">
            <q-item clickable v-close-popup to="/">
              <q-item-section>Home</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/sunglasses">
              <q-item-section>Catalogue</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/admin/dashboard" v-if="userDetails && userDetails.userType != null && userDetails.userType == 'admin'">
              <q-item-section>Admin Profile</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/user/dashboard" v-if="userDetails && userDetails.userType != null && userDetails.userType == 'user'">
              <q-item-section>User Profile</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/auth/login" v-if="!isLoggedIn">
              <q-item-section>Login</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logout" v-else>
              <q-item-section>Logout</q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/cart">
              <q-item-section>Cart</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <!-- body -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- footer -->
    <q-footer class="bg-white text-black">
      <q-toolbar class="constrain">
        <q-toolbar-title>
          <q-avatar>
            <!-- <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" /> -->
          </q-avatar>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import UserService from 'src/services/UserService';

export default {
  name: "MainLayout",

  data() {
    return {
      userDetails: {
        _id: '',
        username: '',
        userType: ''
      },
      isLoggedIn: false,
      burgerMenuShown: false,
    }
  },
  created() {
    this.checkLoginStatus()
  },
  watch: {
    // push status to the other pages
    '$route': 'checkLoginStatus'
  },
  methods: {
    // 1. check if logged in
    checkLoginStatus() {
      let token = localStorage.getItem('auth-token')
      this.isLoggedIn = !!token

      // 2. fetch user details to determine usertype
      if (this.isLoggedIn == true) {
        this.fetchUserDetails()
      }
    },

    // 2.1 fetch user details to determine usertype
    async fetchUserDetails() {
      const response = await UserService.FindUserByToken()
      this.userDetails = response
      console.log(this.userDetails)
    },

    // 3. logout and clear local storage
    async logout() {
      const response = await UserService.logout(this.userDetails._id)
      if (response) {
        this.$q.dialog({
          title: 'Success',
          message: 'Logout successful!',
          ok: 'OK'
        }).onOk(() => {
          this.$router.push('/')

          this.isLoggedIn = false
          window.location.reload()
        })
      }
      else {
        this.$q.dialog({
          title: 'Error',
          message: 'Login failed. Please try again.',
          ok: 'OK'
        })
      }
    }
  }
};
</script>
