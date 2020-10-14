<template>
  <div class="home">
    <h1>Home</h1>
    <h2>Users:</h2>
    <div class="users-list">
      <router-link
        v-for="user in users"
        :to="{ name: 'UserProfile', params: { userId: user.id } }"
        :key="user.id"
      >
        <div class="user-link">
          - {{ user.username }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { users } from "../assets/users";
export default {
  name: "Home",
  setup() {
    return {
      users,
    };
  },
};
</script>
<style lang="scss" scoped>
.home {
  padding: 50px 5%;
  .users-list {
    display: flex;
    flex-direction: column;
    :hover {
      color: yellowgreen;
      background-color: black;
      font-weight: bold;
    }
    .user-link {
      padding: 10px;
    }
  }
}
</style>