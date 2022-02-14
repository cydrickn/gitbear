<script setup>
import ProjectMenu from "./project-menu";
import {useInfo} from "../../composables/useInfo";

const params = useRoute().params;
const repoPath = params.child.join('/');
const filePaths = params.blob || params.tree || [];
let lastType = 'tree';
if (params.blob) {
  lastType = 'blob';
}

const branch = ref(filePaths[0]);
const paths = filePaths.filter((val, key) => {
  return key !== 0;
});

const { data: repoInfo } = await useInfo(repoPath);
const pathsInfo = ref([{
  name: repoInfo.value.name,
  path: repoInfo.value.path
}]);

const branches = ref([]);
repoInfo.value.branches.forEach((currentBranch) => {
  const branchPath = (repoInfo.value.path + '/' + lastType + '/' + currentBranch + '/' + paths.join('/')).replace(/\/+/g, '/');
  branches.value.push({
    name: currentBranch,
    path: branchPath
  })
});

let pathInc = '/';

paths.forEach((path, key) => {
  let type = lastType;
  if (key < paths.length - 1) {
    type = 'tree';
  }
  pathInc += '/' + path;
  pathsInfo.value.push({
    name: path,
    path: (repoInfo.value.path + '/' + type + '/' + branch + '/' + pathInc).replace(/\/+/g, '/'),
  });
})

</script>

<template>
  <div>
    <project-menu></project-menu>
    <div class="mt-8 flex items-center">
      <div class="dropdown">
        <div tabindex="0" class="m-1 btn">{{ branch }}</div>
        <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          <li v-for="(branch,key) in branches" :key="key">
            <nuxt-link :to="branch.path">{{ branch.name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="breadcrumbs ml-4">
        <ul>
          <li v-for="(pathInfo, key) in pathsInfo" :key="key" class="before:"><nuxt-link :to="pathInfo.path">{{ pathInfo.name }}</nuxt-link></li>
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