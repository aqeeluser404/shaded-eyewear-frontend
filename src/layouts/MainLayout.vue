<template>
  <q-layout view="hHh lpR fff">
    <!-- header -->
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="constrain">
        <q-toolbar-title>
          <q-avatar>
            <!-- logo -->
            <!-- <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" /> -->
          </q-avatar>
          Shaded Eyewear
        </q-toolbar-title>

        <!-- link buttons -->
        <q-btn
          to="/"
          size="14px"
          class="q-ma-md custom-button"
          label="Home"
          round
          flat
          dense
        />
        <q-btn
          to="/products"
          size="14px"
          class="q-ma-md custom-button"
          label="Catalogue"
          round
          flat
          dense
        />
        <!-- Authentication -->
        <q-btn
          v-if="!isLoggedIn"
          to="/auth/login"
          size="14px"
          class="q-ma-md custom-button"
          label="Login"
          round
          flat
          dense
        />
        <q-btn
          v-else
          @click="logout"
          size="14px"
          class="q-ma-md custom-button"
          label="Logout"
          round
          flat
          dense
        />
        <!-- cart -->
        <q-btn
          to=""
          size="12px"
          class="q-ma-md"
          icon="eva-shopping-cart"
          round
          flat
          dense
        />
      </q-toolbar>
    </q-header>

    <!-- body -->
    <q-page-container class="constrain">
      <router-view />
    </q-page-container>

    <!-- footer -->
    <q-footer elevated class="bg-white text-black">
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
export default {
  name: "MainLayout",

  data() {
    return {
      isLoggedIn: false
    }
  },
  created() {
    this.checkLoginStatus()
  },
  // push status to the other pages
  watch: {
    '$route': 'checkLoginStatus'
  },
  methods: {
    checkLoginStatus() {
      let token = localStorage.getItem('auth-token')
      this.isLoggedIn = !!token
    },
    logout() {
      // call the logout service
      this.isLoggedIn = false
      window.location.reload()
    }
  }
};
</script>
