import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ControlsCard from "./layoutDecorator/Controlscard";
// import LayoutSidebar from "./layoutDecorator/LayoutSidebar";
import Sidebar from "./layoutDecorator/Sidebar";
import DimensionsCard from "./layoutDecorator/dimensionscard";

// Import your layouts as modules (make sure these paths and names match your file names)
import ContemporaryHouseInterior from "./layoutDecorator/models/layouts/Contemporary_House_Interior.glb";
import EvergreenDuplexResidence from "./layoutDecorator/models/layouts/Evergreen_Duplex_Residence.glb";
import EvergreenDuplexResidenceInterior from "./layoutDecorator/models/layouts/Evergreen_Duplex_Residence_Interior.glb";
import LuxuryClassicalVilla from "./layoutDecorator/models/layouts/Luxury_Classical_Villa.glb";
import ModernApartmentInteriorLayout from "./layoutDecorator/models/layouts/Modern_Appartment_Interior_Layout.glb";


function LayoutDecorator() {
    // Map display layout names to imported GLB URLs
    const layoutModels = {
        "Contemporary House Interior": ContemporaryHouseInterior,
        "Evergreen Duplex Residence Interior": EvergreenDuplexResidenceInterior,
        "Evergreen Duplex Residence": EvergreenDuplexResidence,
        "Luxury Classical Villa": LuxuryClassicalVilla,
        "Modern Apartment Interior Layout": ModernApartmentInteriorLayout,
    };

    const sceneRef = useRef(new THREE.Scene());
    const cameraRef = useRef(
        new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000)
    );
    const rendererRef = useRef(new THREE.WebGLRenderer({ antialias: true }));
    const controlsRef = useRef(null);
    const selectedObjectRef = useRef(null);

    const [dimensions, setDimensions] = useState(null);

    const captureScreenshot = () => {
        const renderer = rendererRef.current;
        if (!renderer) return;
        renderer.render(sceneRef.current, cameraRef.current);
        const link = document.createElement("a");
        link.href = renderer.domElement.toDataURL("image/png");
        link.download = "scene_screenshot.png";
        link.click();
    };

    const updateDimensions = (object) => {
        const box = new THREE.Box3().setFromObject(object);
        const size = new THREE.Vector3();
        box.getSize(size);
        const metersToFeet = 3.28084;
        setDimensions({
            width: size.x * metersToFeet,
            height: size.y * metersToFeet,
            depth: size.z * metersToFeet,
        });
    };

    const location = useLocation();
    const layoutName = location.state?.layoutName || null;

    // Load layout model when layoutName changes
    useEffect(() => {
        if (layoutName && layoutModels[layoutName]) {
            loadLayout(layoutModels[layoutName]);
        }
    }, [layoutName]);

    useEffect(() => {
        const scene = sceneRef.current;
        const camera = cameraRef.current;
        const renderer = rendererRef.current;

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x999999);
        document.body.appendChild(renderer.domElement);

        camera.position.set(0, 5, 15);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.rotateSpeed = 0.6;
        controls.zoomSpeed = 0.8;
        controls.panSpeed = 0.5;
        controls.screenSpacePanning = true;
        controls.enablePan = true;
        controls.minDistance = 5;
        controls.maxDistance = 50;
        controlsRef.current = controls;

        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xf1f1f1f1, 3);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);

        const handleKeydown = (event) => {
            const selectedObject = selectedObjectRef.current;
            if (!selectedObject) return;

            const sizeSpeed = 0.1;
            const moveSpeed = 0.1;

            switch (event.key) {
                case "w":
                case "W":
                case "ArrowUp":
                    selectedObject.position.z -= moveSpeed;
                    break;
                case "s":
                case "S":
                case "ArrowDown":
                    selectedObject.position.z += moveSpeed;
                    break;
                case "a":
                case "A":
                case "ArrowLeft":
                    selectedObject.position.x -= moveSpeed;
                    break;
                case "d":
                case "D":
                case "ArrowRight":
                    selectedObject.position.x += moveSpeed;
                    break;
                case "e":
                case "E":
                    selectedObject.position.y += moveSpeed;
                    break;
                case "q":
                case "Q":
                    selectedObject.position.y -= moveSpeed;
                    break;
                case "+":
                    selectedObject.scale.multiplyScalar(1 + sizeSpeed);
                    updateDimensions(selectedObject);
                    break;
                case "-":
                    selectedObject.scale.multiplyScalar(1 - sizeSpeed);
                    updateDimensions(selectedObject);
                    break;
                case "r":
                case "R":
                    selectedObject.rotation.y -= Math.PI / 100;
                    break;
                case "f":
                case "F":
                    selectedObject.rotation.y += Math.PI / 100;
                    break;
                case "Delete":
                case "Backspace":
                    if (selectedObject.parent) {
                        selectedObject.parent.remove(selectedObject);
                        selectedObjectRef.current = null;
                        setDimensions(null);
                    }
                    break;
                default:
                    break;
            }
        };

        const onMouseDown = (event) => {
            const mouse = new THREE.Vector2(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1
            );
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                let selectedObject = intersects[0].object;
                while (selectedObject.parent && selectedObject.parent !== scene) {
                    selectedObject = selectedObject.parent;
                }

                if (selectedObject.userData.isMovable) {
                    selectedObjectRef.current = selectedObject;
                    updateDimensions(selectedObject);
                } else {
                    selectedObjectRef.current = null;
                    setDimensions(null);
                }
            } else {
                selectedObjectRef.current = null;
                setDimensions(null);
            }
        };

        document.addEventListener("keydown", handleKeydown);
        renderer.domElement.addEventListener("mousedown", onMouseDown);

        const animate = () => {
            requestAnimationFrame(animate);
            controlsRef.current.update();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            renderer.dispose();
            document.removeEventListener("keydown", handleKeydown);
            renderer.domElement.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const addFurniture = (modelPath) => {
        const scene = sceneRef.current;
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            modelPath,
            (gltf) => {
                const object = gltf.scene;
                object.position.set(Math.random() * 5, 0, Math.random() * 5);
                object.scale.set(1, 1, 1);
                object.rotation.y = Math.random() * Math.PI * 2;
                object.userData.isMovable = true;
                scene.add(object);
            },
            undefined,
            (error) => console.error("Failed to load furniture model:", error)
        );
    };

    const loadLayout = (modelPath) => {
        const scene = sceneRef.current;
        const gltfLoader = new GLTFLoader();

        const oldLayout = scene.getObjectByName("room_layout");
        if (oldLayout) scene.remove(oldLayout);

        gltfLoader.load(
            modelPath,
            (gltf) => {
                const model = gltf.scene;
                model.name = "room_layout";
                model.position.set(0, -1, 0);
                model.scale.set(1, 1, 1);
                scene.add(model);
                console.log("Loading layout:", modelPath);
            },
            undefined,
            (error) => console.error("Failed to load layout:", error)
        );
    };

    const handleUserLayoutUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const contents = e.target.result;

            const loader = new GLTFLoader();
            loader.parse(
                contents,
                "",
                (gltf) => {
                    const scene = sceneRef.current;
                    const oldLayout = scene.getObjectByName("room_layout");
                    if (oldLayout) scene.remove(oldLayout);

                    const model = gltf.scene;
                    model.name = "room_layout";
                    model.position.set(0, -1, 0);
                    model.scale.set(1, 1, 1);
                    scene.add(model);
                },
                (error) => {
                    console.error("Error parsing uploaded model", error);
                }
            );
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <>
            <Sidebar onAddFurniture={addFurniture} onCaptureScreenshot={captureScreenshot} />
            {/* <LayoutSidebar onSelectLayout={loadLayout} /> */}
            <ControlsCard />
            <DimensionsCard dimensions={dimensions} />
            {/* <input
                type="file"
                accept=".glb,.gltf"
                onChange={handleUserLayoutUpload}
                style={{
                    position: "fixed",
                    top: 10,
                    right: 10,
                    zIndex: 10,
                    background: "#fff",
                    padding: "5px",
                    borderRadius: "8px",
                }}
            /> */}
        </>
    );
}

export default LayoutDecorator;
