<template>
  <q-page class="gradient-bg">
    <HeroSection />
    <!-- <div class="section-spacer-lg"></div> -->

    <WhoWeAreSection />

    <DividingSection />

    <GallerySection />

    <FramesSection />

    <ServicesSection />

    <LimitedRunsSection />
  </q-page>
</template>

<script>
import HeroSection from "src/components/home/HeroSection.vue";
import WhoWeAreSection from "src/components/home/WhoWeAreSection.vue";
import DividingSection from "src/components/home/DividingSection.vue";
import GallerySection from "src/components/home/GallerySection.vue";
import FramesSection from "src/components/home/FramesSection.vue";
import ServicesSection from "src/components/home/ServicesSection.vue";
import LimitedRunsSection from "src/components/home/LimitedRunsSection.vue";

export default {
  name: "HomePage",
  components: {
    HeroSection,
    WhoWeAreSection,
    DividingSection,
    GallerySection,
    FramesSection,
    ServicesSection,
    LimitedRunsSection,
  },
};
</script>
