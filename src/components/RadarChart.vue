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
			trigger: "item",
		},
		legend: {
			type: "scroll",
			bottom: 10,
			data: (function () {
				var list = [];
				for (var i = 1; i <= 28; i++) {
					list.push(i + 2000 + "");
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
		series: (function () {
			var series = [];
			for (var i = 1; i <= 28; i++) {
				series.push({
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
					data: [
						{
							value: [
								(40 - i) * 10,
								(38 - i) * 4 + 60,
								i * 5 + 10,
								i * 9,
								(i * i) / 2,
							],
							name: i + 2000 + "",
						},
					],
				});
			}
			return series;
		})(),
	};
	chart.setOption(option);
}

onMounted(() => {
	initChart();
});
</script>

<style scoped></style>
