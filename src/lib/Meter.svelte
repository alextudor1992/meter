<script lang="ts">
    import { afterUpdate } from 'svelte';
    import Sun from "./icons/Sun.svelte";
    import Moon from "./icons/Moon.svelte"

    export let min = 0
    export let max = 1
    export let optimum = .65
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
    });

    const computeThresholds = () => {
      const computedThresholds: number[] = [value]

      for (let i=0; i<barsCount; i++) {
        computedThresholds.push((max / barsCount) * i)
      }

      computedThresholds.sort()
      const valueIndex = computedThresholds.findIndex((thresholdValue) => thresholdValue === value)
      let foundClosestThreshold = false

      return computedThresholds.map((thresholdValue, currentIndex) => {
        const proximityLevel =  Math.abs(valueIndex - currentIndex)

        if (!value && proximityLevel === 2) {
          return { proximityLevel: 2, value: thresholdValue }
        }

        if (!foundClosestThreshold && proximityLevel === 1) {
          foundClosestThreshold = true
          return {
            proximityLevel,
            value: thresholdValue,
            isClosestThreshold: true
          }
        }
        if (foundClosestThreshold && proximityLevel === 2) {
          return { proximityLevel: 3, value: thresholdValue }
        }
        return { proximityLevel, value: thresholdValue }
      })
    }

</script>

<style>
    .meter-container {
      container-type: inline-size;
      container-name: meter;
    }

    .glow {
        box-shadow: 0 0 2px 1px #FFF;
    }

    .bars {
        height: 100%;
    }

    .size-large {
        height: 75%;
    }

    .size-average {
        height: 55%;
    }

    .size-small {
        height: 40%;
    }

    @container meter (max-width: 320px) {
        .meter {
            gap: .5rem;
            height: 40px;
        }

        .bars {
            gap: .75rem;
        }
    }

    @container meter (min-width: 320px) {
        .meter {
            gap: .75rem;
            height: 60px;
        }

        .bars {
            gap: 1rem;
        }
    }
</style>

<div class="meter-container flex-1">
    <div class="flex flex-nowrap justify-center content-center items-center meter">
        <Moon glowIntensity={value <= optimum ? 100 : 50}/>

        <div class="flex flex-nowrap justify-evenly items-center justify-items-center bars">
            {#each thresholdsProximityValues as { proximityLevel, value: currentValue, isClosestThreshold }}
                {#if proximityLevel > 0}
                    <div
                            class="transition-all ease-in-out duration-300 flex w-1.5 rounded-sm glow bar"
                            class:size-small={proximityLevel > 2}
                            class:size-average={proximityLevel === 2 || (proximityLevel < 2 && !isClosestThreshold)}
                            class:size-large={proximityLevel === 1 && isClosestThreshold}

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
</div>