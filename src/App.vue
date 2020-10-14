<template>
  <div id="app">
    <nav>
      <router-link to="/">
        <div class="nav_logo">PosteD</div>
      </router-link>
      <div class="nav_user">{{ user.username }}</div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      user: {
        username: "",
      },
    };
  },
};
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #f3f5fa;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5%;
  background-color: yellowgreen;
  color: white;
  .nav_logo {
    font-weight: bold;
    font-size: 32px;
  }
  .nav_user {
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
