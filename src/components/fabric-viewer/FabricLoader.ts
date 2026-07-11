import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import type { FabricState } from './FabricState';
import type { FabricScene } from './FabricScene';
import type { FabricMaterials } from './FabricMaterials';

export class FabricLoader {
    state: FabricState;
    sceneManager: FabricScene;
    materialManager: FabricMaterials;

    gltfLoader: GLTFLoader;
    objLoader: OBJLoader;
    textureLoader: THREE.TextureLoader;

    currentModelScene: THREE.Group | null = null;
    shadowCasterScene: THREE.Group | null = null;
    bakedFloorScene: THREE.Group | null = null;

    bakedFabricMaps: THREE.Texture[] = [];
    bakedExtraMaps: THREE.Texture[] = [];
    bakedFloorMaps: THREE.Texture[] = [];

    sheenNormalMap: THREE.Texture | null = null;

    modelRotations = [60, 20, -60];
    modelOffsets: Record<string, number> = {
        'JUVO.glb': -0.35,
        'chair_bake.gltf': -0.35
    };

    onLoadingChange: (isLoading: boolean) => void = () => {};
    onRenderPreviewNeeded: () => void = () => {};

    constructor(state: FabricState, sceneManager: FabricScene, materialManager: FabricMaterials) {
        this.state = state;
        this.sceneManager = sceneManager;
        this.materialManager = materialManager;

        this.gltfLoader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        this.gltfLoader.setDRACOLoader(dracoLoader);
        this.objLoader = new OBJLoader();
        this.textureLoader = new THREE.TextureLoader();

        this.preloadBakes();
    }

    preloadBakes() {
        const loadBake = (filename: string, flipY: boolean = false) => {
            const tex = this.textureLoader.load(`/assets/configurator/textures/bakes/${filename}`);
            tex.flipY = flipY;
            tex.colorSpace = THREE.SRGBColorSpace;
            return tex;
        };

        // this.sheenNormalMap = this.textureLoader.load('/assets/configurator/textures/sheen_normal.webp');
        // this.sheenNormalMap.wrapS = this.sheenNormalMap.wrapT = THREE.RepeatWrapping;
        
        // // Pass it to velvet material
        // this.materialManager.velvetMaterial.userData.uSheenNormalMap = this.sheenNormalMap;
        // if (this.materialManager.velvetMaterial.userData.shader) {
        //     this.materialManager.velvetMaterial.userData.shader.uniforms.uSheenNormalMap.value = this.sheenNormalMap;
        // }

        this.bakedFabricMaps = [
            loadBake('angle1_fabric.webp'),
            loadBake('angle2_fabric.webp'),
            loadBake('angle3_fabric.webp')
        ];
        this.bakedExtraMaps = [
            loadBake('angle1_extra.webp'),
            loadBake('angle2_extra.webp'),
            loadBake('angle3_extra.webp')
        ];
        this.bakedFloorMaps = [
            loadBake('angle1_floor.webp', true),
            loadBake('angle2_floor.webp', true),
            loadBake('angle3_floor.webp', true)
        ];

        this.objLoader.load('/assets/configurator/models/floor_bake.obj', (obj: any) => {
            this.bakedFloorScene = obj;
            this.bakedFloorScene.traverse((child: any) => {
                if (child.isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.material = new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        map: this.bakedFloorMaps[this.state.currentAngle],
                        transparent: true
                    });
                    mesh.material.needsUpdate = true;
                }
            });
            this.bakedFloorScene.position.y = -0.35; // Shift down to match glb models
            this.sceneManager.scene.add(this.bakedFloorScene);
        });
    }

    loadModel(filename: string) {
        this.state.currentModel = filename;
        this.onLoadingChange(true);
        
        if (this.currentModelScene) {
            this.sceneManager.scene.remove(this.currentModelScene);
        }
        if (this.shadowCasterScene) {
            this.sceneManager.scene.remove(this.shadowCasterScene);
            this.shadowCasterScene = null;
        }

        const isObj = filename.endsWith('.obj');

        if (isObj) {
            this.objLoader.load(`/assets/configurator/models/${filename}`, (obj: any) => {
                this.currentModelScene = obj;
                
                const meshes: THREE.Mesh[] = [];
                this.currentModelScene.traverse((child: any) => {
                    if (child.isMesh) meshes.push(child);
                });

                const targetMat = this.state.currentMaterialType === 'velvet' 
                    ? this.materialManager.velvetMaterial 
                    : this.materialManager.fabricMaterial;

                meshes.forEach((mesh) => {
                    if (mesh.geometry.attributes.uv) {
                        mesh.geometry.setAttribute('uv2', mesh.geometry.attributes.uv);
                    }
                    if (mesh.geometry.attributes.tangent) {
                        mesh.geometry.deleteAttribute('tangent');
                    }

                    const meshName = mesh.name.toLowerCase();
                    const isFabric = meshName.includes('fabric') || (meshName === '' && meshes.indexOf(mesh) === 0);
                    
                    if (isFabric) {
                        mesh.material = targetMat;
                        targetMat.needsUpdate = true;
                    } else {
                        mesh.material = this.materialManager.neutralMaterial;
                        this.materialManager.neutralMaterial.needsUpdate = true;
                    }
                });
                this.state.currentYOffset = -0.35;
                this.currentModelScene.position.y = this.state.currentYOffset;
                
                this.applyAngle(this.state.currentAngle);
                this.sceneManager.scene.add(this.currentModelScene);
                this.onLoadingChange(false);
            }, undefined, (err: any) => {
                console.error(err);
                this.onLoadingChange(false);
            });

        } else {
            this.gltfLoader.load(`/assets/configurator/models/${filename}`, (gltf: any) => {
                this.currentModelScene = gltf.scene;
                
                this.currentModelScene.traverse((child: any) => {
                    if (child.isMesh) {
                        child.castShadow = false; 
                        child.receiveShadow = true;
                        
                        const mesh = child as THREE.Mesh;
                        const targetMat = this.state.currentMaterialType === 'velvet' 
                            ? this.materialManager.velvetMaterial 
                            : this.materialManager.fabricMaterial;
                        
                        if (Array.isArray(mesh.material)) {
                            mesh.material = mesh.material.map((mat: any) => {
                                const matName = mat.name.toLowerCase();
                                const isFabric = matName.includes('fabric') || matName.includes('seat');
                                return isFabric ? targetMat : this.materialManager.neutralMaterial;
                            });
                        } else {
                            const matName = mesh.material && (mesh.material as THREE.Material).name ? (mesh.material as THREE.Material).name.toLowerCase() : '';
                            const meshName = mesh.name.toLowerCase();

                            const isFabric = matName.includes('fabric') || matName.includes('seat') || meshName.includes('seat');
                            
                            if (isFabric) {
                                mesh.material = targetMat;
                            } else {
                                mesh.material = this.materialManager.neutralMaterial;
                            }
                        }

                        if (mesh.geometry.attributes.uv) {
                            mesh.geometry.setAttribute('uv2', mesh.geometry.attributes.uv);
                        }
                        if (mesh.geometry.attributes.tangent) {
                            mesh.geometry.deleteAttribute('tangent');
                        }
                    }
                });

                if (filename.includes('chair')) {
                    this.currentModelScene.scale.setScalar(1.0);
                    this.state.currentYOffset = this.modelOffsets[filename] || -0.70;
                    
                    this.currentModelScene.position.y = this.state.currentYOffset;
                    if (this.bakedFloorScene) this.bakedFloorScene.position.y = this.state.currentYOffset;
                } else {
                    const box = new THREE.Box3().setFromObject(this.currentModelScene);
                    const center = box.getCenter(new THREE.Vector3());
                    this.currentModelScene.position.x = -center.x;
                    this.currentModelScene.position.z = -center.z;
                    this.state.currentYOffset = -box.min.y - 0.70;
                    this.currentModelScene.position.y = this.state.currentYOffset;
                    if (this.bakedFloorScene) this.bakedFloorScene.position.y = this.state.currentYOffset;
                }

                this.applyAngle(this.state.currentAngle);
                this.sceneManager.scene.add(this.currentModelScene);

                // Duplicate model to cast shadows
                this.shadowCasterScene = this.currentModelScene.clone();
                this.shadowCasterScene.traverse((child: any) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = false;
                        child.material = new THREE.MeshBasicMaterial({ color: 0x000000, colorWrite: false, depthWrite: false });
                    }
                });
                this.sceneManager.scene.add(this.shadowCasterScene);
                this.onLoadingChange(false);
            }, undefined, (err: any) => {
                console.error(err);
                this.onLoadingChange(false);
            });
        }
    }

    applyAngle(index: number) {
        const angleDeg = this.modelRotations[index] || 0;
        const staticAngle = this.modelRotations[0] || 0;

        if (this.currentModelScene) {
            // Keep model static at angle 0
            this.currentModelScene.rotation.y = THREE.MathUtils.degToRad(staticAngle);
            if (this.shadowCasterScene) {
                this.shadowCasterScene.rotation.y = this.currentModelScene.rotation.y;
            }
        }

        // Rotate the floor to rotate the shadow
        if (this.bakedFloorScene) {
            // To make the floor's shadow match the static chair, 
            // we rotate the floor by the difference between the static angle and the original baked angle.
            this.bakedFloorScene.rotation.y = THREE.MathUtils.degToRad(staticAngle - angleDeg);
        }

        const m = this.materialManager;
        
        if (m.fabricMaterial) {
            if (this.state.currentMode === 'baked') {
                m.fabricMaterial.lightMap = this.bakedFabricMaps[index];
                m.velvetMaterial.lightMap = this.bakedFabricMaps[index];
            }
            m.fabricMaterial.needsUpdate = true;
            m.velvetMaterial.needsUpdate = true;
        }
        
        if (m.neutralMaterial) {
            m.neutralMaterial.map = this.bakedExtraMaps[index];
            m.neutralMaterial.needsUpdate = true;
        }
        
        if (this.bakedFloorScene) {
            this.bakedFloorScene.traverse((child: any) => {
                if (child.isMesh && child.material) {
                    child.material.map = this.bakedFloorMaps[index];
                    child.material.needsUpdate = true;
                }
            });
        }
    }

    updateTextureRepeats() {
        const texPrefix = this.state.currentTextureId.split('-')[0];
        const isVelvetTexture = ["ADO", "BOS", "DAR"].includes(texPrefix);
        
        const effectiveRepeat = isVelvetTexture ? this.state.currentRepeat / 6 : this.state.currentRepeat;

        const m = this.materialManager;
        const updateTex = (tex: THREE.Texture | null) => {
            if (tex) tex.repeat.set(effectiveRepeat, effectiveRepeat);
        };

        [m.fabricMaterial, m.velvetMaterial].forEach(mat => {
            updateTex(mat.map);
            updateTex(mat.normalMap);
            updateTex(mat.roughnessMap);
            updateTex(mat.aoMap);
        });

        // @ts-ignore
        updateTex(m.fabricMaterial.userData.normalRaw);
        // @ts-ignore
        updateTex(m.fabricMaterial.userData.normalCombined);
    }

    applyVelvetNormalMode() {
        const m = this.materialManager;
        
        // Fabric material ALWAYS uses normalRaw if it exists (which is true for velvet textures)
        // @ts-ignore
        m.fabricMaterial.normalMap = m.fabricMaterial.userData.normalRaw || m.fabricMaterial.userData.normalCombined;
        m.fabricMaterial.needsUpdate = true;

        // Velvet material uses the UI toggle
        // @ts-ignore
        if (this.state.velvetNormalMode === 'raw' && m.fabricMaterial.userData.normalRaw) {
            // @ts-ignore
            m.velvetMaterial.normalMap = m.fabricMaterial.userData.normalRaw;
        // @ts-ignore
        } else if (m.fabricMaterial.userData.normalCombined) {
            // @ts-ignore
            m.velvetMaterial.normalMap = m.fabricMaterial.userData.normalCombined;
        }
        m.velvetMaterial.needsUpdate = true;
    }

    updateFabricMaterial(textureId: string, batchId: string = '') {
        if (!textureId) return;
        
        const isGltf = this.state.currentModel.endsWith('.gltf') || this.state.currentModel.endsWith('.glb');
        const applyFlipY = !isGltf;
        const res = batchId === 'Batch05' ? '4k' : '2k';
        const basePath = `/assets/configurator/textures/${textureId}_${res}/`;
        const texPrefix = textureId.split('-')[0];
        const isBatch04Velvet = ["ADO", "BOS", "DAR"].includes(texPrefix);
        
        const m = this.materialManager;

        this.textureLoader.load(`${basePath}color.webp`, (tex: any) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            // tex.repeat.set(this.state.currentRepeat, this.state.currentRepeat);
            tex.flipY = applyFlipY;
            m.fabricMaterial.map = tex;
            m.velvetMaterial.map = tex;
            m.fabricMaterial.needsUpdate = true;
            m.velvetMaterial.needsUpdate = true;
            this.updateTextureRepeats();
        });

        this.textureLoader.load(`${basePath}roughness.webp`, (tex: any) => {
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            // tex.repeat.set(this.state.currentRepeat, this.state.currentRepeat);
            tex.flipY = applyFlipY;
            m.fabricMaterial.roughnessMap = tex;
            m.velvetMaterial.roughnessMap = tex;
            m.fabricMaterial.needsUpdate = true;
            m.velvetMaterial.needsUpdate = true;
            this.updateTextureRepeats();
        });

        this.textureLoader.load(`${basePath}normal.webp`, (tex: any) => {
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            // tex.repeat.set(this.state.currentRepeat, this.state.currentRepeat);
            tex.flipY = applyFlipY;
            // @ts-ignore
            m.fabricMaterial.userData.normalCombined = tex;
            m.fabricMaterial.normalMap = tex;
            m.fabricMaterial.needsUpdate = true;
            this.applyVelvetNormalMode();
            this.updateTextureRepeats();
        });

        if (isBatch04Velvet) {
            this.textureLoader.load(`${basePath}normal_raw.webp`, (tex: any) => {
                tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
                // tex.repeat.set(this.state.currentRepeat, this.state.currentRepeat);
                tex.flipY = applyFlipY;
                // @ts-ignore
                m.fabricMaterial.userData.normalRaw = tex;
                this.applyVelvetNormalMode();
                this.updateTextureRepeats();
            }, undefined, (err) => {
                // @ts-ignore
                m.fabricMaterial.userData.normalRaw = null;
                this.applyVelvetNormalMode();
            });
        } else {
            // @ts-ignore
            m.fabricMaterial.userData.normalRaw = null;
            this.applyVelvetNormalMode();
        }

        this.textureLoader.load(`${basePath}ao.webp`, (tex: any) => {
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            // tex.repeat.set(this.state.currentRepeat, this.state.currentRepeat);
            tex.flipY = applyFlipY;
            m.fabricMaterial.aoMap = tex;
            m.velvetMaterial.aoMap = tex;
            m.fabricMaterial.needsUpdate = true;
            m.velvetMaterial.needsUpdate = true;
            this.updateTextureRepeats();
        });
    }

    updateActiveMaterial() {
        if (!this.currentModelScene) return;
        const m = this.materialManager;
        const targetMat = this.state.currentMaterialType === 'velvet' ? m.velvetMaterial : m.fabricMaterial;
        
        this.currentModelScene.traverse((child: any) => {
            if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                
                if (Array.isArray(mesh.material)) {
                    mesh.material = mesh.material.map((mat: any) => {
                        const matName = mat.name.toLowerCase();
                        if (mat === m.fabricMaterial || mat === m.velvetMaterial || matName.includes('fabric') || matName.includes('seat')) {
                            return targetMat;
                        }
                        return mat;
                    });
                } else {
                    const matName = mesh.material && (mesh.material as THREE.Material).name ? (mesh.material as THREE.Material).name.toLowerCase() : '';
                    const meshName = mesh.name.toLowerCase();
                    const isFabric = mesh.material === m.fabricMaterial || mesh.material === m.velvetMaterial || matName.includes('fabric') || matName.includes('seat') || meshName.includes('seat');
                    if (isFabric) {
                        mesh.material = targetMat;
                    }
                }
            }
        });

        this.updateFabricMaterial(this.state.currentTextureId);
    }
}
