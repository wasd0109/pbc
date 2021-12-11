<template>
  <div class="cards">
    <EventCard
      v-for="event of registeredEvents"
      :key="event.id"
      :event="event"
      @register="handleRegistration"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      registeredEvents: [],
    };
  },
  async fetch() {
    const entries = await this.$axios.$get(
      "http://localhost:3001/entries?userId=1"
    );
    const results = [];
    for (let entry of entries) {
      const event = await this.$axios.$get(
        `http://localhost:3001/events/${entry.eventId}`
      );
      results.push(event);
    }

    this.registeredEvents = results;
  },
  methods: {
    async handleRegistration(eventId) {
      console.log(eventId);
      await this.$axios.$post("http://localhost:3001/entries", {
        data: { eventId, userId: 1 },
      });
    },
  },
};
</script>
