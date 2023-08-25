import { ref } from 'vue'
import * as echarts from 'echarts'

export function useInitCharts(container: HTMLElement, options: echarts.EChartsCoreOption) {
  // TODO: implement
  echarts.init(container).setOption(options)
}