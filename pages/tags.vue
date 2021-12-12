<template>
  <v-container class="container">
    <h1>Please select topics that interest you</h1>
    <h2 v-if="$fetchState.pending"></h2>
    <div class="chip-container">
      <Chips
        v-for="tag of tags"
        :tag="tag"
        :key="tag._id"
        @selected="addSelectedTags"
        @deselected="removeSelectedTags"
      />
    </div>
    <p v-if="error">Please select more than one tag</p>
    <v-btn @click="confirmTagSelection">Confirm</v-btn>
  </v-container>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$auth.$storage.getUniversal('user')
    }
  },
  data() {
    return {
      tags: [],
      selectedTags: [],
      error: false,
    };
  },
  async fetch() {
    const { response } = await this.$axios.$get(
      "https://t2meet.bubbleapps.io/version-test/api/1.1/obj/tag_data"
    );
    this.tags = response.results;
    console.log(this.tags);
  },
  methods: {
    addSelectedTags(tag) {
      const newList = [...this.selectedTags, tag];
      const uniqueList = Array.from(new Set(newList));
      this.selectedTags = uniqueList;
      console.log(this.selectedTags);
    },
    removeSelectedTags(tag) {
      const newList = this.selectedTags.filter(
        (selectedTag) => selectedTag._id !== tag._id
      );
      this.selectedTags = newList;
      console.log(this.selectedTags);
    },
    async confirmTagSelection() {
      console.log("CU",this.currentUser);
      if (this.selectedTags.length <= 0) return (this.error = true);
      console.log(this.selectedTags);
      const tag_ids = this.selectedTags.map((selectedTag) => selectedTag._id);
      const { response } = await this.$axios.$post(
        "https://t2meet.bubbleapps.io/version-test/api/1.1/wf/add-tags-for-users",
        {
          tag_ids,
          user_id: this.currentUser.user_id,
        }
      );
      console.log(response);
      this.$router.push({ path: '/'});
    },
  },
};
</script>


<style>
.chip-container {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

.chip-container * {
  margin: 1rem;
}

.selected-chip {
  color: aquamarine;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  flex-direction: column;
}
</style>
