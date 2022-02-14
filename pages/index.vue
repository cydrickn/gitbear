<script setup>
import {useCrumbs} from "../composables/useCrumbs";
import Group from "../components/partials/group";

definePageMeta({
  layout: 'app'
});
useCrumbs().set([]);
const client = useClient();
const {data: children} = await useAsyncData('children', () => client('/api/children'));
</script>

<template>
  <div>
    <group :children="children"></group>
  </div>
</template>

<style scoped>
</style>