<script lang="ts">
    import { afterUpdate } from 'svelte';
    import Sun from "./icons/Sun.svelte";
    import Moon from "./icons/Moon.svelte"

    const min = 0
    const max = 1
    const optimum = .65

    export let value = 0.25
    export let barsCount = 7

    type Threshold = {
      value: number
      proximityLevel: number
      isClosestThreshold?: boolean
    }

    let thresholdsProximityValues: Threshold[] = []

    afterUpdate(() => {
      if (value < min || value > max) {
        throw new Error(`The 'value' prop must be between ${min} and ${max}`)
      }

      thresholdsProximityValues = computeThresholds()
      console.debug(thresholdsProximityValues)
    });

    const computeThresholds = () => {
      const computedThresholds: number[] = [value]

      for (let i=0; i<barsCount; i++) {
        computedThresholds.push((max / barsCount) * i)
      }

      computedThresholds.sort()
      const valueIndex = computedThresholds.findIndex((thresholdValue) => thresholdValue === value)
      let isClosestThreshold = false

      return computedThresholds.map((thresholdValue, currentIndex) => {
        const proximityLevel =  Math.abs(valueIndex - currentIndex)

        if (!value && proximityLevel === 2) {
          return { proximityLevel: 2, value: thresholdValue }
        }

        if (!isClosestThreshold && proximityLevel === 1) {
          isClosestThreshold = true
          return { proximityLevel: proximityLevel, value: thresholdValue, isClosestThreshold}
        }
        if (isClosestThreshold && proximityLevel === 2) {
          return { proximityLevel: 3, value: thresholdValue }
        }
        return { proximityLevel, value: thresholdValue }
      })
    }

</script>

<style>
    .glow {
        box-shadow: 0 0 2px 1px #FFF;
    }
</style>

<div class="flex flex-1 flex-nowrap gap-4 w-full items-center content-center">
    <Moon glowIntensity={value <= optimum ? 100 : 50}/>

    <div class="flex flex-nowrap gap-2 items-center">
        {#each thresholdsProximityValues as { proximityLevel, value: currentValue, isClosestThreshold }}
            {#if proximityLevel > 0}
                <div
                    class="transition-all ease-in-out duration-300 flex w-1.5 rounded-sm glow"
                    class:h-5={proximityLevel > 2}
                    class:h-7={proximityLevel === 2 || (proximityLevel < 2 && !isClosestThreshold)}
                    class:h-9={proximityLevel === 1 && isClosestThreshold}

                    class:bg-white={currentValue <= value}
                    class:bg-zinc-400={currentValue > value}

                    class:opacity-50={currentValue > value && proximityLevel > 2}
                    class:opacity-80={currentValue > value && proximityLevel === 2 || (proximityLevel < 2 && !isClosestThreshold)}
                    class:opacity-100={currentValue <= value}
                />
            {/if}
        {/each}
    </div>

    <Sun glowIntensity={value >= optimum ? 100 : 50}/>
</div>