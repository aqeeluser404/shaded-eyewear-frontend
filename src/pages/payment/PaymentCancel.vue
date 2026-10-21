<template>
  <AuthCard
    icon="fa-solid fa-ban"
    title="PAYMENT CANCELED"
    subtitle="Your payment was canceled. Please try again."
    :show-back="false"
  >
    <div class="column">
      <q-btn
        rounded
        no-caps
        to="/cart"
        label="Back to cart"
        text-color="dark"
        class="btn-gradient-primary q-px-xl q-py-md rounded-button text-subtitle1 text-bold"
        style="width: 100%"
      />
      <q-btn
        rounded
        no-caps
        outline
        color="grey"
        text-color="grey"
        to="/sunglasses"
        label="Continue shopping"
        class="q-px-xl q-py-md rounded-button text-subtitle1 q-mt-md"
        style="width: 100%"
      />
    </div>
  </AuthCard>
</template>

<script>
import AuthCard from "src/components/elements/AuthCard.vue";

export default {
  name: "PaymentCancelPage",

  components: { AuthCard },
};
</script>
