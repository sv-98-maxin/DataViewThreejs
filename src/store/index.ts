import { defineStore } from 'pinia'
export const useStore = defineStore('areaName', {
  state() {
    return {
      areaName: '武汉市'
    }
  },
  actions: {
    selectedArea(val: string) {
      this.areaName = val
    }
  }
})