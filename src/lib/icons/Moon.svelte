<script>
    import { clsx } from "clsx";

    export let glowIntensity = 100
</script>

<svg xmlns="http://www.w3.org/2000/svg" class={clsx("fill-white h-6 w-6", glowIntensity === 100 ? 'opacity-100' : 'opacity-50' )} viewBox="0 0 24 24" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
    <filter id="glow">
        <feFlood flood-color="rgb(255,255,255)" flood-opacity="1" in="SourceGraphic" />
        <feComposite operator="in" in2="SourceGraphic" />
        <feGaussianBlur stdDeviation="1" />
        <feComponentTransfer result="glow1">
            <feFuncA type="linear" slope="1" intercept="0" />
        </feComponentTransfer>
        <feMerge>
            <feMergeNode in="glow1" />
            <feMergeNode in="SourceGraphic" />
        </feMerge>
    </filter>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path filter="url(#glow)" d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" stroke-width="0" fill="currentColor" />
</svg>