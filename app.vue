<script setup>
import './assets/tailwind.scss'
useMeta({
  htmlAttrs: {
    'data-theme': 'halloween'
  }
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
