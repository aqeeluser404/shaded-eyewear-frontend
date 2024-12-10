<template>
  <div class="row q-pa-md q-gutter-md justify-center">

    <!--------------------------------------------------------------------- ADD SUNGLASSES SECTION -------------------------------------------------->
    <q-card flat bordered class="col-12 col-md-11">
      <q-card v-if="openAddSunglasses === null" class="q-pa-md ">
        <q-card-section class="column flex-start">
          <div class="font-size-responsive-lg"><b>All Sunglasses</b></div>
        </q-card-section>
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Image</th>
              <th class="text-left">Model</th>
              <th class="text-left">Sunglasses ID</th>
              <th class="text-left">Description</th>
              <th class="text-left">Price</th>
              <th class="text-center">Stock</th>
              <th class="text-left">Quick Tools</th>
            </tr>
          </thead>
          <tbody v-for="(sunglass) in sunglasses" :key="sunglass._id">
            <tr>
              <td class="text-left cursor-pointer">
                <q-img :src="getImageUrl(sunglass.images[0])" alt="Sunglass Image" style="width: 50px;"/>
              </td>
              <td class="text-left cursor-pointer">
                <q-input v-if="editMode === sunglass._id" v-model="sunglass.model" />
                <div v-else>
                  {{ sunglass.model }}
                </div>
              </td>
              <td class="text-left cursor-pointer">
                <div>
                  #{{ sunglass._id }}
                </div>
              </td>
              <td class="text-left cursor-pointer">
                <q-input v-if="editMode === sunglass._id" v-model="sunglass.description" />
                <div v-else class="limit-text">
                  {{ sunglass.description }}
                </div>
              </td>
              <td class="text-left cursor-pointer">
                <q-input v-if="editMode === sunglass._id" v-model="sunglass.price" />
                <div v-else>
                  R {{ sunglass.price }}.00
                </div>
              </td>
              <td class="text-center cursor-pointer">
                <q-input v-if="editMode === sunglass._id" v-model="sunglass.stock" />
                <div v-else>
                  {{ sunglass.stock }}
                </div>
              </td>
              <td class="text-left cursor-pointer">
                <!-- edit mode -->
                <q-btn rounded dense icon="eva-edit-outline" color="primary" class="q-pa-sm font-size-responsive-sm q-mr-sm" v-if="editMode !== sunglass._id" @click="editMode = sunglass._id" />
                <!-- update mode -->
                <q-btn rounded dense icon="eva-edit-outline" label="Save" class="custom-button q-px-md q-py-sm custom-button font-size-responsive-sm q-mr-sm" color="primary"  v-if="editMode === sunglass._id" @click="updateSunglasses(sunglass)" />
                <!-- cancel/save -->
                <q-btn rounded dense label="Close" class="custom-button q-px-md q-py-sm custom-button font-size-responsive-sm q-mr-sm" v-if="editMode === sunglass._id" @click="editMode = null" />
                <!-- delete -->
                <q-btn rounded dense icon="eva-trash-2-outline" class="custom-button q-pa-sm custom-button font-size-responsive-sm" color="negative" @click="deleteSunglasses(sunglass)" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>

      <!--------------------------------------------------------------------- ADD SUNGLASSES SECTION -------------------------------------------------->
      <q-card v-else class="q-pa-md column flex-start">
        <q-card-section>
          <div class="font-size-responsive-lg"><b>Add Sunglasses</b></div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="addSunglasses" @reset="onReset" class="q-gutter-lg" style="min-width: 100%;" enctype="multipart/form-data">
            <q-input filled v-model="sunglassesDetails.model" label="Model Name *" id="model" name="model" />
            <q-input filled v-model="sunglassesDetails.description" label="Description (max 50 words) *" id="description" name="description" />
            <q-select filled v-model="sunglassesDetails.color" label="Color *" id="color" name="color" :options="colors" emit-value map-options />
            <q-input class="q-pa-none" filled v-model="sunglassesDetails.price" label="Price (ZAR) *" type="number" prefix="R" :rules="[val => val > 0] || 'Price must be positive'" id="price" name="price" />
            <q-select filled v-model="sunglassesDetails.stock" label="Stock *" :options="[...Array(11).keys()].slice(1)" emit-value map-options id="stock" name="stock" />
            <q-file filled v-model="image1" label="image (Side View) * " accept="image/*" name="image1" id="image1" />
            <q-file filled v-model="image2" label="image (Front View) * " accept="image/*" name="image2" id="image2" />
            <q-btn rounded dense label="Add Sunglasses" type="submit" color="primary" icon="eva-cloud-upload-outline" class="q-px-lg q-py-sm custom-button font-size-responsive-md" />
            <q-btn rounded dense flat label="Reset" type="reset" color="primary" class="q-px-lg q-py-sm custom-button font-size-responsive-md" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-card>

    <!-- button to toggle add sunglasses -->
    <q-btn round class="round-btn" :label="buttonLabel" @click="toggleAddSunglasses" />
  </div>
</template>

<script>
import SunglassesService from 'src/services/SunglassesService'
import Helper from 'src/services/utils'

export default {
  data() {
    return {
      sunglasses: [],
      editMode: null,
      openAddSunglasses: null,
      colors: [
        { label: 'Blue', value: 'blue' },
        { label: 'Red', value: 'red' },
        { label: 'Green', value: 'green' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Black', value: 'black' },
        { label: 'White', value: 'white' },
        { label: 'Purple', value: 'purple' },
        { label: 'Orange', value: 'orange' },
        { label: 'Pink', value: 'pink' },
        { label: 'Brown', value: 'brown' },
        { label: 'Gray', value: 'gray' },
        { label: 'Cyan', value: 'cyan' },
        { label: 'Magenta', value: 'magenta' },
        { label: 'Lime', value: 'lime' },
        { label: 'Teal', value: 'teal' },
        { label: 'Navy', value: 'navy' },
        { label: 'Olive', value: 'olive' },
        { label: 'Maroon', value: 'maroon' },
        { label: 'Gold', value: 'gold' },
        { label: 'Silver', value: 'silver' }
      ],
      sunglassesDetails: {
        model: '',
        description: '',
        color: '',
        price: '',
        stock: '',
        images: []
      },
      image1: null, image2: null
    }
  },
  methods: {
    validateText: Helper.validateText,                                                              // Validation functions
    getImageUrl: Helper.getImageUrl,
    validateFields() {
      const details = this.sunglassesDetails;
      const requiredFields = ['model', 'description', 'color', 'price', 'stock', 'image1', 'image2']
      const modelMaxChar = /^[A-Z][a-zA-Z ]{0,11}$/

      for (const field of requiredFields) {
        if (!details[field] && !this[field]) {
          this.$q.notify({ type: 'negative', message: `Please fill in the ${field} field.` });
          return false;
        }
      }
      // Validate the model name format
      if (!modelMaxChar.test(details.model)) {
        this.$q.notify({ type: 'negative', message: 'Model name cannot exceed 12 characters, no special characters, and must start with a uppercase.' });
        return false;
      }
      // Validate the description length by words
      const words = details.description.trim().split(/\s+/).filter(word => word.length > 0);
      const wordCount = words.length;
      console.log(`Description: "${details.description}"`);
      console.log(`Words:`, words);
      console.log(`Word count: ${wordCount}`);
      if (wordCount > 50) {
        this.$q.notify({ type: 'negative', message: 'Description must be 50 words or less.' });
        return false;
      }
      return true;
    },
    async addSunglasses() {                                                                         // Register function
      if (this.validateFields()) {
        this.$q.dialog({
          title: 'Add sunglasses',
          color: 'primary',
          message: `You are about to add ${this.sunglassesDetails.model}, please ensure the front and side images are attached in the correct order, continue?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          const formData = new FormData()
          for (const key in this.sunglassesDetails) {
            if (key !== 'images') {
              formData.append(key, this.sunglassesDetails[key])
            }
          }
          if (this.image1) formData.append('images', this.image1)
          if (this.image2) formData.append('images', this.image2)

          const response = await SunglassesService.createSunglasses(formData)
          if (response) {
            this.$q.notify({ type: 'positive', color: 'primary', message: `Addition successful!` })
            this.onReset()
            this.toggleAddSunglasses()
            this.getAllSunglasses()
          } else {
            this.$q.notify({ type: 'negative', message: 'Addition failed. Please try again.' })
          }
        })
      }
    },
    async getAllSunglasses() {                                                                      // get all sunglasses
      const response = await SunglassesService.findAllSunglasses()
      this.sunglasses = response
    },
    async updateSunglasses(sunglasses) {                                                            // updates only details - no images
      const updatedSunglasses = {
        model: sunglasses.model,
        description: sunglasses.description,
        color: sunglasses.color,
        price: sunglasses.price,
        stock: sunglasses.stock,
        images: this.sunglasses.images
      }
      this.$q.dialog({
        title: 'Update sunglasses', message: `You are about to update ${sunglasses.model}, continue?`, color: 'primary', cancel: true, persistent: true
      }).onOk(async () => {
        const response = await SunglassesService.updateSunglasses(sunglasses._id, updatedSunglasses)
        if (response) {
          this.$q.notify({ type: 'positive', color: 'primary', message: 'Update successful!' })
          this.editMode = null
        } else {
          this.$q.notify({ type: 'negative', message: 'Update failed. Please try again.' })
        }
      }).onCancel(() => {
        this.editMode = null
        this.getAllSunglasses()
        return
      })
    },
    async deleteSunglasses(sunglasses) {                                                            // deletes function
      this.$q.dialog({
        title: 'Delete sunglasses', message: `You are about to delete ${sunglasses.model}, continue?`, color: 'primary', cancel: true, persistent: true
      }).onOk(async () => {
        const response = await SunglassesService.deleteSunglasses(sunglasses._id)
        if (response) {
          this.$q.notify({ type: 'positive', color: 'primary', message: 'Delete successful!' })
          this.getAllSunglasses()
        } else {
          this.$q.notify({ type: 'negative', message: 'Delete failed. Please try again.' })
        }
      })
    },
    onReset() {                                                                                     // Reset function
      this.sunglassesDetails = {
        model: '',
        description: '',
        color: '',
        price: '',
        stock: '',
        images: []
      }
      this.image1 = null
      this.image2 = null
    },
    toggleAddSunglasses() {                                                                         // toggle sunglasses button function
      this.openAddSunglasses = this.openAddSunglasses === null ? true : null
    },
  },
  computed: {                                                                                       // toggle sunglasses button computed
    buttonLabel() {
      return this.openAddSunglasses === null ? '+' : '-'
    }
  },
  created() {                                                                                       // get all sunglasses
    this.getAllSunglasses()
  }
}
</script>
