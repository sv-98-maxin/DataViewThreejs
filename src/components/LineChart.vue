<template>
	<div ref="container" class="flex-1 border border-red-500"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "../store";
import { lineData } from "../mock";

const store = useStore();
const name = computed(() => store.areaName);
const container = ref<HTMLDivElement>();
const data = ref<[number]>(lineData());
const chart = ref<echarts.ECharts | null>(null);

watch(name, () => {
	data.value = lineData();
	initChart();
});
watch(data, () => {
	initChart();
});
setInterval(() => {
	data.value = lineData();
}, 3000);
function initChart() {
	const option = {
		title: {
			text: name.value + "xxx数据",
		},
		tooltip: {
			trigger: "axis",
		},
		legend: {
			left: "30%",
			data: ["Email"],
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		toolbox: {
			feature: {
				saveAsImage: {},
			},
		},
		xAxis: {
			type: "category",
			boundaryGap: false,
			data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "Email",
				type: "line",
				stack: "Total",
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
