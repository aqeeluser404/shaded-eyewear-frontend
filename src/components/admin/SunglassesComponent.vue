<template>
  <div class="row q-pa-md q-gutter-md justify-center">
    <q-card class="q-pa-md col-12 col-md-11">                                                  <!---------------- SUNGLASSES COMPONENT ----------------->
      <q-card v-if="openAddSunglasses === null">                                               <!-- view all card -->
        <q-card-section>
          <div class="text-h6">All Sunglasses</div>
        </q-card-section>
        <q-markup-table>
          <thead>
            <tr>
              <th></th>
              <th class="text-left">Model</th>
              <th class="text-left">Description</th>
              <th class="text-left">Price</th>
              <th class="text-left">Stock</th>
              <th class="text-left">Quick Tools</th>
            </tr>
          </thead>
          <tbody v-for="(sunglass, index) in sunglasses" :key="sunglass._id">
            <tr>
              <td class="text-left cursor-pointer">{{ index + 1 }}</td>
              <td class="text-left cursor-pointer">
                <q-input v-if="editMode === sunglass._id" v-model="sunglass.model" />
                <div v-else>
                  {{ sunglass.model }}
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
                  {{ sunglass.price }}
                </div>
              </td>
              <td class="text-left cursor-pointer">
                <q-input v-if="editMode === sunglass._id" v-model="sunglass.stock" />
                <div v-else>
                  {{ sunglass.stock }}
                </div>
              </td>
              <td class="text-left cursor-pointer">
                <!-- edit mode -->
                <q-btn dense flat icon="eva-edit-outline" color="primary" v-if="editMode !== sunglass._id" @click="editMode = sunglass._id" />
                <!-- update mode -->
                <q-btn dense flat icon="eva-edit-outline" color="primary"  v-if="editMode === sunglass._id" @click="updateSunglasses(sunglass)" />
                <!-- cancel/save -->
                <q-btn dense flat icon="eva-checkmark-square-outline" color="secondary" v-if="editMode === sunglass._id" @click="editMode = null" />
                <!-- delete -->
                <q-btn dense flat icon="eva-trash-2-outline" color="negative" @click="deleteSunglasses(sunglass)" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>

      <q-card v-else class=" column flex-center">                                              <!-- add sunglasses card -->
        <q-card-section>
          <div class="text-h6">Add Sunglasses</div>
        </q-card-section>
        <q-form @submit.prevent="addSunglasses" @reset="onReset" class="q-gutter-lg" style="min-width: 100%;" enctype="multipart/form-data">
          <q-input filled v-model="sunglassesDetails.model" label="Model (Format: SE0000 Square-Frame Sunglasses) *" id="model" name="model" />
          <q-input filled v-model="sunglassesDetails.description" label="Description (max 50 words) *" id="description" name="description" />
          <q-select filled v-model="sunglassesDetails.color" label="Color *" id="color" name="color" :options="colors" emit-value map-options />
          <q-input filled v-model="sunglassesDetails.price" label="Price (ZAR) *" type="number" prefix="R" :rules="[val => val > 0] || 'Price must be positive'" id="price" name="price" />
          <q-select filled v-model="sunglassesDetails.stock" label="Stock *" :options="[...Array(11).keys()].slice(1)" emit-value map-options id="stock" name="stock" />
          <!-- <q-file filled v-model="sunglassesDetails.images" label="Image *" accept="image/*" name="images" id="images" /> -->
          <q-file filled v-model="image1" label="image (Side View) * " accept="image/*" name="image1" id="image1" />
          <q-file filled v-model="image2" label="image (Front View) * " accept="image/*" name="image2" id="image2" />
          <div>
            <q-btn label="Add Sunglasses" type="submit" color="primary" class="custom-button"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm custom-button" />
          </div>
        </q-form>
      </q-card>
    </q-card>
    <q-btn round class="round-btn" :label="buttonLabel" @click="toggleAddSunglasses" />         <!-- toggle between cards -->
  </div>
</template>

<script>
import SunglassesService from 'src/services/SunglassesService'
import Helper from 'src/services/utils'

export default {
  data() {
    return {
      sunglasses: [{}],
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
    validateFields() {
      const details = this.sunglassesDetails;
      const requiredFields = ['model', 'description', 'color', 'price', 'stock', 'image1', 'image2']

      // Regular expression to match the model name format
      const modelNamePattern = /^[A-Z]{2}\d{4}\s[A-Za-z]+-[A-Za-z]+\s[A-Za-z]+$/;

      for (const field of requiredFields) {
        if (!details[field] && !this[field]) {
          this.$q.notify({ type: 'negative', message: `Please fill in the ${field} field.` });
          return false;
        }
      }
      // Validate the model name format
      if (!modelNamePattern.test(details.model)) {
        this.$q.notify({ type: 'negative', message: 'Model name must follow the format "SE3448 Square-Frame Sunglasses".' });
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
