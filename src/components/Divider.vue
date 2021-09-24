<template>
  <div class="flex space-x-3 items-center">
    <div class="flex flex-none text-lg font-nunito">{{title}}</div>
    <div class="flex w-full bg-gray-300 dark:bg-slightDark" style="height: 1px;" />
  </div>
</template>

<script>
  export default {
    name: 'Divider',
    props: {
      title: String
    }
  }
</script>