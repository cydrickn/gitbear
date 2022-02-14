<script setup>
import {useClient} from "../../../composables/useClient";
import PathContainer from "../../../components/partials/path-container";

const props = defineProps({
  info: Object
})

const params = useRoute().params;
const branch = params.blob[0];
const path = params.blob.filter((val, key) => {
  return key !== 0;
}).join('/');

const pathsInfo = ref([]);
let pathInc = props.info.path + '';

params.blob.forEach((path) => {
  pathInc += '/' + path
  pathsInfo.value.push({
    name: path,
    path: pathInc.replace(/\/+/g, '/'),
  });
})

const client = useClient();
const { data: blob } = await useAsyncData('blob', () => client('/api/blob', {
  params: {
    branch: branch,
    path: path,
    repoPath: props.info.path,
  }
}));
</script>

<template>
  <path-container>
    <div class="card card-bordered">
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