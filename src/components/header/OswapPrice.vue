<template>
  <!-- Oswap token info -->
  <tooltip-me>
    <div class="flex rounded-lg focus:outline-none focus:ring-1 focus:ring-black space-x-2 p-2 px-1 md:px-3 items-center">
      <img alt="oSwap" src="@/assets/oswap_asset.png" class="ss:h-5 xs:h-6">
      <p class="ss:hidden xs:block text-xs dark:text-oswapGreen">${{oswapPrice}}</p>
    </div>

    <tooltip-me-content :options="tooltip" class="flex flex-col w-72 p-3 rounded-lg shadow-xl">
      <div class="ss:flex ss:mb-3 xs:hidden ss:space-x-2 ss:items-center">
        <img alt="oSwap" src="@/assets/oswap_asset.png" class="h-5">
        <p class="text-sm">oSWAP Price: ${{oswapPrice}}</p>
      </div>
      <div class="flex space-x-2 mb-3 items-center">
        <i class="las la-coins text-xl"></i>
        <p class="text-sm">Circ. Market Cap: ${{marketCap}} USD</p>
      </div>
      <div class="flex space-x-2 items-center">
        <i class="las la-fire-alt text-xl"></i>
        <p class="text-sm">Tokens Burnt: {{balances.burnedAmount}} oSWAP</p>
      </div>
      <div class="flex space-x-2 mb-3 pt-3 pl-5 items-center">
        <br/>
      Token Supply
      </div>
      <div class="flex space-x-2 mb-3 items-center">
        <i class="las la-hand-holding-usd text-xl"></i>
        <p class="text-sm">Circ. : {{balances.circSupply}} oSWAP</p>
      </div>
      <div class="flex space-x-2 mb-3 items-center">
        <i class="lab la-dev text-xl"></i>
        <p class="text-sm">Locked: {{balances.devLocked}} oSWAP</p>
      </div>
      <div class="flex space-x-2 mb-3 items-center">
        <i class="las la-globe-europe text-xl"></i>
        <p class="text-sm">Total: {{balances.totalSupply}} oSWAP</p>
      </div>
      
    </tooltip-me-content>
  </tooltip-me> 
</template> 

<script>
  import openswap from "@/shared/openswap.js"
  import { commify } from '@ethersproject/units';

  export default {
    name: "Oswap",
    components: {},
    data() {
      return {
        tooltip: {
          name: new Date().getTime(),
          position: 'bottom',
          color: 'rgba(249, 250, 251, 1)',
          offset: 12,
          speed: 300,
          shift: 50
        },
        ttpObj: null,
        ttpRec: null,
        oswapPrice: 0.00,
        balances: {
          totalSupply: 0.00,
          circSupply: 0.00,
          burnedAmount: 0.00,
          devLocked: 0.00
        },
        marketCap: 0.00,

      }
    },
    mixins: [openswap],
    mounted: async function() {
      this.$nextTick(function() {
        // Grabs the tooltip element
        this.ttpObj = document.querySelector(`div[tooltipme="tooltip-me_${this.tooltip.name}"]`);
        // Format the tooltip the first time
        this.adjustTooltip();
        // Format the tooltip when the user resizes the browser
        window.addEventListener('resize', () => {
          this.adjustTooltip();
        });
      })

      this.oswapPrice = await this.getOswapPrice();
      this.balances = await this.getBurnAndTotalSupply();
      this.marketCap = commify((this.balances.circSupply * this.oswapPrice).toFixed(2));
      this.balances.devLocked = commify(this.balances.devLocked);
      this.balances.circSupply = commify(this.balances.circSupply);
      this.balances.totalSupply = commify(this.balances.totalSupply);
      this.balances.burnedAmount = commify(this.balances.burnedAmount);
    },
    methods: {
      getWindowSize() {
        return {
          height: window.innerHeight,
          width: window.innerWidth
        }
      },
      adjustTooltip() {
        // gets the tooltip location bounduary
        this.ttpRec = this.ttpObj.getBoundingClientRect();
        // find the middle of the window
        let width = this.getWindowSize().width;
        let xMiddle = width / 2;

        // screen size from 0 - 540
        if (width > 0 && width < 540) {
          // for tooltips at the middle right
          if ((this.ttpRec.width / 2 + this.ttpRec.left) > xMiddle) {
            this.tooltip.shift = 78
          }
        } else if (width >= 540 && width < 1024) {
          // for tooltips at the middle right
          if ((this.ttpRec.width / 2 + this.ttpRec.left) > xMiddle) {
            this.tooltip.shift = 68
          }
        } else if (width > 1024) {
          this.tooltip.shift = 50
        }
      }
    }
  }
</script>