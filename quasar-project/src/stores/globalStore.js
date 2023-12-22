import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    activeCharts: [],
  }),
  persist: true
});
