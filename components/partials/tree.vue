<script setup>
import {useClient} from "../../composables/useClient";
import {useMd} from "../../composables/useMd";
import CurrentCommit from "../app/current-commit";
import {useUtils} from "../../composables/useUtils";

const props = defineProps({
  branch: String,
  repoPath: String,
  treePath: String,
});

const client = useClient();
const { commit, tree: files } = await client('/api/tree', {
  params: {
    branch: props.branch,
    path: props.treePath,
    repoPath: props.repoPath,
  }
});

let readme = null;

files.forEach((file) => {
  file.rawPath = file.path;
  file.path = ('/' + ([props.repoPath.trim('/'), file.type, props.branch, file.path].join('/')))
      .replace(/\/+/g, '/');
  file.commitPath = ('/' + ([props.repoPath.trim('/'), 'commit', file.commit].join('/')))
      .replace(/\/+/g, '/');
  file.icon = useGetFileType(file).icon;
  file.formattedDate = useUtils().formatDate(file.timestamp);

  if (file.name === 'README.md') {
    readme = file;
  }

  return file;
});

if (readme) {
  const blob = await client('/api/blob', {
    params: {
      branch: props.branch,
      path: readme.rawPath,
      repoPath: props.repoPath,
      isRaw: true
    }
  });
  readme.blob = useMd(blob);
}
</script>

<template>
  <div>
    <current-commit :commit="commit"></current-commit>
    <div class="card card-bordered mt-4">
      <div class="font-bold bg-base-300 file">
        <div class="mr-2"><div class="w-4">&nbsp;</div></div>
        <div class="w-2/12">Name</div>
        <div class="flex-grow">Last commit</div>
        <div class="w-2/12 text-right">Last update</div>
      </div>
      <div v-for="(file,key) in files" :key="key" class="file">
        <div class="mr-2 text-center">
          <div class="w-4">
            <i :class="file.icon"></i>
          </div>
        </div>
        <div class="w-2/12"><nuxt-link :to="file.path">{{ file.name }}</nuxt-link></div>
        <div class="flex-grow"><nuxt-link :to="file.commitPath">{{ file.subject }}</nuxt-link></div>
        <div class="w-2/12 text-right">
          <ClientOnly>
            <div :data-tip="file.formattedDate" class="tooltip focus:tooltip-open tooltip-left" >
              <span>{{ file.lastUpdate }}</span>
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
    <div v-if="readme" class="card card-bordered mt-4">
      <div class="card-body">
        <article class="prose lg:prose-xl" v-html="readme.blob"></article>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.file {
  @apply flex border-solid border-b py-3 px-4;
}
</style>