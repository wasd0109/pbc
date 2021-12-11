<template>
  <v-container>
    <v-card>
      <v-img src="http://placehold.jp/800x200.png"></v-img>
      <v-card-title> {{ event.Title }} </v-card-title>
      <v-card-subtitle>
        {{ event.Description }}
      </v-card-subtitle>
      <v-card-text>
        <p class="text-sm-body-2" v-if="event['Is Online']">Online</p>
        <p class="text-sm-body-2">Location: {{ event.Location }}</p>
        <p class="text-sm-body-2">Starting time: {{ event["Event Date"] }}</p>
        <div id="tags">
          <div v-for="tag of event.Tags" :key="tag" class="tag">
            {{ tag }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return { event: {} };
  },
  async fetch() {
    const id = this.$route.params.id;
    console.log(id);
    const res = await this.$axios.$get(
      `https://t2meet.bubbleapps.io/version-test/api/1.1/obj/event/${id}`
    );

    this.event = res.response;
    // event.eventDate = new Date(event.eventDate).toLocaleString();
  },
  fetchOnServer: false,
  fetchKey: "event",
};
</script>

<style>
.tag {
  margin-right: 1rem;
  padding: 0 0.5rem;
  border-radius: 25px;
  background-color: black;

  border-width: 10px;
}
#tags {
  display: flex;
  justify-content: flex-start;
}
</style>
