<template>
  <!--------------------------------------------------------------------- DIVIDING SECTION -------------------------------------------------->
  <section class="q-px-md q-md-px-0">
    <div class="section-spacer-lg"></div>

    <div class="constrain text-center">
      <div
        class="font-size-responsive-xxxl archivo text-gradient-primary text-bold"
      >
        01
      </div>

      <q-separator color="grey-8" class="statement-rule" />

      <div
        class="statement-text font-size-responsive-xxxl archivo text-light text-bold line-height-1-2"
      >
        We cut and finish sunglasses by hand in Kenwyn, so every frame
        <span class="text-gradient-primary">feels made for you.</span>
      </div>
      <div class="section-spacer-sm"></div>

      <router-link
        to="/sunglasses"
        class="statement-cta column items-center text-remove-decoration"
      >
        <q-icon
          name="fa-solid fa-arrow-down-long"
          size="40px"
          color="white"
          class="statement-arrow"
        />
        <span
          class="statement-label font-size-responsive-sm text-light text-bold q-mt-xl"
        >
          IT IS A LIFESTYLE
        </span>
      </router-link>
    </div>

    <div class="section-spacer-md large-screen-only"></div>
    <div class="section-spacer-sm small-screen-only"></div>
  </section>
</template>

<script>
export default {
  name: "DividingSection",
};
</script>

<style lang="sass" scoped>
.statement-rule
  max-width: 800px
  margin: 32px auto

.statement-text
  max-width: 900px
  margin: 0 auto
  // line-height: 1.25

.statement-label
  letter-spacing: 0.2em

.statement-arrow
  transition: transform 0.25s ease

.statement-cta:hover .statement-arrow
  transform: translateY(6px)
</style>
