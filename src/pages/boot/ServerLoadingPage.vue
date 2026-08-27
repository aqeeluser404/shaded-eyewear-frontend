<template>
  <q-page class="absolute-full flex flex-center column">
    <q-spinner-dots size="48px" color="primary" />
    <div class="q-mt-md text-subtitle1">
      {{
        attempt === 0
          ? "Connecting to server…"
          : `Still waking up the server… (attempt ${attempt}/${maxAttempts})`
      }}
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axiosInstance from "src/services/axiosInstance";
import Logger from "src/services/Logger";

const MAX_ATTEMPTS = 6;
const RETRY_DELAY_MS = 5000; // Render free tier can take 30-60s to wake

export default defineComponent({
  name: "ServerLoadingPage",

  data() {
    return {
      attempt: 0,
      maxAttempts: MAX_ATTEMPTS,
    };
  },

  mounted() {
    this.checkServer();
  },

  methods: {
    async checkServer() {
      try {
        const response = await axiosInstance.get("/sunglasses/all", {
          timeout: 15000,
        });
        const data = response.data;

        const isHealthy = Array.isArray(data) && data.length > 0;

        if (!isHealthy) throw new Error("Server not fully ready");

        this.$router.markServerReady();
        const redirect = this.$route.query.redirect || "/";
        return this.$router.replace(redirect);
      } catch (error) {
        Logger.warn(`Server check attempt ${this.attempt + 1} failed`, error);
        this.attempt++;
        if (this.attempt >= this.maxAttempts) {
          return this.$router.replace("/404");
        }
        setTimeout(this.checkServer, RETRY_DELAY_MS);
      }
    },
  },
});
</script>
