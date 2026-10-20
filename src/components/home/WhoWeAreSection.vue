<template>
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
              :transition-duration="900"
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
        </div>
      </div>
    </div>
    <div class="section-spacer-lg"></div>
  </section>
</template>

<script>
import showcaseGlare from "src/assets/gallery/persons/g7.jpg";
import showcaseStudio from "src/assets/gallery/persons/g8.jpg";
import showcaseFrames from "src/assets/gallery/persons/g10.jpg";

export default {
  name: "WhoWeAreSection",
  data() {
    return {
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
  computed: {
    activeGlowColor() {
      const current = this.showcase.find((s) => s.name === this.slide);
      return current ? current.color : "transparent";
    },
  },
  mounted() {
    this.showcase.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  },
};
</script>

<style lang="sass" scoped>
.statement-label
  letter-spacing: 0.2em

.showcase-carousel
  border-radius: 0 !important
  border: 1px solid rgba(255, 255, 255, 0.1)
  background: #0a0a0a

.showcase-slide
  padding: 28px

.showcase-controls
  display: inline-flex
  align-items: center
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
  transition: --glow-color 0.9s ease-in-out

  &::before
    content: ''
    position: absolute
    inset: 10% -14% -10% 4%
    z-index: -1
    pointer-events: none
    border-radius: 50%
    background: radial-gradient(ellipse at 60% 50%, var(--glow-color) 0%, transparent 70%)
    filter: blur(90px)

  @media (max-width: 1023px)
    &::before
      inset: -6% -4%
      filter: blur(40px)
</style>
