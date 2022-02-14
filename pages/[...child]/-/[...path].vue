<script setup>
import Tree from "../../../components/partials/tree";
import {useUtils} from "../../../composables/useUtils";
import PathContainer from "../../../components/partials/path-container";
import {useClient} from "../../../composables/useClient";
const utils = useUtils();
const client = useClient();

const params = useRoute().params;
console.log(params);
const repoPath = params.child.join('/');
const info = await useInfo(repoPath);

const routeType = utils.getRouteType(info.value.path, useRoute().path);
const parsedTree = utils.parseTree(info.value.path, useRoute().path, routeType);

const branch = parsedTree[0];
const path = parsedTree.filter((val, key) => {
  return key !== 0;
}).join('/');

const { data: blob } = await useAsyncData('blob', () => client('/api/blob', {
  params: {
    branch: branch,
    path: path,
    repoPath: info.value.path,
  }
}));
</script>

<template>
  <path-container :info="info" :path="path" :branch="branch" type="tree">
    <tree v-if="routeType === 'tree'" :branch="branch" :repo-path="info.path" :tree-path="path + '/'"></tree>
    <div v-else class="card card-bordered">
      <div class="mockup-code bg-transparent text-primary-content">
<pre v-for="(line, key) in blob.content" :key="key" :data-prefix="key + 1">
<code>{{ line}}</code>
</pre>
      </div>
    </div>
  </path-container>
</template>

<style lang="scss" scoped>

</style>