<template>
  <q-page>
    <q-card class="absolute-full flex flex-center column bg-dark text-light">
      <img
        src="/shaded-eyewear.png"
        alt="Loading"
        class="loading-logo"
      />
      <div class="q-mt-md text-subtitle1 text-dimmed">
        {{
          attempt === 0
            ? "Connecting to server…"
            : `Still waking up the server… (attempt ${attempt}/${maxAttempts})`
        }}
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axiosInstance from "src/services/axiosInstance";
import Logger from "src/services/Logger";

const MAX_ATTEMPTS = 6;
const RETRY_DELAY_MS = 5000;

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

<style scoped>
.loading-logo {
  width: 96px;
  height: 96px;
  object-fit: contain;
  animation: spin-slowdown 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  transform-origin: center center;
}

/* Spin fast → ease out → pause → repeat */
@keyframes spin-slowdown {
  0% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(360deg); /* 2 full spins */
  }
  100% {
    transform: rotate(360deg); /* hold still to "breathe" */
  }
}
</style>
