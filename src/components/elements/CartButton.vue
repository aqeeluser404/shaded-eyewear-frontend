<template>
  <q-btn
    :to="to"
    :icon="icon"
    :class="buttonClass"
    :ripple="false"
    no-caps
    flat
    rounded
  >
    <q-badge
      v-if="count > 0"
      :color="badgeColor"
      :text-color="badgeTextColor"
      floating
      rounded
      class="cart-badge"
    >
      {{ displayCount }}
    </q-badge>
  </q-btn>
</template>

<script>
export default {
  name: "CartButton",

  props: {
    count: {
      type: Number,
      default: 0,
    },
    to: {
      type: String,
      default: "/cart",
    },
    icon: {
      type: String,
      default: "eva-shopping-bag-outline",
    },
    buttonClass: {
      type: String,
      default: "custom-button q-py-sm text-body2",
    },
    badgeColor: {
      type: String,
      default: "primary",
    },
    badgeTextColor: {
      type: String,
      default: "dark",
    },
  },

  computed: {
    displayCount() {
      // Cap at 99+ so the badge doesn't break the layout
      return this.count > 99 ? "99+" : this.count;
    },
  },
};
</script>

<style lang="sass" scoped>
.cart-badge
  font-size: 10px
  font-weight: 700
  padding: 1px 5px
  min-width: 16px
  height: 16px
  line-height: 14px
  border: 1px solid #0a0a0a
  transform: translate(-10px, 8px)   // push into top-right corner
</style>
