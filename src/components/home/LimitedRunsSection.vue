<template>
  <!--------------------------------------------------------------------- LIMITED RUNS SECTION -------------------------------------------------->
  <section
    class="btn-gradient-primary limited-runs-section q-px-md q-md-px-0"
  >
    <div class="constrain">
      <div class="section-spacer-md"></div>

      <div class="row items-center">
        <!-- left: copy -->
        <div class="col-12 col-md-7 limited-runs-copy">
          <div class="overline-dark text-dark text-caption q-mb-xs">
            LIMITED RUNS
          </div>
          <div class="font-size-responsive-giant archivo text-dark text-bold">
            BEST FRAMES IN YOUR TOWN.
          </div>
          <div class="section-spacer-xs"></div>
          <div
            class="font-size-responsive-md text-dark"
            style="max-width: 480px"
          >
            Each release is a small batch. When a frame sells out, it's gone
            until the next cut.
          </div>
        </div>
      </div>

      <div class="section-spacer-md"></div>
    </div>

    <!-- image sits outside .constrain so it can bleed to the section edge -->
    <div class="limited-runs-visual large-screen-only">
      <div class="limited-runs-disc"></div>
      <img
        src="~src/assets/gallery/glasses/s2.png"
        alt="Aviator sunglasses"
        class="limited-runs-image"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "LimitedRunsSection",
};
</script>

<style lang="sass" scoped>
.limited-runs-section
  position: relative
  overflow: hidden

.limited-runs-copy
  position: relative
  z-index: 2

.limited-runs-visual
  position: relative
  width: 100%
  max-width: 380px
  margin: 0 auto
  padding-bottom: 32px

  @media (min-width: 1024px)
    position: absolute
    top: 50%
    right: -4%
    width: 46%
    max-width: none
    margin: 0
    padding: 0
    transform: translateY(-50%)
    pointer-events: none

.limited-runs-image
  position: relative
  z-index: 2
  display: block
  width: 100%
  transform: rotate(-8deg)
  filter: drop-shadow(0 28px 24px rgba(120, 40, 0, 0.35))

  @media (min-width: 1024px)
    transform: rotate(-12deg)
</style>
