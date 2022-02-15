<script setup>
import Tree from "../../../components/partials/tree";
import {useUtils} from "../../../composables/useUtils";
import PathContainer from "../../../components/partials/path-container";
import Blob from "../../../components/partials/blob";
const utils = useUtils();

const params = useRoute().params;
const repoPath = params.child.join('/');
const info = await useInfo(repoPath);

const routeType = utils.getRouteType(info.path, useRoute().path);
const parsedTree = utils.parseTree(info.path, useRoute().path, routeType);

const branch = parsedTree[0];
const path = parsedTree.filter((val, key) => {
  return key !== 0;
}).join('/');
</script>

<template>
  <path-container :info="info" :path="path" :branch="branch" :type="routeType" with-menu>
    <tree v-if="routeType === 'tree'" :branch="branch" :repo-path="info.path" :tree-path="path + '/'"></tree>
    <blob v-else :path="path" :branch="branch" :repo-path="info.path"></blob>
  </path-container>
</template>

<style lang="scss" scoped>

</style>