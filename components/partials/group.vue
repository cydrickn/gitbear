<script setup>
defineProps({
  children: Array
})
</script>

<template>
  <div class="grid grid-cols-1 gap-6 lg:p-10 xl:grid-cols-3 lg:bg-base-200 rounded-box">
    <div v-for="(child, key) in children" :key="key">
      <NuxtLink :to="child.path">
        <div class="card shadow-lg compact side bg-base-100">
          <div class="flex-row items-center space-x-4 card-body">
            <div>
              <div class="avatar">
                <div class="rounded-full w-14 h-14 shadow !flex items-center justify-center bg-primary text-primary-content">
                  <i v-if="child.type === 'group'" class="fa-solid fa-folder text-2xl"></i>
                  <i v-else class="fa-solid fa-file text-2xl"></i>
                </div>
              </div>
            </div>
            <div>
              <h2 class="card-title">{{ child.name }}</h2>
              <p class="text-base-content text-opacity-40">{{ child.type.toUpperCase() }}</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>