<template>
  <q-card class="absolute-full flex flex-center column bg-dark text-light">
    <img src="/shaded-eyewear.png" alt="Not found" class="error-logo" />

    <div class="text-h3 q-mt-md archivo" style="opacity: 0.4">404</div>

    <div class="text-subtitle1 text-dimmed text-center q-mt-sm q-mb-md">
      Oops. Either the server is offline…
      <br />
      Or you've stumbled on the wrong page…
    </div>

    <q-btn
      dense
      label="Reload"
      to="/"
      text-color="dark"
      class="btn-gradient-primary q-px-xl q-py-sm text-subtitle1 rounded-button text-bold"
      no-caps
    />
  </q-card>
</template>

<script setup>
defineOptions({
  name: "ErrorNotFound",
});
</script>

<style scoped>
.error-logo {
  width: 96px;
  height: 96px;
  object-fit: contain;
  opacity: 0.85;
  animation: sway 4s ease-in-out infinite;
  transform-origin: center center;
}

@keyframes sway {
  0%,
  100% {
    transform: rotate(-6deg);
  }
  50% {
    transform: rotate(6deg);
  }
}
</style>
