<template>
	<div ref="container" class="flex-1 border border-red-500"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, reactive } from "vue";
import { useStore } from "../store";
import { radarData } from "../mock";
import { useInitCharts } from "../hooks";

const store = useStore();
const name = computed(() => store.areaName);
const container = ref<HTMLDivElement>();

const chartOptions = reactive({
	title: {
		text: name.value + "xxx数据",
	},
	tooltip: {
		trigger: "item",
	},
	legend: {
		type: "scroll",
		bottom: 10,
		data: (function () {
			var list = [];
			for (var i = 1; i <= 10; i++) {
				list.push(i + 2009 + "");
			}
			return list;
		})(),
	},
	visualMap: {
		top: "middle",
		right: 10,
		color: ["red", "yellow"],
		calculable: true,
	},
	radar: {
		indicator: [
			{ text: "IE8-", max: 400 },
			{ text: "IE9+", max: 400 },
			{ text: "Safari", max: 400 },
			{ text: "Firefox", max: 400 },
			{ text: "Chrome", max: 400 },
		],
	},
	series: getData(),
});
watch(name, newName => {
	chartOptions.title.text = newName + "xxx数据";
});
watch(chartOptions, () => {
	useInitCharts(container.value as HTMLElement, chartOptions);
});

function getData() {
	return radarData().map((item: number) => ({
		type: "radar",
		symbol: "none",
		top: "20%",
		lineStyle: {
			width: 1,
		},
		emphasis: {
			areaStyle: {
				color: "rgba(0,250,0,0.3)",
			},
		},
		data: [item],
	}));
}
setInterval(() => {
	chartOptions.series = getData();
}, 3000);

onMounted(() => {
	useInitCharts(container.value as HTMLElement, chartOptions);
});
</script>

<style scoped></style>
