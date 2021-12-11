<template>
  <v-card min-width="100%">
    <nuxt-link :to="`/event/${event._id}`" nuxt as="div">
      <v-img src="http://placehold.jp/200x100.png"></v-img>
      <v-card-title>{{ event.Title }}</v-card-title>
      <v-card-subtitle>{{ event.Description }}</v-card-subtitle>
      <v-chip class="tag" v-for="tag of event.Tag" :key="tag"
        ><p>{{ tag }}</p></v-chip
      >
    </nuxt-link>
    <v-card-actions> <slot></slot> </v-card-actions
  ></v-card>
</template>

<script>
export default {
  props: ["event"],
  emits: ["register"],
};
</script>

<style scoped>
.tag {
  text-align: center;
  margin-right: 1rem;
  margin-top: 0.5rem;
}
</style>
