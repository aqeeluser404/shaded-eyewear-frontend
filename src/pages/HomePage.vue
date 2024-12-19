<template>
  <q-page>

    <!--------------------------------------------------------------------- HERO SECTION -------------------------------------------------->
    <!-- alt image -->
    <div>
      <q-img v-if="$q.screen.gt.sm" src="~src/assets/homepage/hero1.jpg" alt="Hero Image" class="hero-image">
        <q-card class="absolute-full row justify-start items-center">
          <div style="width: 5%;"></div>
          <q-card-section>
            <div>
              <p class="font-size-responsive-hero anton-regular q-mb-md">CATCH THE SUN<br>WEAR THE SHADE</p>
              <p class="font-size-responsive-xxl caveat q-mb-lg">Protecting your eyes and elevating your style.</p>
            </div>
            <div>
              <q-btn rounded dense label="shop our catalogue" to="/sunglasses" color="white" text-color="accent" class="q-px-lg q-py-sm q-mr-md anton-regular font-size-responsive-lg" />
              <q-btn rounded dense @click="scrollToAboutUs" outlined label="about us" text-color="white" class="q-px-lg q-py-sm anton-regular font-size-responsive-lg" style="border: 2px solid white;" />
            </div>
          </q-card-section>
        </q-card>
      </q-img>

      <!-- small screen -->
      <q-img v-else src="~src/assets/homepage/hero2.jpg" alt="Hero Image" class="hero-image">
        <q-card class="absolute-full row justify-start items-center">
          <div style="width: 5%;"></div>
          <q-card-section>
            <div>
              <p class="font-size-responsive-hero anton-regular q-mb-md">CATCH THE SUN<br>WEAR THE SHADE</p>
              <p class="font-size-responsive-xxl caveat q-mb-lg">Protecting your eyes and elevating your style.</p>
            </div>
            <div>
              <q-btn rounded dense label="shop our catalogue" to="/sunglasses" color="white" text-color="accent" class="q-px-md q-py-sm q-mr-md anton-regular font-size-responsive-lg" 
              />
              <q-btn rounded dense outlined label="Read more" @click="scrollToAboutUs" text-color="white" class="q-px-md q-py-sm anton-regular font-size-responsive-lg" style="border: 2px solid white;" />
            </div>
          </q-card-section>
        </q-card>
      </q-img>
    </div>

        <!--------------------------------------------------------------------- ABOUT US SECTION -------------------------------------------------->
    <div style="background-color: #f5f5f5">
      <div class="q-pa-md about-us-height" id="about-us" style="background-color: #f5f5f5; border-radius: 10px;">

        <q-card-section class="row items-center" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <div class="col-12 col-md-6 row justify-center q-pa-md">
            <q-img src="~src/assets/homepage/insta1.jpg" style="width: 50%; border-radius: 1%; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
          </div>
          <div class="col-12 col-md-5 font-size-responsive-md about-us-text" style="padding: 20px;">
            <span class="font-size-responsive-hero anton-regular">About Us</span><br><br>
            <p style="color: #555;">
              Founded in 2023, Shaded Eyewear offers affordable, stylish glasses for every season. Our mission is to provide high-quality eyewear that complements any look, whether it's sunny summer days or cool winter evenings. Our target market consist of both male and female, who prioritize quality, style and affordability. Our product line will encompass various styles, including wayfarers, oval, geometric, semi-rimless and round sunglasses, catering to different preferences. <br><br> We believe in making fashionable eyewear accessible to everyone, without compromising on quality or style.
            </p>
          </div>
        </q-card-section>
        <!-- <br> -->
        <!-- <div class="row justify-center items-center">
          <div class="col-12 col-md-5 row justify-center">
            <q-img src="~src/assets/homepage/about.jpeg" style="width: 100%; border-radius: 1%;" />
          </div>
        </div> -->
      </div>
    </div>


    <!--------------------------------------------------------------------- IMAGE SECTION SECTION -------------------------------------------------->
    <div class="row flex-center" style="position: relative; " >
      <div class="col-12 col-md-6">
        <q-img src="~src/assets/homepage/stock1.jpg" />
      </div>
      <div class="col-12 col-md-6">
        <q-img src="~src/assets/homepage/stock3.png" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.3);">
        <div class="font-size-responsive-hero" style="color: white; text-align: center;">
          <p class="anton-regular">FIND YOUR PERFECT FIT <br><span class="font-size-responsive-xxl caveat">With Shaded Eyewear</span></p>
        </div>
      </div>
    </div>



  </q-page>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    scrollToAboutUs() {
      const aboutUsElement = document.getElementById('about-us');
      if (aboutUsElement) {
        aboutUsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
</script>

<style lang="sass">
.hero-image
  width: 100%
  height: 100vh
  object-fit: cover
  @media (max-width: 1024px)

.about-us-text
  text-align: left

@media (max-width: 1024px)
  .about-us-text
    text-align: center
    padding: 25px 50px 25px 50px

.about-us-height
  height: 100%

// @media (max-width: 1024px)
//   .about-us-height
//     height: 100vh
// @media (max-width: 900px)
//   .about-us-height
//     height: 100%

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
