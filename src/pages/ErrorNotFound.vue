<template>
  <div class="fullscreen text-black text-center q-pa-md flex flex-center" style="color: #f0f0f0;">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h3 q-mb-md" style="opacity:.4">
        Oops. Either the server is offline...
      </div>
      <div class="text-h3" style="opacity:.4">
        Or you've stumbled on the wrong page...
      </div>

      <q-btn
        rounded dense
        class="q-mt-xl q-px-lg q-py-sm"
        color="black"
        text-color="white"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'ErrorNotFound'
})
</script>
