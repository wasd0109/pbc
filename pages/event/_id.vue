<template>
  <v-container>
    <Spinner v-if="$fetchState.pending" />
    <v-card v-else min-width="100%">
      <v-img
        :src="
          event['Event Image'] ||
          'https://www.iapco.org/app/plugins/events-calendar-pro/src/resources/images/tribe-related-events-placeholder.png'
        "
        min-height="400px"
        max-height="400px"
      ></v-img>
      <v-card-title> {{ event.Title }} </v-card-title>
      <v-card-subtitle>
        {{ event.Description }}
      </v-card-subtitle>
      <v-card-text>
        <p class="text-sm-body-2" v-if="event['Is Online']">Online Event</p>
        <p class="text-sm-body-2">Location: {{ event.Location }}</p>
        <p class="text-sm-body-2">Starting time: {{ startingTime }}</p>
        <p class="text-sm-body-2">Ending time: {{ endingTime }}</p>
        <p class="text-sm-body-2">Duration: {{ duration }}hr</p>
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
import Spinner from "../../components/Spinner.vue";
export default {
  components: { Spinner },
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
  computed: {
    startingTime() {
      return new Date(this.event["Event Date (from)"]).toLocaleString();
    },
    endingTime() {
      return new Date(this.event["Event Date (to)"]).toLocaleString();
    },
    duration() {
      const startHours = new Date(this.event["Event Date (from)"]).getHours();
      const endHours = new Date(this.event["Event Date (to)"]).getHours();
      let hourDiff = endHours - startHours;
      if (hourDiff < 0) {
        hourDiff = 24 + hourDiff;
      }
      return hourDiff;
    },
  },
};
</script>

<style scoped>
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
