<template>
	<div ref="container" class="flex-1 border border-red-500"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, reactive } from "vue";
import { useStore } from "../store";
import { scatterData } from "../mock";
import { useInitCharts } from "../hooks";

const store = useStore();
const name = computed(() => store.areaName);
const container = ref<HTMLDivElement | null>(null);

const chartOptions = reactive({
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
			data: scatterData(),
		},
	],
});
watch(name, newName => {
	chartOptions.title.text = newName + "xxx数据";
});
watch(chartOptions, () => {
	useInitCharts(container.value as HTMLElement, chartOptions);
});
setInterval(() => {
	chartOptions.series[0].data = scatterData();
}, 3000);
onMounted(() => {
	useInitCharts(container.value as HTMLElement, chartOptions);
});
</script>

<style scoped></style>
