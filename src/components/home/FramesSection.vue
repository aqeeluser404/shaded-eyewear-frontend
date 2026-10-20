<template>
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
            FEATURED <span class="text-gradient-primary">FRAMES</span>
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
        <SunglassesList
          mode="featured"
          :featuredNames="['Eclipse', 'Meridian', 'Atlantic']"
        />
      </div>
    </div>
    <div class="section-spacer-lg"></div>
  </section>
</template>

<script>
import SunglassesList from "src/components/user/SunglassesList.vue";

export default {
  name: "FramesSection",
  components: {
    SunglassesList,
  },
};
</script>
