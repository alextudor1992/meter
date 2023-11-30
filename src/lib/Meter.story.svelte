<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte'
  import Meter from "./Meter.svelte";

  export let Hst: Hst
</script>

<Hst.Story title="Meter" layout={{ type: 'single', iframe: true }}>
  <Hst.Variant title="Value 0">
    <Meter value={0} barsCount={7} optimum={0.65} />
  </Hst.Variant>

  <Hst.Variant title="Value 0.5">
    <Meter value={0.5} barsCount={7} optimum={0.65} />
  </Hst.Variant>

  <Hst.Variant title="Value 0.7">
    <Meter value={0.7} barsCount={7} optimum={0.65} />
  </Hst.Variant>

  <Hst.Variant title="Value 1">
    <Meter value={1} barsCount={7} optimum={0.65} />
  </Hst.Variant>
</Hst.Story>