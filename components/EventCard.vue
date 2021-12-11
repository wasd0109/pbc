<template>
  <v-card min-width="30%">
    <nuxt-link :to="`/event/${event._id}`" nuxt as="div">
      <v-img max-height="100px" max-width="100%" :src="imageUrl"></v-img>
      <v-card-title>{{ event.Title }}</v-card-title>
      <v-card-subtitle>{{ event.Description }}</v-card-subtitle>
    </nuxt-link>
    <v-card-actions> <slot></slot> </v-card-actions
  ></v-card>
</template>

<script>
export default {
  props: ["event"],
  emits: ["register"],
  computed: {
    imageUrl() {
      if (this.event["Event Image"]) return this.event["Event Image"];
      return "http://placehold.jp/200x100.png";
    },
  },
};
</script>

<style></style>
