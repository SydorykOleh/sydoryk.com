import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function initFabricViewer() {
    const container = document.getElementById('three-container');
    if (!container) return;
    
    // Prevent double initialization from Astro page transitions
    if (container.hasChildNodes()) {
        container.innerHTML = '';
    }

    // UI Elements
    const loadingOverlay = document.getElementById('loading-overlay');
    const textureBtns = document.querySelectorAll('.texture-btn');
    const collectionBtns = document.querySelectorAll('.collection-btn');
    const angleBtns = document.querySelectorAll('.angle-selectors button');
    const textureScaleSlider = document.getElementById('texture-scale-slider') as HTMLInputElement;
    const textureScaleValue = document.getElementById('texture-scale-value');
    const textureBlendSlider = document.getElementById('texture-blend-slider') as HTMLInputElement;
    const textureBlendValue = document.getElementById('texture-blend-value');
    const lmGainSlider = document.getElementById('lm-gain-slider') as HTMLInputElement;
    const lmGainValue = document.getElementById('lm-gain-value');
    const lmGammaSlider = document.getElementById('lm-gamma-slider') as HTMLInputElement;
    const lmGammaValue = document.getElementById('lm-gamma-value');
    const pbrGainSlider = document.getElementById('pbr-gain-slider') as HTMLInputElement;
    const pbrGainValue = document.getElementById('pbr-gain-value');
    const pbrGammaSlider = document.getElementById('pbr-gamma-slider') as HTMLInputElement;
    const pbrGammaValue = document.getElementById('pbr-gamma-value');
    const normalStrengthSlider = document.getElementById('normal-strength-slider') as HTMLInputElement;
    const normalStrengthValue = document.getElementById('normal-strength-value');
    const specularAmountSlider = document.getElementById('specular-amount-slider') as HTMLInputElement;
    const specularAmountValue = document.getElementById('specular-amount-value');
    const renderImage = document.getElementById('render-image') as HTMLImageElement;
    const renderEmpty = document.getElementById('render-empty');
    
    const modeBtns = document.querySelectorAll('.mode-btn');
    const resetCameraBtn = document.getElementById('reset-camera-btn');
    const hdriRotationSlider = document.getElementById('hdri-rotation-slider') as HTMLInputElement;
    const hdriRotationValue = document.getElementById('hdri-rotation-value');
    const lightIntensitySlider = document.getElementById('light-intensity-slider') as HTMLInputElement;
    const lightIntensityValue = document.getElementById('light-intensity-value');
    const lightRotationSlider = document.getElementById('light-rotation-slider') as HTMLInputElement;
    const lightRotationValue = document.getElementById('light-rotation-value');

    // State
    let currentModel = 'chair_bake.gltf';
    let currentPreset = 'normal';
    let currentTextureId = 'VEN-01';
    let currentCollection = '';
    let currentAngle = 0; // 0, 1, 2
    let currentRepeat = 12;
    let globalTextureBlend = 1.0;
    let globalLmGain = 1.0;
    let globalLmGamma = 1.6;
    let currentMode: 'baked' | 'normal' = 'baked';
    let sliderStates = {
        baked: { pbrGain: 1.75, pbrGamma: 1.25, normalStrength: 1.8, specularAmount: 1.0 },
        normal: { pbrGain: 1.75, pbrGamma: 1.25, normalStrength: 1.8, specularAmount: 1.0 }
    };
    let globalHdriRotation = 0;
    let globalLightIntensity = 1.0;
    let globalLightRotation = 0;
    let currentYOffset = -0.70; // Global state for tracking object height
    let activeRenders: string[] = [];
    let currentModelScene: THREE.Group | null = null;
    let shadowCasterScene: THREE.Group | null = null;

    // Image Preloader Cache
    const preloadedImages = new Map<string, HTMLImageElement>();
    
    // Removed debug sliders

    if (textureScaleSlider && textureScaleValue) {
        textureScaleSlider.addEventListener('input', (e) => {
            currentRepeat = parseFloat((e.target as HTMLInputElement).value);
            textureScaleValue.textContent = currentRepeat.toFixed(1);
            if (fabricMaterial.map) fabricMaterial.map.repeat.set(currentRepeat, currentRepeat);
            if (fabricMaterial.normalMap) fabricMaterial.normalMap.repeat.set(currentRepeat, currentRepeat);
            if (fabricMaterial.roughnessMap) fabricMaterial.roughnessMap.repeat.set(currentRepeat, currentRepeat);
            if (fabricMaterial.aoMap) fabricMaterial.aoMap.repeat.set(currentRepeat, currentRepeat);
        });
    }

    if (textureBlendSlider && textureBlendValue) {
        textureBlendSlider.addEventListener('input', (e) => {
            globalTextureBlend = parseFloat((e.target as HTMLInputElement).value);
            textureBlendValue.textContent = globalTextureBlend.toFixed(2);
            if (fabricMaterial.userData.shader) {
                fabricMaterial.userData.shader.uniforms.uTextureBlend.value = globalTextureBlend;
            }
        });
    }

    if (lmGainSlider && lmGainValue) {
        lmGainSlider.addEventListener('input', (e) => {
            globalLmGain = parseFloat((e.target as HTMLInputElement).value);
            lmGainValue.textContent = globalLmGain.toFixed(2);
            if (fabricMaterial.userData.shader) {
                fabricMaterial.userData.shader.uniforms.uLmGain.value = globalLmGain;
            }
        });
    }

    if (lmGammaSlider && lmGammaValue) {
        lmGammaSlider.addEventListener('input', (e) => {
            globalLmGamma = parseFloat((e.target as HTMLInputElement).value);
            lmGammaValue.textContent = globalLmGamma.toFixed(2);
            if (fabricMaterial.userData.shader) {
                fabricMaterial.userData.shader.uniforms.uLmGamma.value = globalLmGamma;
            }
        });
    }

    function updateSliderDisplays() {
        const state = sliderStates[currentMode];
        if (pbrGainSlider && pbrGainValue) {
            pbrGainSlider.value = state.pbrGain.toString();
            pbrGainValue.textContent = state.pbrGain.toFixed(2);
        }
        if (pbrGammaSlider && pbrGammaValue) {
            pbrGammaSlider.value = state.pbrGamma.toString();
            pbrGammaValue.textContent = state.pbrGamma.toFixed(2);
        }
        if (normalStrengthSlider && normalStrengthValue) {
            normalStrengthSlider.value = state.normalStrength.toString();
            normalStrengthValue.textContent = state.normalStrength.toFixed(2);
        }
        if (specularAmountSlider && specularAmountValue) {
            specularAmountSlider.value = state.specularAmount.toString();
            specularAmountValue.textContent = state.specularAmount.toFixed(2);
        }
        
        // Update materials
        if (fabricMaterial.userData.shader) {
            fabricMaterial.userData.shader.uniforms.uPbrGain.value = state.pbrGain;
            fabricMaterial.userData.shader.uniforms.uPbrGamma.value = state.pbrGamma;
        }
        fabricMaterial.normalScale.set(state.normalStrength, state.normalStrength);
        // @ts-ignore
        fabricMaterial.specularIntensity = state.specularAmount;
        fabricMaterial.needsUpdate = true;
    }

    if (pbrGainSlider && pbrGainValue) {
        pbrGainSlider.addEventListener('input', (e) => {
            const val = parseFloat((e.target as HTMLInputElement).value);
            sliderStates[currentMode].pbrGain = val;
            pbrGainValue.textContent = val.toFixed(2);
            if (fabricMaterial.userData.shader) fabricMaterial.userData.shader.uniforms.uPbrGain.value = val;
        });
    }

    if (pbrGammaSlider && pbrGammaValue) {
        pbrGammaSlider.addEventListener('input', (e) => {
            const val = parseFloat((e.target as HTMLInputElement).value);
            sliderStates[currentMode].pbrGamma = val;
            pbrGammaValue.textContent = val.toFixed(2);
            if (fabricMaterial.userData.shader) fabricMaterial.userData.shader.uniforms.uPbrGamma.value = val;
        });
    }

    if (normalStrengthSlider && normalStrengthValue) {
        normalStrengthSlider.addEventListener('input', (e) => {
            const val = parseFloat((e.target as HTMLInputElement).value);
            sliderStates[currentMode].normalStrength = val;
            normalStrengthValue.textContent = val.toFixed(2);
            fabricMaterial.normalScale.set(val, val);
        });
    }

    if (specularAmountSlider && specularAmountValue) {
        specularAmountSlider.addEventListener('input', (e) => {
            const val = parseFloat((e.target as HTMLInputElement).value);
            sliderStates[currentMode].specularAmount = val;
            specularAmountValue.textContent = val.toFixed(2);
            // @ts-ignore
            fabricMaterial.specularIntensity = val;
            fabricMaterial.needsUpdate = true;
        });
    }

    function updateLightRotation() {
        const rad = THREE.MathUtils.degToRad(globalLightRotation);
        // Distance 5 for the light
        normalDirLight.position.set(Math.sin(rad) * 5, 5, Math.cos(rad) * 5);
    }

    if (hdriRotationSlider && hdriRotationValue) {
        hdriRotationSlider.addEventListener('input', (e) => {
            globalHdriRotation = parseFloat((e.target as HTMLInputElement).value);
            hdriRotationValue.textContent = globalHdriRotation.toString();
            scene.environmentRotation.y = THREE.MathUtils.degToRad(globalHdriRotation);
        });
    }

    if (lightIntensitySlider && lightIntensityValue) {
        lightIntensitySlider.addEventListener('input', (e) => {
            globalLightIntensity = parseFloat((e.target as HTMLInputElement).value);
            lightIntensityValue.textContent = globalLightIntensity.toFixed(2);
            if (currentMode === 'normal') {
                normalDirLight.intensity = globalLightIntensity;
            }
        });
    }

    if (lightRotationSlider && lightRotationValue) {
        lightRotationSlider.addEventListener('input', (e) => {
            globalLightRotation = parseFloat((e.target as HTMLInputElement).value);
            lightRotationValue.textContent = globalLightRotation.toString();
            updateLightRotation();
        });
    }

    // Three.js Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color().setRGB(0.81141, 0.81141, 0.81141, THREE.SRGBColorSpace);

    // Basic lighting for PBR normals and roughness to react to
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(2, 5, 3);
    scene.add(dirLight);

    const normalDirLight = new THREE.DirectionalLight(0xffffff, 0.0); // Hidden initially
    updateLightRotation();
    scene.add(normalDirLight);

    const exrLoader = new EXRLoader();
    let pmremEnvMap: THREE.Texture | null = null;
    exrLoader.load('/assets/configurator/textures/HDRI_fabric_scene.exr', (texture) => {
        pmremEnvMap = pmremGenerator.fromEquirectangular(texture).texture;
        if (currentMode === 'normal') {
            scene.environment = pmremEnvMap;
        }
        texture.dispose();
    });

    // Create camera and set Houdini match settings
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.filmGauge = 20; // Match Houdini's aperture of 20
    camera.setFocalLength(100); // 100mm focal length
    camera.updateProjectionMatrix();
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Original Houdini source files for reference:
    // Chair: G:\projects\01_FREELANCE\2026-04-FluxBe\01_scene\houdini\geo\bake\chair_bake.gltf
    
    // Dynamic Y offsets for different models to perfectly center them at Y=0
    const modelOffsets: Record<string, number> = {
        'JUVO.glb': -0.35,
        'chair_bake.gltf': -0.35
    };

    // Distance 5, keeping the same pitch angle
    const defaultCamera = {
        pos: new THREE.Vector3(0.000, 1.294, 4.829),
        target: new THREE.Vector3(0.000, 0.000, 0.000)
    };

    // The chair rotates to these specific angles instead of the camera moving
    const modelRotations = [60, 20, -60];

    function applyAngle(index: number) {
        // Rotate the model itself
        if (currentModelScene) {
            const angleDeg = modelRotations[index] || 0;
            currentModelScene.rotation.y = THREE.MathUtils.degToRad(angleDeg);
            if (shadowCasterScene) {
                shadowCasterScene.rotation.y = currentModelScene.rotation.y;
            }
        }
        
        // Update baked textures for the new angle
        if (typeof fabricMaterial !== 'undefined' && fabricMaterial) {
            fabricMaterial.lightMap = bakedFabricMaps[index];
            fabricMaterial.needsUpdate = true;
        }
        if (typeof neutralMaterial !== 'undefined' && neutralMaterial) {
            neutralMaterial.map = bakedExtraMaps[index];
            neutralMaterial.needsUpdate = true;
        }
        if (bakedFloorScene) {
            bakedFloorScene.traverse((child: any) => {
                if (child.isMesh && child.material) {
                    child.material.map = bakedFloorMaps[index];
                    child.material.needsUpdate = true;
                }
            });
        }
    }

    // Resize Observer handles both window resize and layout shifts
    const resizeObserver = new ResizeObserver(() => {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Model Loading
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    gltfLoader.setDRACOLoader(dracoLoader);
    const objLoader = new OBJLoader();

    const textureLoader = new THREE.TextureLoader();

    // Preload baked maps per angle
    const loadBake = (filename: string, flipY: boolean = false) => {
        const tex = textureLoader.load(`/assets/configurator/textures/bakes/${filename}`);
        tex.flipY = flipY;
        tex.channel = 0;
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
    };

    const bakedFabricMaps = [
        loadBake('angle1_fabric.webp'),
        loadBake('angle2_fabric.webp'),
        loadBake('angle3_fabric.webp')
    ];
    const bakedExtraMaps = [
        loadBake('angle1_extra.webp'),
        loadBake('angle2_extra.webp'),
        loadBake('angle3_extra.webp')
    ];
    const bakedFloorMaps = [
        loadBake('angle1_floor.webp', true),
        loadBake('angle2_floor.webp', true),
        loadBake('angle3_floor.webp', true)
    ];

    let bakedFloorScene: THREE.Group | null = null;
    objLoader.load('/assets/configurator/models/floor_bake.obj', (obj) => {
        bakedFloorScene = obj;
        bakedFloorScene.traverse((child: any) => {
            if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.material = new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    map: bakedFloorMaps[currentAngle],
                    transparent: true
                });
                mesh.material.needsUpdate = true;
            }
        });
        bakedFloorScene.position.y = -0.35; // Shift down to match glb models
        scene.add(bakedFloorScene);
    });
    
    const shaderOverride = (shader: any, material: any) => {
        shader.uniforms.uTextureBlend = { value: globalTextureBlend };
        shader.uniforms.uLmGain = { value: globalLmGain };
        shader.uniforms.uLmGamma = { value: globalLmGamma };
        shader.uniforms.uPbrGain = { value: sliderStates[currentMode].pbrGain };
        shader.uniforms.uPbrGamma = { value: sliderStates[currentMode].pbrGamma };
        
        material.userData.shader = shader;
        
        shader.fragmentShader = `
            uniform float uTextureBlend;
            uniform float uLmGain;
            uniform float uLmGamma;
            uniform float uPbrGain;
            uniform float uPbrGamma;
            ${shader.fragmentShader}
        `;
        
        // Remove Three.js's native additive lightmap behavior
        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <lightmap_fragment>',
            `
            // Custom lightmap logic is handled at the end of the shader
            `
        );

        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <dithering_fragment>',
            `
            #include <dithering_fragment>
            
            #ifdef USE_LIGHTMAP
                vec4 rawBake = texture2D( lightMap, vLightMapUv );
                // Apply LM Gain and Gamma
                rawBake.rgb = pow(rawBake.rgb * uLmGain, vec3(1.0 / uLmGamma));
                
                // fullyLit is the standard PBR output (no lightmap added yet)
                vec4 fullyLit = gl_FragColor;
                // Apply PBR Gain and Gamma
                fullyLit.rgb = pow(fullyLit.rgb * uPbrGain, vec3(1.0 / uPbrGamma));
                
                // 1.0 state: lightmap multiplied with PBR output
                vec4 multiplied = fullyLit * rawBake;
                
                // Transition 0 -> 1: Blend from raw bake to multiplied PBR
                vec4 mix01 = mix(rawBake, multiplied, clamp(uTextureBlend, 0.0, 1.0));
                
                // Transition 1 -> 2: Blend from multiplied PBR to raw PBR
                vec4 finalColor = mix(mix01, fullyLit, clamp(uTextureBlend - 1.0, 0.0, 1.0));
                
                gl_FragColor = finalColor;
            #else
                // In Normal mode, just apply PBR Gain/Gamma to standard physical output
                vec4 fullyLit = gl_FragColor;
                fullyLit.rgb = pow(fullyLit.rgb * uPbrGain, vec3(1.0 / uPbrGamma));
                gl_FragColor = fullyLit;
            #endif
            `
        );
    };

    // Base Fabric Material (White base color, fully physical)
    const fabricMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 1.0,
        metalness: 0.0,
        envMapIntensity: 0.0,
        lightMap: bakedFabricMaps[currentAngle],
        lightMapIntensity: 1.0,
        normalScale: new THREE.Vector2(sliderStates[currentMode].normalStrength, sliderStates[currentMode].normalStrength),
        // @ts-ignore
        specularIntensity: sliderStates[currentMode].specularAmount
    });
    fabricMaterial.onBeforeCompile = (shader) => shaderOverride(shader, fabricMaterial);

    // Non-Fabric Material (Always show raw bake)
    const neutralMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: bakedExtraMaps[currentAngle]
    });

    function loadModel(filename: string) {
        if (loadingOverlay) loadingOverlay.classList.add('visible');
        if (currentModelScene) {
            scene.remove(currentModelScene);
        }
        if (shadowCasterScene) {
            scene.remove(shadowCasterScene);
            shadowCasterScene = null;
        }

        const isObj = filename.endsWith('.obj');

        if (isObj) {
            objLoader.load(`/assets/configurator/models/${filename}`, (obj) => {
                currentModelScene = obj;
                
                // Find meshes and apply materials based on name
                const meshes: THREE.Mesh[] = [];
                currentModelScene.traverse((child: any) => {
                    if (child.isMesh) meshes.push(child);
                });

                meshes.forEach((mesh) => {
                    if (mesh.geometry.attributes.uv) {
                        mesh.geometry.setAttribute('uv2', mesh.geometry.attributes.uv);
                    }

                    const meshName = mesh.name.toLowerCase();
                    // Fallback to first mesh if names are empty
                    const isFabric = meshName.includes('fabric') || (meshName === '' && meshes.indexOf(mesh) === 0);
                    
                    if (isFabric) {
                        mesh.material = fabricMaterial;
                        fabricMaterial.needsUpdate = true;
                    } else {
                        mesh.material = neutralMaterial;
                        neutralMaterial.needsUpdate = true;
                    }
                });
                currentYOffset = -0.35; // Match .glb files
                currentModelScene.position.y = currentYOffset;
                
                applyAngle(currentAngle);
                scene.add(currentModelScene);
                if (loadingOverlay) loadingOverlay.classList.remove('visible');
            }, undefined, (err) => {
                console.error(err);
                if (loadingOverlay) loadingOverlay.classList.remove('visible');
            });

        } else {
            gltfLoader.load(`/assets/configurator/models/${filename}`, (gltf) => {
                currentModelScene = gltf.scene;
                
                // Adjust materials and shadows
                currentModelScene.traverse((child: any) => {
                    if (child.isMesh) {
                        child.castShadow = false; // Shadow is handled by duplicate
                        child.receiveShadow = true;
                        
                        const mesh = child as THREE.Mesh;
                        
                        if (Array.isArray(mesh.material)) {
                            mesh.material = mesh.material.map(mat => {
                                const matName = mat.name.toLowerCase();
                                const isFabric = matName.includes('fabric') || matName.includes('seat');
                                return isFabric ? fabricMaterial : neutralMaterial;
                            });
                        } else {
                            const matName = mesh.material && (mesh.material as THREE.Material).name ? (mesh.material as THREE.Material).name.toLowerCase() : '';
                            const meshName = mesh.name.toLowerCase();

                            const isFabric = matName.includes('fabric') || matName.includes('seat') || meshName.includes('seat');
                            
                            if (isFabric) {
                                mesh.material = fabricMaterial;
                            } else {
                                mesh.material = neutralMaterial;
                            }
                        }

                        // Ensure uvs are present for AO
                        if (mesh.geometry.attributes.uv) {
                            mesh.geometry.setAttribute('uv2', mesh.geometry.attributes.uv);
                        }
                    }
                });

                if (filename.includes('chair')) {
                    currentModelScene.scale.setScalar(1.0);
                    currentYOffset = modelOffsets[filename] || -0.70;
                    
                    currentModelScene.position.y = currentYOffset;
                    if (bakedFloorScene) bakedFloorScene.position.y = currentYOffset;
                    if (shadowCasterScene) shadowCasterScene.position.y = currentYOffset;
                } else {
                    // Center X and Z
                    const box = new THREE.Box3().setFromObject(currentModelScene);
                    const center = box.getCenter(new THREE.Vector3());
                    currentModelScene.position.x += (currentModelScene.position.x - center.x);
                    currentModelScene.position.z += (currentModelScene.position.z - center.z);
                    
                    // Normalize scale to fit nicely
                    const maxDim = Math.max(box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z);
                    const targetSize = 1.5;
                    currentModelScene.scale.setScalar(targetSize / maxDim);

                    // Re-calculate box after scale and align bottom to floor
                    currentYOffset = modelOffsets[filename] || -0.70;
                    
                    // Move floors to match the model's new offset
                    if (bakedFloorScene) bakedFloorScene.position.y = currentYOffset + 0.35;
                    if (shadowCasterScene) shadowCasterScene.position.y = currentYOffset + 0.35;
                    
                    const newBox = new THREE.Box3().setFromObject(currentModelScene);
                    currentModelScene.position.y -= newBox.min.y; // Zero out Y
                    currentModelScene.position.y += currentYOffset; // Shift down by offset
                }

                // Create invisible shadow caster on layer 1
                shadowCasterScene = currentModelScene.clone();
                shadowCasterScene.traverse((child: any) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = false;
                        child.layers.set(1);
                        child.material = new THREE.MeshBasicMaterial();
                    }
                });
                scene.add(shadowCasterScene);

                // Apply the current rotation angle since the model just loaded
                applyAngle(currentAngle);

                scene.add(currentModelScene);
                if (loadingOverlay) loadingOverlay.classList.remove('visible');
            }, undefined, (error) => {
                console.error('Error loading model:', error);
                if (loadingOverlay) loadingOverlay.classList.remove('visible');
            });
        }
    }

    // Default position
    applyAngle(currentAngle);

    // Load initial model
    loadModel(currentModel);


    function updateFabricMaterial(textureId: string) {
        if (!textureId) return;
        
        const basePath = `/assets/configurator/textures/${textureId}_2k/`;
        
        textureLoader.load(`${basePath}color.webp`, (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(currentRepeat, currentRepeat);
            fabricMaterial.map = tex;
            fabricMaterial.needsUpdate = true;
        });

        textureLoader.load(`${basePath}roughness.webp`, (tex) => {
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(currentRepeat, currentRepeat);
            fabricMaterial.roughnessMap = tex;
            fabricMaterial.needsUpdate = true;
        });

        textureLoader.load(`${basePath}normal.webp`, (tex) => {
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(currentRepeat, currentRepeat);
            fabricMaterial.normalMap = tex;
            fabricMaterial.needsUpdate = true;
        });

        textureLoader.load(`${basePath}ao.webp`, (tex) => {
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(currentRepeat, currentRepeat);
            fabricMaterial.aoMap = tex;
            fabricMaterial.needsUpdate = true;
        });
    }

    function updateRenderPreview() {
        if (!currentTextureId || activeRenders.length === 0) {
            renderImage.style.display = 'none';
            if (renderEmpty) renderEmpty.style.display = 'block';
            return;
        }

        // Try to find the exact angle render, or fallback to the first available
        const targetRender = `${currentTextureId}_angle${currentAngle + 1}.jpeg`;
        const renderToLoad = activeRenders.includes(targetRender) ? targetRender : activeRenders[0];

        if (renderToLoad) {
            renderImage.src = `/assets/configurator/renders/${renderToLoad}`;
            renderImage.style.display = 'block';
            if (renderEmpty) renderEmpty.style.display = 'none';
        } else {
            renderImage.style.display = 'none';
            if (renderEmpty) renderEmpty.style.display = 'block';
        }
    }

    // UI Listeners

    // Mode Toggles
    function updateModeState() {
        const controlsGroups = document.querySelectorAll('.control-group');
        controlsGroups.forEach(group => {
            const mode = (group as HTMLElement).dataset.mode;
            if (mode) {
                (group as HTMLElement).style.display = mode === currentMode ? 'flex' : 'none';
            }
        });

        updateSliderDisplays();

        if (currentMode === 'normal') {
            scene.environment = pmremEnvMap;
            normalDirLight.intensity = globalLightIntensity;
            
            fabricMaterial.lightMap = null;
            fabricMaterial.envMapIntensity = 1.0;
            if (neutralMaterial.map) {
                neutralMaterial.map = null; // Maybe keep the color but remove bake map
            }
            if (bakedFloorScene) bakedFloorScene.visible = false;
            
            // Recompile without lightmap
            fabricMaterial.needsUpdate = true;
            neutralMaterial.needsUpdate = true;
        } else {
            scene.environment = null;
            normalDirLight.intensity = 0;
            
            fabricMaterial.lightMap = bakedFabricMaps[currentAngle];
            fabricMaterial.envMapIntensity = 0.0;
            neutralMaterial.map = bakedExtraMaps[currentAngle];
            if (bakedFloorScene) bakedFloorScene.visible = true;
            
            // Recompile with lightmap
            fabricMaterial.needsUpdate = true;
            neutralMaterial.needsUpdate = true;
        }
    }

    modeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            modeBtns.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget as HTMLButtonElement;
            target.classList.add('active');
            
            currentMode = target.dataset.mode as 'baked' | 'normal';
            updateModeState();
        });
    });

    if (resetCameraBtn) {
        resetCameraBtn.addEventListener('click', () => {
            camera.position.copy(defaultCamera.pos);
            controls.target.copy(defaultCamera.target);
            controls.update();
        });
    }

    // Angle Selection
    angleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            angleBtns.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget as HTMLButtonElement;
            target.classList.add('active');
            currentAngle = parseInt(target.dataset.angle || '0', 10);
            applyAngle(currentAngle);
            updateRenderPreview();
        });
    });

    // Texture scale and visibility listeners removed for phase 1 debugging

    // Texture Selection
    textureBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            textureBtns.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget as HTMLButtonElement;
            target.classList.add('active');
            
            const texCodeSpan = target.querySelector('.tex-code');
            if (texCodeSpan) {
                currentTextureId = texCodeSpan.textContent || '';
            }
            activeRenders = target.dataset.renders ? target.dataset.renders.split(',') : [];
            
            // Preload the renders for this texture in the background
            activeRenders.forEach(renderPath => {
                if (!preloadedImages.has(renderPath)) {
                    const img = new Image();
                    img.src = `/assets/configurator/renders/${renderPath}`;
                    preloadedImages.set(renderPath, img);
                }
            });

            updateFabricMaterial(currentTextureId); 
            updateRenderPreview();
        });
    });

    // Collection Filter
    function selectCollection(collectionId: string, autoClickFirst: boolean = true) {
        currentCollection = collectionId;
        collectionBtns.forEach(btn => {
            if ((btn as HTMLButtonElement).dataset.collection === collectionId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        let firstVisibleTextureBtn: HTMLButtonElement | null = null;

        textureBtns.forEach(btn => {
            const b = btn as HTMLButtonElement;
            if (b.dataset.collection === collectionId) {
                b.classList.add('visible');
                if (!firstVisibleTextureBtn) {
                    firstVisibleTextureBtn = b;
                }
            } else {
                b.classList.remove('visible');
            }
        });

        // Automatically select the first texture in the new collection
        if (autoClickFirst && firstVisibleTextureBtn) {
            (firstVisibleTextureBtn as HTMLButtonElement).click();
        }
    }

    collectionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget as HTMLButtonElement;
            const colId = target.dataset.collection;
            if (colId && colId !== currentCollection) {
                selectCollection(colId);
            }
        });
    });

    // Initialize default texture
    let defaultBtn = Array.from(textureBtns).find(btn => {
        const codeSpan = btn.querySelector('.tex-code');
        return codeSpan && codeSpan.textContent === currentTextureId;
    }) as HTMLButtonElement;

    if (defaultBtn) {
        const colId = defaultBtn.dataset.collection;
        if (colId) selectCollection(colId, false);
        defaultBtn.click();
    } else if (collectionBtns.length > 0) {
        const firstColId = (collectionBtns[0] as HTMLButtonElement).dataset.collection;
        if (firstColId) selectCollection(firstColId);
    } else if (textureBtns.length > 0) {
        // Fallback if no collections found
        (textureBtns[0] as HTMLButtonElement).click();
    }

    // Return cleanup function to prevent memory leaks on page transitions
    return () => {
        resizeObserver.disconnect();
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
        pmremGenerator.dispose();
        scene.clear();
    };
}
