<template>
  <v-card min-width="100%">
    <nuxt-link :to="`/event/${event._id}`" nuxt as="div">
      <v-img
        :src="
          event['Event Image'] ||
          'https://www.iapco.org/app/plugins/events-calendar-pro/src/resources/images/tribe-related-events-placeholder.png'
        "
        min-height="400px"
        max-height="400px"
      ></v-img>
      <v-container>
        <v-card-title>{{ event.Title }}</v-card-title>
        <v-card-subtitle>{{ event.Description }}</v-card-subtitle>
        <v-card-text>{{ startingTime }}</v-card-text>
        <v-chip class="tag" v-for="tag of event.Tag" :key="tag"
          ><p>{{ tag }}</p></v-chip
        ></v-container
      >
    </nuxt-link>
    <v-card-actions> <slot></slot> </v-card-actions
  ></v-card>
</template>

<script>
export default {
  props: ["event"],
  emits: ["register"],
  computed: {
    startingTime() {
      return new Date(this.event["Event Date (from)"]).toLocaleString();
    },
  },
};
</script>

<style scoped>
.tag {
  text-align: center;
  margin-right: 1rem;
  margin-top: 0.5rem;
}
</style>
