<template>
  <div class="post" @click="favouritePost(post.id)">
    <div class="user-profile_post">
      <div class="post_user">@{{ username }}</div>

      <div class="post_content">
        {{ post.body }}
      </div>
      <div class="post_timestamp">
        {{ fullDate }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "Post",
  props: {
    username: {
      type: String,
      required: true,
    },
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props,ctx) {
    //computed
    const fullDate = computed(
      () =>
        `${props.post.timestamp.toLocaleTimeString()} ${props.post.timestamp.toLocaleDateString()}`
    );
    function favouritePost(id) {
      ctx.emit("favourite", id);
    }
    return {
      fullDate,
      favouritePost,
    };
  },
};
</script>

<style>
.post {
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #dfe3e8;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.25s ease;
}
.post:hover {
  transform: scale(1.1, 1.1);
}
.post_user {
  font-weight: bold;
}
.post_content {
  font-size: 20px;
  margin: 1.5vh 0 1.5vh;
}
.post_timestamp {
  font-weight: 100;
  font-size: 15px;
}
</style>