<template>
  <div class="row q-pa-md q-gutter-md justify-center">
    <q-card flat bordered class="q-pa-sm col-12 col-md-5 full-height">
      <q-card-section>
        <div class="font-size-responsive-lg">Frequent Users Statistics</div>
      </q-card-section>
      <q-card-section class="full-height">
        <canvas ref="canvas"></canvas>
      </q-card-section>
    </q-card>


      <q-card flat bordered class="col-12 col-md-4 q-pa-md" v-if="selectedUser">
        <q-card-section>
          <div class="font-size-responsive-lg">{{ selectedUser.firstName }} Details</div>
        </q-card-section>
        <q-separator class="q-my-md" />
        <q-markup-table>
          <tbody>
            <tr>
              <td style="border: none;" class="text-left cursor-pointer"><b>First Name :</b></td>
              <td style="border: none;" class="text-left cursor-pointer">{{ selectedUser.firstName }}</td>
            </tr>
            <tr>
              <td style="border: none;" class="text-left cursor-pointer"><b>Last Name : </b></td>
              <td style="border: none;" class="text-left cursor-pointer">{{ selectedUser.lastName }}</td>
            </tr>
            <tr>
              <td style="border: none;" class="text-left cursor-pointer"><b>Email : </b></td>
              <td style="border: none;" class="text-left cursor-pointer">{{ selectedUser.email }}</td>
            </tr>
            <tr>
              <td style="border: none;" class="text-left cursor-pointer"><b>Phone : </b></td>
              <td style="border: none;" class="text-left cursor-pointer">{{ selectedUser.phone }}</td>
            </tr>
            <tr>
              <td style="border: none;" class="text-left cursor-pointer"><b>User Type : </b></td>
              <td style="border: none;" class="text-left cursor-pointer">
                <q-select v-if="editMode === selectedUser._id" v-model="selectedUser.userType" :options="userTypeOptions" emit-value map-options />
                <div v-else>
                  {{ selectedUser.userType }}
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        <q-separator class="q-my-md" />
        <div class="row justify-between">
          <div>
            <q-btn rounded dense v-if="editMode !== selectedUser._id" class="q-px-md q-py-md custom-button font-size-responsive-sm q-mr-sm" icon="eva-edit-outline" color="primary" @click="editMode = selectedUser._id" style="height: 100%;" />
            <q-btn rounded dense v-if="editMode === selectedUser._id" class="q-px-md q-py-xs custom-button font-size-responsive-sm q-mr-sm" icon="eva-edit-outline" color="primary" label="Save" @click="updateUserType(selectedUser)" style="height: 100%;" />
            <q-btn rounded dense v-if="editMode === selectedUser._id" class="q-px-md q-py-xs custom-button font-size-responsive-sm q-mr-sm" label="Cancel" @click="editMode = null" style="height: 100%;" />
            <q-btn rounded dense class="q-px-md q-py-md q-mr-sm font-size-responsive-xs" icon="eva-trash-2-outline" color="negative" @click="deleteUser(selectedUser._id, selectedUser.username)" />
            <q-btn rounded dense v-if="selectedUser.loginInfo && selectedUser.loginInfo.isLoggedIn === true" class="q-px-md q-py-md custom-button font-size-responsive-xs" icon="eva-log-out-outline" color="warning" @click="logoutUser(selectedUser._id, selectedUser.username)" />
          </div>
          <q-btn rounded dense class="q-px-md q-py-xs custom-button font-size-responsive-sm q-mt-md" label="Close" color="primary" @click="closeDetails" style="width: 100%;" />
        </div>
      </q-card>

      <q-card flat bordered class="q-pa-md full-height col-12 col-md-6" v-else>                                                                                    <!---------------- ALL USERS CARD ----------------->
        <q-card-section>
          <div class="font-size-responsive-lg">Registered Users</div>
        </q-card-section>
        <q-markup-table>
          <thead>
            <tr>
              <td></td>
              <th class="text-left">Username</th>
              <th class="text-left">First Name</th>
              <th class="text-left">Last Name</th>
              <th class="text-left">Date Last Login</th>
              <th class="text-left">Login Status</th>
            </tr>
          </thead>
          <tbody v-for="(user, index) in users" :key="user._id">
            <tr @click="openDetails(user)" :class="{ 'admin-user': user.userType === 'admin' }">
              <td class="text-left cursor-pointer">{{ index + 1 }}</td>
              <td class="text-left cursor-pointer">{{ user.username }}</td>
              <td class="text-left cursor-pointer">{{ user.firstName }}</td>
              <td class="text-left cursor-pointer">{{ user.lastName }}</td>
              <td class="text-left cursor-pointer">
                {{ user.loginInfo && user.loginInfo.lastLogin ? new Date(user.loginInfo.lastLogin).toLocaleDateString('en-GB') : '' }}
              </td>
              <td class="text-center cursor-pointer">
                <span v-if="user.loginInfo && user.loginInfo.isLoggedIn" class="green-dot"></span>
                <span v-else class="red-dot"></span>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>

  </div>
</template>

<script>
import UserService from 'src/services/UserService';
import { Chart, LinearScale, BarController, BarElement, CategoryScale, registerables } from 'chart.js';
Chart.register(LinearScale, BarController, BarElement, CategoryScale, ...registerables);

export default {
  data() {
    return {
      chart: null,
      users: [{}],
      editMode: null,

      userTypeOptions: [
        { label: 'admin', value: 'admin' },
        { label: 'user', value: 'user' }
      ],
      loggedInUsers: [
        {
          loginInfo: {
            lastLogin: "",
            isLoggedIn: "",
            loginCount: ""
          }
        }
      ],
      frequentUsers: [],
      selectedUser: null
    }
  },

  created() {
    this.getAllUsers()
  },
  mounted() {
    this.getFrequentlyLoggedInUsers()
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy();
  },

  methods: {
    async getFrequentlyLoggedInUsers() {
      const response = await UserService.findUsersFrequentlyLoggedIn();
      this.frequentUsers = response;
      this.createChart();
    },

    createChart() {
      const ctx = this.$refs.canvas.getContext('2d');
      if (this.chart) {
        this.chart.destroy(); // Destroy any existing chart before creating a new one
      }
      this.chart = new Chart(ctx, this.getChartConfig());
    },

    getChartConfig() {
      return {
        type: 'bar',
        data: {
          labels: this.frequentUsers.map(user => user.firstName),
          datasets: [
            {
              label: '# of Logins',
              data: this.frequentUsers.map(user => user.loginInfo.loginCount),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: 'y', // Make it a horizontal bar chart
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            tooltip: { enabled: true },
          },
        },
      };
    },




    async getAllUsers() {                                                                               // get all users function
      const response = await UserService.findAllUsers()
      this.users = response
    },
    async updateUserType(selectedUser) {                                                                // update usertype function
      const currentUser = await UserService.FindUserByToken()
      const userId = this.selectedUser._id
      const updatedUser = {
        firstName: this.selectedUser.firstName,
        lastName: this.selectedUser.lastName,
        email: this.selectedUser.email,
        phone: this.selectedUser.phone,
        username: this.selectedUser.username,
        password: this.selectedUser.password,
        userType: selectedUser.userType,
        location: this.selectedUser.location,
        loginInfo: this.selectedUser.loginInfo,
        order: this.selectedUser.order
      }
      if (currentUser._id === userId) {
        this.$q.notify({ type: 'negative', message: 'You cannot change your usertype!' })
        window.location.reload();
      } else {
        this.$q.dialog({
          title: 'Update user', message: `You are about to update ${updatedUser.username}, continue?`, color: 'primary', cancel: true, persistent: true
        }).onOk(async () => {
          const response = await UserService.updateUserDetails(userId, updatedUser)
          if (response) {
            this.$q.notify({ type: 'positive', color: 'primary', message: 'Update successful!' })
            this.editMode = null
          } else {
            this.$q.notify({ type: 'negative', message: 'Update failed. Please try again.' })
          }
        }).onCancel(() => {
          this.editMode = null
          this.getAllUsers()
          return
        })
      }
    },
    async deleteUser(userId, username) {                                                              // delete user
      const currentUser = await UserService.FindUserByToken()
      if (currentUser._id === userId) {
        this.$q.notify({ type: 'negative', message: 'You cannot delete yourself!' })
      } else {
        this.$q.dialog({
          title: 'Delete user',
          message: `You are about to delete ${username}, continue?`, color: 'primary', cancel: true, persistent: true
        }).onOk(async () => {
          const response = await UserService.deleteUser(userId)
          if (response) {
            this.$q.notify({ type: 'positive', color: 'primary', message: 'Delete successful!' })
            window.location.reload()
          } else {
            this.$q.notify({ type: 'negative', message: 'Delete failed. Please try again.' })
          }
        })
      }
    },
    async logoutUser(userId, username) {                                                              // logout user
      const currentUser = await UserService.FindUserByToken()
      if (currentUser._id === userId) {
        this.$q.notify({ type: 'negative', message: 'You are currently logged in!' })
      } else {
        this.$q.dialog({
          title: 'Logout User', message: `You are about to logout ${username}, continue?`, color: 'primary', cancel: true, persistent: true
        }).onOk(async () => {
          const response = await UserService.logoutUser(userId)
          if (response) {
            this.$q.notify({ type: 'positive', color: 'primary', message: 'Logout successful!' })
            this.getAllUsers()
          } else {
            this.$q.notify({ type: 'negative', message: 'Logout failed. Please try again.' })
          }
        })
      }
    },
    openDetails(user) {
      this.selectedUser = user
    },
    closeDetails() {
      this.selectedUser = null
    }
  },
}
</script>

<style lang=sass>
.canvas-container
  position: relative
  width: 100%
  height: 50vh

.canvas
  width: 100% !important
  height: 100% !important

.button-group
  display: flex
  align-items: center
  gap: 8px

</style>
