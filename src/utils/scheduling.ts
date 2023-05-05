import { onDestroy } from 'svelte'

export function onInterval(callback: () => void, milliseconds: number) {
  const interval = setInterval(callback, milliseconds)

  onDestroy(() => clearInterval(interval))
}

export function onTimeout(callback: () => void, milliseconds: number) {
  const timeout = setTimeout(callback, milliseconds)

  onDestroy(() => clearTimeout(timeout))
}
