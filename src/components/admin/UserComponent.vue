<template>
  <div class="row q-mt-md flex-center">

    <!-- user details card -->
    <q-card v-if="selectedUser" class="my-card q-pa-sm q-mr-md" bordered flat>
      <q-card-section>
        <div class="text-h6">User Details</div>
        <div>Username: {{ selectedUser.username }}</div>
        <div>First Name: {{ selectedUser.firstName }}</div>
        <div>Last Name: {{ selectedUser.lastName }}</div>
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="Close" color="primary" @click="closeDetails" />
      </q-card-actions>
    </q-card>

    <!-- all users card -->
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
          <tr @click="openDetails(user)">
            <td class="text-left cursor-pointer">{{ user.username }}</td>
            <td class="text-left cursor-pointer">{{ user.firstName }}</td>
            <td class="text-left cursor-pointer">{{ user.lastName }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>


  </div>
</template>

<script>
import UserService from 'src/services/UserService';

export default {
  data() {
    return {
      users: [{}],
      selectedUser: null
    }
  },
  methods: {
    async getAllUsers() {
      const response = await UserService.findAllUsers()
      this.users = response
      console.log(this.users)
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
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 40%
</style>
