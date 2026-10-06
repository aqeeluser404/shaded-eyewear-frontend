<template>
  <q-page>
    <!------------------------------------------------------------ IMAGES + DUO IMAGES PANEL --------------------------------------------->
    <section class="gradient-bg q-px-md text-light q-md-px-0">
      <div class="constrain">
        <div class="section-spacer-sm"></div>

        <div>
          <q-btn
            dense
            no-caps
            flat
            label="Catalogue"
            to="/sunglasses"
            icon="eva-arrow-back-outline"
            class="custom-button icon-btn font-size-responsive-sm text-light"
          />
        </div>
        <div class="section-spacer-xs"></div>

        <q-card flat class="bg-transparent row justify-center items-start">
          <!-- LEFT: gallery -->
          <div class="col-12 col-md-7">
            <div class="product-gallery q-mr-none q-mr-md-xl">
              <div
                class="gallery-stage"
                :class="{ 'gallery-stage--loading': loading }"
              >
                <div
                  v-if="loading"
                  class="skeleton-line skeleton-line--hero"
                ></div>

                <template v-else>
                  <q-img
                    v-if="mainImage"
                    :src="getImageUrl(mainImage)"
                    class="stage-image"
                    fit="contain"
                  />

                  <div class="thumb-dock">
                    <button
                      v-for="img in sunglasses.images"
                      :key="img.imageUrl"
                      class="thumb-circle"
                      :class="{
                        'thumb-circle--active': mainImage === img.imageUrl,
                      }"
                      @click="updateMainImage(img.imageUrl)"
                    >
                      <q-img :src="getImageUrl(img.imageUrl)" fit="cover" />
                    </button>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- RIGHT: details -->
          <div
            class="col-12 col-md-5"
            :class="$q.screen.gt.md ? 'q-md-mt-none' : 'q-mt-xl'"
          >
            <!-- skeleton block -->
            <template v-if="loading">
              <div class="skeleton-line skeleton-line--sm q-mb-md"></div>

              <div class="skeleton-line skeleton-line--hero q-mb-md"></div>

              <div class="skeleton-line skeleton-line--md q-mb-xl"></div>

              <div class="row items-center q-gutter-md q-mb-xl">
                <div class="skeleton-line skeleton-line--btn"></div>
                <div class="skeleton-line skeleton-line--btn"></div>
              </div>

              <div class="skeleton-line skeleton-line--full q-mb-sm"></div>
              <div class="skeleton-line skeleton-line--full q-mb-sm"></div>
              <div class="skeleton-line skeleton-line--md q-mb-xl"></div>

              <div
                v-for="n in 4"
                :key="'spec-skel-' + n"
                class="row justify-between items-center q-py-md"
                style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
              >
                <div class="skeleton-line skeleton-line--xs"></div>
                <div class="skeleton-line skeleton-line--xs"></div>
              </div>
            </template>

            <!-- real content -->
            <template v-else>
              <div class="overline text-dimmed text-caption q-mb-xs">
                DESCRIPTION
              </div>

              <div
                class="font-size-responsive-giant archivo text-light text-uppercase"
              >
                {{ sunglasses.model }}
              </div>

              <div
                class="font-size-responsive-xxl text-gradient-primary archivo text-light"
              >
                R {{ sunglasses.price }}.00
              </div>

              <div class="section-spacer-sm large-screen-only"></div>
              <div class="section-spacer-xs small-screen-only"></div>

              <div
                class="row justify-start items-center font-size-responsive-sm"
              >
                <div>
                  <q-btn
                    @click="addToCart"
                    color="white"
                    text-color="black"
                    rounded
                    dense
                    no-caps
                    label="Add to cart"
                    class="btn-gradient-primary q-px-xl q-py-md q-mr-md text-subtitle1 rounded-button text-bold"
                  />
                  <q-btn
                    @click="navigateToCart"
                    label="View cart"
                    rounded
                    dense
                    no-caps
                    outline
                    color="grey"
                    text-color="grey"
                    class="q-px-xl q-py-md q-mr-md text-subtitle1 rounded-button text-bold"
                  />
                </div>
                <div class="font-size-responsive-sm text-dimmed">
                  {{ sunglasses.stock }} in stock
                </div>
              </div>

              <div class="section-spacer-sm large-screen-only"></div>
              <div class="section-spacer-xs small-screen-only"></div>

              <div>
                <div class="font-size-responsive-sm text-dimmed">
                  {{ sunglasses.description }}
                </div>
              </div>

              <div class="section-spacer-sm large-screen-only"></div>
              <div class="section-spacer-xs small-screen-only"></div>

              <div class="font-size-responsive-md">
                <div
                  class="bg-transparent q-py-sm font-size-responsive-sm text-dimmed row justify-between items-center"
                  style="
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                  "
                >
                  <div>Frame</div>
                  <div>N/A</div>
                </div>
                <div
                  class="bg-transparent q-py-sm font-size-responsive-sm text-dimmed row justify-between items-center"
                  style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                >
                  <div>Lens</div>
                  <div>N/A</div>
                </div>
                <div
                  class="bg-transparent q-py-sm font-size-responsive-sm text-dimmed row justify-between items-center"
                  style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                >
                  <div>Fit</div>
                  <div>N/A</div>
                </div>
                <div
                  class="bg-transparent q-py-sm font-size-responsive-sm text-dimmed row justify-between items-center"
                  style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
                >
                  <div>Weight</div>
                  <div>N/A</div>
                </div>
              </div>

              <div class="section-spacer-sm large-screen-only"></div>
              <div class="section-spacer-xs small-screen-only"></div>

              <div class="row items-center">
                <q-icon name="eva-shield-outline" color="primary" size="24px" />
                <span class="font-size-responsive-sm text-dimmed q-ml-sm">
                  Deliveries made in Cape Town · pickup available in Kenwyn
                </span>
              </div>
            </template>
          </div>
        </q-card>
      </div>
      <div class="section-spacer-md"></div>
    </section>

    <!------------------------------------------------------------ RELATED PRODUCTS PANEL --------------------------------------------->
    <section
      class="bg-dark q-px-md text-light q-md-px-0"
      :class="$q.screen.gt.md ? 'q-md-mt-none' : 'q-mt-xl'"
      style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
    >
      <div class="section-spacer-md"></div>
      <div class="constrain">
        <div class="overline text-dimmed text-caption">You may also like</div>
        <div class="font-size-responsive-giant archivo text-light text-bold">
          Related frames
        </div>

        <div class="section-spacer-sm"></div>

        <div class="related-scroll-wrap">
          <q-btn
            v-if="canScrollLeft"
            round
            dense
            icon="eva-arrow-back-outline"
            color="white"
            class="scroll-arrow scroll-arrow--left"
            @click="scrollRelated(-1)"
          />

          <div
            class="related-scroll"
            ref="relatedScroll"
            @scroll="updateScrollState"
          >
            <template v-if="loadingRelated">
              <q-card
                v-for="n in 3"
                :key="'rel-skel-' + n"
                flat
                class="related-card bg-dark-secondary row items-center no-wrap"
              >
                <div class="related-image-wrap">
                  <div
                    class="skeleton-line skeleton-line--avatar"
                    style="border-radius: 4px"
                  ></div>
                </div>
                <div class="column q-pl-md related-info full-width">
                  <div class="skeleton-line skeleton-line--md q-mb-sm"></div>
                  <div class="skeleton-line skeleton-line--full q-mb-sm"></div>
                  <div class="skeleton-line skeleton-line--sm"></div>
                </div>
              </q-card>
            </template>

            <template v-else>
              <q-card
                v-for="sunglass in allSunglasses"
                :key="sunglass._id"
                flat
                class="related-card bg-dark-secondary row items-center no-wrap cursor-pointer"
                @click="viewSunglassesDetails(sunglass._id)"
              >
                <div class="related-image-wrap">
                  <q-img
                    v-if="sunglass.images && sunglass.images.length > 0"
                    :src="getImageUrl(sunglass.images[0].imageUrl)"
                    class="related-image"
                    fit="contain"
                  />
                </div>

                <div class="column q-pl-md related-info">
                  <div
                    class="font-size-responsive-md archivo text-light text-bold"
                  >
                    {{ sunglass.model }}
                  </div>
                  <div class="text-caption text-dimmed related-description">
                    {{ sunglass.description }}
                  </div>
                  <div class="text-gradient-primary archivo text-bold q-mt-xs">
                    R {{ sunglass.price }}.00
                  </div>
                </div>
              </q-card>
            </template>
          </div>

          <q-btn
            v-if="canScrollRight"
            round
            dense
            icon="eva-arrow-forward-outline"
            color="white"
            class="scroll-arrow scroll-arrow--right"
            @click="scrollRelated(1)"
          />
        </div>
      </div>
      <div class="section-spacer-md"></div>
    </section>
  </q-page>
</template>

<script>
import SunglassesService from "src/services/SunglassesService";
import UserService from "src/services/UserService";
import OrderService from "src/services/OrderService";
import Helper from "src/services/utils";
import CryptoJS from "crypto-js";

export default {
  name: "SunglassesDetailsPage",

  data() {
    return {
      loadingRelated: true, // related products

      // ORDER DATA STRUCTURE
      orderData: {
        sunglasses: [{ _id: "", quantity: 1 }],
        user: "",
      },
      currentOrderId: localStorage.getItem("currentOrderId") || null,

      // GET DATA
      sunglasses: {},
      allSunglasses: [],
      userDetails: {},
      userTokenDetails: { _id: "", username: "", userType: "" },

      // CAROUSEL
      currentSlide: 0,
      itemsPerPage: 3,

      mainImage: "",
      loading: true,

      canScrollLeft: false,
      canScrollRight: false,
    };
  },
  computed: {
    visibleSunglasses() {
      const start = this.currentSlide * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const totalItems = this.allSunglasses.length;

      if (totalItems <= this.itemsPerPage) {
        return this.allSunglasses;
      }
      const visibleItems = [];
      for (let i = start; i < end; i++) {
        visibleItems.push(this.allSunglasses[i % totalItems]);
      }
      return visibleItems;
    },
  },
  beforeMount() {
    this.fetchSunglassesDetails();
    this.fetchAllSunglasses();
    this.updateItemsPerPage();
    window.addEventListener("resize", this.updateItemsPerPage);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateItemsPerPage);
  },
  watch: {
    "$route.params.id": "fetchSunglassesDetails",
    sunglasses: {
      handler(newValue) {
        if (newValue.images && newValue.images.length > 0) {
          this.mainImage = newValue.images[0].imageUrl;
        }
      },
      immediate: true,
      deep: true,
    },
    loadingRelated(newVal) {
      if (!newVal) {
        this.$nextTick(() => this.updateScrollState());
      }
    },
  },
  methods: {
    scrollRelated(direction) {
      const el = this.$refs.relatedScroll;
      if (!el) return;
      const cardWidth = 380 + 24;
      el.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
    },

    updateScrollState() {
      const el = this.$refs.relatedScroll;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;

      this.canScrollLeft = scrollLeft > 4; // small threshold avoids flicker at exact 0
      this.canScrollRight = scrollLeft < scrollWidth - clientWidth - 4;
    },

    viewSunglassesDetails(id) {
      Helper.viewSunglassesDetails(id, this.$router);
    },
    navigateToCart() {
      this.$router.push("/cart");
    },
    getImageUrl: Helper.getImageUrl,
    nextSlide() {
      this.currentSlide =
        (this.currentSlide + 1) %
        Math.ceil(this.allSunglasses.length / this.itemsPerPage);
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide -
          1 +
          Math.ceil(this.allSunglasses.length / this.itemsPerPage)) %
        Math.ceil(this.allSunglasses.length / this.itemsPerPage);
    },
    updateItemsPerPage() {
      this.itemsPerPage = window.innerWidth <= 1024 ? 1 : 3;
    },
    async fetchAllSunglasses() {
      this.loadingRelated = true;
      try {
        const response = await SunglassesService.findAllSunglasses();
        this.allSunglasses = response;
      } finally {
        this.loadingRelated = false;
      }
    },
    async fetchSunglassesDetails() {
      this.loading = true;
      try {
        const encryptedId = this.$route.params.id;
        const decryptedBytes = CryptoJS.AES.decrypt(
          decodeURIComponent(encryptedId),
          "secret-key"
        );
        const decryptedId = decryptedBytes.toString(CryptoJS.enc.Utf8);

        const response = await SunglassesService.findSunglassesById(
          decryptedId
        );
        this.sunglasses = response;
      } finally {
        this.loading = false;
      }
    },
    async addToCart() {
      if (!this.userTokenDetails._id) {
        this.$q.notify({
          type: "negative",
          message: "Please login to continue.",
        });
        return;
      }

      this.$q.loading.show({
        message: "Adding to cart...",
      });

      try {
        if (!this.currentOrderId) {
          await this.createOrder();
        } else {
          const orderExists = await this.checkOrderExists(this.currentOrderId);
          if (orderExists) {
            await this.updateOrder();
          } else {
            await this.createOrder();
          }
        }
        this.$q.notify({
          type: "positive",
          color: "primary",
          message: `Added to cart`,
        });
        await this.fetchSunglassesDetails();
      } catch (error) {
        console.error("Error adding to cart:", error);
        this.$q.notify({
          type: "negative",
          message: "Could not add to cart. Please try again.",
        });
      } finally {
        this.$q.loading.hide();
      }
    },
    async checkOrderExists(orderId) {
      if (!orderId) {
        return false;
      }
      try {
        const response = await OrderService.findOrderById(orderId);
        return response !== null;
      } catch (error) {
        return false;
      }
    },
    async createOrder() {
      this.orderData.user = this.userDetails._id;
      this.orderData.sunglasses[0]._id = this.sunglasses._id;
      try {
        const response = await OrderService.createOrder(
          this.userDetails._id,
          this.orderData
        );
        this.currentOrderId = response.order._id;
        localStorage.setItem("currentOrderId", this.currentOrderId);
      } catch (error) {
        console.error("Error creating order: ", error);
      }
    },
    async updateOrder() {
      const orderId = this.currentOrderId;
      try {
        this.orderData.sunglasses[0]._id = this.sunglasses._id;
        await OrderService.updateOrder(orderId, this.orderData);
      } catch (error) {
        console.error("Error updating order:", error);
      }
    },
    async getUserDetails() {
      const token = await Helper.getCookie("token");

      if (token) {
        const id = await UserService.FindUserByToken();
        this.userTokenDetails = id;
        const user = await UserService.findUserById(this.userTokenDetails._id);
        this.userDetails = user;
      }
    },
    updateMainImage(image) {
      this.mainImage = image;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.updateScrollState();
      window.addEventListener("resize", this.updateScrollState);
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.updateScrollState);
  },
  created() {
    this.getUserDetails();
  },
};
</script>

<style lang="sass" scoped>
.image
  width: 100%

.active-image
  border: 2px solid lightgrey

.sunglasses-grid
  gap: 24px

// ---------- product gallery ----------
.product-gallery
  padding-bottom: 36px

.gallery-stage
  position: relative
  background: #ffffff
  border-radius: 28px
  box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.35)
  padding: 48px 40px 60px

.stage-image
  width: 100%
  height: 100%

.thumb-dock
  position: absolute
  bottom: -28px
  left: 50%
  transform: translateX(-50%)
  display: flex
  gap: 16px
  background: #ffffff
  padding: 8px
  border-radius: 999px
  box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.4)

.thumb-circle
  width: 56px
  height: 56px
  border-radius: 50%
  overflow: hidden
  border: 4px solid transparent
  padding: 0
  cursor: pointer
  background: #f4f4f4
  transition: border-color 0.2s ease, transform 0.2s ease
  &:hover
    transform: translateY(-2px)
  &.thumb-circle--active
    border-color: var(--q-primary)

// ---------- related products ----------
.related-scroll-wrap
  position: relative
  display: flex
  align-items: center

.related-scroll
  display: flex
  gap: 24px
  overflow-x: auto
  scroll-snap-type: x proximity
  padding-top: 8px    // room for the hover lift
  padding-bottom: 8px
  margin-top: -8px    // cancel the extra top padding visually
  -webkit-overflow-scrolling: touch
  scroll-behavior: smooth

  scrollbar-width: thin
  &::-webkit-scrollbar
    height: 6px
  &::-webkit-scrollbar-thumb
    background: rgba(255, 255, 255, 0.15)
    border-radius: 999px

.related-card
  border: 1px solid rgba(255, 255, 255, 0.1)
  border-radius: 4px
  padding: 20px
  scroll-snap-align: start
  flex: 0 0 380px
  max-width: 380px
  transition: border-color 0.2s ease, transform 0.2s ease
  &:hover
    border-color: rgba(255, 255, 255, 0.25)
    transform: translateY(-2px)

.related-image-wrap
  background-color: #ffffff
  width: 96px
  height: 96px
  flex-shrink: 0
  display: flex
  align-items: center
  justify-content: center

.related-image
  width: 80%
  height: 80%

.related-info
  min-width: 0

.related-description
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  max-width: 100%

.scroll-arrow
  position: absolute
  top: 50%
  transform: translateY(-50%)
  z-index: 2
  background: rgba(0, 0, 0, 0.6)
  backdrop-filter: blur(4px)

  &--left
    left: -8px

  &--right
    right: -8px

.gallery-stage--loading
  background: transparent
  box-shadow: none
  padding: 0
</style>
