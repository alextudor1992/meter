<script lang="ts">
  import type {FormEventHandler} from "svelte/elements";
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
  .meter-container {
    margin-top: 10px;
    padding: 10px
  }

  .input-container {
    width: 100%;
    margin-top: 10px;
    padding: 10px
  }

  .input {
    padding: 10px 15px
  }

  .container {
    width: 100%
  }
</style>

<div class="container">
  <div class="input-container">
    <input on:input={setValue} type="number" class="input" placeholder="Value between 0.00 and 1.00" min="0" max="1" step="0.01"/>
  </div>

  <div class="meter-container">
    <Meter value={meterValue}/>
  </div>
</div>