<template>
	<div class="flex h-full">
		<div class="flex-1 h-full flex flex-wrap flex-col">
			<PieChart /><LineChart /><ScatterChart />
		</div>

		<!-- 地图 -->
		<div class="border border-cyan-100" style="width: 37%">
			<Map />
		</div>
		<div class="flex-1 h-full flex flex-wrap flex-col">
			<BarChart />
			<RadarChart />
			<WordCloud />
		</div>
	</div>
</template>

<script lang="ts" setup>
import Map from "./components/Map.vue";
import PieChart from "./components/PieChart.vue";
import LineChart from "./components/LineChart.vue";
import ScatterChart from "./components/ScatterChart.vue";
import RadarChart from "./components/RadarChart.vue";
import BarChart from "./components/BarChart.vue";
import WordCloud from "./components/WordCloud.vue";
</script>

<style lang="less">
body {
	margin: 0;
	padding: 0;
	width: 100vw;
	height: 100vh;
}
</style>
