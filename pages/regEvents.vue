<template>
  <div class="cards">
    <EventCard v-for="event of registeredEvents" :key="event.id" :event="event">
      <slot>
        <v-btn @click.stop="handleUnRegistration(event.entryId)"
          >Un-Register</v-btn
        ></slot
      >
    </EventCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registeredEvents: [],
      entries: [],
    };
  },
  async fetch() {
    // !! Hack for using Bubble backend workflow for search
    // TODO Find a way to do it through Bubble data API
    const { response } = await this.$axios.$get(
      "https://t2meet.bubbleapps.io/version-test/api/1.1/obj/entry",
      {
        params: {
          constraints: {
            key: "user_id",
            constraint_type: "equals",
            value: "1639153112296x840979326742023200",
          },
        },
      }
    );
    const entries = response.results;
    this.entries = entries;
    const results = [];
    for (let entry of entries) {
      const { response } = await this.$axios.$get(
        `https://t2meet.bubbleapps.io/version-test/api/1.1/obj/event/${entry.event_id}`
      );

      const event = response;

      // To allow unregister through EntryId
      event.entryId = entry._id;
      console.log(entry._id);
      results.push(event);
    }
    this.registeredEvents = results;
  },
  methods: {
    async handleUnRegistration(entryId) {
      console.log(entryId);
      await this.$axios.$post(
        "https://t2meet.bubbleapps.io/version-test/api/1.1/wf/unregister-event",
        {},
        {
          params: {
            entryId,
          },
        }
      );
      this.$fetch();
    },
  },
};
</script>
