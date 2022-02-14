<template>
  <div class="tabs w-full px-4">
    <a class="tab tab-bordered tab-active"><i class="fa-solid fa-code"></i><span>Files</span></a>
    <a class="tab"><i class="fa-solid fa-code-commit"></i><span>Commits</span></a>
    <a class="tab"><i class="fa-solid fa-code-branch"></i><span>Branches</span></a>
    <a class="tab"><i class="fa-solid fa-tag"></i><span>Tags</span></a>
  </div>
</template>

<style lang="scss" scoped>
.tab {
  @apply px-8;
  i {
    @apply pr-4;
  }
}
</style>