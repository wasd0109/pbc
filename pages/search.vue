<template>
  <v-container>
    <v-select :items="searchFilterItems" v-model.trim="searchFilter"></v-select>
    <v-text-field
      outlined
      label="Search"
      placeholder="Search for events"
      v-model="searchText"
    >
    </v-text-field>
    <v-checkbox v-model="isOnlineOnly" label="Online Only"></v-checkbox>
    <Spinner color="white" v-if="$fetchState.pending"></Spinner>
    <v-list id="search-list" v-if="eventList.length">
      <v-list-item
        v-for="event of filteredList"
        :key="event._id"
        nuxt
        :to="`/event/${event._id}`"
      >
        <v-list-item-avatar
          ><v-img
            :src="
              event['Event Image'] ||
              'https://www.iapco.org/app/plugins/events-calendar-pro/src/resources/images/tribe-related-events-placeholder.png'
            "
          ></v-img
        ></v-list-item-avatar>
        <v-list-item-title>{{ event.Title }}</v-list-item-title>
        <v-list-item-action-text
          v-if="event.isRegistered"
          class="registered-text"
          >REGISTERED</v-list-item-action-text
        >
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  async fetch() {
    const { response } = await this.$axios.$get(
      "https://t2meet.bubbleapps.io/version-test/api/1.1/obj/event"
    );
    const entryRes = await this.$axios.$get(
      "https://t2meet.bubbleapps.io/version-test/api/1.1/obj/entry"
    );
    const entriesIds = entryRes.response.results
      .filter((entry) => entry.user_id === this.currentUser.user_id)
      .map((entry) => entry.event_id);
    const eventList = response.results.map((event) => ({
      ...event,
      isRegistered: entriesIds.includes(event._id),
    }));

    this.eventList = eventList;
    this.filteredList = eventList;
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    filterEventList(searchFilter, searchText, isOnlineOnly) {
      let filteredList = this.eventList;
      if (searchText) {
        if (searchFilter !== "Tags") {
          filteredList = this.eventList.filter((event) =>
            event[searchFilter].toLowerCase().includes(searchText.toLowerCase())
          );
        } else {
          filteredList = this.eventList.filter((event) => {
            const eventTags = event["Tag"];
            for (let eventTag of eventTags) {
              if (
                eventTag.toLowerCase().includes(this.searchText.toLowerCase())
              ) {
                return true;
              }
              return false;
            }
          });
        }
      }
      if (isOnlineOnly) {
        filteredList = filteredList.filter((event) => event["Is Online"]);
      }

      return filteredList;
    },
  },
  computed: {
    currentUser() {
      return this.$auth.$state.user;
    },
  },
  data() {
    return {
      eventList: [],
      filteredList: [],
      searchText: "",
      searchFilterItems: ["Title", "Tags"],
      searchFilter: "Title",
      isOnlineOnly: false,
    };
  },
  watch: {
    searchText() {
      this.filteredList = this.filterEventList(
        this.searchFilter,
        this.searchText,
        this.isOnlineOnly
      );
    },
    isOnlineOnly() {
      this.filteredList = this.filterEventList(
        this.searchFilter,
        this.searchText,
        this.isOnlineOnly
      );
    },
  },
};
</script>

<style scoped>
.registered-text {
  margin-right: 1rem;
}
#search-list {
  display: flex;
  flex-direction: column;
}
</style>
