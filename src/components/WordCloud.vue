<template>
	<div class="flex-1 border border-red-500">
		<h1 class="font-semibold ml-2 text-lg">{{ name }}热点词</h1>
		<div ref="container" style="height: calc(100% - 1.75rem)"></div>
	</div>
</template>

<script setup lang="ts">
import wordcloud from "wordcloud";
import { onMounted, ref, watch, computed } from "vue";
import { getWordCloudData } from "../mock/index";
import { useStore } from "../store/index";
const store = useStore();
const name = computed(() => store.areaName);

const container = ref<HTMLElement>();
const data = ref(getWordCloudData());
watch(name, () => {
	init();
});
watch(data, () => {
	init();
});
setInterval(() => {
	data.value = getWordCloudData();
}, 3000);
function init() {
	wordcloud(container.value as HTMLElement, {
		list: data.value,
	});
}

onMounted(() => {
	init();
});
</script>

<style scoped></style>
