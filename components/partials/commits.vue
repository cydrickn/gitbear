<script setup>
import {useClient} from "../../composables/useClient";
import moment from "moment-timezone";

const props = defineProps({
  branch: String,
  repoPath: String,
  treePath: String,
});

const client = useClient();
const { commits, latest, total } = await client('/api/commits', {
  params: {
    branch: props.branch,
    path: props.treePath,
    repoPath: props.repoPath,
  }
});

const groupedCommits = {};

commits.map((commit) => {
  commit.group = moment(commit.date).format('MMM D, YYYY');
  commit.treePath = useUtils().normalizeUrl('/' + props.repoPath + '/tree/' + commit.hash);
  if (!groupedCommits[commit.group]) {
    groupedCommits[commit.group] = [];
  }
  groupedCommits[commit.group].push(commit);
});

</script>

<template>
  <div>
    <div v-for="(commits, key) in groupedCommits" :key="key">
      <div class="flex p-2 my-2">
        <div>
          <i class="fa-solid fa-code-commit"></i>
        </div>
        <div class="ml-4">
          Commits on {{ key }}
        </div>
      </div>
      <div class="group-container">
        <div v-for="(commit, ikey) in commits" :key="ikey" class="commit">
          <div class="grow">
            <div class="font-bold">{{ commit.message }}</div>
            <div class="text-sm">
              <span class="font-medium inline-block">{{ commit.author_name }}</span>
              <span class="inline-block ml-2">committed {{ commit.lastUpdate }}</span>
            </div>
          </div>
          <div class="flex items-center">
            <div>
              {{ commit.hash.substr(0, 7) }}
            </div>
            <div class="ml-4">
              <nuxt-link :to="commit.treePath" class="btn btn-sm btn-outline"><i class="fa-solid fa-code"></i></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-container {
  @apply card bg-base-100 card-bordered border-base-300 ml-8;
  .commit {
    @apply flex border-t border-base-300 px-4 py-2;
    @apply hover:bg-base-200;
    &:first-child {
      @apply border-t-0;
    }
  }
}
</style>