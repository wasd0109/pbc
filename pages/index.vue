<template>
  <div>
    <div class="cards">
      <EventCard
        v-for="event of events"
        :key="event.id"
        :event="event"
        @register="handleRegistration"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { events: [] };
  },
  async fetch() {
    const { response } = await this.$axios.$get(
      "https://t2meet.bubbleapps.io/version-test/api/1.1/obj/event"
    );

    this.events = response.results;
  },
  fetchOnServer: false,
  fetchKey: "events",
  methods: {
    async handleRegistration(eventId) {
      console.log(eventId);
      const res = await this.$axios.$post(
        `https://t2meet.bubbleapps.io/version-test/api/1.1/wf/login`,
        {},
        {
          params: {
            email: "chivalry@gmail.com",
            password: "123456",
          },
        }
      );
      console.log(res);
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
