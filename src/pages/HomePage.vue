<template>
  <q-page class="gradient-bg">
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
                <div class="overline text-dimmed text-caption q-mb-xs">
                  EST. 2023 · CAPE TOWN
                </div>
                <p class="font-size-responsive-hero archivo">
                  SHADE IS A <br />
                  <span class="text-gradient-primary">DISCIPLINE.</span>
                </p>
                <div class="section-spacer-sm large-screen-only"></div>
                <div class="section-spacer-xs small-screen-only"></div>
                <p class="font-size-responsive-md text-dimmed">
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
                      class="font-size-responsive-sm text-uppercase marquee-item"
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
    <div class="section-spacer-lg"></div>

    <!--------------------------------------------------------------------- WHO WE ARE SECTION -------------------------------------------------->
    <section class="q-px-md q-md-px-0">
      <div class="section-spacer-lg"></div>
      <div class="constrain" id="about-section">
        <div class="row items-start justify-between q-col-gutter-xl">
          <div>
            <div
              class="font-size-responsive-giant archivo text-light text-bold q-mb-md"
              style="line-height: 1.2"
            >
              WE PARTNER WITH <br />
              BRANDS AND
              <span class="text-gradient-primary">DESIGNERS</span>
            </div>
            <div
              class="statement-label font-size-responsive-sm text-gradient-primary"
            >
              BUILT TO LAST
            </div>
          </div>

          <div
            class="col-12 col-md-7"
            :class="$q.screen.gt.md ? 'q-pr-xl' : 'q-mb-xl'"
          >
            <div
              class="showcase-wrap"
              :style="{ '--glow-color': activeGlowColor }"
            >
              <q-carousel
                ref="showcase"
                v-model="slide"
                animated
                infinite
                swipeable
                :autoplay="hovering ? false : 5000"
                transition-prev="fade"
                transition-next="fade"
                :height="$q.screen.gt.sm ? '520px' : '380px'"
                class="showcase-carousel"
                @mouseenter="hovering = true"
                @mouseleave="hovering = false"
              >
                <q-carousel-slide
                  v-for="s in showcase"
                  :key="s.name"
                  :name="s.name"
                  class="showcase-slide column no-wrap justify-end"
                  :style="{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.92) 100%), url(${s.image})`,
                  }"
                >
                  <div class="">
                    <div
                      class="q-mb-sm font-size-responsive-sm text-gradient-primary statement-label"
                    >
                      {{ s.tag }}
                    </div>
                    <!-- <div
                    class="q-mb-sm font-size-responsive-md text-dimmed"
                  >
                    {{ s.title }}
                  </div> -->
                    <div class="font-size-responsive-md text-light">
                      {{ s.text }}
                    </div>
                  </div>
                </q-carousel-slide>

                <template #control>
                  <q-carousel-control position="top-right" :offset="[24, 24]">
                    <div class="showcase-controls">
                      <q-btn
                        round
                        dense
                        flat
                        size="sm"
                        color="white"
                        icon="eva-arrow-back-outline"
                        @click="$refs.showcase.previous()"
                      />
                      <q-btn
                        round
                        dense
                        flat
                        size="sm"
                        color="white"
                        icon="eva-arrow-forward-outline"
                        @click="$refs.showcase.next()"
                      />
                    </div>
                  </q-carousel-control>
                </template>
              </q-carousel>
            </div>
          </div>
          <div class="col-12 col-md-5">
            <div class="font-size-responsive-xxl archivo text-light text-bold">
              Why Choose Us Over The Giants?
            </div>
            <div class="section-spacer-sm"></div>
            <div
              class="font-size-responsive-md text-dimmed q-mb-md"
              style="line-height: 1.6"
            >
              The sunglasses market is experiencing steady growth, driven by
              factors such as increasing awareness of UV protection, changing
              fashion trends, and a growing desire for outdoor activities. Our
              target market consist of both male and female, who prioritize
              quality, style, and affordability.
            </div>
            <div
              class="font-size-responsive-md text-dimmed"
              style="line-height: 1.6"
            >
              Our product line will encompass a variety of styles, including
              wayfarers, oval, geometric, semi-rimless and round sunglasses,
              catering to different preferences. We will prioritize offering a
              balance between trendy and timeless designs to appeal to a broad
              customer base.
            </div>

            <!-- <div class="section-spacer-sm"></div>

            <div class="row items-center q-gutter-md">
              <div class="col-12 col-sm-auto">
                <q-btn
                  dense
                  no-caps
                  rounded
                  flat
                  to="/about"
                  label="View Our Story"
                  icon-right="eva-arrow-forward-outline"
                  text-color="light"
                  class="icon-btn text-subtitle1 custom-button"
                />
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="section-spacer-lg"></div>
    </section>

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
          class="statement-text font-size-responsive-xxxl archivo text-light text-bold"
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
            VIEW THE COLLECTION
          </span>
        </router-link>
      </div>

      <div class="section-spacer-md"></div>
    </section>

    <!--------------------------------------------------------------------- GREYSCALE GALLERY SECTION -------------------------------------------------->
    <section class="q-px-md q-md-px-0">
      <!-- <div class="section-spacer-lg"></div> -->

      <div class="constrain">
        <div class="gallery-grid">
          <div
            v-for="(img, i) in gallery"
            :key="i"
            class="gallery-tile"
            :class="`gallery-tile--${i + 1}`"
          >
            <img :src="img" class="gallery-image" alt="" />
          </div>
        </div>

        <!-- CTA -->
        <div class="row justify-center q-mt-xl">
          <q-btn
            dense
            no-caps
            @click="scrollTo"
            label="Learn More"
            color="grey-7"
            text-color="light"
            class="gallery-cta q-px-xl q-py-sm text-subtitle1 text-bold"
          />
        </div>
      </div>

      <div class="section-spacer-lg"></div>
    </section>

    <!--------------------------------------------------------------------- FRAMES SECTION -------------------------------------------------->
    <section class="q-px-md q-md-px-0">
      <div class="section-spacer-lg"></div>
      <div class="constrain">
        <div>
          <div class="overline text-dimmed text-caption q-mb-xs">
            THE COLLECTION
          </div>
          <div class="row justify-between items-start">
            <div class="font-size-responsive-giant archivo text-light">
              FEATURED FRAMES
            </div>
            <q-btn
              to="/sunglasses"
              class="custom-button q-py-sm font-size-responsive-sm text-light break-desktop"
              label="View all"
              :ripple="false"
              no-caps
              flat
              rounded
            />
          </div>
        </div>
        <div class="section-spacer-sm"></div>
        <div>
          <SunglassesList :search="search" />
        </div>
      </div>
      <div class="section-spacer-lg"></div>
    </section>

    <!--------------------------------------------------------------------- SERVICES SECTION -------------------------------------------------->
    <section
      class="q-px-md q-md-px-0 bg-dark"
      style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
    >
      <div class="section-spacer-md"></div>

      <div class="constrain" id="service-section">
        <div class="row items-end justify-between">
          <div>
            <div class="overline text-dimmed text-caption q-mb-xs">
              WHAT WE OFFER
            </div>
            <div
              class="font-size-responsive-giant archivo text-light text-bold"
            >
              OUR SERVICES
            </div>
          </div>
          <div class="font-size-responsive-sm text-dimmed gt-sm">
            What you get with every order.
          </div>
        </div>

        <div class="section-spacer-sm"></div>

        <div class="services-grid">
          <div
            v-for="(s, i) in services"
            :key="s.title"
            class="service-cell bg-dark-secondary"
          >
            <div class="row items-center justify-between q-mb-lg">
              <div class="service-icon">
                <q-icon :name="s.icon" color="primary" size="20px" />
              </div>
              <div
                class="overline-tight text-dimmed text-caption service-index"
              >
                {{ String(i + 1).padStart(2, "0") }}
              </div>
            </div>

            <div class="font-size-responsive-md archivo text-light q-mb-sm">
              {{ s.title }}
            </div>
            <div class="font-size-responsive-sm text-dimmed service-text">
              {{ s.text }}
            </div>
          </div>
        </div>
      </div>

      <div class="section-spacer-lg"></div>
    </section>

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
      <div class="limited-runs-visual">
        <div class="limited-runs-disc"></div>
        <img
          src="~src/assets/gallery/glasses/s2.png"
          alt="Aviator sunglasses"
          class="limited-runs-image"
        />
      </div>
    </section>
  </q-page>
</template>

<script>
import SunglassesList from "src/components/user/SunglassesList.vue";
import statGlare from "src/assets/gallery/glasses/s3.jpg";
import statStudio from "src/assets/gallery/glasses/s1.png";

import showcaseGlare from "src/assets/gallery/persons/g7.jpg";
import showcaseStudio from "src/assets/gallery/persons/g8.jpg";
import showcaseFrames from "src/assets/gallery/persons/g10.jpg";

export default {
  name: "HomePage",
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

      gallery: [
        new URL("src/assets/gallery/persons/g6.jpg", import.meta.url).href,
        new URL("src/assets/gallery/persons/g2.jpg", import.meta.url).href,
        new URL("src/assets/gallery/persons/g3.png", import.meta.url).href,
        new URL("src/assets/gallery/persons/g4.jpg", import.meta.url).href,
        new URL("src/assets/gallery/persons/g1.jpg", import.meta.url).href,
        new URL("src/assets/gallery/persons/g5.jpg", import.meta.url).href,
      ],
      whyStats: [
        { value: "UV400", label: "Lens protection" },
        { value: "5", label: "Frame styles" },
        { value: "14 days", label: "Easy returns" },
        { value: "2 YEAR", label: "Frame warranty" },
      ],
      search: "",

      aboutFeatures: [
        {
          icon: "eva-scissors-outline",
          title: "Cut and fitted in-house",
          text: "Small runs, finished in our Kenwyn studio.",
        },
        {
          icon: "eva-sun-outline",
          title: "Polarised, UV400 lenses",
          text: "Built for real Table Bay glare.",
        },
        {
          icon: "eva-pricetags-outline",
          title: "Honest pricing",
          text: "Fair prices, no inflated markup.",
        },
        {
          icon: "eva-pricetags-outline",
          title: "Honest pricing",
          text: "Fair prices, no inflated markup.",
        },
      ],

      reviews: [
        {
          text: "My Meridians survived a full summer of Sea Point promenade runs and still look brand new. The amber lens is unreal at golden hour.",
          name: "THANDI M.",
          model: "Meridian",
          location: "Cape Town",
        },
        {
          text: "Ordered on Monday, collected in Kenwyn on Wednesday. The hand-check note in the box is a genuinely nice touch.",
          name: "KYLE R.",
          model: "Horizon",
          location: "Kenwyn",
        },
        {
          text: "The Eclipse is the lightest pair I've owned — forgot I was wearing them until the sun dropped. Ordering a second pair.",
          name: "ROBYN V.",
          model: "Eclipse",
          location: "Sea Point",
        },
      ],

      services: [
        {
          icon: "eva-credit-card-outline",
          title: "PAID WITH YOCO",
          text: "Card, EFT and instant payments, secured end to end at checkout.",
        },
        {
          icon: "eva-car-outline",
          title: "FAST AND RELIABLE",
          text: "Cape Town deliveries within two working days, tracked all the way.",
        },
        {
          icon: "eva-shopping-bag-outline",
          title: "DOORSTEP PICKUP",
          text: "Collect at 65 Stockley Road, Kenwyn — open weekdays 08:00 to 17:00.",
        },
        {
          icon: "eva-award-outline",
          title: "2 YEAR WARRANTY",
          text: "Every frame is covered for two years against defects in materials and craftsmanship.",
        },
        {
          icon: "eva-refresh-outline",
          title: "EASY RETURNS",
          text: "Not the right fit? Return within 14 days for a full refund — no questions asked.",
        },
        {
          icon: "eva-message-circle-outline",
          title: "DIRECT SUPPORT",
          text: "Questions about fit, tint or warranty? Message us — a real person replies, usually within a day.",
        },
      ],

      slide: "glare",
      hovering: false,
      showcase: [
        {
          name: "glare",
          image: showcaseGlare,
          tag: "POLARISED UV400",
          title: "Built for Table Bay glare.",
          text: "Lenses tuned for the Cape light, not a factory default.",
          color: "rgba(137, 207, 240, 0.45)", // baby blue
        },
        {
          name: "studio",
          image: showcaseStudio,
          tag: "SMALL RUNS",
          title: "Cut and fitted in Kenwyn.",
          text: "Every release is a small batch, finished by hand.",
          color: "rgba(167, 139, 250, 0.4)", // soft violet
        },
        {
          name: "frames",
          image: showcaseFrames,
          tag: "HAND-CHECKED",
          title: "Inspected before it ships.",
          text: "From the lens tint to the hinge tension.",
          color: "rgba(249, 115, 22, 0.45)", // warm orange
        },
      ],
    };
  },
  components: {
    SunglassesList,
  },
  computed: {
    slideNumber() {
      const i = this.showcase.findIndex((s) => s.name === this.slide);
      return String(i + 1).padStart(2, "0");
    },
    activeGlowColor() {
      const current = this.showcase.find((s) => s.name === this.slide);
      return current ? current.color : "transparent";
    },
  },
  methods: {
    scrollToAboutUs() {
      const aboutUsElement = document.getElementById("about-us");
      if (aboutUsElement) {
        aboutUsElement.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>

<style lang="sass">
.hero-wrapper
  position: relative
  width: 100%
  height: 100vh
  // max-height: 1024px
  overflow: hidden

.hero-image
  width: 100%
  height: 100vh
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
:deep(.q-img__content)
  z-index: 2
  position: relative

.about-us-text
  text-align: left

@media (max-width: 1024px)
  .about-us-text
    text-align: center
    padding: 25px 50px 25px 50px

.about-us-height
  height: 100%

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

.limited-runs-section
  position: relative
  overflow: hidden // clips the bleed cleanly at the section edge

.limited-runs-copy
  position: relative
  z-index: 2

// ---------- image block ----------
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

// soft light behind the glasses, gives them something to sit on
// .limited-runs-disc
//   position: absolute
//   top: 50%
//   left: 50%
//   width: 100%
//   aspect-ratio: 1
//   transform: translate(-50%, -50%)
//   border-radius: 50%
//   background: rgba(255, 255, 255, 0.28)
//   box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5), 0 30px 60px -20px rgba(120, 40, 0, 0.25)

//   // outer ring for a layered, "orbit" feel
//   &::after
//     content: ''
//     position: absolute
//     inset: -8%
//     border-radius: 50%
//     border: 0px solid rgba(0, 0, 0, 0.12)
//     background: rgba(255, 255, 255, 0.28)

.limited-runs-image
  position: relative
  z-index: 2
  display: block
  width: 100%
  transform: rotate(-8deg)
  // drop-shadow follows the PNG's alpha, so the shadow hugs the frame shape
  filter: drop-shadow(0 28px 24px rgba(120, 40, 0, 0.35))

  @media (min-width: 1024px)
    transform: rotate(-12deg)

// ---------- ABOUT IMAGE ----------
.about-image-wrap
  position: relative
  height: 100%
  min-height: 420px
  border-radius: 12px
  overflow: hidden
  border: 1px solid rgba(255, 255, 255, 0.1)

  @media (min-width: 1024px)
    min-height: 520px

.about-image
  position: absolute
  inset: 0
  width: 100%
  height: 100%
  transition: transform 0.6s ease

.about-image-wrap:hover .about-image
  transform: scale(1.04)

.about-image-fade
  position: absolute
  inset: 0
  z-index: 1
  pointer-events: none
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.55) 100%)

.about-badge
  position: absolute
  left: 20px
  bottom: 20px
  z-index: 2
  display: inline-flex
  align-items: center
  padding: 8px 16px
  border-radius: 999px
  background: rgba(10, 10, 10, 0.45)
  border: 1px solid rgba(255, 255, 255, 0.15)
  backdrop-filter: blur(12px)
  -webkit-backdrop-filter: blur(12px)
  color: #f0f0f0
  font-size: 0.7rem
  font-weight: 600
  letter-spacing: 0.12em


// ---------- SERVICES ----------
.services-grid
  display: grid
  grid-template-columns: 1fr
  gap: 16px

  @media (min-width: 1024px)
    grid-template-columns: repeat(3, 1fr)
    gap: 24px

.service-cell
  position: relative
  display: flex
  flex-direction: column
  padding: 28px
  border-radius: 8px
  border: 1px solid rgba(255, 255, 255, 0.12)
  overflow: hidden
  transition: border-color 0.25s ease, transform 0.25s ease

  // accent line that draws across the top on hover
  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 0
    height: 2px
    background: var(--q-primary)
    transition: width 0.35s ease

  &:hover
    border-color: rgba(255, 255, 255, 0.3)
    transform: translateY(-2px)

    &::before
      width: 100%

    .service-icon
      border-color: var(--q-primary)

    .service-index
      color: var(--q-primary) !important

.service-icon
  width: 40px
  height: 40px
  display: flex
  align-items: center
  justify-content: center
  border-radius: 10px
  border: 1px solid rgba(255, 255, 255, 0.12)
  transition: border-color 0.25s ease

.service-index
  transition: color 0.25s ease

.service-text
  max-width: 340px
  line-height: 1.55

.feature-point
  position: relative
  padding-left: 20px
  border-left: 2px solid var(--q-primary)
  padding-top: 4px
  padding-bottom: 4px

.about-text-col
  @media (min-width: 1024px)
    padding-left: 80px

  @media (max-width: 1023px)
    margin-top: 40px


// ---------- GREYSCALE GALLERY ----------
.gallery-grid
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 32px

  margin: 0 auto

  @media (max-width: 1023px)
    gap: 20px

  @media (max-width: 600px)
    grid-template-columns: repeat(2, 1fr)
    gap: 16px

.gallery-tile
  position: relative
  aspect-ratio: 1
  border-radius: 24px
  overflow: hidden // clips the zoomed image to the tile, so only the picture grows
  background: #0a0a0a
  isolation: isolate // keeps the rounded clipping solid while the image scales

  @media (max-width: 600px)
    border-radius: 16px

.gallery-image
  width: 100%
  height: 100%
  object-fit: cover
  object-position: var(--pos, 50% 50%)
  transform: scale(var(--zoom, 1)) // your per-tile crop, unchanged
  scale: 1 // hover zoom lives here and stacks on top of the crop
  filter: grayscale(100%) contrast(1.05) brightness(0.95)
  transition: filter 0.4s ease, scale 0.6s cubic-bezier(0.22, 1, 0.36, 1)
  will-change: scale

  .gallery-tile:hover &
    scale: 1.12
    filter: grayscale(0%) contrast(1) brightness(1)

// ---------- UNIQUE IMAGE POSITIONS ----------
// --pos:  X% Y%   → which point of the photo is pinned to the tile
//                   0% 0% = top-left, 50% 50% = centre, 100% 100% = bottom-right
// --zoom: number  → 1 = no zoom, 1.25 = 25% zoom in

.gallery-tile--1 .gallery-image
  --pos: 50% 50%
  --zoom: 1

.gallery-tile--2 .gallery-image
  --pos: 50% 50%
  --zoom: 1

.gallery-tile--3 .gallery-image
  --pos: 50% 50%
  --zoom: 1

.gallery-tile--4 .gallery-image
  --pos: 50% 50%
  --zoom: 1

// bottom middle → zoom in a bit
.gallery-tile--5 .gallery-image
  --pos: 60% 50%
  --zoom: 1.25

// bottom right → move the crop down (show more of the top of the photo)
.gallery-tile--6 .gallery-image
  --pos: 50% 35%
  --zoom: 1.03

// CTA button — square corners to match the reference
.gallery-cta
  border-radius: 0 !important
  border: 1px solid rgba(255, 255, 255, 0.6) !important
  background: transparent !important
  letter-spacing: 0.15em
  text-transform: uppercase
  font-size: 0.85rem
  transition: background-color 0.25s ease, border-color 0.25s ease

  &:hover
    background: rgba(255, 255, 255, 0.08) !important
    border-color: rgba(255, 255, 255, 0.9) !important


.statement-rule
  max-width: 800px
  margin: 32px auto

.statement-text
  max-width: 900px
  margin: 0 auto
  line-height: 1.25

.statement-label
  letter-spacing: 0.2em

.statement-arrow
  transition: transform 0.25s ease

.statement-cta:hover .statement-arrow
  transform: translateY(6px)

.showcase-carousel
  border-radius: 0 !important
  border: 1px solid rgba(255, 255, 255, 0.1)
  background: #0a0a0a

.showcase-slide
  padding: 28px

.showcase-caption
  max-width: 440px

.showcase-tag
  font-size: 0.7rem
  font-weight: 600
  letter-spacing: 0.15em
  color: var(--q-primary)
  margin-bottom: 8px

.showcase-title
  line-height: 1.15

.showcase-text
  margin-top: 10px
  line-height: 1.5
  color: rgba(255, 255, 255, 0.8)

.showcase-controls
  display: inline-flex
  align-items: center
  // gap: 8px
  // padding: 4px 8px 4px 16px
  padding: 8px
  border-radius: 999px
  background: rgba(10, 10, 10, 0.45)
  border: 1px solid rgba(255, 255, 255, 0.15)
  backdrop-filter: blur(12px)
  -webkit-backdrop-filter: blur(12px)

@property --glow-color
  syntax: '<color>'
  inherits: true
  initial-value: transparent

.showcase-wrap
  position: relative
  isolation: isolate
  transition: --glow-color 0.8s ease-in-out   // animates the variable itself

  &::before
    content: ''
    position: absolute
    inset: 10% -14% -10% 4%
    z-index: -1
    pointer-events: none
    border-radius: 50%
    background: radial-gradient(ellipse at 60% 50%, var(--glow-color) 0%, transparent 70%)
    filter: blur(90px)
    // no transition here anymore

  @media (max-width: 1023px)
    &::before
      inset: -6% -4%
      filter: blur(40px)
</style>
