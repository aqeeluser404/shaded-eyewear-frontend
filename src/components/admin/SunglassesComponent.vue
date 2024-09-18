<template>
  <div class="row q-pa-md q-gutter-md justify-center">

    <!-- =================================== ALL SUNGLASSES CARD -->
    <q-card class="q-pa-md col-12 col-md-11">

      <!-- view all card -->
      <q-card v-if="openAddSunglasses === null">
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

      <!-- add sunglasses card -->
      <q-card v-else class=" column flex-center">
        <q-card-section>
          <div class="text-h6">Add Sunglasses</div>
        </q-card-section>
        <q-form
          @submit.prevent="addSunglasses"
          @reset="onReset"
          class="q-gutter-lg"
          style="min-width: 100%;"
          enctype="multipart/form-data"
        >
          <q-input filled v-model="sunglassesDetails.model" label="Model *" />
          <q-input filled v-model="sunglassesDetails.description" label="Description *" />
          <q-input filled v-model="sunglassesDetails.color" label="Color *" />
          <q-input
            filled
            v-model="sunglassesDetails.price"
            label="Price (ZAR) *"
            type="number"
            prefix="R"
            :rules="[val => val > 0] || 'Price must be positive'"
          />
          <q-select
            filled
            v-model="sunglassesDetails.stock"
            label="Stock *"
            :options="[...Array(11).keys()].slice(1)"
            emit-value
            map-options
          />
          <q-file
            filled
            v-model="sunglassesDetails.images"
            label="Image *"
            accept="image/*"
            name="images"
          />
          <div>
            <q-btn label="Add Sunglasses" type="submit" color="primary" class="custom-button"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm custom-button" />
          </div>
        </q-form>
      </q-card>

    </q-card>
    <q-btn round class="round-btn" :label="buttonLabel" @click="toggleAddSunglasses" />
  </div>
</template>

<script>
import SunglassesService from 'src/services/SunglassesService'

export default {
  data() {
    return {
      sunglasses: [{}],
      editMode: null,
      openAddSunglasses: null,
      sunglassesDetails: {
        model: '',
        description: '',
        color: '',
        price: '',
        stock: '',
        images: []
      },
    }
  },
  methods: {
    async addSunglasses() {
      const details = this.sunglassesDetails;
      if (['model', 'description', 'color', 'price', 'stock', 'images'].every(key => details[key] !== '')) {
        this.$q.dialog({
          title: 'Add sunglasses', color: 'primary', message: `You are about to add ${this.sunglassesDetails.model}, continue?`, cancel: true, persistent: true
        }).onOk(async () => {
          const response = await SunglassesService.createSunglasses(this.sunglassesDetails)
          if (response) {
            this.$q.notify({ type: 'positive', color: 'primary', message: `Addition successful!` })
            this.onReset()
            this.getAllSunglasses()
          } else {
            this.$q.notify({ type: 'negative', message: 'Addition failed. Please try again.' })
          }
        })
      } else {
        this.$q.notify({ type: 'negative', message: 'Please fill in all the fields.' })
      }
    },
    toggleAddSunglasses() {
      this.openAddSunglasses = this.openAddSunglasses === null ? true : null
    },

    async getAllSunglasses() {
      const response = await SunglassesService.findAllSunglasses()
      this.sunglasses = response
    },
    // updates only details - no images
    async updateSunglasses(sunglasses) {
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
    async deleteSunglasses(sunglasses) {
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
    onReset() {
        this.sunglassesDetails.model = '',
        this.sunglassesDetails.description = '',
        this.sunglassesDetails.color = '',
        this.sunglassesDetails.price = '',
        this.sunglassesDetails.stock = '',
        this.sunglassesDetails.images = ''
    }
  },
  computed: {
    buttonLabel() {
      return this.openAddSunglasses === null ? '+' : '-'
    }
  },
  created() {
    this.getAllSunglasses()
  }
}
</script>
