<template>
  <q-layout view="hHh lpR fFf">
    <!-- header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <!-- logo -->
            <!-- <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" /> -->
          </q-avatar>
          Shaded Eyewear
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- body -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- footer -->
    <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <!-- <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" /> -->
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>
