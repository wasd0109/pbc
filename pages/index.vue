<template>
  <div>
    <div class="cards">
      <EventCard
        v-for="event of events"
        :key="event.id"
        :event="event"
        @register="handleRegistration"
      >
        <v-btn @click.stop="handleRegistration(event._id)"
          >Register</v-btn
        ></EventCard
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.users.currentUser;
    }
  },
  data() {
    return { events: [] };
  },
  async fetch() {
    const eventsRes = await this.$axios.$get(
      "https://t2meet.bubbleapps.io/version-test/api/1.1/obj/event"
    );
    const entriesRes = await this.$axios.$get(
      "https://t2meet.bubbleapps.io/version-test/api/1.1/obj/entry",
      {
        params: {
          constraints: {
            key: "user_id",
            constraint_type: "equals",
            value: this.currentUser.userId,
          },
        },
      }
    );
    const events = eventsRes.response.results;
    const entries = entriesRes.response.results;
    const unregisteredEvents = events.filter((event) => {
      const isRegistered = entries.find((entry) => entry.event_id == event._id)
        ? true
        : false; // Find return truthy value if item is in array and falsy otherwise
      return !isRegistered;
    });
    this.events = unregisteredEvents;
  },
  fetchOnServer: false,
  fetchKey: "events",
  methods: {
    async handleRegistration(eventId) {
      console.log(eventId);
      await this.$axios.$post(
        "https://t2meet.bubbleapps.io/version-test/api/1.1/wf/register-event",
        {},
        {
          params: {
            eventId: eventId,
            userId: "1639153112296x840979326742023200",
          },
        }
      );
      this.$fetch();
    },
  },
};
</script>

<style>
.cards {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 1rem;
  flex-wrap: wrap;
  align-content: space-between;
}
.cards * {
  text-decoration: none;
  margin-top: 10px;
}
</style>
