<template>
	<div ref="container" class="flex-1 border border-red-500"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "../store/index.ts";
import { getPieData } from "../mock/index.ts";

import { useInitCharts } from "../hooks";
const container = ref<HTMLElement>();
const store = useStore();
const name = computed(() => store.areaName);

const chartOptions = reactive({
	title: {
		text: name.value + "xxx数据",
		left: "center",
	},
	tooltip: {
		trigger: "item",
	},
	legend: {
		top: "10%",
		left: "center",
	},
	series: [
		{
			name: "Access From",
			type: "pie",
			radius: ["40%", "70%"],
			top: "10%",
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 10,
				borderColor: "#fff",
				borderWidth: 2,
			},
			label: {
				show: false,
				position: "center",
			},
			emphasis: {
				label: {
					show: true,
					fontSize: 40,
					fontWeight: "bold",
				},
			},
			labelLine: {
				show: false,
			},
			data: getPieData(),
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
	chartOptions.series[0].data = getPieData();
}, 3000);

onMounted(() => {
	useInitCharts(container.value as HTMLElement, chartOptions);
});
</script>

<style scoped></style>
