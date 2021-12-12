<template>
  <v-container>
    <v-select :items="searchFilterItems" v-model.trim="searchFilter"></v-select>
    <v-text-field
      outlined
      label="Search"
      placeholder="Search for events"
      v-model="searchText"
      v-if="searchFilter !== 'Tags'"
    >
    </v-text-field>
    <v-chip-group v-else>
      <v-chip
        v-for="tag of availableTags"
        :key="tag"
        :color="selectedTags.includes(tag) ? '#009688' : 'dark-gray'"
        @click="toggleTags(tag)"
        >{{ tag }}</v-chip
      >
    </v-chip-group>
    <v-checkbox v-model="isOnlineOnly" label="Online Only"></v-checkbox>
    <Spinner color="white" v-if="$fetchState.pending"></Spinner>
    <v-list id="search-list" v-if="filteredList.length">
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
    <h2 v-else-if="!filteredList.length && eventList.length">
      Please change your search criteria
    </h2>
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
    const tagsRes = await this.$axios.$get(
      "https://t2meet.bubbleapps.io/version-test/api/1.1/obj/tag_data"
    );
    this.availableTags = tagsRes.response.results.map((tag) => tag.Name);
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
        }
      }

      if (searchFilter === "Tags") {
        {
          filteredList = this.eventList.filter((event) => {
            const eventTags = event["Tag"].map((tag) => tag.toLowerCase());
            console.log(eventTags);
            for (let selectedTag of this.selectedTags) {
              if (eventTags.includes(selectedTag.toLowerCase())) return true;
            }
            return false;
          });
        }
      }

      if (isOnlineOnly) {
        filteredList = filteredList.filter((event) => {
          console.log(event["Is Online"]);
          return event["Is Online"] === "Yes";
        });
      }
      console.log(filteredList);
      return filteredList;
    },
    toggleTags(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter(
          (selectedTag) => selectedTag !== tag
        );
      } else {
        this.selectedTags.push(tag);
      }
      this.filteredList = this.filterEventList(
        this.searchFilter,
        this.searchText,
        this.isOnlineOnly
      );
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
      availableTags: [],
      selectedTags: [],
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
    selectedTags() {
      if (!this.selectedTags.length) {
        this.filteredList = this.eventList;
      }
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

.selected {
  background-color: #009688;
}
</style>
