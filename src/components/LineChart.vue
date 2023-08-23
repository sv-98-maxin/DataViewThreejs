<template>
	<div ref="container" class="flex-1 border border-red-500"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "../store";

const store = useStore();
const name = computed(() => store.areaName);
const container = ref<HTMLDivElement>();

watch(name, () => {
	initChart();
});
function initChart() {
	const chart = echarts.init(container.value);
	const option = {
		title: {
			text: name.value + "xxx数据",
		},
		tooltip: {
			trigger: "axis",
		},
		legend: {
			left: "30%",
			data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
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
				data: [120, 132, 101, 134, 90, 230, 210],
			},
			{
				name: "Union Ads",
				type: "line",
				stack: "Total",
				data: [220, 182, 191, 234, 290, 330, 310],
			},
			{
				name: "Video Ads",
				type: "line",
				stack: "Total",
				data: [150, 232, 201, 154, 190, 330, 410],
			},
			{
				name: "Direct",
				type: "line",
				stack: "Total",
				data: [320, 332, 301, 334, 390, 330, 320],
			},
			{
				name: "Search Engine",
				type: "line",
				stack: "Total",
				data: [820, 932, 901, 934, 1290, 1330, 1320],
			},
		],
	};
	chart.setOption(option);
}
onMounted(() => {
	initChart();
});
</script>

<style scoped></style>
