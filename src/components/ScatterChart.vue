<template>
	<div ref="container" class="flex-1 border border-red-500"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "../store";
import { scatterData } from "../mock";

const store = useStore();
const name = computed(() => store.areaName);
const container = ref<HTMLDivElement>();
const data = ref<Array<[number, number]>>(scatterData());
const chart = ref<echarts.ECharts | null>(null);

watch(name, () => {
	data.value = scatterData();
	initChart();
});
watch(data, () => {
	initChart();
});
setInterval(() => {
	data.value = scatterData();
}, 3000);
function initChart() {
	const option = {
		title: {
			text: name.value + "xxx数据",
			left: "center",
			top: 0,
		},
		grid: {
			top: "15%",
			left: "13%",
			right: "20%",
			bottom: "12%",
		},
		visualMap: {
			min: 15202,
			max: 159980,
			dimension: 1,
			orient: "vertical",
			right: 10,
			top: "center",
			text: ["HIGH", "LOW"],
			calculable: true,
			inRange: {
				color: ["#f2c31a", "#24b7f2"],
			},
		},
		tooltip: {
			trigger: "item",
			axisPointer: {
				type: "cross",
			},
		},
		xAxis: [
			{
				type: "value",
			},
		],
		yAxis: [
			{
				type: "value",
			},
		],
		series: [
			{
				name: "price-area",
				type: "scatter",
				symbolSize: 5,
				data: data.value,
			},
		],
	};
	chart.value?.setOption(option);
}
onMounted(() => {
	chart.value = echarts.init(container.value);
	initChart();
});
</script>

<style scoped></style>
