<script lang="ts">
  import { fade } from 'svelte/transition'

  export let changePenSize: (size: number) => void

  const penSizeArr = [12, 16, 20]
  let show = false
</script>

<div on:mouseenter={() => (show = true)} on:mouseleave={() => (show = false)}>
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    ><path
      d="M974.72 224L798.08 47.36a52.928 52.928 0 0 0-75.52 0l-603.52 603.52c-6.4 6.4-10.88 14.72-13.44 23.04L35.84 924.16c-5.12 18.56 0 39.04 14.08 52.48 10.24 10.24 23.68 15.36 37.12 15.36 5.12 0 10.24-0.64 15.36-1.92l246.4-73.6c8.32-2.56 16-7.04 22.4-13.44l603.52-603.52c21.12-20.48 21.12-54.4 0-75.52z m-113.28 37.76l-34.56 34.56-101.12-101.12 34.56-34.56 101.12 101.12z m-517.76 518.4L242.56 678.4l407.68-407.68 101.12 101.12-407.68 408.32z m-155.52-5.12l60.16 60.16-83.84 24.96 23.68-85.12z"
      fill="#595959"
    /></svg
  >
  {#if show}
    <div class="wrap" transition:fade>
      {#each penSizeArr as size}
        <div
          class="circle"
          style:width={size + 'px'}
          style:height={size + 'px'}
          on:click={() => changePenSize(size)}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    height: 25px;
    position: absolute;
    top: -40px;
    left: 20px;
    padding: 5px;
  }

  .circle {
    border-radius: 9999px;
    background: #000;
  }
</style>
