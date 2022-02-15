<script setup>
import {useClient} from "../../composables/useClient";
import CurrentCommit from "../app/current-commit";

const props = defineProps({
  branch: String,
  path: String,
  repoPath: String
});
const { commit, content } = await useClient()('/api/blob', {
  params: {
    branch: props.branch,
    path: props.path,
    repoPath: props.repoPath,
  }
});
</script>

<template>
  <div>
    <current-commit :commit="commit"></current-commit>
    <div class="card card-bordered mt-4">
      <div class="mockup-code">
<pre v-for="(line, key) in content" :key="key" :data-prefix="key + 1">
<code>{{ line}}</code>
</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>