<template>
	<div ref="container" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import {
	AmbientLight,
	BufferGeometry,
	CircleGeometry,
	Clock,
	Color,
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
	Object3D,
	Path,
	PerspectiveCamera,
	Raycaster,
	Scene,
	Shape,
	Vector2,
	WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { geoMercator } from "d3-geo";
import { onMounted, ref } from "vue";
import { useStore } from "../store/index.ts";

const store = useStore();
// 用于文字旋转动画
const textGroup = ref<Object3D | null>(null);
// 是否已有选中的区域
const isSelectedName = ref<string | undefined>(undefined);
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
	.translate([-0.05, 0]);

const directionalLight = new DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.receiveShadow = true;
const hemiLight = new HemisphereLight(0xffffff, "gray", 5);
const ambiLight = new AmbientLight(0xffffff, 5);
scene.add(directionalLight, hemiLight, ambiLight);

const raycaster = new Raycaster();
const pointer = new Vector2();
function initCamera() {
	camera = new PerspectiveCamera(
		45,
		container.value.clientWidth / container.value.clientHeight,
		0.1,
		5000
	);
	camera.position.set(0, 0, 3.2);
	camera.lookAt(0, 0, 0);
	camera.rotateX(-Math.PI / 2);
	control = new OrbitControls(camera, renderer.domElement);
}
async function initMapData() {
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
		const labelPoint = new Group();
		const textGeometry = new TextGeometry(properties.name, {
			font,
			size: 0.1,
			height: 0,
		});

		const textMaterial = new MeshStandardMaterial({ color: "#000000" });
		const text = new Mesh(textGeometry, textMaterial);
		text.rotation.x = Math.PI / 2;
		text.position.x -= 0.2;
		text.position.z = 0.2;
		labelPoint.add(text);
		const point = new CircleGeometry(0.01);
		const labelMaterial = new MeshBasicMaterial({ color: "#000000" });
		const pointMesh = new Mesh(point, labelMaterial);

		const [x, y] = projection([
			properties.center[0],
			properties.center[1],
		]) as Iterable<number>;
		labelPoint.add(pointMesh);
		labelPoint.position.set(x, -y, 0.2);
		labelPoint.visible = false;
		labelPoint.name = properties.name;
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
				transparent: true,
				opacity: 0.5,
			});
			const mesh = new Mesh(fill, material);
			mesh.name = properties.name;
			mesh.receiveShadow = true;
			scene.add(mesh);
			scene.add(outLine);
		});
	});
}
function onPointerDown(event: PointerEvent) {
	// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
	const meshes = scene.children;
	isSelectedName.value = "";
	meshes.forEach(mesh => {
		if (mesh.type === "Line") {
			mesh.position.z = 0.1;
		} else if (mesh.type === "Group") {
			mesh.visible = false;
			textGroup.value = null;
		} else if (mesh.type === "Mesh") {
			mesh.scale.set(1, 1, 1);
			((mesh as Mesh).material as MeshStandardMaterial).color = new Color(
				"#aabbcc"
			);
		}
	});
	pointer.x = (event.offsetX / container.value.clientWidth) * 2 - 1;
	pointer.y = -(event.offsetY / container.value.clientHeight) * 2 + 1;
	raycaster.setFromCamera(pointer, camera);
	// 计算物体和射线的焦点
	const intersects = raycaster.intersectObjects(
		scene.children.filter(item => item.type === "Mesh")
	);
	const selectedAreaName = intersects[0]?.object.name;
	scene.getObjectsByProperty("name", selectedAreaName).forEach(mesh => {
		if (mesh.type === "Line") {
			mesh.position.z = 0.2;
		} else if (mesh.type === "Group") {
			textGroup.value = mesh;
			mesh.visible = true;
			mesh.position.z = 0.2;
		} else {
			mesh.scale.z = 2;
			((mesh as Mesh).material as MeshStandardMaterial).color = new Color(
				"red"
			);
		}
	});
	store.selectedArea(selectedAreaName ?? "武汉市");
	isSelectedName.value = selectedAreaName ?? "";
}

function onPointerMove(event: PointerEvent) {
	const meshes = scene.children;
	pointer.x = (event.offsetX / container.value.clientWidth) * 2 - 1;
	pointer.y = -(event.offsetY / container.value.clientHeight) * 2 + 1;
	raycaster.setFromCamera(pointer, camera);
	// 计算物体和射线的焦点
	const intersects = raycaster.intersectObjects(
		meshes.filter(item => item.type === "Mesh")
	);
	const selectedAreaName = intersects[0]?.object.name;
	meshes.forEach(mesh => {
		if (mesh.type === "Line") {
			// mesh.position.z = 0.1;
		} else if (mesh.type === "Group") {
			mesh.visible = false;
			textGroup.value = null;
		} else if (mesh.type === "Mesh") {
			((mesh as Mesh).material as MeshStandardMaterial).color = new Color(
				"#aabbcc"
			);
		}
	});

	scene.getObjectsByProperty("name", selectedAreaName).forEach(mesh => {
		console.log(mesh);
		if (mesh.type === "Line") {
		} else if (mesh.type === "Group") {
			textGroup.value = mesh;
			mesh.visible = true;
			mesh.position.z = 0.1;
		} else if (mesh.type === "Mesh") {
			((mesh as Mesh).material as MeshStandardMaterial).color = new Color(
				"red"
			);
		}
	});
	scene.getObjectsByProperty("name", isSelectedName.value).forEach(mesh => {
		if (mesh.type === "Line") {
			mesh.position.z = 0.2;
		} else if (mesh.type === "Group") {
			textGroup.value = mesh;
			mesh.visible = true;
			mesh.position.z = 0.2;
		} else {
			mesh.scale.z = 2;
			((mesh as Mesh).material as MeshStandardMaterial).color = new Color(
				"red"
			);
		}
	});
}

function setSize() {
	camera.aspect = container.value.clientWidth / container.value.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(container.value.clientWidth, container.value.clientHeight);
}
onMounted(() => {
	initCamera();
	initMapData();
	setSize();
	container.value.appendChild(renderer.domElement);
	scene.rotation.x = -Math.PI / 3;
	renderer.setAnimationLoop(() => {
		const delta = clock.getDelta();
		control.update();
		if (textGroup.value) {
			textGroup.value.rotation.z += (Math.PI / 6) * delta;
		}
		renderer.render(scene, camera);
	});
	window.addEventListener("resize", setSize);
	container.value.addEventListener("pointerdown", onPointerDown);
	container.value.addEventListener("pointermove", onPointerMove);
});
</script>

<style scoped></style>
