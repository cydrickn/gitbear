<script setup>
import Group from "../../components/partials/group";
import Tree from "../../components/partials/tree";
import ProjectMenu from "../../components/partials/project-menu";

const props = defineProps({
  info: Object
})

</script>

<template>
  <div>
    <div v-if="info.type === 'group'">
      <group :children="info.children"></group>
    </div>
    <div v-else>
      <project-menu></project-menu>
      <div class="mt-4">
        <tree branch="main" :repo-path="info.path" tree-path="/"></tree>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>