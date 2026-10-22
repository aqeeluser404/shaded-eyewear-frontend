<template>
  <!--------------------------------------------------------------------- HERO SECTION -------------------------------------------------->
  <section>
    <div class="hero-wrapper">
      <q-img
        src="~src/assets/gallery/persons/hero.jfif"
        alt="Hero Image"
        class="hero-image"
      >
        <q-card class="absolute-full" style="z-index: 1">
          <div class="full-height column justify-end items-start constrain">
            <div class="">
              <div class="overline text-dimmed text-caption q-mb-sm">
                EST. 2023 · CAPE TOWN
              </div>
              <p class="font-size-responsive-hero archivo">
                SHADE IS A <br />
                <span class="text-gradient-primary">DISCIPLINE.</span>
              </p>
              <div class="section-spacer-sm large-screen-only"></div>
              <div class="section-spacer-xs small-screen-only"></div>
              <p class="font-size-responsive-md text-dimmed line-height-1-6">
                Small-run frames cut for the glare off Table Bay. Polarised,
                UV400, and <br class="break-desktop" />
                hand-checked before they leave Kenwyn.
              </p>
              <div class="section-spacer-sm large-screen-only"></div>
              <div class="section-spacer-xs small-screen-only"></div>
            </div>

            <div class="row justify-start items-center full-width">
              <q-btn
                dense
                label="Shop the catalogue"
                to="/sunglasses"
                text-color="dark"
                class="btn-gradient-primary icon-btn q-px-xl q-py-md q-mr-lg text-subtitle1 rounded-button text-bold"
                no-caps
                icon-right="eva-arrow-forward-outline"
              />

              <div
                class="col-sm-6 col-12 font-size-responsive-sm text-dimmed q-mt-md q-md-mt-0 large-screen-only"
              >
                Free delivery across Cape Town
              </div>
            </div>

            <div class="section-spacer-md"></div>
            <div class="marquee-section q-py-sm">
              <div class="marquee-track row no-wrap">
                <div
                  v-for="i in 2"
                  :key="i"
                  class="row no-wrap marquee-group"
                >
                  <span
                    v-for="t in items"
                    :key="t"
                    class="font-size-responsive-sm text-uppercase marquee-item "
                  >
                    <span class="text-bold q-mr-md">{{ t }}</span>
                    <span class="text-primary">✳</span>
                  </span>
                </div>
              </div>
            </div>
            <!-- <div class="section-spacer-xs"></div> -->
          </div>
        </q-card>
      </q-img>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  data() {
    return {
      items: [
        "Polarised UV400",
        "Hand-finished",
        "Cape Town made",
        "Doorstep pickup",
        "2 year frame warranty",
        "Paid with Yoco",
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
.hero-wrapper
  position: relative
  width: 100%
  height: 100dvh
  // max-height: 1024px
  overflow: hidden

.hero-image
  width: 100%
  height: 100dvh
  // max-height: 1024px
  object-fit: cover
  display: block
  position: relative
  &::before
    content: ''
    position: absolute
    inset: 0
    z-index: 1
    pointer-events: none
    background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 15%, rgba(0, 0, 0, 0) 50%), linear-gradient(to right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0.1) 60%),radial-gradient(circle at bottom left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0) 70%)

    // @media (max-width: 1024px)
    //   height: 60vh
// :deep(.q-img__content)
//   z-index: 2
//   position: relative

.marquee-section
  overflow: hidden
  border-top: 1px solid var(--q-separator-color, #333)
  border-bottom: 1px solid var(--q-separator-color, #333)
  width: 100vw
  margin-left: calc(50% - 50vw)
  margin-right: calc(50% - 50vw)

.marquee-track
  width: max-content
  animation: marquee-scroll 50s linear infinite

.marquee-group
  gap: 3rem
  padding-right: 3rem

.marquee-item
  letter-spacing: 0.2em
  color: var(--q-color-grey-6, #9e9e9e)
  white-space: nowrap

@keyframes marquee-scroll
  from
    transform: translateX(0)
  to
    transform: translateX(-50%)
</style>
