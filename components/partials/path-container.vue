<script setup>
import {useUtils} from "../../composables/useUtils";

const props = defineProps({
  info: Object,
  path: String,
  type: String,
  branch: String,
  withMenu: Boolean
})

const utils = useUtils();
const branches = [];
props.info.branches.forEach((currentBranch) => {
  const branchPath = (props.info.path + '/' + props.type + '/' + currentBranch + '/' + props.path).replace(/\/+/g, '/');
  branches.push({
    name: currentBranch,
    path: branchPath
  })
});


const pathsInfo = [];
if (props.path) {
  let currentPath = '';
  const paths = props.path.split('/');
  paths.forEach((path, key) => {
    const type = key < paths.length - 1 ? 'tree' : props.type;
    currentPath += '/' + path;

    pathsInfo.push({
      name: path,
      path: utils.normalizeUrl([props.info.path, type, props.branch, currentPath].join('/')),
    });
  });
}

const getTabClasses = (expectedTypes) => {
  if (typeof expectedTypes === 'string') {
    expectedTypes = [expectedTypes];
  }

  return expectedTypes.includes(props.type) ? ['tab-bordered', 'tab-active'] : '';
}

</script>

<template>
  <div>
    <div v-if="withMenu" class="tabs w-full px-4">
      <nuxt-link class="tab" :class="[getTabClasses(['tree', 'blob'])]" :to="info.path">
        <i class="fa-solid fa-code"></i><span>Files</span>
      </nuxt-link>
      <nuxt-link class="tab" :class="[getTabClasses('commits')]" :to="info.path + '/commits'">
        <i class="fa-solid fa-code-commit"></i><span>Commits</span>
      </nuxt-link>
      <nuxt-link class="tab" :class="[getTabClasses('branches')]" :to="info.path + '/branches'">
        <i class="fa-solid fa-code-branch"></i><span>Branches</span>
      </nuxt-link>
      <nuxt-link class="tab" :class="[getTabClasses('tags')]" :to="info.path + '/tags'">
        <i class="fa-solid fa-tag"></i><span>Tags</span>
      </nuxt-link>
    </div>
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

<style lang="scss" scoped>
.tab {
  @apply px-8;
  i {
    @apply pr-4;
  }
}
</style>