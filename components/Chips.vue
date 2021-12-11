<template>
  <v-chip @click="toggleSelected" :color="selected ? 'green' : ''">{{
    tag.Name
  }}</v-chip>
</template>

<script>
export default {
  props: ["tag"],
  data() {
    return {
      selected: false,
    };
  },
  methods: {
    toggleSelected() {
      if (this.selected) {
        this.$emit("deselected", this.$props.tag);
        this.selected = false;
      } else {
        this.$emit("selected", this.$props.tag);
        this.selected = true;
      }
    },
  },
  emits: ["selected", "deselected"],
};
</script>

<style scoped></style>
