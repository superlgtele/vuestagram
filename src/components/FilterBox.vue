<template>
  <div
    @click="fire"
    :class="`${manyfilter} filter-item`"
    :style="`background-image:url(${makeimageurl})`"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FilterBox",
  props: {
    makeimageurl: String,
    manyfilter: String,
  },
  methods: {
    fire() {
      this.emitter.emit("clickfilter", this.manyfilter);
    },
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
