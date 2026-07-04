"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
// Basic orbit controls (might need to import from three/examples/jsm/controls/OrbitControls if available)
// but let's implement a simple auto-rotate or manual rotate if OrbitControls is not installed.

export default function Nadir3D({ onBuildingClick, clickedBuilding }: { onBuildingClick: (idx: number | null) => void, clickedBuilding: number | null }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const sceneGroupRef = useRef<THREE.Group | null>(null);

  // Buildings (Mock data)
  const buildings = [
    { x: -5, z: -5, w: 4, d: 4, h: 8, color: "#14181C" },
    { x: 5, z: -2, w: 3, d: 6, h: 5, color: "#5a646e" },
    { x: 2, z: 6, w: 5, d: 4, h: 3, color: "#7a848e" },
    { x: -6, z: 4, w: 3, d: 3, h: 4, color: "#0E7C8A" }, // Active/Alert building
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#F3F1EC");
    
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);
    sceneGroupRef.current = sceneGroup;

    // Isometric camera
    const aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
    const d = 10;
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(scene.position);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Grid
    const gridHelper = new THREE.GridHelper(40, 40, "#d9d5cd", "#e3dfd7");
    sceneGroup.add(gridHelper);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    buildings.forEach((b, idx) => {
      const geometry = new THREE.BoxGeometry(b.w, b.h, b.d);
      const material = new THREE.MeshLambertMaterial({ color: b.color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(b.x, b.h / 2, b.z);
      mesh.userData = { index: idx };
      sceneGroup.add(mesh);

      // Add edge outline
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: "#ffffff", linewidth: 2 }));
      mesh.add(line);
    });

    // Handle clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sceneGroup.children);

      let clickedObj = false;
      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object instanceof THREE.Mesh && intersects[i].object.userData.index !== undefined) {
          onBuildingClick(intersects[i].object.userData.index);
          clickedObj = true;
          break;
        }
      }
      if (!clickedObj) {
        onBuildingClick(null);
      }
    };
    renderer.domElement.addEventListener('click', onClick);

    // Animation variables
    let targetZoom = 1;
    let targetOffsetX = 0;
    let targetOffsetZ = 0;

    // Animation loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      
      // Handle zoom and pan logic based on clickedBuilding via ref check
      const currentClicked = mountRef.current?.getAttribute('data-clicked');
      if (currentClicked && currentClicked !== 'null') {
        const idx = parseInt(currentClicked, 10);
        const b = buildings[idx];
        if (b) {
          targetZoom = 3.5;
          targetOffsetX = -b.x;
          targetOffsetZ = -b.z;
        }
      } else {
        targetZoom = 1;
        targetOffsetX = 0;
        targetOffsetZ = 0;
      }

      // Lerp camera zoom
      camera.zoom += (targetZoom - camera.zoom) * 0.05;
      camera.updateProjectionMatrix();

      // Lerp group position to center the building
      sceneGroup.position.x += (targetOffsetX - sceneGroup.position.x) * 0.05;
      sceneGroup.position.z += (targetOffsetZ - sceneGroup.position.z) * 0.05;

      // Rotate slowly only if not zoomed in
      if (targetZoom === 1) {
        sceneGroup.rotation.y += 0.001; 
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      const asp = width / height;
      camera.left = -d * asp;
      camera.right = d * asp;
      camera.top = d;
      camera.bottom = -d;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onBuildingClick]);

  return <div ref={mountRef} data-clicked={clickedBuilding !== null ? clickedBuilding : 'null'} style={{ width: "100%", height: "100%" }} />;
}
