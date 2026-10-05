<template>
  <div
    class="admin-sunglasses-details"
    :class="$q.screen.gt.sm ? 'q-pl-lg' : 'q-pl-none'"
  >
    <!-- Heading -->
    <section>
      <div class="row justify-between items-center">
        <div>
          <div class="overline-tight text-dimmed text-caption">
            ADMIN DASHBOARD
          </div>
          <div class="font-size-responsive-xl archivo text-light text-bold">
            INVENTORY
          </div>
        </div>

        <!-- Add button only visible when NOT showing the add form -->
        <q-btn
          v-if="!openAddSunglasses"
          rounded
          dense
          no-caps
          icon="eva-plus-outline"
          label="Add frame"
          text-color="dark"
          class="btn-gradient-primary icon-btn q-px-lg q-py-sm rounded-button text-subtitle1 text-bold"
          @click="toggleAddSunglasses"
        />
      </div>
    </section>

    <div class="section-spacer-sm"></div>

    <!--------------------------------------------------------------------- ADD FORM -------------------------------------------------->
    <template v-if="openAddSunglasses">
      <q-card
        flat
        bordered
        class="bg-dark-secondary"
        style="border: 1px solid rgba(255, 255, 255, 0.2)"
      >
        <!-- header with title + close button -->
        <q-card-section
          class="row justify-between items-center"
          style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
        >
          <div>
            <div class="font-size-responsive-md text-light text-bold">
              Add Sunglasses
            </div>
            <div class="text-caption text-dimmed">
              Upload a new frame to the store
            </div>
          </div>

          <q-btn
            rounded
            dense
            no-caps
            flat
            label="Close"
            icon="eva-close-outline"
            class="custom-button icon-btn text-subtitle1 text-dimmed q-px-lg q-py-sm"
            @click="toggleAddSunglasses"
          />
        </q-card-section>

        <q-card-section>
          <q-form
            @submit.prevent="addSunglasses"
            @reset="onReset"
            class="q-gutter-md"
            enctype="multipart/form-data"
          >
            <div class="row">
              <!-- Left column -->
              <div
                class="col-12 col-md-6"
                :class="$q.screen.gt.sm ? 'q-pr-md' : 'q-pr-none'"
              >
                <div class="overline-tight text-dimmed text-caption q-mb-xs">
                  MODEL NAME
                </div>
                <div class="field-shell">
                  <q-input
                    filled
                    dark
                    v-model="sunglassesDetails.model"
                    placeholder="e.g. Horizon"
                    class="custom-input"
                    input-style="color: white;"
                    :rules="[(val) => !!val || 'Required']"
                  />
                </div>

                <div
                  class="overline-tight text-dimmed text-caption q-mb-xs q-mt-md"
                >
                  DESCRIPTION
                </div>
                <div class="field-shell">
                  <q-input
                    filled
                    dark
                    v-model="sunglassesDetails.description"
                    type="textarea"
                    autogrow
                    placeholder="Max 50 words"
                    class="custom-input"
                    input-style="color: white;"
                    :rules="[(val) => !!val || 'Required']"
                  />
                </div>

                <div
                  class="overline-tight text-dimmed text-caption q-mb-xs q-mt-md"
                >
                  COLOR
                </div>
                <div class="field-shell">
                  <q-select
                    filled
                    dark
                    v-model="sunglassesDetails.color"
                    :options="colors"
                    option-label="label"
                    option-value="value"
                    emit-value
                    map-options
                    class="custom-input"
                    popup-content-class="period-select-menu"
                    :rules="[(val) => !!val || 'Required']"
                  />
                </div>
              </div>

              <!-- Right column -->
              <div class="col-12 col-md-6">
                <div class="overline-tight text-dimmed text-caption q-mb-xs">
                  PRICE (ZAR)
                </div>
                <div class="field-shell">
                  <q-input
                    filled
                    dark
                    v-model="sunglassesDetails.price"
                    type="number"
                    prefix="R"
                    placeholder="0"
                    class="custom-input"
                    input-style="color: white;"
                    :rules="[(val) => val > 0 || 'Price must be positive']"
                  />
                </div>

                <div
                  class="overline-tight text-dimmed text-caption q-mb-xs q-mt-md"
                >
                  STOCK
                </div>
                <div class="field-shell">
                  <q-select
                    filled
                    dark
                    v-model="sunglassesDetails.stock"
                    :options="[...Array(11).keys()].slice(1)"
                    emit-value
                    map-options
                    class="custom-input"
                    popup-content-class="period-select-menu"
                    :rules="[(val) => !!val || 'Required']"
                  />
                </div>

                <div
                  class="overline-tight text-dimmed text-caption q-mb-xs q-mt-md"
                >
                  IMAGE — SIDE VIEW
                </div>
                <div class="field-shell">
                  <q-file
                    filled
                    dark
                    v-model="image1"
                    accept="image/*"
                    class="custom-input"
                    input-style="color: white;"
                    :rules="[(val) => !!val || 'Required']"
                  />
                </div>

                <div
                  class="overline-tight text-dimmed text-caption q-mb-xs q-mt-md"
                >
                  IMAGE — FRONT VIEW
                </div>
                <div class="field-shell">
                  <q-file
                    filled
                    dark
                    v-model="image2"
                    accept="image/*"
                    class="custom-input"
                    input-style="color: white;"
                    :rules="[(val) => !!val || 'Required']"
                  />
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </template>

    <!--------------------------------------------------------------------- LIST -------------------------------------------------->
    <template v-else>
      <!-- loading skeleton -->
      <q-card
        v-if="loading"
        flat
        bordered
        class="bg-dark-secondary"
        style="border: 1px solid rgba(255, 255, 255, 0.2)"
      >
        <q-card-section
          class="row justify-between items-center"
          style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
        >
          <div>
            <div class="skeleton-line skeleton-line--md q-mb-sm"></div>
            <div class="skeleton-line skeleton-line--sm"></div>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <div
            v-for="n in 4"
            :key="'skel-' + n"
            class="row items-center q-px-md q-py-md"
            :style="
              n !== 4 ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.1)' : ''
            "
          >
            <div class="col-1">
              <div class="skeleton-line skeleton-line--thumb-sm"></div>
            </div>
            <div class="col-2">
              <div class="skeleton-line skeleton-line--md"></div>
            </div>
            <div class="col-2">
              <div class="skeleton-line skeleton-line--md"></div>
            </div>
            <div class="col-3">
              <div class="skeleton-line skeleton-line--md"></div>
            </div>
            <div class="col-2">
              <div class="skeleton-line skeleton-line--sm"></div>
            </div>
            <div class="col-2 row justify-end">
              <div class="skeleton-line skeleton-line--sm"></div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- real list -->
      <q-card
        v-else
        flat
        bordered
        class="bg-dark-secondary"
        style="border: 1px solid rgba(255, 255, 255, 0.2)"
      >
        <q-card-section
          class="row justify-between items-center"
          style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
        >
          <div>
            <div class="font-size-responsive-md text-light text-bold">
              All Sunglasses
            </div>
            <div class="text-caption text-dimmed">
              {{ sunglasses.length }}
              {{ sunglasses.length === 1 ? "frame" : "frames" }} in catalogue
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-none">
          <!-- header row -->
          <div
            class="row items-center q-px-lg q-py-md"
            style="border-bottom: 1px solid rgba(255, 255, 255, 0.1)"
          >
            <div
              class="col-1 text-dimmed font-size-responsive-xs text-bold"
            ></div>
            <div class="col-2 text-dimmed font-size-responsive-xs text-bold">
              MODEL
            </div>
            <div class="col-2 text-dimmed font-size-responsive-xs text-bold">
              ID
            </div>
            <div class="col-4 text-dimmed font-size-responsive-xs text-bold">
              DESCRIPTION
            </div>
            <div class="col-1 text-dimmed font-size-responsive-xs text-bold">
              PRICE
            </div>
            <div
              class="col-1 text-dimmed font-size-responsive-xs text-bold text-center"
            >
              STOCK
            </div>
            <div class="col-1"></div>
          </div>

          <!-- data rows -->
          <div
            v-for="(sunglass, index) in sunglasses"
            :key="sunglass._id"
            class="row items-center q-px-lg q-py-lg sunglass-row"
            :class="{ 'sunglass-row--editing': editMode === sunglass._id }"
            :style="
              index !== sunglasses.length - 1
                ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.1)'
                : ''
            "
          >
            <div class="col-1">
              <q-img
                :src="getImageUrl(sunglass.images[0].imageUrl)"
                alt="Sunglass"
                class="sunglass-thumb"
              />
            </div>

            <div class="col-2 q-pr-sm">
              <q-input
                v-if="editMode === sunglass._id"
                v-model="sunglass.model"
                dense
                outlined
                dark
                class="custom-input"
                input-style="color: white;"
              />
              <div v-else class="font-size-responsive-sm text-light text-bold">
                {{ sunglass.model }}
              </div>
            </div>

            <div class="col-2 q-pr-sm">
              <q-badge
                outline
                color="grey"
                text-color="grey"
                class="user-badge"
              >
                #{{ formatSunglassesId(sunglass) }}
              </q-badge>
            </div>

            <div class="col-4 q-pr-md">
              <q-input
                v-if="editMode === sunglass._id"
                v-model="sunglass.description"
                dense
                outlined
                dark
                type="textarea"
                autogrow
                class="custom-input"
                input-style="color: white;"
              />
              <div
                v-else
                class="font-size-responsive-xs text-dimmed limit-text-2"
              >
                {{ sunglass.description }}
              </div>
            </div>

            <div class="col-1 q-pr-sm">
              <q-input
                v-if="editMode === sunglass._id"
                v-model="sunglass.price"
                dense
                outlined
                dark
                type="number"
                prefix="R"
                class="custom-input"
                input-style="color: white;"
              />
              <div v-else class="font-size-responsive-sm text-gradient-primary">
                R{{ sunglass.price }}
              </div>
            </div>

            <div class="col-1 row justify-center">
              <q-input
                v-if="editMode === sunglass._id"
                v-model="sunglass.stock"
                dense
                outlined
                dark
                type="number"
                style="width: 70px"
                class="custom-input"
                input-style="color: white; text-align: center;"
              />
              <div
                v-else
                class="row items-center"
                :class="sunglass.stock < 3 ? 'text-negative' : 'text-light'"
              >
                <div
                  class="status-dot q-mr-xs"
                  :class="
                    sunglass.stock < 3
                      ? 'status-dot--low'
                      : 'status-dot--in-stock'
                  "
                ></div>
                <span class="font-size-responsive-sm text-dimmed q-ml-sm">{{
                  sunglass.stock
                }}</span>
              </div>
            </div>

            <div class="col-1 row justify-end">
              <template v-if="editMode !== sunglass._id">
                <q-btn
                  round
                  dense
                  flat
                  color="grey"
                  icon="eva-more-vertical-outline"
                  size="sm"
                >
                  <q-menu
                    anchor="bottom right"
                    self="top right"
                    class="row-actions-menu bg-dark-secondary"
                  >
                    <q-list dense>
                      <q-item
                        clickable
                        v-close-popup
                        @click="editMode = sunglass._id"
                      >
                        <!-- <q-item-section avatar><q-icon name="eva-edit-outline" size="18px" /></q-item-section> -->
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="deleteSunglasses(sunglass)"
                      >
                        <!-- <q-item-section avatar><q-icon name="eva-trash-2-outline" size="18px" color="negative" /></q-item-section> -->
                        <q-item-section class="text-negative"
                          >Delete</q-item-section
                        >
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </template>
              <template v-else>
                <q-btn
                  rounded
                  dense
                  no-caps
                  flat
                  color="primary"
                  text-color="primary"
                  icon="eva-checkmark-outline"
                  size="sm"
                  @click="updateSunglasses(sunglass)"
                />
                <q-btn
                  rounded
                  dense
                  no-caps
                  flat
                  color="grey"
                  text-color="grey"
                  icon="eva-close-outline"
                  size="sm"
                  @click="cancelEdit"
                />
              </template>
            </div>
          </div>

          <!-- empty state -->
          <div
            v-if="sunglasses.length === 0"
            class="column items-center q-py-xl q-px-md"
          >
            <q-icon name="fa-solid fa-glasses" color="primary" size="42px" />
            <div class="font-size-responsive-md text-light text-bold q-mt-md">
              NO FRAMES YET
            </div>
            <div class="text-caption text-dimmed q-mt-sm">
              Add your first frame to get started.
            </div>
          </div>
        </q-card-section>
      </q-card>
    </template>
  </div>
</template>

<script>
import SunglassesService from "src/services/SunglassesService";
import Helper from "src/services/utils";

export default {
  data() {
    return {
      sunglasses: [],
      editMode: null,
      openAddSunglasses: null,
      loading: true,

      colors: [
        { label: "Blue", value: "blue" },
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Yellow", value: "yellow" },
        { label: "Black", value: "black" },
        { label: "White", value: "white" },
        { label: "Purple", value: "purple" },
        { label: "Orange", value: "orange" },
        { label: "Pink", value: "pink" },
        { label: "Brown", value: "brown" },
        { label: "Gray", value: "gray" },
        { label: "Cyan", value: "cyan" },
        { label: "Magenta", value: "magenta" },
        { label: "Lime", value: "lime" },
        { label: "Teal", value: "teal" },
        { label: "Navy", value: "navy" },
        { label: "Olive", value: "olive" },
        { label: "Maroon", value: "maroon" },
        { label: "Gold", value: "gold" },
        { label: "Silver", value: "silver" },
      ],

      sunglassesDetails: {
        model: "",
        description: "",
        color: "",
        price: "",
        stock: "",
        images: [],
      },

      image1: null,
      image2: null,
    };
  },

  methods: {
    validateText: Helper.validateText,
    getImageUrl: Helper.getImageUrl,
    formatSunglassesId: Helper.formatSunglassesId,

    validateFields() {
      const details = this.sunglassesDetails;
      const requiredFields = [
        "model",
        "description",
        "color",
        "price",
        "stock",
        "image1",
        "image2",
      ];
      const modelMaxChar = /^[A-Z][a-zA-Z ]{0,11}$/;

      for (const field of requiredFields) {
        if (!details[field] && !this[field]) {
          this.$q.notify({
            type: "negative",
            message: `Please fill in the ${field} field.`,
          });
          return false;
        }
      }

      if (!modelMaxChar.test(details.model)) {
        this.$q.notify({
          type: "negative",
          message:
            "Model name cannot exceed 12 characters, no special characters, and must start with an uppercase.",
        });
        return false;
      }

      const words = details.description
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);

      if (words.length > 50) {
        this.$q.notify({
          type: "negative",
          message: "Description must be 50 words or less.",
        });
        return false;
      }

      return true;
    },

    async addSunglasses() {
      if (!this.validateFields()) return;

      this.$q
        .dialog({
          title: "Add sunglasses",
          color: "primary",
          message: `You are about to add ${this.sunglassesDetails.model}, please ensure the front and side images are attached in the correct order, continue?`,
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          const formData = new FormData();
          for (const key in this.sunglassesDetails) {
            if (key !== "images") {
              formData.append(key, this.sunglassesDetails[key]);
            }
          }
          if (this.image1) formData.append("images", this.image1);
          if (this.image2) formData.append("images", this.image2);

          const response = await SunglassesService.createSunglasses(formData);
          if (response) {
            this.$q.notify({
              type: "positive",
              color: "primary",
              message: `Addition successful!`,
            });
            this.onReset();
            this.toggleAddSunglasses();
            this.getAllSunglasses();
          } else {
            this.$q.notify({
              type: "negative",
              message: "Addition failed. Please try again.",
            });
          }
        });
    },

    async getAllSunglasses() {
      this.loading = true;
      try {
        const response = await SunglassesService.findAllSunglasses();
        this.sunglasses = response || [];
      } catch (error) {
        console.error("Failed to fetch sunglasses:", error);
        this.sunglasses = [];
      }
      this.loading = false;
    },

    async updateSunglasses(sunglasses) {
      const updatedSunglasses = {
        model: sunglasses.model,
        description: sunglasses.description,
        color: sunglasses.color,
        price: sunglasses.price,
        stock: sunglasses.stock,
        images: this.sunglasses.images,
      };

      this.$q
        .dialog({
          title: "Update sunglasses",
          message: `You are about to update ${sunglasses.model}, continue?`,
          color: "primary",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          const response = await SunglassesService.updateSunglasses(
            sunglasses._id,
            updatedSunglasses
          );
          if (response) {
            this.$q.notify({
              type: "positive",
              color: "primary",
              message: "Update successful!",
            });
            this.editMode = null;
            this.getAllSunglasses();
          } else {
            this.$q.notify({
              type: "negative",
              message: "Update failed. Please try again.",
            });
          }
        })
        .onCancel(() => {
          this.editMode = null;
          this.getAllSunglasses();
        });
    },

    async deleteSunglasses(sunglasses) {
      this.$q
        .dialog({
          title: "Delete sunglasses",
          message: `You are about to delete ${sunglasses.model}, continue?`,
          color: "primary",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          const response = await SunglassesService.deleteSunglasses(
            sunglasses._id
          );
          if (response) {
            this.$q.notify({
              type: "positive",
              color: "primary",
              message: "Delete successful!",
            });
            this.getAllSunglasses();
          } else {
            this.$q.notify({
              type: "negative",
              message: "Delete failed. Please try again.",
            });
          }
        });
    },

    cancelEdit() {
      this.editMode = null;
      this.getAllSunglasses();
    },

    onReset() {
      this.sunglassesDetails = {
        model: "",
        description: "",
        color: "",
        price: "",
        stock: "",
        images: [],
      };
      this.image1 = null;
      this.image2 = null;
    },

    toggleAddSunglasses() {
      this.openAddSunglasses = this.openAddSunglasses === null ? true : null;
      if (this.openAddSunglasses === null) this.onReset();
    },
  },

  created() {
    this.getAllSunglasses();
  },
};
</script>

<style lang="sass" scoped>
.admin-sunglasses-details
  // wrapper

.order-id-badge
  font-family: 'Hind', sans-serif
  font-weight: 700
  letter-spacing: 0.05em
  padding: 4px 10px
  border-radius: 4px
  max-width: 100%
  display: inline-block
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.status-dot
  width: 8px
  height: 8px
  border-radius: 50%
  display: inline-block

.status-dot--in-stock
  background-color: #22c55e
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15)

.status-dot--low
  background-color: #ef4444
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15)

// input styles
.custom-input
  :deep(.q-field__control)
    background-color: #121212
    border-radius: 8px
    box-shadow: none !important

  :deep(.q-field__control:before)
    border: 1px solid rgba(255, 255, 255, 0.1) !important

  :deep(.q-field__control:hover:before)
    border-color: rgba(255, 255, 255, 0.25) !important

  :deep(.q-field__control:after)
    border-color: transparent !important
    box-shadow: none !important

  :deep(.q-field--focused .q-field__control:before)
    border-color: rgba(255, 255, 255, 0.5) !important

  :deep(.q-field__native),
  :deep(.q-field__input)
    color: #ffffff !important

  :deep(.q-field__marginal)
    color: #9b9b9b

.sunglass-thumb
  width: 56px
  height: 56px
  border-radius: 6px
  border: 1px solid rgba(255, 255, 255, 0.1)
  background-color: #ffffff

.sunglass-row
  transition: background-color 0.15s ease

  &:hover
    background-color: rgba(255, 255, 255, 0.03)

  &.sunglass-row--editing
    align-items: flex-start

  &:hover
    background-color: rgba(255, 255, 255, 0.03)

.row-actions-menu
  // background-color: #141414
  border: 1px solid rgba(255, 255, 255, 0.12)
  border-radius: 10px
  min-width: 160px

  .q-item
    color: #e8e8e8
    min-height: 40px
    border-radius: 6px
    // margin: 2px

    &:hover
      background-color: rgba(255, 255, 255, 0.06)
</style>
