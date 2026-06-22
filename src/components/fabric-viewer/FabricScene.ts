import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import type { FabricState } from './FabricState';

export class FabricScene {
    container: HTMLElement;
    state: FabricState;
    
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    pmremGenerator: THREE.PMREMGenerator;
    
    pmremEnvMap: THREE.Texture | null = null;
    
    normalDirLight: THREE.DirectionalLight;
    fillLight: THREE.AmbientLight;
    
    resizeObserver: ResizeObserver;
    animationFrameId: number = 0;

    defaultCamera = {
        pos: new THREE.Vector3(0.000, 1.294, 4.829),
        target: new THREE.Vector3(0.000, 0.000, 0.000)
    };

    constructor(container: HTMLElement, state: FabricState) {
        this.container = container;
        this.state = state;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        container.appendChild(this.renderer.domElement);

        this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        this.pmremGenerator.compileEquirectangularShader();

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color().setRGB(0.81141, 0.81141, 0.81141, THREE.SRGBColorSpace);

        this.normalDirLight = new THREE.DirectionalLight(0xffffff, state.globalLightIntensity); 
        this.updateLightRotation();
        this.scene.add(this.normalDirLight);

        this.fillLight = new THREE.AmbientLight(0xffffff, state.globalFillIntensity);
        this.scene.add(this.fillLight);

        this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
        this.camera.filmGauge = 20;
        this.camera.setFocalLength(100);
        this.camera.updateProjectionMatrix();
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        // Resize Observer handles both window resize and layout shifts
        this.resizeObserver = new ResizeObserver(() => {
            if (!this.container) return;
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;
            if (width === 0 || height === 0) return;
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });
        this.resizeObserver.observe(container);

        this.loadEnvironment();
        this.animate();
    }

    loadEnvironment() {
        const exrLoader = new EXRLoader();
        exrLoader.load('/assets/configurator/env/studio.exr', (texture: any) => {
            const envMap = this.pmremGenerator.fromEquirectangular(texture).texture;
            this.pmremEnvMap = envMap;
            this.scene.environment = envMap;
            this.scene.environmentIntensity = this.state.globalHdriIntensity;
            this.scene.environmentRotation.y = THREE.MathUtils.degToRad(this.state.globalHdriRotation);
            texture.dispose();
            this.pmremGenerator.dispose();
        });
    }

    updateLightRotation() {
        const rad = THREE.MathUtils.degToRad(this.state.globalLightRotation);
        // Distance 5 for the light
        this.normalDirLight.position.set(Math.sin(rad) * 5, 5, Math.cos(rad) * 5);
    }

    resetCamera() {
        this.camera.position.copy(this.defaultCamera.pos);
        this.controls.target.copy(this.defaultCamera.target);
        this.controls.update();
    }

    animate = () => {
        this.animationFrameId = requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        this.resizeObserver.disconnect();
        cancelAnimationFrame(this.animationFrameId);
        this.renderer.dispose();
        this.pmremGenerator.dispose();
        this.scene.clear();
    }
}
