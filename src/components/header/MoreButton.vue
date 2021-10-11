<template>
  <Menu as="div" class="relative">
    <MenuButton class="flex items-center space-x-2 p-2 px-1 md:px-3 rounded-lg group cursor-pointer dark:text-oswapGreen focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
      <i class="las la-braille text-xl group-hover:text-oswapGreen"></i>
      <p class="text-sm hidden md:block group-hover:text-oswapBlue-light">More</p>
    </MenuButton>

    <transition
      enter-active-class="transform transition duration-200 ease-in-out"
      enter-from-class="-translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transform transition duration-200 ease-in-out"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-4 opacity-0"
    >
      <MenuItems class="absolute z-50 focus:outline-none st5-all">
        <div class="absolute z-10 w-72 mt-3 ss:-left-44 md:-left-28 lg:left-0">
          <div class="overflow-hidden rounded-lg ring-1 ring-black dark:ring-gray-600 ring-opacity-25">
            <div class="relative grid gap-8 bg-gray-100 dark:bg-slightDark p-4 md:grid-cols-1">
              <MenuItem>
                <a href="https://analytics.openswap.one/" target="_blank" class="flex items-center p-2 -m-3 transition group duration-150 ease-in-out rounded-lg rounded-b-lg hover:bg-gray-50 dark:hover:bg-oswapDark-gray focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                  <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                    <div class="flex flex-1 dark:bg-oswapDark-gray h-full items-center bg-gray-100 justify-center rounded-lg">
                      <i class="las la-chart-area text-3xl text-oswapGreen group-hover:text-oswapBlue-light"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900 dark:text-oswapGreen">Analytic</p>
                    <p class="text-sm text-gray-500 dark:text-gray-300">Check token and pair stats</p>
                  </div>
                </a>
              </MenuItem>
              <MenuItem>
                <router-link to="/pairs" class="flex items-center p-2 -m-3 transition group duration-150 ease-in-out rounded-lg rounded-b-lg hover:bg-gray-50 dark:hover:bg-oswapDark-gray focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                  <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                    <div class="flex flex-1 dark:bg-oswapDark-gray h-full items-center bg-gray-100 justify-center rounded-lg">
                      <i class="las la-balance-scale text-3xl text-oswapGreen group-hover:text-oswapBlue-light"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900 dark:text-oswapGreen">Pairs</p>
                    <p class="text-sm text-gray-500 dark:text-gray-300">Check pair adresses</p>
                  </div>
                </router-link>
              </MenuItem>
              <MenuItem>
                <router-link to="/tokens" class="flex items-center p-2 -m-3 transition group duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-oswapDark-gray focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                  <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                    <div class="flex flex-1 dark:bg-oswapDark-gray h-full items-center bg-gray-100 justify-center rounded-lg">
                      <i class="las la-tasks text-3xl text-oswapGreen group-hover:text-oswapBlue-light"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900 dark:text-oswapGreen">Tokens</p>
                    <p class="text-sm text-gray-500 dark:text-gray-300">Check tokens available</p>
                  </div>
                </router-link>
              </MenuItem>

              <MenuItem>
                <router-link to="/information" class="flex items-center p-2 -m-3 transition group duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-oswapDark-gray focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                  <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                    <div class="flex flex-1 dark:bg-oswapDark-gray h-full items-center bg-gray-100 justify-center rounded-lg">
                      <i class="las la-info-circle text-3xl text-oswapGreen group-hover:text-oswapBlue-light"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900 dark:text-oswapGreen">Infomation</p>
                    <p class="text-sm text-gray-500 dark:text-gray-300">OpenSwap useful information</p>
                  </div>
                </router-link>
              </MenuItem>
            </div>
            <div class="p-2 bg-gray-50 dark:bg-gray-600">
              <a href="https://docs.openswap.one/" target="_blank" class="flow-root p-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 dark:hover:bg-oswapDark-gray focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                <span class="flex items-center"><span class="text-sm font-medium text-gray-900 dark:text-oswapGreen"> Documentation </span></span><span class="block text-sm text-gray-500 dark:text-gray-300">Read the official documentation for OpenSwap</span>
              </a>
            </div>
          </div>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
  import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

  export default {
    name: 'MoreButton',
    components: {
      Menu,
      MenuButton,
      MenuItems,
      MenuItem,
    }
  }
</script>
