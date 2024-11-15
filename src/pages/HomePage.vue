<template>
  <q-page>
    <div>
      <!-- style="width: 100%; height: 100vh;"  -->
      <q-img src="~src/assets/stock/1.jpg" alt="Hero Image" class="hero-image" >
        <q-card class="absolute-full row justify-start items-center">
          <div style="width: 5%;"></div>
          <q-card-section>
            <div>
              <p class="font-size-responsive-hero anton-regular q-mb-md">CATCH THE SUN<br>WEAR THE SHADE</p>
              <p class="font-size-responsive-xxl caveat q-mb-lg">Protecting your eyes and elevating your style.</p>
            </div>
            <div>
              <q-btn rounded dense label="shop our catalogue" to="/sunglasses" color="white" text-color="accent" class="q-px-md q-mr-md anton-regular font-size-responsive-lg" />
              <q-btn rounded dense outlined label="discover more" text-color="white" class="q-px-md anton-regular font-size-responsive-lg" style="border: 2px solid white;" />
            </div>
          </q-card-section>
        </q-card>
      </q-img>
    </div>

    <!-- about us -->
    <div class="constrain" style="height: 100%;">
      <!-- <q-item class="font-size-responsive-hero anton-regular row">

      </q-item> -->
      <q-item class="row items-center">

        <div class="font-size-responsive-sm col-12 col-md-6 " style="text-align: right;">

          <span class="font-size-responsive-hero anton-regular">ABOUT US</span><br>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Dicta tempora consequuntur accusamus sequi sit non architecto praesentium ab inventore tempore earum nam totam,
          corrupti veniam perferendis reiciendis, esse, temporibus dolorem.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          <br><br>
          <!-- Dicta tempora consequuntur accusamus sequi sit non architecto praesentium ab inventore tempore earum nam totam,
          corrupti veniam perferendis reiciendis, esse, temporibus dolorem. -->
        </div>

        <div class="col-12 col-md-6 row justify-center">

          <q-img src="~src/assets/homepage/insta1.jpg" style="width: 50%;" />
        </div>
      </q-item>

    </div>

    <!-- bottom images -->
    <div class="row flex-center" style="position: relative;">
      <div class="col-12 col-md-6">
        <q-img src="~src/assets/stock.jpg" style="height: 60vh;" />
      </div>
      <div class="col-12 col-md-6">
        <q-img src="~src/assets/stock4.jpg" style="height: 60vh;" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.3);">
        <div class="text" style="color: white; font-size: 2em; text-align: center;">
          <p class="font-size-responsive-hero anton-regular">FIND YOUR PERFECT FIT</p>
        </div>
      </div>
    </div>

    <!-- images from insta -->
    <div>

    </div>
  </q-page>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style lang="sass">
.hero-image
  width: 100%
  height: 100vh
  object-fit: cover

// @media (max-width: 600px)
//   .hero-image
//     transform: translateX(-20%)


</style>
