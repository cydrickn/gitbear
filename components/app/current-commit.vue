<script setup>
import {useUtils} from "../../composables/useUtils";

const props = defineProps({
  commit: Object,
})

const truncatedHash = props.commit.hash.substr(0, 7);
const formattedDate = useUtils().formatDate(props.commit.timestamp)
</script>

<template>
  <div class="alert">
    <div class="flex w-full">
      <div class="mr-4">
        <div class="rounded-full w-14 h-14 shadow !flex items-center justify-center text-secondary">
          <i class="fa-solid fa-code-commit text-2xl"></i>
        </div>
      </div>
      <div class="grow">
        <div class="font-bold">{{ commit.subject }}</div>
        <div class="">{{ commit.author.name }}</div>
      </div>
      <div class="text-right">
        <div>{{ truncatedHash }}</div>
        <ClientOnly>
          <div :data-tip="formattedDate" class="tooltip focus:tooltip-open tooltip-left" >
            <span>{{ commit.lastUpdate }}</span>
          </div>
        </ClientOnly>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>