<template>
  <q-page>
    <div>
      <q-img src="~src/assets/stock/1.jpg" alt="Hero Image" style="width: 100%; height: 100vh;" >
        <q-card class="absolute-full row justify-start items-center">
          <div style="width: 5%;"></div>
          <q-card-section>
            <div>
              <p class="font-size-responsive-hero anton-regular q-mb-md">CATCH THE SUN<br>WEAR THE SHADE</p>
              <p class="font-size-responsive-xxl caveat q-mb-lg">Protecting your eyes and elevating your style.</p>
            </div>
            <div>
              <q-btn rounded dense label="shop our catalogue" color="white" text-color="accent" class="q-px-md q-mr-md anton-regular font-size-responsive-lg" />
              <q-btn rounded dense outlined label="discover more" text-color="white" class="q-px-md anton-regular font-size-responsive-lg" style="border: 2px solid white;" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-btn to="/" size="12px" icon="" flat />
          </q-card-section>
        </q-card>
      </q-img>
    </div>

    <div class="row flex-center" style="position: relative;">
      <div class="col-12 col-md-6">
        <q-img src="~src/assets/stock.jpg" style="height: 60vh;" />
      </div>
      <div class="col-12 col-md-6">
        <q-img src="~src/assets/stock4.jpg" style="height: 60vh;" />
      </div>
      <div class="overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.3);">
        <div class="text" style="color: white; font-size: 2em; text-align: center;">
          <p class="font-size-responsive-xxxl anton-regular q-mb-lg">FIND YOUR PERFECT FIT</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
