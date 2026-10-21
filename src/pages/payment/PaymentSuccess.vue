<template>
  <AuthCard
    icon="fa-solid fa-circle-check"
    title="PAYMENT SUCCESSFUL"
    subtitle="Thank you for your purchase. You'll be redirected to the homepage shortly."
    :show-back="false"
  >
    <q-btn
      rounded
      no-caps
      to="/"
      label="Go to home"
      text-color="dark"
      class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold"
      style="width: 100%"
    />
  </AuthCard>
</template>

<script>
import AuthCard from "src/components/elements/AuthCard.vue";
import PaymentService from "src/services/PayService";

export default {
  name: "PaymentSuccessPage",

  components: { AuthCard },

  data() {
    return {
      redirectTimer: null,
    };
  },

  async created() {
    try {
      const orderId = this.$route.query.orderId;
      await PaymentService.paymentSuccess(orderId);

      this.redirectTimer = setTimeout(() => {
        this.$router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error handling payment success:", error);
    }
  },

  beforeUnmount() {
    // stops the redirect firing after they've already clicked somewhere else
    clearTimeout(this.redirectTimer);
  },
};
</script>
