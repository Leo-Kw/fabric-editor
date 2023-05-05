import { writable } from 'svelte/store'

export function createStore() {
  return {
    history: writable<{ version: string; objects: Object[] }[]>([]),
  }
}

export type ControlPanelStore = ReturnType<typeof createStore>
