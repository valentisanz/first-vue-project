<template>
  <div class="user-profile">
    <div class="user-profile_user-panel">
      <h1 class="user-profile_username">@{{ state.user.username }}</h1>
      <div class="user-profile_admin-badge" v-if="state.user.admin">Admin</div>
      <div class="user-profile_followers-count">
        <strong>Followers: </strong>{{ state.followers }}
      </div>
      <form
        class="user-profile_create-post"
        @submit.prevent="createPost"
        :class="{ '-exceeded': newPostCharacterCounter > 140 }"
      >
        <label for="newPost"
          ><strong>New post</strong> ({{ newPostCharacterCounter }}/140)</label
        >
        <textarea autofocus id="newPost" rows="4" v-model="state.newPostBody" />
        <div class="user-profile_post-type">
          <label for="newPostType"><strong>Type: </strong></label>
          <select
            name="newPostType"
            id="newPostType"
            v-model="state.selectedPostType"
          >
            <option
              :value="option.value"
              v-for="(option, index) in state.postTypes"
              :key="index"
            >
              {{ option.name }}
            </option>
          </select>
          <button>Post!</button>
        </div>
        <div class="post-type_advise">{{ state.postTypeAdvise }}</div>
      </form>
    </div>
    <div class="user-profile_user-posts">
      <Post
        v-for="post in state.user.posts"
        :key="post.id"
        :username="state.user.username"
        :post="post"
        @favourite="toggleFavourite"
      />
    </div>
  </div>
</template>

<script>
import Post from "../components/Post";
import { reactive, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { users } from "../assets/users";
export default {
  name: "UserProfile",
  components: { Post },
  setup(props, ctx) {
    const route = useRoute();
    const userId = computed(() => route.params.userId);
    //check if userId!=null

    //data
    const state = reactive({
      postTypeAdvise: "",
      newPostBody: "",
      selectedPostType: "draft",
      postTypes: [
        { value: "draft", name: "Draft" },
        { value: "instant", name: "Instant Post" },
      ],
      followers: 0,
      user: users[userId.value - 1] || users[0]
    });
    //computed
    const newPostCharacterCounter = computed(() => state.newPostBody.length);
    function createPost() {
      if (state.newPostBody && state.selectedPostType !== "draft") {
        state.user.posts.unshift({
          id: state.user.posts.length + 1,
          body: state.newPostBody,
          timestamp: new Date(),
        });
        state.newPostBody = "";
        state.postTypeAdvise = "";
      } else if (state.selectedPostType === "draft") {
        state.postTypeAdvise =
          "If your post is ready change to 'Instant Post' type! :D";
      }
    }
    function followUser() {
      state.followers++;
    }
    function toggleFavourite(id) {
      console.log(id);
    }
    const watching = watch(
      () => state.followers,
      (newFollowerCount, oldFollowerCount) => {
        if (oldFollowerCount < newFollowerCount) {
          console.log(`${state.user.username} has gained a follower!`);
        }
      }
    );
    const mountFollow = onMounted(() => followUser());
    const mountUsernameGlobal = onMounted(() =>
      ctx.emit("usernamed", state.user.username)
    );

    return {
      state,
      newPostCharacterCounter,
      createPost,
      followUser,
      toggleFavourite,
      watching,
      mountFollow,
      mountUsernameGlobal,
      userId,
    };
  },
  //OLD COMPOSITION API
  /*data() {
    return {
      postTypeAdvise: "",
      newPostBody: "",
      selectedPostType: "draft",
      postTypes: [
        { value: "draft", name: "Draft" },
        { value: "instant", name: "Instant Post" },
      ],
      followers: 0,
      user: {
        id: 1,
        username: "gotard",
        firstName: "Valenti",
        lastName: "Sanz",
        email: "valenti@gmail.com",
        admin: true,
        posts: [],
      },
    };
  },
  //watches a data point and runs when the data changes
  //2 params new and old changed data
  watch: {
    followers(newFollowerCount, oldFollowCount) {
      if (oldFollowCount < newFollowerCount) {
        console.log(`${this.user.username} has gained a follower!`);
      }
    },
  },
  //group data to display it easily(?)
  computed: {
    newPostCharacterCounter() {
      return `${this.newPostBody.length}`;
    },
  },
  methods: {
    followUser() {
      this.followers++;
    },
    toggleFavourite(id) {
      console.log(id);
    },
    createPost() {
      if (this.newPostBody && this.selectedPostType !== "draft") {
        this.user.posts.unshift({
          id: this.user.posts.length + 1,
          body: this.newPostBody,
          timestamp: new Date(),
        });
        this.postTypeAdvise = "";
      } else if (this.selectedPostType === "draft") {
        this.postTypeAdvise =
          "If your post is ready change to 'Instant Post' type! :D";
      }
    },
  },
  //executed when the page is loded for the first time
  mounted() {
    this.followUser();
  },*/
};
</script>

<style lang='scss' scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 50px;
  padding: 50px 5%;
}
.user-profile_user-panel {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #dfe3e8;
  margin-bottom: auto;
}
h1 {
  margin: 0;
}
.user-profile_admin-badge {
  background: rebeccapurple;
  color: white;
  border-radius: 5px;
  margin-right: auto;
  padding: 0 10px;
  font-weight: bold;
}
.user-profile_user-posts {
  display: grid;
  grid-gap: 10px;
  margin-bottom: auto;
}
.user-profile_create-post {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}
.user-profile_post-type {
  padding: 15px 0 15px;
}
.-exceeded {
  color: red;
  border-color: red;
  button {
    background-color: red;
    border: none;
    color: white;
  }
}
button {
  background-color: yellowgreen;
  border: none;
  padding: 5px 15px;
  margin: 15px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}
.post-type_advise {
  color: red;
}
</style>