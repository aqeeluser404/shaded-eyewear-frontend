<template>
  <div class="row q-pa-md q-gutter-md justify-center">                                                        <!-- constrains -->
    <q-card class="q-pa-sm col-12 col-md-5">                                                                  <!---------------- USER STAT CARD ----------------->
      <q-card-section>
        <div class="text-h6">Frequent Users Statistics</div>
      </q-card-section>
      <q-card-section>
        <canvas ref="canvas"></canvas>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-sm col-12 col-md-6">                                                                  <!---------------- USER DETAILS CARD ----------------->
      <q-card v-if="selectedUser">                                                                            <!-- details -->
        <q-card-section>
          <div class="text-h6">{{ selectedUser.firstName }} Details</div>
        </q-card-section>
        <q-markup-table>
          <tbody>
            <tr>
              <td class="text-left cursor-pointer">First Name: </td>
              <td class="text-left cursor-pointer">{{ selectedUser.firstName }}</td>
            </tr>
            <tr>
              <td class="text-left cursor-pointer">Last Name: </td>
              <td class="text-left cursor-pointer">{{ selectedUser.lastName }}</td>
            </tr>
            <tr>
              <td class="text-left cursor-pointer">Email: </td>
              <td class="text-left cursor-pointer">{{ selectedUser.email }}</td>
            </tr>
            <tr>
              <td class="text-left cursor-pointer">Phone: </td>
              <td class="text-left cursor-pointer">{{ selectedUser.phone }}</td>
            </tr>
            <tr>
              <td class="text-left cursor-pointer">User Type: </td>
              <td class="text-left cursor-pointer">
                <q-select v-if="editMode === selectedUser._id" v-model="selectedUser.userType" :options="userTypeOptions" emit-value map-options />
                <div v-else>
                  {{ selectedUser.userType }}
                </div>
              </td>
            </tr>
            <tr></tr>
          </tbody>
        </q-markup-table>
        <br>
        <div class="row justify-center">                                                                                            <!---------------- USER DETAILS BUTTONS ----------------->
          <q-card-actions>                                                                                                          <!-- close card -->
            <q-btn dense flat label="Close" color="primary" @click="closeDetails" />
          </q-card-actions>
          <q-card-actions v-if="editMode !== selectedUser._id">                                                                     <!-- edit mode -->
            <q-btn dense flat icon="eva-edit-outline" color="primary" @click="editMode = selectedUser._id" />
          </q-card-actions>
          <q-card-actions v-if="editMode === selectedUser._id" >                                                                    <!-- update user type -->
            <q-btn dense flat icon="eva-edit-outline" color="primary" @click="updateUserType(selectedUser)" />
          </q-card-actions>
          <q-card-actions v-if="editMode === selectedUser._id">                                                                     <!-- cancel edit mode -->
            <q-btn dense flat label="Cancel" color="secondary" @click="editMode = null" />
          </q-card-actions>
          <q-card-actions>                                                                                                          <!-- delete user -->
            <q-btn dense flat label="Delete" color="negative" @click="deleteUser(selectedUser._id, selectedUser.username)" />
          </q-card-actions>
          <q-card-actions>                                                                                                          <!-- logout user -->
            <q-btn dense flat label="Logout" color="warning" v-if="selectedUser.loginInfo && selectedUser.loginInfo.isLoggedIn === true " @click="logoutUser(selectedUser._id, selectedUser.username)" />
          </q-card-actions>
        </div>
      </q-card>

      <q-card flat v-else>                                                                                    <!---------------- ALL USERS CARD ----------------->
        <q-card-section>
          <div class="text-h6">All Users</div>
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
    </q-card>
  </div>
</template>

<script>
import UserService from 'src/services/UserService';
import { Chart, LinearScale, BarController, BarElement, CategoryScale } from 'chart.js';
Chart.register(LinearScale, BarController, BarElement, CategoryScale);

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
  methods: {
    async getFrequentlyLoggedInUsers() {                                                                // get frequent users function
      const response = await UserService.findUsersFrequentlyLoggedIn()
      this.frequentUsers = response
      this.createChart()
    },
    createChart() {                                                                                     // chart function
      const ctx = this.$refs.canvas.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.frequentUsers.map(user => user.firstName),
          datasets: [{
            label: '# of Logins',
            data: this.frequentUsers.map(user => user.loginInfo.loginCount),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            tooltip: {
              enabled: true
            }
          }
        }
      });
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
        this.$q.notify({ type: 'negative', message: 'You cannot change your usertype!' })
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
  created() {
    this.getAllUsers()
  },
  mounted() {
    this.getFrequentlyLoggedInUsers()
  }
}
</script>
