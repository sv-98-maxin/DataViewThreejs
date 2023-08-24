<template>
	<div ref="container" class="flex-1 border border-red-500"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "../store";
import { radarData } from "../mock";

const store = useStore();
const name = computed(() => store.areaName);
const container = ref<HTMLDivElement>();
const data = ref<[number]>(radarData());
const chart = ref<echarts.ECharts | null>(null);

watch(name, () => {
	data.value = radarData();

	initChart();
});
watch(data, () => {
	initChart();
});

setInterval(() => {
	data.value = radarData();
}, 3000);
function initChart() {
	const option = {
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
		series: data.value.map(item => ({
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
		})),
	};
	chart.value?.setOption(option);
}

onMounted(() => {
	chart.value = echarts.init(container.value);
	initChart();
});
</script>

<style scoped></style>
