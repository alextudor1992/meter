<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import Meter from "./Meter.svelte";

  let meterValue: number = 0

  const setValue: FormEventHandler<HTMLInputElement> = (event) => {
    const rawValue = event.target?.value

    if (rawValue) {
      const value = Number(rawValue)

      if (!isNaN(value)) {
        meterValue = value
      }
    }
  }
</script>

<style>

</style>

<div class="flex align-middle gap-2">
  <div class="w-1/3 p-4">
    <input on:input={setValue} type="number" class="p-4 w-full" placeholder="Value between 0.00 and 1.00" min="0" max="1" step="0.01"/>
  </div>

  <Meter value={meterValue} />
</div>