<template>
  <!-- constrains -->
  <div class="row q-pa-md q-gutter-md justify-center">

    <!-- =================================== USER STAT CARD -->
    <q-card class="q-pa-sm col-12 col-md-5">
      <q-card-section>
        <div class="text-h6">Frequent Users Statistics</div>
      </q-card-section>
      <q-card-section>
        <canvas ref="canvas"></canvas>
      </q-card-section>
    </q-card>

    <!-- =================================== ALL USERS CARD -->
    <q-card class="q-pa-sm col-12 col-md-6">

      <!-- details -->
      <q-card v-if="selectedUser">
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
        <div class="row justify-center">
          <!-- close card -->
          <q-card-actions>
            <q-btn dense flat label="Close" color="primary" @click="closeDetails" />
          </q-card-actions>
          <!-- update user type -->
          <q-card-actions v-if="editMode !== selectedUser._id">
            <q-btn dense flat icon="eva-edit-outline" color="primary"  @click="editMode = selectedUser._id" />
          </q-card-actions>
          <q-card-actions v-if="editMode === selectedUser._id" >
            <q-btn dense flat icon="eva-edit-outline" color="primary"   @click="updateUserType(selectedUser)" />
          </q-card-actions>
          <q-card-actions v-if="editMode === selectedUser._id">
            <q-btn dense flat label="Cancel" color="secondary"  @click="editMode = null" />
          </q-card-actions>
          <!-- delete user -->
          <q-card-actions>
            <q-btn dense flat label="Delete" color="negative" @click="deleteUser(selectedUser._id, selectedUser.username)" />
          </q-card-actions>
          <!-- logout user -->
          <q-card-actions>
            <q-btn dense flat label="Logout" color="warning" v-if="selectedUser.loginInfo && selectedUser.loginInfo.isLoggedIn === true " @click="logoutUser(selectedUser._id, selectedUser.username)" />
          </q-card-actions>
        </div>
      </q-card>

      <!-- all users -->
      <q-card flat v-else>
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
    async getFrequentlyLoggedInUsers() {
      const response = await UserService.findUsersFrequentlyLoggedIn()
      this.frequentUsers = response
      console.log(this.frequentUsers)
      this.createChart()
    },
    createChart() {
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
    async getAllUsers() {
      const response = await UserService.findAllUsers()
      this.users = response
    },
    async updateUserType(selectedUser) {
      const currentUser = await UserService.FindUserByToken()
      const userId = this.selectedUser._id

      const updatedUser = {
        firstName: this.selectedUser.firstName,
        lastName: this.selectedUser.lastName,
        email: this.selectedUser.email,
        phone: this.selectedUser.phone,
        username: this.selectedUser.username,
        password: this.selectedUser.password,
        // update usertype
        userType: selectedUser.userType,
        location: this.selectedUser.location,
        loginInfo: this.selectedUser.loginInfo,
        order: this.selectedUser.order
      }

      if (currentUser._id === userId) {
        this.$q.dialog({
            title: 'Error',
            message: 'You cannot change your usertype!',
            ok: 'OK'
          }).onOk(() => {
            window.location.reload();
            return;
          });
          return;
      } else {
        this.$q.dialog({
          title: 'Update user',
          message: `You are about to update ${updatedUser.username}, continue?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          try {
            await UserService.updateUserDetails(userId, updatedUser)
            this.editMode = null
          } catch (error) {
            console.error(error);
          }
        }).onCancel(() => {
          this.editMode = null
          this.getAllUsers()
          return
        }).onDismiss(() => {});
      }
    },
    async deleteUser(userId, username) {
      const currentUser = await UserService.FindUserByToken()
      if (currentUser._id === userId) {
        this.$q.dialog({
            title: 'Error',
            message: 'You cannot delete yourself!',
            ok: 'OK'
          }).onOk(() => {
            return;
          });
          return;
      } else {
        this.$q.dialog({
          title: 'Delete user',
          message: `You are about to delete ${username}, continue?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          try {
            await UserService.deleteUser(userId)
            window.location.reload();
          } catch (error) {
            console.error(error);
          }
        }).onCancel(() => {}).onDismiss(() => {});
      }
    },
    async logoutUser(userId, username) {
      const currentUser = await UserService.FindUserByToken()
      if (currentUser._id === userId) {
        this.$q.dialog({
            title: 'Error',
            message: 'You are currently logged in!',
            ok: 'OK'
          }).onOk(() => {
            return;
          });
          return;
      } else {
        this.$q.dialog({
          title: 'Logout User',
          message: `You are about to logout ${username}, continue?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          try {
            const response = await UserService.logoutUser(userId)
            console.log(response);
            await this.getAllUsers();
          } catch (error) {
            console.error(error);
          }
        })
        .onCancel(() => {}).onDismiss(() => {});
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
