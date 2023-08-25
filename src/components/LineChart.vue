<template>
	<div ref="container" class="flex-1 border border-red-500"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive, computed } from "vue";
import { useStore } from "../store";
import { lineData } from "../mock";
import { useInitCharts } from "../hooks/index";
import { EChartsCoreOption, TitleComponentOption } from "echarts";

const store = useStore();
const name = computed(() => store.areaName);
const container = ref<HTMLElement | null>(null);
const chartOptions = reactive<EChartsCoreOption>({
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
			data: lineData(),
		},
	],
});

watch(chartOptions, () => {
	useInitCharts(container.value as HTMLElement, chartOptions);
});
watch(name, newName => {
	(chartOptions.title as TitleComponentOption).text = newName + "xxx数据";
});
setInterval(() => {
	(chartOptions.series as any)[0].data = lineData();
}, 3000);
onMounted(() => {
	useInitCharts(container.value as HTMLElement, chartOptions);
});
</script>

<style scoped></style>
