<template>
  <div class="flex w-full flex-col py-10">
    <div class="flex md:space-x-6 items-center">
      <div class="md:flex hidden items-center justify-center h-56 w-80 overflow-hidden">
        <img src="@/assets/calculator.svg" alt="" class="h-56 object-cover">
      </div>
      <div class="flex flex-col space-y-6">
        <div class="flex flex-col">
          <p class="text-3xl font-bold dark:text-gray-300">Stake LP Tokens</p>
          <p class="text-lg text-oswapBlue-light">Earn rewards holding crypto</p>
        </div>
        <div class="flex space-x-2 items-center">
          <!-- Burn All Button -->
          <div class="flex flex-col space-y-1">
            <div class="flex border-2 border-gray-300 dark:border-gray-700 items-center space-x-1 bg-oswapGreen hover:bg-red-400 pl-2 h-14 pr-4 rounded-xl cursor-pointer">
              <i class="las la-burn text-3xl text-gray-50 dark:text-gray-700"></i>
              <p class="text-gray-50 dark:text-gray-700">Burn All !</p>
            </div>
            <p class="text-xs dark:text-gray-300 ml-2">Burn all Fees</p>
          </div>
          <!-- Collect All Button -->
          <div class="flex flex-col space-y-1">
            <div class="flex border-2 border-gray-300 dark:border-gray-700 items-center space-x-2 bg-oswapGreen hover:bg-oswapGreen-dark dark:hover:bg-oswapGreen-light h-14 pl-3 pr-2 rounded-xl cursor-pointer">
              <i class="las la-hand-holding-usd text-3xl text-gray-50 dark:text-gray-700"></i>
              <p class="text-gray-50 dark:text-gray-700">Collect All</p>
              <p class="text-xs bg-gray-200 p-2 dark:bg-oswapDark-gray rounded-md px-3 border-2 border-gray-300 dark:border-gray-700 dark:text-oswapGreen">1779.9871</p>
            </div>
            <div class="flex">
              <p class="text-xs dark:text-gray-300 ml-2">All unclaimed rewards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FarmHeader'
  }
</script>