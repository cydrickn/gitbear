<script setup>
const props = defineProps({
  hash: String,
  author: Object,
  timestamp: Number,
  subject: String,
})

const truncatedHash = props.hash.substr(0, 7);
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
        <div class="font-bold">{{ subject }}</div>
        <div class="">{{ author.name }}</div>
      </div>
      <div class="text-right">
        <div>{{ truncatedHash }}</div>
        <div>{{ timestamp }}</div>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>