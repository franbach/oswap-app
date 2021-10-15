<template>
  <div :class="side == 'right' ? 'flex-row-reverse' : ''" class="flex items-center">
    <div :class="side == 'right' ? 'pl-3' : 'pr-3' " class="flex flex-none">{{title}}</div>
    <div class="flex w-full bg-gray-300 dark:bg-slightDark" style="height: 1px;" />
  </div>
</template>

<script>
  export default {
    name: 'Divider',
    props: {
      title: String,
      side: String
    }
  }
</script>