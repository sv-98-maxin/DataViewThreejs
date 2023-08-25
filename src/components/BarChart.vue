<template>
	<div ref="container" class="flex-1 border border-red-500"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, reactive } from "vue";
import { useStore } from "../store";
import { barData } from "../mock";
import { useInitCharts } from "../hooks";
import { EChartsCoreOption, TitleComponentOption } from "echarts";

const store = useStore();
const name = computed(() => store.areaName);
const container = ref<HTMLElement | null>(null);

const chartOptions = reactive<EChartsCoreOption>({
	title: {
		text: name.value + "xxx数据",
	},
	grid: {
		top: "15%",
		bottom: "13%",
	},
	xAxis: {
		type: "category",
		data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	},
	yAxis: {
		type: "value",
	},
	series: [
		{
			data: barData(),
			type: "bar",
		},
	],
});

watch(name, newName => {
	(chartOptions.title as TitleComponentOption).text = newName + "xxx数据";
});
watch(chartOptions, () => {
	useInitCharts(container.value as HTMLElement, chartOptions);
});
setInterval(() => {
	(chartOptions.series as any)[0].data = barData();
}, 3000);

onMounted(() => {
	useInitCharts(container.value as HTMLElement, chartOptions);
});
</script>

<style scoped></style>
