<script setup>
import {useCrumbs} from "../composables/useCrumbs";
import Group from "../components/partials/group";
import {usePathInfo} from "../composables/usePathInfo";
import {useUtils} from "../composables/useUtils";
import PathContainer from "../components/partials/path-container";
import Tree from "../components/partials/tree";
import Blob from "../components/partials/blob";
import Commits from "../components/partials/commits";
const utils = useUtils();

definePageMeta({
  layout: 'app'
});

useCrumbs().set();
const { repo, parsedTree, type } = await usePathInfo();
let branch = '';
let path = parsedTree.join('/');
if (['tree', 'blob', 'commits'].includes(type)) {
  branch = parsedTree[0] || repo.defaultBranch;
  path = parsedTree.filter((val, key) => {
    return key !== 0;
  }).join('/');
}
</script>

<template>
  <div>
    <group v-if="repo.type === 'group'" :children="repo.children"></group>
    <path-container v-else :info="repo" :path="path" :branch="branch" :type="type" with-menu>
      <tree v-if="type === 'tree'" :branch="branch" :repo-path="repo.path" :tree-path="path + '/'"></tree>
      <blob v-if="type === 'blob'" :path="path" :branch="branch" :repo-path="repo.path"></blob>
      <commits v-if="type === 'commits'" :path="path" :branch="branch" :repo-path="repo.path"></commits>
    </path-container>
  </div>
</template>

<style scoped>
</style>