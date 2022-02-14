<script setup>
import Group from "../../../components/partials/group";
import Tree from "../../../components/partials/tree";
import ProjectMenu from "../../../components/partials/project-menu";
import PathContainer from "../../../components/partials/path-container";

const props = defineProps({
  info: Object
})

const params = useRoute().params;
const branch = params.tree[0];
const path = params.tree.filter((val, key) => {
  return key !== 0;
}).join('/') + '/';
</script>

<template>
  <path-container>
    <tree :branch="branch" :repo-path="info.path" :tree-path="path"></tree>
  </path-container>
</template>

<style lang="scss" scoped>

</style>