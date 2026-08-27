<template>
  <q-page>
    <!--------------------------------------------------------------------- HERO SECTION -------------------------------------------------->
    <div>
      <div class="hero-wrapper">
        <q-img
          src="~src/assets/homepage/hero.jfif"
          alt="Hero Image"
          class="hero-image"
        >
          <q-card class="absolute-full" style="z-index: 1">
            <div class="full-height column justify-end items-start constrain">
              <q-card-section class="q-px-none">
                <div class="">
                  <p class="font-size-responsive-hero archivo">
                    SHADE IS A <br />
                    <span class="text-primary">DISCIPLINE</span>
                  </p>
                  <div class="section-spacer-sm"></div>
                  <p class="font-size-responsive-lg">
                    Small-run frames cut for the glare off Table Bay. Polarised,
                    UV400, and <br />
                    hand-checked before they leave Kenwyn.
                  </p>
                  <div class="section-spacer-sm"></div>
                </div>

                <div class="row justify-start items-center">
                  <q-btn
                    rounded
                    dense
                    label="Shop the catalogue"
                    to="/sunglasses"
                    color="primary"
                    text-color="dark"
                    class="q-px-lg q-py-md q-mr-lg font-size-responsive-md"
                    no-caps
                    icon-right="eva-arrow-forward-outline"
                  />

                  <div class="font-size-responsive-md">
                    Free delivery across Cape Town
                  </div>
                </div>
              </q-card-section>

              <div class="section-spacer-xs"></div>
              <div class="marquee-section q-py-md">
                <div class="marquee-track row no-wrap">
                  <div
                    v-for="i in 2"
                    :key="i"
                    class="row no-wrap marquee-group"
                  >
                    <span
                      v-for="t in items"
                      :key="t"
                      class=" archivo text-subtitle1 text-uppercase text-bold marquee-item"
                    >
                      {{ t }} <span class="text-primary">✳</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="section-spacer-xs"></div>
            </div>
          </q-card>
        </q-img>
      </div>
    </div>

    <!--------------------------------------------------------------------- ABOUT US SECTION -------------------------------------------------->

    <section class="bg-dark">
      <div class="section-spacer-xs"></div>
      <div class="constrain">
        <div>
          <div class="overline">EST. 2023 · CAPE TOWN</div>
          <div class="row justify-between">
            <div class="font-size-responsive-giant archivo text-light">THREE FRAMES</div>
            <q-btn to="/sunglasses" class="custom-button q-py-sm font-size-responsive-sm" label="View all" :ripple="false" no-caps flat rounded />

          </div>
        </div>

      </div>
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
    <div class="row flex-center" style="position: relative">
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
    </div>
  </q-page>
</template>

<script>
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
    };
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

.marquee-track
  width: max-content
  animation: marquee-scroll 20s linear infinite

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

<!-- <div class="constrain row items-center q-pa-md" style="height: 100%;">
  <div class="attribute col-12 col-md-3 text-center">
    <q-icon name="eva-shield-outline" size="5em" class="q-pa-md" />
    <p class="font-size-responsive-xxl caveat">Quality</p>
  </div>
  <div class="attribute col-12 col-md-3 text-center" >
    <q-icon name="eva-eye-outline" size="5em" class="q-pa-md" />
    <p class="font-size-responsive-xxl caveat">Design</p>
  </div>
  <div class="attribute col-12 col-md-3 text-center" >
    <q-icon name="eva-shield-outline" size="5em" class="q-pa-md" />
    <p class="font-size-responsive-xxl caveat">Quality</p>
  </div>
  <div class="attribute col-12 col-md-3 text-center" >
    <q-icon name="eva-eye-outline" size="5em" class="q-pa-md" />
    <p class="font-size-responsive-xxl caveat">Design</p>
  </div>
</div> -->
