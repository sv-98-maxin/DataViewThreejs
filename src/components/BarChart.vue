<template>
	<div ref="container" class="flex-1 border border-red-500"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import * as echarts from "echarts";
import { useStore } from "../store";

const store = useStore();
const name = computed(() => store.areaName);
const container = ref<HTMLElement>();

watch(name, () => {
	init();
});
function init() {
	const chart = echarts.init(container.value);
	const option = {
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
				data: [120, 200, 150, 80, 70, 110, 130],
				type: "bar",
			},
		],
	};
	chart.setOption(option);
}
onMounted(() => {
	init();
});
</script>

<style scoped></style>
