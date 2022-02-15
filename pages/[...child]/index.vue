<script setup>
import Group from "../../components/partials/group";
import Tree from "../../components/partials/tree";
import {useInfo} from "../../composables/useInfo";
import PathContainer from "../../components/partials/path-container";

const params = useRoute().params;
const path = params.child.join('/');
const emit = defineEmits(['project:changed']);

const info = await useInfo(path);
</script>

<template>
  <div>
    <div v-if="info.type === 'group'">
      <group :children="info.children"></group>
    </div>
    <div v-else>
      <path-container :info="info" path="" :branch="info.defaultBranch" type="tree" with-menu>
        <tree :branch="info.defaultBranch" :repo-path="info.path" tree-path="/"></tree>
      </path-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>