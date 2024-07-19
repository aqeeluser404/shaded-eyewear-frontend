<template>
  <div class="row q-pa-md q-gutter-md justify-center">

    <!-- ALL SUNGLASSES CARD -->
    <q-card class="q-pa-md col-12 col-md-9">
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
            <th class="text-left">Tools</th>
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
              <q-btn dense flat label="Delete" color="negative" @click="deleteSunglasses(sunglass)" />
              <q-btn dense flat label="Edit" color="primary" v-if="editMode !== sunglass._id" @click="editMode = sunglass._id" />
              <q-btn dense flat label="Update" color="primary"  v-if="editMode === sunglass._id" @click="updateSunglasses(sunglass)" />
              <q-btn dense flat label="Cancel" color="secondary" v-if="editMode === sunglass._id" @click="editMode = null" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>
</template>

<script>
import SunglassesService from 'src/services/SunglassesService'

export default {
  data() {
    return {
      sunglasses: [{}],
      editMode: null,
    }
  },
  methods: {
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
        title: 'Update sunglasses',
        message: `You are about to update ${sunglasses.model}, continue?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await SunglassesService.updateSunglasses(sunglasses._id, updatedSunglasses)
          this.editMode = null
        } catch (error) {
          console.error(error);
        }
      }).onCancel(() => {
        this.editMode = null
        this.getAllSunglasses()
        return
      }).onDismiss(() => {});
    },
    async deleteSunglasses(sunglasses) {
      this.$q.dialog({
        title: 'Delete sunglasses',
        message: `You are about to delete ${sunglasses.model}, continue?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
            await SunglassesService.deleteSunglasses(sunglasses._id)
            await this.getAllSunglasses()
          } catch (error) {
            console.error(error);
          }
      }).onCancel(() => {}).onDismiss(() => {});
    },
  },
  created() {
    this.getAllSunglasses()
  }
}
</script>
