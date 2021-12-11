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
    <v-list>
      <v-list-item v-for="event of filteredList">
        <v-list-item-avatar
          ><v-img :src="event['Event Image']"></v-img
        ></v-list-item-avatar>
        <v-list-item-title>{{ event.Title }}</v-list-item-title>
        <v-list-item-action
          ><v-btn @click="" elevation="0" nuxt :to="`/event/${event._id}`"
            ><v-icon>mdi-chevron-right</v-icon></v-btn
          >
        </v-list-item-action>
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
    console.log(response);
    this.eventList = response.results;
    this.filteredList = response.results;
  },
  data() {
    return {
      eventList: [],
      filteredList: [],
      searchText: "",
      searchFilterItems: ["Title", "Tags", "Description"],
      searchFilter: "Title",
    };
  },
  watch: {
    searchText() {
      if (this.searchFilter !== "Tags") {
        this.filteredList = this.eventList.filter((event) =>
          event[this.searchFilter]
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
        );
      } else {
        this.filteredList = this.eventList.filter((event) => {
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
      console.log(this.filteredList);
    },
  },
};
</script>

<style></style>
