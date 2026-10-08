<template>
  <q-page class="gradient-bg">
    <!--------------------------------------------------------------------- HERO SECTION -------------------------------------------------->
    <section>
      <div class="hero-wrapper">
        <q-img
          src="~src/assets/homepage/hero.jfif"
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

    <!--------------------------------------------------------------------- ABOUT STUDIO SECTION -------------------------------------------------->
    <section class="q-px-md q-md-px-0">
      <div class="section-spacer-lg"></div>

      <div class="constrain">
        <div class="row items-stretch q-col-gutter-x-xl">
          <!-- LEFT: image -->
          <div class="col-12 col-md-5">
            <div class="about-image-wrap">
              <q-img
                src="~src/assets/homepage/hero2.jpg"
                class="about-image"
                fit="cover"
              />
              <div class="about-image-fade"></div>

              <div class="about-badge">
                <q-icon name="eva-shield-outline" color="primary" size="16px" />
                <span class="q-ml-sm">HAND-CHECKED IN KENWYN</span>
              </div>
            </div>
          </div>

          <!-- RIGHT: copy -->
          <div
            class="col-12 col-md-7"
            :class="$q.screen.gt.md ? 'q-pl-xl' : 'q-mt-xl'"
          >
            <div class="overline text-dimmed text-caption q-mb-xs">
              ABOUT THE STUDIO
            </div>

            <div
              class="font-size-responsive-giant archivo text-light text-bold"
            >
              WHO WE ARE
            </div>

            <div class="section-spacer-sm"></div>

            <div class="font-size-responsive-md text-dimmed">
              Great eyewear doesn't need a factory floor. Every Shaded pair is
              cut, fitted and hand-checked in our Kenwyn studio, finished by the
              same hands that started it all. We keep runs small on purpose:
              fewer frames, more attention on each one.

              <br /><br />That means tighter tolerances on the fit, better
              control over the lens tint, and the freedom to scrap a pair that
              isn't right instead of shipping it anyway.
            </div>

            <div class="section-spacer-sm"></div>

            <!-- feature list -->
            <div>
              <div
                v-for="(f, i) in aboutFeatures"
                :key="f.title"
                class="row items-start q-py-md"
                :style="
                  i === 0
                    ? 'border-top: 1px solid rgba(255, 255, 255, 0.08); border-bottom: 1px solid rgba(255, 255, 255, 0.08)'
                    : 'border-bottom: 1px solid rgba(255, 255, 255, 0.08)'
                "
              >
                <q-icon
                  :name="f.icon"
                  color="primary"
                  size="20px"
                  class="q-mr-md q-mt-xs"
                />
                <div>
                  <div class="font-size-responsive-md text-light text-bold">
                    {{ f.title }}
                  </div>
                  <div class="font-size-responsive-md text-dimmed q-mt-xs">
                    {{ f.text }}
                  </div>
                </div>
              </div>
            </div>

            <div class="section-spacer-md"></div>

            <div>
              <q-btn
                dense
                no-caps
                rounded
                to="/sunglasses"
                label="Meet the frames"
                icon-right="eva-arrow-forward-outline"
                text-color="dark"
                class="btn-gradient-primary icon-btn q-px-xl q-py-md text-subtitle1 text-bold"
              />
            </div>
          </div>
        </div>

        <div class="section-spacer-md"></div>

        <!-- intro copy -->
        <div
          class="stat-intro text-light font-size-responsive-md text-center text-dimmed"
        >
          Started with a simple goal: to make eyewear that feels good to wear
          every day. Every frame is cut, fitted, and hand-checked in our Kenwyn
          studio - from the lens tint to the hinge tension.
        </div>

        <div class="section-spacer-sm"></div>

        <!-- stat row -->
        <div class="stat-inline text-center">
          <div class="row justify-center items-start">
            <div
              v-for="(s, i) in stats"
              :key="s.label"
              class="col-4 col-md-auto stat-inline-item"
              :class="i < stats.length - 1 ? 'stat-inline-item--bordered' : ''"
            >
              <div
                class="font-size-responsive-xl archivo text-light text-bold"
                style="line-height: 1"
              >
                {{ s.value }}
              </div>
              <div class="font-size-responsive-xs text-dimmed q-mt-xs">
                {{ s.label }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section-spacer-md"></div>
    </section>

    <!--------------------------------------------------------------------- FRAMES SECTION -------------------------------------------------->
    <section class="q-px-md q-md-px-0">
      <div class="section-spacer-lg"></div>
      <div class="constrain">
        <div>
          <div class="overline text-dimmed text-caption q-mb-xs">
            THE COLLECTION
          </div>
          <div class="row justify-between">
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
    <section class="q-px-md q-md-px-0" id="about-section">
      <div class="section-spacer-lg"></div>

      <div class="constrain">
        <!-- section heading -->
        <div class="q-mb-xl">
          <!-- <div class="text-center overline text-dimmed text-caption q-mb-xs">
            HOW WE OPERATE
          </div> -->
          <div
            class="text-center font-size-responsive-giant archivo text-light text-bold"
          >
            OUR SERVICES
          </div>
        </div>

        <!-- cards -->
        <div class="row q-col-gutter-lg">
          <!-- 01 -->
          <div class="col-12 col-md-4">
            <div class="service-tile full-height">
              <div class="row items-center justify-between q-mb-lg">
                <q-icon name="eva-shield-outline" color="primary" size="28px" />
                <div class="overline text-dimmed text-caption">01</div>
              </div>
              <div class="font-size-responsive-md archivo text-light q-mb-sm">
                PAID WITH YOCO
              </div>
              <div class="font-size-responsive-sm text-dimmed">
                Card, EFT and instant payments, secured end to end at checkout.
              </div>
            </div>
          </div>

          <!-- 02 -->
          <div class="col-12 col-md-4">
            <div class="service-tile full-height">
              <div class="row items-center justify-between q-mb-lg">
                <q-icon name="eva-car-outline" color="primary" size="28px" />
                <div class="overline text-dimmed text-caption">02</div>
              </div>
              <div class="font-size-responsive-md archivo text-light q-mb-sm">
                FAST AND RELIABLE
              </div>
              <div class="font-size-responsive-sm text-dimmed">
                Cape Town deliveries within two working days, tracked all the
                way.
              </div>
            </div>
          </div>

          <!-- 03 -->
          <div class="col-12 col-md-4">
            <div class="service-tile full-height">
              <div class="row items-center justify-between q-mb-lg">
                <q-icon
                  name="eva-shopping-bag-outline"
                  color="primary"
                  size="28px"
                />
                <div class="overline text-dimmed text-caption">03</div>
              </div>
              <div class="font-size-responsive-md archivo text-light q-mb-sm">
                DOORSTEP PICKUP
              </div>
              <div class="font-size-responsive-sm text-dimmed">
                Collect at 65 Stockley Road, Kenwyn — open weekdays 08:00 to
                17:00.
              </div>
            </div>
          </div>

          <!-- 04 -->
          <div class="col-12 col-md-4">
            <div class="service-tile full-height">
              <div class="row items-center justify-between q-mb-lg">
                <q-icon
                  name="eva-shield-check-outline"
                  color="primary"
                  size="28px"
                />
                <div class="overline text-dimmed text-caption">04</div>
              </div>
              <div class="font-size-responsive-md archivo text-light q-mb-sm">
                2 YEAR WARRANTY
              </div>
              <div class="font-size-responsive-sm text-dimmed">
                Every frame is covered for two years against defects in
                materials and craftsmanship.
              </div>
            </div>
          </div>

          <!-- 05 -->
          <div class="col-12 col-md-4">
            <div class="service-tile full-height">
              <div class="row items-center justify-between q-mb-lg">
                <q-icon
                  name="eva-refresh-outline"
                  color="primary"
                  size="28px"
                />
                <div class="overline text-dimmed text-caption">05</div>
              </div>
              <div class="font-size-responsive-md archivo text-light q-mb-sm">
                EASY RETURNS
              </div>
              <div class="font-size-responsive-sm text-dimmed">
                Not the right fit? Return within 14 days for a full refund — no
                questions asked.
              </div>
            </div>
          </div>

          <!-- 06 -->
          <div class="col-12 col-md-4">
            <div class="service-tile full-height">
              <div class="row items-center justify-between q-mb-lg">
                <q-icon
                  name="eva-message-circle-outline"
                  color="primary"
                  size="28px"
                />
                <div class="overline text-dimmed text-caption">06</div>
              </div>
              <div class="font-size-responsive-md archivo text-light q-mb-sm">
                DIRECT SUPPORT
              </div>
              <div class="font-size-responsive-sm text-dimmed">
                Questions about fit, tint or warranty? Message us — a real
                person replies, usually within a day.
              </div>
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
          src="~src/assets/homepage/sunglasses-2.png"
          alt="Aviator sunglasses"
          class="limited-runs-image"
        />
      </div>
    </section>

    <!--------------------------------------------------------------------- REVIEWS SECTION -------------------------------------------------->
    <section
      class="q-px-md q-md-px-0 bg-dark"
      style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
    >
      <div class="section-spacer-md"></div>

      <div class="constrain">
        <div>
          <div class="overline text-dimmed text-caption q-mb-xs">
            SUN-BLEACHED REVIEWS
          </div>
          <div class="font-size-responsive-giant archivo text-light">
            OUR HAPPY CUSTOMERS
          </div>
        </div>

        <div class="section-spacer-sm"></div>

        <div class="row q-col-gutter-lg">
          <div v-for="(review, i) in reviews" :key="i" class="col-12 col-md-4">
            <q-card
              flat
              bordered
              class="bg-dark-secondary full-height q-pa-lg"
              style="
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 4px;
              "
            >
              <!-- stars -->
              <div class="row items-center">
                <q-icon
                  v-for="n in 5"
                  :key="n"
                  name="eva-star"
                  color="primary"
                  size="16px"
                />
              </div>

              <!-- quote -->
              <div class="font-size-responsive-sm text-dimmed q-mt-md">
                "{{ review.text }}"
              </div>

              <!-- divider -->
              <div
                class="q-my-md"
                style="height: 1px; background-color: rgba(255, 255, 255, 0.08)"
              ></div>

              <!-- author -->
              <div class="font-size-responsive-sm archivo text-light">
                {{ review.name }}
              </div>
              <div class="text-caption text-dimmed q-mt-xs">
                {{ review.model }} · {{ review.location }}
              </div>
            </q-card>
          </div>
        </div>
      </div>

      <div class="section-spacer-md"></div>
    </section>

    <!-- <div style="background-color: #f5f5f5">
      <div
        class="q-pa-md about-us-height"
        id="about-us"
        style="background-color: #f5f5f5; border-radius: 10px"
      >
        <q-card-section
          class="row items-center"
          style="
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          "
        >
          <div class="col-12 col-md-6 row justify-center q-pa-md">
            <q-img
              src="~src/assets/homepage/insta1.jpg"
              style="
                width: 50%;
                border-radius: 1%;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              "
            />
          </div>
          <div
            class="col-12 col-md-5 font-size-responsive-md about-us-text"
            style="padding: 20px"
          >
            <span class="font-size-responsive-hero anton-regular">About Us</span
            ><br /><br />
            <p style="color: #555">
              Founded in 2023, Shaded Eyewear offers affordable, stylish glasses
              for every season. Our mission is to provide high-quality eyewear
              that complements any look, whether it's sunny summer days or cool
              winter evenings. Our target market consist of both male and
              female, who prioritize quality, style and affordability. Our
              product line will encompass various styles, including wayfarers,
              oval, geometric, semi-rimless and round sunglasses, catering to
              different preferences. <br /><br />
              We believe in making fashionable eyewear accessible to everyone,
              without compromising on quality or style.
            </p>
          </div>
        </q-card-section>
      </div>
    </div> -->

    <!--------------------------------------------------------------------- IMAGE SECTION SECTION -------------------------------------------------->
    <!-- <div class="row flex-center" style="position: relative">
      <div class="col-12 col-md-6">
        <q-img src="~src/assets/homepage/stock1.jpg" />
      </div>
      <div class="col-12 col-md-6">
        <q-img src="~src/assets/homepage/stock3.png" />
      </div>
      <div
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.3);
        "
      >
        <div
          class="font-size-responsive-hero"
          style="color: white; text-align: center"
        >
          <p class="anton-regular">
            FIND YOUR PERFECT FIT <br /><span
              class="font-size-responsive-xxl caveat"
              >With Shaded Eyewear</span
            >
          </p>
        </div>
      </div>
    </div> -->
  </q-page>
</template>

<script>
import SunglassesList from "src/components/user/SunglassesList.vue";

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
      ],
      stats: [
        { value: "2 YEAR", label: "FRAME WARRANTY" },
        { value: "100%", label: "HAND-CHECKED BEFORE DISPATCH" },
        { value: "4.9 STAR", label: "AVERAGE REVIEW" },
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
    };
  },
  components: {
    SunglassesList,
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
  overflow: hidden
.hero-image
  width: 100%
  height: 100vh
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


.service-tile
  position: relative
  padding: 28px
  border-radius: 12px
  background: rgba(255, 255, 255, 0.03)
  border: 1px solid rgba(255, 255, 255, 0.08)
  backdrop-filter: blur(12px)
  -webkit-backdrop-filter: blur(12px)
  transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease

  // corner highlight — the "glass catching light" effect
  &::before
    content: ''
    position: absolute
    inset: 0
    border-radius: 12px
    pointer-events: none
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 40%)

  &:hover
    background: rgba(255, 255, 255, 0.05)
    border-color: rgba(255, 255, 255, 0.15)
    transform: translateY(-2px)

// ---------- STAT STRIP ----------
.stat-inline-item
  padding: 0 40px

  @media (max-width: 1023px)
    padding: 0 16px

.stat-inline-item--bordered
  border-right: 1px solid rgba(255, 255, 255, 0.1)

.stat-intro
  max-width: 900px
  margin: 0 auto

.stat-inline-item
  padding: 0 40px

  @media (max-width: 1023px)
    padding: 0 16px

.stat-inline-item--bordered
  border-right: 1px solid rgba(255, 255, 255, 0.1)

  @media (max-width: 1023px)
    border-right: none
</style>
