<template>
	<div ref="container" class="flex-1 border border-red-500"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { useStore } from "../store/index.ts";
// import axios from "axios";
import { getPieData } from "../mock/index.ts";
import { pieDataType } from "..";
const container = ref<HTMLDivElement>();
const store = useStore();
const name = computed(() => store.areaName);
let data = ref<[pieDataType]>(getPieData());
const myChart = ref<echarts.ECharts | null>(null);

watch(name, () => {
	data.value = getPieData();
	initPie();
});
watch(data, () => {
	initPie();
});

setInterval(() => {
	data.value = getPieData();
}, 3000);
function initPie() {
	const options = {
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
				data: data.value,
			},
		],
	};
	myChart.value?.setOption(options);
}
onMounted(() => {
	myChart.value = echarts.init(container.value);
	initPie();
});
</script>

<style scoped></style>
