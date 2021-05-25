<template>
  <header class="max-w-screen-xl mx-auto flex h-14 items-center p-3 bg-green-100">
    <i class="las la-clock text-2xl"></i>
    <h1>OpenSwap Header</h1>
    <router-link to="/" class="">Exchange</router-link> |
    <router-link to="/about">About</router-link>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>