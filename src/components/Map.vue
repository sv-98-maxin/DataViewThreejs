<template>
	<div ref="container" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import {
	AmbientLight,
	BufferGeometry,
	CircleGeometry,
	Clock,
	DirectionalLight,
	ExtrudeGeometry,
	FileLoader,
	Group,
	HemisphereLight,
	Line,
	LineBasicMaterial,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	Path,
	PerspectiveCamera,
	Raycaster,
	Scene,
	Shape,
	ShapePath,
	Vector2,
	WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { geoMercator } from "d3-geo";
import { onMounted, ref } from "vue";
import { useStore } from "../store/index.ts";
import { log } from "three/examples/jsm/nodes/Nodes.js";
const store = useStore();

const MAP_COLOR: any = {
	黄陂区: "#abcbaa",
	新洲区: "#acbedd",
	洪山区: "#ffccdd",
	青山区: "#bbddcc",
	武昌区: "#ababdd",
	汉阳区: "#aabccc",
	江岸区: "#ffccbb",
	江汉区: "#ddffcc",
	江夏区: "#ddccaa",
	硚口区: "#ffbbcc",
	汉南区: "#ffccbb",
	蔡甸区: "#ffc0cb",
	东西湖区: "#ffffff",
};
const container = ref();
const renderer = new WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff, 0);
renderer.shadowMap.enabled = true;
let camera: PerspectiveCamera;
let control: OrbitControls;
const scene = new Scene();
scene.background = null;
const clock = new Clock();
// 转为墨卡托投影
const projection = geoMercator()
	.center([114.30304, 30.594911])
	.scale(80)
	.translate([-0.1, 0]);

const directionalLight = new DirectionalLight(0xffffff, 5);
const hemiLight = new HemisphereLight(0xffffff, "gray", 5);
const ambiLight = new AmbientLight(0xffffff, 5);
scene.add(directionalLight, hemiLight, ambiLight);

const raycaster = new Raycaster();
const pointer = new Vector2();
async function initMapData() {
	camera = new PerspectiveCamera(
		45,
		container.value.clientWidth / container.value.clientHeight,
		0.1,
		5000
	);
	camera.position.set(0, 0, 3.5);
	camera.lookAt(0, 0, 0);
	control = new OrbitControls(camera, renderer.domElement);
	const loader = new FileLoader();
	const jsonData = await loader.loadAsync(
		"https://geo.datav.aliyun.com/areas_v3/bound/420100_full.json"
	);
	const geojson = JSON.parse(jsonData as string);
	console.log(geojson);
	const fontLoader = new FontLoader();
	const font = await fontLoader.loadAsync(
		"/src/assets/fonts/Alimama DongFangDaKai_Regular.json"
	);
	geojson.features.forEach((feature: any) => {
		const { geometry, properties } = feature;
		// const group = new Group();
		const labelPoint = new Group();

		const textGeometry = new TextGeometry(properties.name, {
			font,
			size: 0.03,
			height: 0,
		});
		const textMaterial = new MeshStandardMaterial({ color: "#000000" });
		const text = new Mesh(textGeometry, textMaterial);
		labelPoint.add(text);
		const point = new CircleGeometry(0.005);
		const labelMaterial = new MeshBasicMaterial({ color: "#000000" });
		const pointMesh = new Mesh(point, labelMaterial);

		const [x, y] = projection([
			properties.center[0],
			properties.center[1],
		]) as Iterable<number>;
		labelPoint.add(pointMesh);
		labelPoint.position.set(x, -y, 0.3);
		scene.add(labelPoint);
		geometry.coordinates.forEach((polygon: any) => {
			const shape = new Shape();
			const path = new Path();
			polygon.forEach((points: [[number, number]]) => {
				for (let i = 0, len = points.length; i < len; i++) {
					const [x, y] = projection([
						points[i][0],
						points[i][1],
					]) as Iterable<number>;
					if (i == 0) {
						path.moveTo(x, -y);
						shape.moveTo(x, -y);
					}
					shape.lineTo(x, -y);
					path.lineTo(x, -y);
				}
			});

			const fill = new ExtrudeGeometry(shape, {
				depth: 0.1,
				bevelEnabled: false,
				bevelSegments: 1,
				bevelThickness: 0.1,
			});
			const geometry = new BufferGeometry().setFromPoints(path.getPoints());
			const lineMaterial = new LineBasicMaterial({
				color: "#000000",
				linewidth: 5,
			});
			const outLine = new Line(geometry, lineMaterial);
			outLine.name = properties.name;
			outLine.position.z = 0.1;
			const material = new MeshStandardMaterial({
				metalness: 0.5,
				roughness: 0,
				color: "#cc98e2",
			});
			const mesh = new Mesh(fill, material);
			mesh.name = properties.name;
			// mesh.castShadow = true;
			// mesh.receiveShadow = true;
			// mesh.material.color = new Color(MAP_COLOR[mesh.name]);
			// area.add(outLine, mesh);
			scene.add(mesh);
			scene.add(outLine);
		});
	});
}
function onPointerMove(event: PointerEvent) {
	// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

	const meshes = scene.children.filter(child => child.type !== "Group");
	meshes.forEach(mesh => {
		if (mesh.type === "Line") {
			mesh.position.z = 0.1;
		} else {
			mesh.scale.set(1, 1, 1);
		}
	});

	pointer.x = (event.offsetX / container.value.clientWidth) * 2 - 1;
	pointer.y = -(event.offsetY / container.value.clientHeight) * 2 + 1;

	raycaster.setFromCamera(pointer, camera);

	// 计算物体和射线的焦点
	const intersects = raycaster.intersectObjects(
		scene.children.filter(item => item.type === "Mesh")
	);
	console.log(intersects);

	const selectedAreaName = intersects[0]?.object.name;
	scene.getObjectsByProperty("name", selectedAreaName).forEach(mesh => {
		console.log(mesh);
		if (mesh.type === "Line") {
			mesh.position.z = 0.2;
		} else {
			mesh.scale.z = 2;
		}
	});
	store.selectedArea(selectedAreaName ?? "武汉市");
}

function setSize() {
	camera.aspect = container.value.clientWidth / container.value.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(container.value.clientWidth, container.value.clientHeight);
}
onMounted(() => {
	initMapData();
	setSize();
	container.value.appendChild(renderer.domElement);
	renderer.setAnimationLoop(() => {
		// const delta = clock.getDelta();
		control.update();
		// raycaster.setFromCamera(pointer, camera);

		// // 计算物体和射线的焦点
		// const intersects = raycaster.intersectObjects(scene.children);
		// console.log(intersects);

		// scene
		// 	.getObjectsByProperty("name", intersects[0]?.object.name)
		// 	.forEach(mesh => {
		// 		mesh.scale.z = 2;
		// 	});

		renderer.render(scene, camera);
	});
	window.addEventListener("resize", setSize);
	container.value.addEventListener("pointerdown", onPointerMove);
});
</script>

<style scoped></style>
