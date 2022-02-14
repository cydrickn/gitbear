<script setup>
import {useClient} from "../../composables/useClient";

const props = defineProps({
  branch: String,
  repoPath: String,
  treePath: String,
});

const client = useClient();
const { data: files } = await useAsyncData('tree', () => client('/api/tree', {
  params: {
    branch: props.branch,
    path: props.treePath,
    repoPath: props.repoPath,
  }
}));
files.value.forEach((file) => {
  file.path = ('/' + ([props.repoPath.trim('/'), file.type, props.branch, file.path].join('/')))
      .replace(/\/+/g, '/');
  file.commitPath = ('/' + ([props.repoPath.trim('/'), 'commit', file.commit].join('/')))
      .replace(/\/+/g, '/');

  return file;
})
</script>

<template>
  <div>
    <div class="card card-bordered">
      <div class="card-body px-0 gap-0">
        <div v-for="(file,key) in files" :key="key" class="file">
          <div class="mr-2 text-center">
            <div class="w-4">
              <i v-if="file.type === 'tree'" class="fa-solid fa-folder text-primary"></i>
              <i v-else class="fa-solid fa-file text-accent"></i>
            </div>
          </div>
          <div class="w-2/12"><nuxt-link :to="file.path">{{ file.name }}</nuxt-link></div>
          <div class="flex-grow"><nuxt-link :to="file.commitPath">{{ file.subject }}</nuxt-link></div>
          <div class="w-2/12 text-right">
            <span>{{ file.timestamp }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-bordered mt-4">
      README.md
    </div>
  </div>
</template>

<style lang="scss" scoped>
.file {
  @apply flex border-solid border-b py-2 px-4;
}
</style>