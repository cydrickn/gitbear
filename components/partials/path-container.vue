<script setup>
import ProjectMenu from "./project-menu";
import {useUtils} from "../../composables/useUtils";

const props = defineProps({
  info: Object,
  path: String,
  type: String,
  branch: String,
  withMenu: Boolean
})

const utils = useUtils();
const branches = ref([]);
props.info.branches.forEach((currentBranch) => {
  const branchPath = (props.info.path + '/-/' + props.type + '/' + currentBranch + '/' + props.path).replace(/\/+/g, '/');
  branches.value.push({
    name: currentBranch,
    path: branchPath
  })
});


const pathsInfo = ref([]);
if (props.path) {
  let currentPath = '';
  const paths = props.path.split('/');
  paths.forEach((path, key) => {
    const type = key < paths.length - 1 ? 'tree' : props.type;
    currentPath += '/' + path;

    pathsInfo.value.push({
      name: path,
      path: utils.normalizeUrl([props.info.path, '-', type, props.branch, currentPath].join('/')),
    });
  });
}

</script>

<template>
  <div>
    <project-menu v-if="withMenu"></project-menu>
    <div class="mt-8 flex items-center">
      <div class="dropdown">
        <div tabindex="0" class="m-1 select select-sm select-bordered w-full">{{ branch }}</div>
        <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          <li v-for="(branch,key) in branches" :key="key">
            <nuxt-link :to="branch.path">{{ branch.name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div v-if="pathsInfo.length > 0" class="breadcrumbs ml-4">
        <ul>
          <li><nuxt-link :to="info.path">{{ info.name }}</nuxt-link></li>
          <li v-for="(pathInfo, key) in pathsInfo" :key="key"><nuxt-link :to="pathInfo.path">{{ pathInfo.name }}</nuxt-link></li>
        </ul>
      </div>
    </div>
    <div class="mt-4">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>