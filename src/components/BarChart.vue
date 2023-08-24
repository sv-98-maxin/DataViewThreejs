<template>
	<div ref="container" class="flex-1 border border-red-500"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import * as echarts from "echarts";
import { useStore } from "../store";
import { barData } from "../mock";

const store = useStore();
const name = computed(() => store.areaName);
const container = ref<HTMLElement>();
const data = ref<[number]>(barData());
const chart = ref<echarts.ECharts | null>(null);

watch(name, () => {
	data.value = barData();

	init();
});
watch(data, () => {
	init();
});
setInterval(() => {
	data.value = barData();
}, 3000);
function init() {
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
				data: data.value,
				type: "bar",
			},
		],
	};
	chart.value?.setOption(option);
}
onMounted(() => {
	chart.value = echarts.init(container.value);
	init();
});
</script>

<style scoped></style>
