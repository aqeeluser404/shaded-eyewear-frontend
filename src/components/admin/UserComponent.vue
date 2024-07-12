<template>
  <!-- constrains -->
  <div class="row q-ma-md items-start">

    <!-- =================================== ALL USERS CARD -->
    <q-card class="my-card q-pa-sm" bordered flat>
      <q-card-section>
        <div class="text-h6">All Users</div>
      </q-card-section>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Username</th>
            <th class="text-left">First Name</th>
            <th class="text-left">Last Name</th>
          </tr>
        </thead>
        <tbody v-for="user in users" :key="user._id">
          <tr @click="openDetails(user)" :class="{ 'admin-user': user.userType === 'admin' }">
            <td class="text-left cursor-pointer">{{ user.username }}</td>
            <td class="text-left cursor-pointer">{{ user.firstName }}</td>
            <td class="text-left cursor-pointer">{{ user.lastName }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <!-- =================================== USER DETAILS CARD -->
    <!-- overlay -->
    <div v-if="selectedUser" class="dark-overlay"></div>
    <!-- popout card details -->
    <q-card v-if="selectedUser" class="q-pa-lg element-fixed">
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
            <td class="text-left cursor-pointer">{{ selectedUser.userType }}</td>
          </tr>
          <tr></tr>
        </tbody>
      </q-markup-table>
      <!-- close button -->
      <div class="row">
        <q-card-actions>
          <q-btn label="Close" color="primary" @click="closeDetails" />
        </q-card-actions>
      </div>
    </q-card>

    <!-- =================================== CURRENTLY LOGGED IN USERS -->
    <q-card class="q-pa-sm q-ml-lg" flat>
      <q-card-section>
        <div class="text-h6">Currently Logged In</div>
      </q-card-section>
      <q-timeline color="primary" v-for="loggedInUser in loggedInUsers" :key="loggedInUser._id"
        :class="{ 'admin-user': loggedInUser.userType === 'admin' }"
      >
        <q-timeline-entry
          :title="loggedInUser.username"
          :subtitle="`user id: ${ loggedInUser._id }`"
          color="primary"
        />
        <q-separator style="width: 0; height: 0;" />
      </q-timeline>
    </q-card>

    <q-separator />

    <!-- =================================== GRAPHS -->
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Frequent Users Statistics</div>
      </q-card-section>
      <q-card-section>
        Graph displaying frequent users and how much times they logged in, bar graph
        sample Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus placeat consequatur sit temporibus tempore facilis omnis ad commodi eos, labore recusandae qui dolorum! Ipsum minus accusantium iusto quo rem!
        sample Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus placeat consequatur sit temporibus tempore facilis omnis ad commodi eos, labore recusandae qui dolorum! Ipsum minus accusantium iusto quo rem!
        sample Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus placeat consequatur sit temporibus tempore facilis omnis ad commodi eos, labore recusandae qui dolorum! Ipsum minus accusantium iusto quo rem!
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import UserService from 'src/services/UserService';

export default {
  data() {
    return {
      users: [{}],
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
    async getAllUsers() {
      const response = await UserService.findAllUsers()
      this.users = response
    },
    async getCurrentlyLoggedInUsers() {
      const response = await UserService.findUsersLoggedIn()
      this.loggedInUsers = response
    },
    async getFrequentlyLoggedInUsers() {
      const response = await UserService.findUsersFrequentlyLoggedIn()
      this.frequentUsers = response
      console.log(this.frequentUsers)
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
    this.getCurrentlyLoggedInUsers()
    this.getFrequentlyLoggedInUsers()
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 40%
.admin-user
  color: green
</style>
