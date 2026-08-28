<template>
  <q-page>
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
                <div class="overline text-caption text-dimmed">
                  EST. 2023 · CAPE TOWN
                </div>
                <div class="section-spacer-sm"></div>
                <p class="font-size-responsive-hero archivo">
                  SHADE IS A <br />
                  <span class="text-gradient-primary">DISCIPLINE</span>
                </p>
                <div class="section-spacer-sm"></div>
                <p class="text-subtitle1 text-dimmed">
                  Small-run frames cut for the glare off Table Bay. Polarised,
                  UV400, and <br class="break-desktop" />
                  hand-checked before they leave Kenwyn.
                </p>
                <div class="section-spacer-sm"></div>
              </div>

              <div class="row justify-start items-center full-width">
                <q-btn
                  dense
                  label="Shop the catalogue"
                  to="/sunglasses"
                  text-color="dark"
                  class="btn-gradient-primary q-px-xl q-py-md q-mr-lg text-subtitle1 rounded-button text-bold"
                  no-caps
                  icon-right="eva-arrow-forward-outline"
                />

                <div
                  class="col-sm-6 col-12 text-subtitle1 text-dimmed q-mt-md q-md-mt-0"
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
                      class="text-subtitle1 text-uppercase marquee-item"
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

    <!--------------------------------------------------------------------- FRAMES SECTION -------------------------------------------------->

    <section class="bg-dark q-px-md q-md-px-0">
      <div class="section-spacer-md"></div>
      <div class="constrain">
        <div>
          <div class="overline text-dimmed">THE COLLECTION</div>
          <div class="row justify-between">
            <div class="font-size-responsive-giant archivo text-light">
              THREE FRAMES
            </div>
            <q-btn
              to="/sunglasses"
              class="custom-button q-py-sm font-size-responsive-sm text-light"
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
      <div class="section-spacer-md"></div>
    </section>

    <!--------------------------------------------------------------------- SERVICES SECTION -------------------------------------------------->


    <section class="bg-dark q-px-md q-md-px-0" style="border-top: 1px solid rgba(255, 255, 255, 0.2); border-bottom: 1px solid rgba(255, 255, 255, 0.2)">

      <div class="section-spacer-md"></div>

      <div class="constrain row justify-around items-center">

        <q-card flat class="bg-transparent text-light col-md-4 col-12 q-mb-xl q-md-mt-0">
          <div><q-icon name="eva-shield-outline" color="primary" size="32px" /></div>
          <div class="section-spacer-xs"></div>
          <div class="font-size-responsive-lg archivo q-mb-sm">PAID WITH YOCO</div>
          <div class="text-subtitle1 text-dimmed">Card, EFT and instant payments, secured end to end at checkout.</div>
        </q-card>

        <q-card flat class="bg-transparent text-light col-md-4 col-12 q-mb-xl q-md-mt-0">
          <div><q-icon name="eva-car-outline" color="primary" size="32px" /></div>
          <div class="section-spacer-xs"></div>
          <div class="font-size-responsive-lg archivo q-mb-sm">FAST AND RELIABLE</div>
          <div class="text-subtitle1 text-dimmed">Cape Town deliveries within two working days, tracked all the way.</div>
        </q-card>

        <q-card flat class="bg-transparent text-light col-md-4 col-12">
          <div><q-icon name="eva-shopping-bag-outline" color="primary" size="32px" /></div>
          <div class="section-spacer-xs"></div>
          <div class="font-size-responsive-lg archivo q-mb-sm">DOORSTEP PICKUP</div>
          <div class="text-subtitle1 text-dimmed">Collect at 65 Stockley Road, Kenwyn - open weekdays 08:00 to 17:00.</div>
        </q-card>
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
