import { createRouter, createWebHistory } from 'vue-router'
import Exchange from '../views/Exchange.vue'

const routes = [
  {
    path: '/',
    name: 'OpenSwap Exchange',
    meta: {
      title: 'OpenSwap Exchange - Exchange ERC20 / BEP20 tokens',
      metaTags: [
        {
          name: 'description',
          content: 'Openswap Decentralized Exchange on Harmony Blockchain. Harmony DEX. Buy, Sell, and Stake Crypto Assets. Earn Interest.'
        },
        {
          property: 'og:description',
          content: 'Openswap Decentralized Exchange on Harmony Blockchain. Harmony DEX. Buy, Sell, and Stake Crypto Assets. Earn Interest.'
        },
        {
          property: 'og:image',
          content: 'https://mainnet.app.openswap.one/img/oswap_logo.5eef90b2.png'
        },
        {
          name: 'robots',
          content: 'index,follow'
        },
        {
          name: 'keywords',
          content: 'Dex, Decentralised Exchange, dex, blockchain, harmony, openswap, Uniswap Fork, liquidity, provide, add, remove,'
        },
      ]
    },
    component: Exchange
  },
  {
    path: '/liquidity',
    name: 'OpenSwap Liquidity',
    meta: {
      title: 'OpenSwap Liquidity - Provide Liquidity ERC20 / BEP20 tokens',
      metaTags: [
        {
          name: 'description',
          content: 'Openswap Decentralized Exchange on Harmony Blockchain. Add and remove liquidity, Create new liquidity pools. Harmony DEX'
        },
        {
          property: 'og:description',
          content: 'Openswap Decentralized Exchange on Harmony Blockchain. Add and remove liquidity, Create new liquidity pools. Harmony DEX'
        },
        {
          name: 'robots',
          content: 'index,follow'
        },
        {
          name: 'keywords',
          content: 'Dex, Decentralised Exchange, dex, blockchain, harmony, openswap, Uniswap Fork, yield farming, liquidity, provide, add, remove,'
        },
      ]
    },
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Liquidity.vue')
  },
  {
    path: '/farm',
    name: 'OpenSwap Farms',
    meta: {
      title: 'OpenSwap Farms - Yield Farm ERC20 / BEP20 tokens',
      metaTags: [
        {
          name: 'description',
          content: 'Openswap Decentralized Farms on Harmony Blockchain. Stake Liquidity to earn Passive income.  Harmony DEX'
        },
        {
          property: 'og:description',
          content: 'Openswap Decentralized Farms on Harmony Blockchain. Stake Liquidity to earn Passive income.  Harmony DEX'
        },
        {
          name: 'robots',
          content: 'index,follow'
        },
        {
          name: 'keywords',
          content: 'Dex, Decentralised Exchange, dex, blockchain, harmony, openswap,APR, apy, yield farming, one, Uniswap Fork, liquidity, provide, add, remove,'
        },
      ]
    },
    component: () => import('../views/Farm.vue')
  },
  {
    path: '/pairs',
    name: 'Pairs',
    component: () => import('../views/Pairs.vue')
  },
  {
    path: '/tokens',
    name: 'Tokens',
    component: () => import('../views/Tokens.vue')
  },
  {
    path: '/Bridge',
    name: 'Bridge',
    meta: {
      title: 'OpenSwap Bridge - Horizon ERC20 / BEP20 / HRC20 Bridge',
      metaTags: [
        {
          name: 'description',
          content: 'Openswap Decentralized Horizon Bridge on Harmony Blockchain. Harmony DEX. Buy, Sell, and Stake Crypto Assets. Earn Interest.'
        },
        {
          property: 'og:description',
          content: 'Openswap Decentralized Horizon Bridge on Harmony Blockchain. Harmony DEX. Buy, Sell, and Stake Crypto Assets. Earn Interest.'
        },
        {
          property: 'og:image',
          content: 'https://mainnet.app.openswap.one/img/oswap_logo.5eef90b2.png'
        },
        {
          name: 'robots',
          content: 'index,follow'
        },
        {
          name: 'keywords',
          content: 'Openswap Decentralized Horizon Bridge on Harmony Blockchain. Harmony DEX. Buy, Sell, and Stake Crypto Assets. Earn Interest.'
        },
      ]
    },
    component: () => import('../views/Migrate.vue')
  },
  {
    path: '/information',
    name: 'Information',
    component: () => import('../views/Information.vue')
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('../views/Wallet.vue')
  },
  {
    path: '/validator/:address',
    name: 'Validator',
    component: () => import('../views/Validator.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

// ...

export default router
