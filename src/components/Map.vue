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
import { Font, FontLoader } from "three/addons/loaders/FontLoader.js";
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
let renderer: WebGLRenderer,
	camera: PerspectiveCamera,
	control: OrbitControls,
	scene: Scene,
	clock: Clock,
	raycaster: Raycaster,
	pointer: Vector2;

// 转为墨卡托投影
const projection = geoMercator()
	.center([114.30304, 30.594911])
	.scale(80)
	.translate([-0.05, 0]);

function initThree() {
	// 渲染器
	renderer = new WebGLRenderer({ antialias: true });
	renderer.setClearColor(0xffffff, 0);
	renderer.shadowMap.enabled = true;
	container.value.appendChild(renderer.domElement);

	// 场景
	scene = new Scene();
	scene.background = null;
	scene.rotation.x = -Math.PI / 3;

	// 时钟
	clock = new Clock();

	// 光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。
	raycaster = new Raycaster();
	pointer = new Vector2();

	// 相机
	camera = new PerspectiveCamera(
		45,
		container.value.clientWidth / container.value.clientHeight,
		0.1,
		5000
	);
	camera.position.set(0, 0, 3.2);
	camera.lookAt(0, 0, 0);
	camera.rotateX(-Math.PI / 2);

	// 相机轨道控制器
	control = new OrbitControls(camera, renderer.domElement);
	control.enablePan = false;
	control.enableZoom = false;

	// 灯光
	initLights();
}

function initLights() {
	const directionalLight = new DirectionalLight(0xffffff, 5);
	directionalLight.castShadow = true;
	directionalLight.receiveShadow = true;
	const hemiLight = new HemisphereLight(0xffffff, "gray", 5);
	const ambiLight = new AmbientLight(0xffffff, 5);
	scene.add(directionalLight, hemiLight, ambiLight);
}
async function initMapData() {
	const loader = new FileLoader();
	const jsonData = await loader.loadAsync("/src/assets/geoJson/wuhan.json");
	const geojson = JSON.parse(jsonData as string);
	const fontLoader = new FontLoader();
	const font = await fontLoader.loadAsync(
		"/src/assets/fonts/Alimama DongFangDaKai_Regular.json"
	);
	geojson.features.forEach((feature: any) => {
		const { geometry, properties } = feature;
		console.log(geojson);

		drawMapLabel(font, properties.name, properties.center);
		geometry.coordinates.forEach((polygon: Array<[[number, number]]>) => {
			drawRegion(polygon, properties.name);
		});
	});
}
function drawRegion(polygon: Array<[[number, number]]>, regionName: string) {
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
	// 绘制区域
	const region = new ExtrudeGeometry(shape, {
		depth: 0.1,
		bevelEnabled: false,
		bevelSegments: 1,
		bevelThickness: 0.1,
	});
	const material = new MeshStandardMaterial({
		metalness: 0.5,
		roughness: 0,
		color: "#aabbcc",
		transparent: true,
		opacity: 0.5,
	});
	const mesh = new Mesh(region, material);

	// 绘制轮廓
	const geometry = new BufferGeometry().setFromPoints(path.getPoints());
	const lineMaterial = new LineBasicMaterial({
		color: "#000000",
		linewidth: 5,
	});
	const outLine = new Line(geometry, lineMaterial);
	outLine.name = regionName;
	outLine.position.z = 0.1;

	mesh.name = regionName;
	mesh.receiveShadow = true;
	scene.add(mesh);
	scene.add(outLine);
}
function drawMapLabel(font: Font, title: string, coordinates: Array<number>) {
	const label = new Group();
	// 标注文字
	const textGeometry = new TextGeometry(title, {
		font,
		size: 0.1,
		height: 0,
	});
	const textMaterial = new MeshStandardMaterial({ color: "#000000" });
	const textMesh = new Mesh(textGeometry, textMaterial);
	textMesh.rotation.x = Math.PI / 2;
	textMesh.position.x -= 0.2;
	textMesh.position.z = 0.2;
	label.add(textMesh);

	// 标注点
	const point = new CircleGeometry(0.01);
	const pointMaterial = new MeshBasicMaterial({ color: "#000000" });
	const pointMesh = new Mesh(point, pointMaterial);

	// 设置标注位置
	const [x, y] = projection([
		coordinates[0],
		coordinates[1],
	]) as Iterable<number>;
	label.add(pointMesh);
	label.position.set(x, -y, 0.2);
	label.visible = false;
	label.name = title;
	scene.add(label);
}

function onPointerDownOrMove(event: PointerEvent) {
	// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
	const meshes = scene.children;
	if (event.type === "pointerdown") {
		isSelectedName.value = "";
	}
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
	if (selectedAreaName) {
		if (event.type === "pointermove") {
			scene.getObjectsByProperty("name", selectedAreaName).forEach(mesh => {
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
		} else if (event.type === "pointerdown") {
			isSelectedName.value = selectedAreaName;
		}
	}
	if (isSelectedName.value) {
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
	store.selectedArea(isSelectedName.value ?? "武汉市");
}

function setSize() {
	camera.aspect = container.value.clientWidth / container.value.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(container.value.clientWidth, container.value.clientHeight);
}

function animation() {
	renderer.setAnimationLoop(() => {
		const delta = clock.getDelta();
		control.update();
		if (textGroup.value) {
			textGroup.value.rotation.z += (Math.PI / 6) * delta;
		}
		renderer.render(scene, camera);
	});
}
onMounted(() => {
	initThree();
	initMapData();
	setSize();
	animation();
	window.addEventListener("resize", setSize);
	container.value.addEventListener("pointerdown", onPointerDownOrMove);
	container.value.addEventListener("pointermove", onPointerDownOrMove);
});
</script>

<style scoped></style>
