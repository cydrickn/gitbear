<script setup>
import {useClient} from "../../composables/useClient";

const props = defineProps({
  branch: String,
  path: String,
  repoPath: String
});
const blob = await useClient()('/api/blob', {
  params: {
    branch: props.branch,
    path: props.path,
    repoPath: props.repoPath,
  }
});
</script>

<template>
  <div class="card card-bordered">
    <div class="mockup-code bg-transparent text-primary-content">
<pre v-for="(line, key) in blob.content" :key="key" :data-prefix="key + 1">
<code>{{ line}}</code>
</pre>
    </div>
  </div>
</template>

<style scoped>

</style>