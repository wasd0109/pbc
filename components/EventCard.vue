<template>
  <v-card>
    <nuxt-link :to="`/event/${event._id}`" nuxt as="div">
      <v-img src="http://placehold.jp/200x150.png"></v-img>
      <v-card-title>{{ event.Title }}</v-card-title>
      <v-card-subtitle>{{ event.Description }}</v-card-subtitle>
    </nuxt-link>
    <v-card-actions>
      <slot></slot> </v-card-actions
  ></v-card>
</template>

<script>
export default {
  props: ["event"],
  emits: ["register"],
};
</script>

<style></style>
