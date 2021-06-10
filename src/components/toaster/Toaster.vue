<template>
  <div class="flex flex-col ml-3 space-y-1 my-1 break-all">
    <div v-if="toast.title" class="flex">
      <p class="text-sm">{{toast.title}}</p>
    </div>
    <div v-if="toast.link" class="flex items-start space-x-1 px-2 rounded-lg bg-opacity-100 hover:bg-opacity-5 hover:bg-oswapDark-gray">
      <i class="las la-link pt-2"></i>
      <a target="_blank" :href="toast.href" class="text-xs p-1 px-2 rounded-lg">{{toast.msg}}</a>
    </div>
    <div v-else class="flex">
      <p class="text-xs">{{toast.msg}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Toaster',
    props: {
      toast: Object
    }
  }
</script>