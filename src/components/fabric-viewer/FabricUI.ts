import * as THREE from 'three';
import type { FabricState } from './FabricState';
import type { FabricScene } from './FabricScene';
import type { FabricMaterials } from './FabricMaterials';
import type { FabricLoader } from './FabricLoader';

export class FabricUI {
    state: FabricState;
    sceneManager: FabricScene;
    materialManager: FabricMaterials;
    loader: FabricLoader;

    preloadedImages = new Map<string, HTMLImageElement>();

    constructor(state: FabricState, sceneManager: FabricScene, materialManager: FabricMaterials, loader: FabricLoader) {
        this.state = state;
        this.sceneManager = sceneManager;
        this.materialManager = materialManager;
        this.loader = loader;

        this.init();
    }

    init() {
        const loadingOverlay = document.getElementById('loading-overlay');
        const textureBtns = document.querySelectorAll('.texture-btn');
        const batchBtns = document.querySelectorAll('.batch-btn');
        const colBtns = document.querySelectorAll('.col-btn');
        const collectionsGroup = document.getElementById('collections-group');
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
        const hdriIntensitySlider = document.getElementById('hdri-intensity-slider') as HTMLInputElement;
        const hdriIntensityValue = document.getElementById('hdri-intensity-value');
        const lightIntensitySlider = document.getElementById('light-intensity-slider') as HTMLInputElement;
        const lightIntensityValue = document.getElementById('light-intensity-value');
        const lightRotationSlider = document.getElementById('light-rotation-slider') as HTMLInputElement;
        const lightRotationValue = document.getElementById('light-rotation-value');
        const fillIntensitySlider = document.getElementById('fill-intensity-slider') as HTMLInputElement;
        const fillIntensityValue = document.getElementById('fill-intensity-value');
        
        const materialBtns = document.querySelectorAll('.material-btn');
        const sheenIntensitySlider = document.getElementById('sheen-intensity-slider') as HTMLInputElement;
        const sheenIntensityValue = document.getElementById('sheen-intensity-value');
        const sheenRoughnessSlider = document.getElementById('sheen-roughness-slider') as HTMLInputElement;
        const sheenRoughnessValue = document.getElementById('sheen-roughness-value');
        const sheenNormalStrengthSlider = document.getElementById('sheen-normal-strength-slider') as HTMLInputElement;
        const sheenNormalStrengthValue = document.getElementById('sheen-normal-strength-value');
        const sheenNormalRepeatSlider = document.getElementById('sheen-normal-repeat-slider') as HTMLInputElement;
        const sheenNormalRepeatValue = document.getElementById('sheen-normal-repeat-value');

        this.loader.onLoadingChange = (isLoading) => {
            if (loadingOverlay) {
                if (isLoading) loadingOverlay.classList.add('visible');
                else loadingOverlay.classList.remove('visible');
            }
        };

        const updateRenderPreview = () => {
            if (!this.state.currentTextureId || this.state.activeRenders.length === 0) {
                if (renderImage) renderImage.style.display = 'none';
                if (renderEmpty) renderEmpty.style.display = 'block';
                return;
            }

            const targetRender = `${this.state.currentTextureId}_angle${this.state.currentAngle + 1}.jpeg`;
            const renderToLoad = this.state.activeRenders.includes(targetRender) ? targetRender : this.state.activeRenders[0];

            if (renderToLoad && renderImage) {
                renderImage.src = `/assets/configurator/renders/${renderToLoad}?v=1.1`;
                renderImage.style.display = 'block';
                if (renderEmpty) renderEmpty.style.display = 'none';
            } else {
                if (renderImage) renderImage.style.display = 'none';
                if (renderEmpty) renderEmpty.style.display = 'block';
            }
        };

        this.loader.onRenderPreviewNeeded = updateRenderPreview;

        const updateCCPreview = () => {
            const ccContainer = document.getElementById('cc-preview-container');
            const ccImage = document.getElementById('cc-preview-image') as HTMLImageElement;
            const ccEmpty = document.getElementById('cc-preview-empty');
            
            if (!ccContainer || !ccImage || !ccEmpty || !this.state.currentTextureId) return;

            const activeBtn = document.querySelector(`.texture-btn[data-id="${this.state.currentTextureId}"]`);
            const batchId = activeBtn?.getAttribute('data-batch') || '';
            const hasCCPreview = batchId.toLowerCase().includes('04') || batchId.toLowerCase().includes('05');
            
            if (!hasCCPreview) {
                ccContainer.style.display = 'none';
                return;
            }

            ccContainer.style.display = 'flex';
            
            const imgUrl = `/assets/configurator/cc_previews/${this.state.currentTextureId}_CC_preview.jpg`;
            
            const tempImg = new Image();
            tempImg.onload = () => {
                ccImage.src = imgUrl;
                ccImage.style.display = 'block';
                ccEmpty.style.display = 'none';
            };
            tempImg.onerror = () => {
                ccImage.style.display = 'none';
                ccEmpty.style.display = 'block';
            };
            tempImg.src = imgUrl;
        };

        const updateSliderDisplays = () => {
            const m = this.materialManager;
            const state = this.state.sliderStates[this.state.currentMode];
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
            
            if (lightIntensitySlider && lightIntensityValue) {
                lightIntensitySlider.value = state.lightInt.toString();
                lightIntensityValue.textContent = state.lightInt.toFixed(2);
                this.state.globalLightIntensity = state.lightInt;
            }

            if (fillIntensitySlider && fillIntensityValue) {
                fillIntensitySlider.value = state.fillInt.toString();
                fillIntensityValue.textContent = state.fillInt.toFixed(2);
                this.state.globalFillIntensity = state.fillInt;
            }

            if (hdriIntensitySlider && hdriIntensityValue) {
                hdriIntensitySlider.value = state.hdriInt.toString();
                hdriIntensityValue.textContent = state.hdriInt.toFixed(2);
                this.state.globalHdriIntensity = state.hdriInt;
            }

            if (document.getElementById('sheen-intensity-slider')) {
                const s = document.getElementById('sheen-intensity-slider') as HTMLInputElement;
                const v = document.getElementById('sheen-intensity-value');
                s.value = this.state.globalSheenIntensity.toString();
                if (v) v.textContent = this.state.globalSheenIntensity.toFixed(2);
            }
            if (document.getElementById('sheen-roughness-slider')) {
                const s = document.getElementById('sheen-roughness-slider') as HTMLInputElement;
                const v = document.getElementById('sheen-roughness-value');
                s.value = this.state.globalSheenRoughness.toString();
                if (v) v.textContent = this.state.globalSheenRoughness.toFixed(2);
            }
            // if (document.getElementById('sheen-normal-strength-slider')) {
            //     const s = document.getElementById('sheen-normal-strength-slider') as HTMLInputElement;
            //     const v = document.getElementById('sheen-normal-strength-value');
            //     s.value = this.state.globalSheenNormalStrength.toString();
            //     if (v) v.textContent = this.state.globalSheenNormalStrength.toFixed(2);
            // }
            
            if (m.fabricMaterial.userData.shader) {
                m.fabricMaterial.userData.shader.uniforms.uPbrGain.value = state.pbrGain;
                m.fabricMaterial.userData.shader.uniforms.uPbrGamma.value = state.pbrGamma;
            }
            if (m.velvetMaterial.userData.shader) {
                m.velvetMaterial.userData.shader.uniforms.uPbrGain.value = state.pbrGain;
                m.velvetMaterial.userData.shader.uniforms.uPbrGamma.value = state.pbrGamma;
            }
            m.fabricMaterial.normalScale.set(state.normalStrength, state.normalStrength);
            m.velvetMaterial.normalScale.set(state.normalStrength, state.normalStrength);
            // @ts-ignore
            m.fabricMaterial.specularIntensity = state.specularAmount;
            // @ts-ignore
            m.velvetMaterial.specularIntensity = state.specularAmount;
            
            m.fabricMaterial.needsUpdate = true;
            m.velvetMaterial.needsUpdate = true;
        };

        const updateModeState = () => {
            updateSliderDisplays();

            const s = this.sceneManager;
            const m = this.materialManager;

            s.scene.environment = s.pmremEnvMap;
            s.scene.environmentIntensity = this.state.globalHdriIntensity;
            s.scene.environmentRotation.y = THREE.MathUtils.degToRad(this.state.globalHdriRotation);
            s.normalDirLight.intensity = this.state.globalLightIntensity;
            s.fillLight.intensity = this.state.globalFillIntensity;

            if (this.state.currentMode === 'normal') {
                m.fabricMaterial.lightMap = null;
                m.fabricMaterial.envMapIntensity = 1.0;
                m.velvetMaterial.lightMap = null;
                m.velvetMaterial.envMapIntensity = 1.0;
            } else {
                m.fabricMaterial.lightMap = this.loader.bakedFabricMaps[this.state.currentAngle];
                m.fabricMaterial.envMapIntensity = 1.0;
                m.velvetMaterial.lightMap = this.loader.bakedFabricMaps[this.state.currentAngle];
                m.velvetMaterial.envMapIntensity = 1.0;
            }
            
            // Sync debug UI sliders to the active material's sheen values
            const targetMat = this.state.currentMaterialType === 'velvet' ? m.velvetMaterial : m.fabricMaterial;
            const sheenIntensitySlider = document.getElementById('sheen-intensity-slider') as HTMLInputElement;
            const sheenIntensityValue = document.getElementById('sheen-intensity-value');
            if (sheenIntensitySlider && sheenIntensityValue) {
                sheenIntensitySlider.value = targetMat.sheen.toString();
                sheenIntensityValue.textContent = targetMat.sheen.toFixed(2);
            }
            const sheenRoughnessSlider = document.getElementById('sheen-roughness-slider') as HTMLInputElement;
            const sheenRoughnessValue = document.getElementById('sheen-roughness-value');
            if (sheenRoughnessSlider && sheenRoughnessValue) {
                sheenRoughnessSlider.value = targetMat.sheenRoughness.toString();
                sheenRoughnessValue.textContent = targetMat.sheenRoughness.toFixed(2);
            }

            m.fabricMaterial.needsUpdate = true;
            m.velvetMaterial.needsUpdate = true;
        };
        
        // Expose state change callback
        this.state.onStateChange = updateModeState;

        if (textureScaleSlider && textureScaleValue) {
            textureScaleSlider.addEventListener('input', (e) => {
                this.state.currentRepeat = parseFloat((e.target as HTMLInputElement).value);
                textureScaleValue.textContent = this.state.currentRepeat.toFixed(1);
                const m = this.materialManager;
                this.loader.updateTextureRepeats();
                // if (m.velvetMaterial.userData.shader) {
                //     m.velvetMaterial.userData.shader.uniforms.uSheenNormalRepeat.value = this.state.globalSheenNormalRepeat / this.state.currentRepeat;
                // }
            });
        }

        if (textureBlendSlider && textureBlendValue) {
            textureBlendSlider.addEventListener('input', (e) => {
                this.state.globalTextureBlend = parseFloat((e.target as HTMLInputElement).value);
                textureBlendValue.textContent = this.state.globalTextureBlend.toFixed(2);
                if (this.materialManager.fabricMaterial.userData.shader) {
                    this.materialManager.fabricMaterial.userData.shader.uniforms.uTextureBlend.value = this.state.globalTextureBlend;
                }
            });
        }

        if (lmGainSlider && lmGainValue) {
            lmGainSlider.addEventListener('input', (e) => {
                this.state.globalLmGain = parseFloat((e.target as HTMLInputElement).value);
                lmGainValue.textContent = this.state.globalLmGain.toFixed(2);
                if (this.materialManager.fabricMaterial.userData.shader) {
                    this.materialManager.fabricMaterial.userData.shader.uniforms.uLmGain.value = this.state.globalLmGain;
                }
            });
        }

        if (lmGammaSlider && lmGammaValue) {
            lmGammaSlider.addEventListener('input', (e) => {
                this.state.globalLmGamma = parseFloat((e.target as HTMLInputElement).value);
                lmGammaValue.textContent = this.state.globalLmGamma.toFixed(2);
                if (this.materialManager.fabricMaterial.userData.shader) {
                    this.materialManager.fabricMaterial.userData.shader.uniforms.uLmGamma.value = this.state.globalLmGamma;
                }
            });
        }

        if (pbrGainSlider && pbrGainValue) {
            pbrGainSlider.addEventListener('input', (e) => {
                const val = parseFloat((e.target as HTMLInputElement).value);
                this.state.sliderStates[this.state.currentMode].pbrGain = val;
                pbrGainValue.textContent = val.toFixed(2);
                const m = this.materialManager;
                if (m.fabricMaterial.userData.shader) m.fabricMaterial.userData.shader.uniforms.uPbrGain.value = val;
                if (m.velvetMaterial.userData.shader) m.velvetMaterial.userData.shader.uniforms.uPbrGain.value = val;
            });
        }

        if (pbrGammaSlider && pbrGammaValue) {
            pbrGammaSlider.addEventListener('input', (e) => {
                const val = parseFloat((e.target as HTMLInputElement).value);
                this.state.sliderStates[this.state.currentMode].pbrGamma = val;
                pbrGammaValue.textContent = val.toFixed(2);
                const m = this.materialManager;
                if (m.fabricMaterial.userData.shader) m.fabricMaterial.userData.shader.uniforms.uPbrGamma.value = val;
                if (m.velvetMaterial.userData.shader) m.velvetMaterial.userData.shader.uniforms.uPbrGamma.value = val;
            });
        }

        if (normalStrengthSlider && normalStrengthValue) {
            normalStrengthSlider.addEventListener('input', (e) => {
                const val = parseFloat((e.target as HTMLInputElement).value);
                this.state.sliderStates[this.state.currentMode].normalStrength = val;
                normalStrengthValue.textContent = val.toFixed(2);
                const m = this.materialManager;
                m.fabricMaterial.normalScale.set(val, val);
                m.velvetMaterial.normalScale.set(val, val);
            });
        }

        if (specularAmountSlider && specularAmountValue) {
            specularAmountSlider.addEventListener('input', (e) => {
                const val = parseFloat((e.target as HTMLInputElement).value);
                this.state.sliderStates[this.state.currentMode].specularAmount = val;
                specularAmountValue.textContent = val.toFixed(2);
                const m = this.materialManager;
                // @ts-ignore
                m.fabricMaterial.specularIntensity = val;
                // @ts-ignore
                m.velvetMaterial.specularIntensity = val;
                m.fabricMaterial.needsUpdate = true;
                m.velvetMaterial.needsUpdate = true;
            });
        }

        if (hdriRotationSlider && hdriRotationValue) {
            hdriRotationSlider.addEventListener('input', (e) => {
                this.state.globalHdriRotation = parseFloat((e.target as HTMLInputElement).value);
                hdriRotationValue.textContent = this.state.globalHdriRotation.toString();
                this.sceneManager.scene.environmentRotation.y = THREE.MathUtils.degToRad(this.state.globalHdriRotation);
            });
        }

        if (hdriIntensitySlider && hdriIntensityValue) {
            hdriIntensitySlider.addEventListener('input', (e) => {
                this.state.globalHdriIntensity = parseFloat((e.target as HTMLInputElement).value);
                this.state.sliderStates[this.state.currentMode].hdriInt = this.state.globalHdriIntensity;
                hdriIntensityValue.textContent = this.state.globalHdriIntensity.toFixed(2);
                this.sceneManager.scene.environmentIntensity = this.state.globalHdriIntensity;
            });
        }

        if (lightIntensitySlider && lightIntensityValue) {
            lightIntensitySlider.addEventListener('input', (e) => {
                this.state.globalLightIntensity = parseFloat((e.target as HTMLInputElement).value);
                this.state.sliderStates[this.state.currentMode].lightInt = this.state.globalLightIntensity;
                lightIntensityValue.textContent = this.state.globalLightIntensity.toFixed(2);
                if (this.sceneManager.normalDirLight) this.sceneManager.normalDirLight.intensity = this.state.globalLightIntensity;
            });
        }

        if (lightRotationSlider && lightRotationValue) {
            lightRotationSlider.addEventListener('input', (e) => {
                this.state.globalLightRotation = parseFloat((e.target as HTMLInputElement).value);
                lightRotationValue.textContent = this.state.globalLightRotation.toString();
                this.sceneManager.updateLightRotation();
            });
        }

        if (fillIntensitySlider && fillIntensityValue) {
            fillIntensitySlider.addEventListener('input', (e) => {
                this.state.globalFillIntensity = parseFloat((e.target as HTMLInputElement).value);
                this.state.sliderStates[this.state.currentMode].fillInt = this.state.globalFillIntensity;
                fillIntensityValue.textContent = this.state.globalFillIntensity.toFixed(2);
                if (this.sceneManager.fillLight) this.sceneManager.fillLight.intensity = this.state.globalFillIntensity;
            });
        }

        modeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                modeBtns.forEach(b => b.classList.remove('active'));
                const target = e.currentTarget as HTMLButtonElement;
                target.classList.add('active');
                
                this.state.currentMode = target.dataset.mode as 'baked' | 'normal';
                updateModeState();
            });
        });

        if (resetCameraBtn) {
            resetCameraBtn.addEventListener('click', () => {
                this.sceneManager.resetCamera();
            });
        }

        angleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                angleBtns.forEach(b => b.classList.remove('active'));
                const target = e.currentTarget as HTMLButtonElement;
                target.classList.add('active');
                this.state.currentAngle = parseInt(target.dataset.angle || '0', 10);
                this.loader.applyAngle(this.state.currentAngle);
                updateRenderPreview();
            });
        });

        textureBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                textureBtns.forEach(b => b.classList.remove('active'));
                const target = e.currentTarget as HTMLButtonElement;
                target.classList.add('active');
                
                const texCodeSpan = target.querySelector('.tex-code');
                if (texCodeSpan) {
                    this.state.currentTextureId = texCodeSpan.textContent || '';
                }
                this.state.activeRenders = target.dataset.renders ? target.dataset.renders.split(',') : [];
                
                this.state.activeRenders.forEach(renderPath => {
                    if (!this.preloadedImages.has(renderPath)) {
                        const img = new Image();
                        img.src = `/assets/configurator/renders/${renderPath}`;
                        this.preloadedImages.set(renderPath, img);
                    }
                });

                const batchId = target.dataset.batch || '';
                this.loader.updateFabricMaterial(this.state.currentTextureId, batchId); 
                updateRenderPreview();
                updateCCPreview();

                // Auto-select material based on texture prefix
                const texPrefix = this.state.currentTextureId.split('-')[0];
                if (["ADO", "BOS", "DAR"].includes(texPrefix)) {
                    const velvetBtn = document.querySelector('.material-btn[data-material="velvet"]') as HTMLButtonElement;
                    if (velvetBtn && !velvetBtn.classList.contains('active')) velvetBtn.click();
                } else {
                    const fabricBtn = document.querySelector('.material-btn[data-material="default"]') as HTMLButtonElement;
                    if (fabricBtn && !fabricBtn.classList.contains('active')) fabricBtn.click();
                }
            });
        });

        const selectBatch = (batchId: string, autoClickFirst: boolean = true) => {
            batchBtns.forEach(btn => {
                if ((btn as HTMLButtonElement).dataset.batch === batchId) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            if (collectionsGroup) collectionsGroup.style.display = 'block';

            let firstVisibleColBtn: HTMLButtonElement | null = null;
            const validCollectionsForBatch = new Set<string>();

            textureBtns.forEach(btn => {
                const b = btn as HTMLButtonElement;
                if (b.dataset.batch === batchId) {
                    const col = b.dataset.collection;
                    if (col) validCollectionsForBatch.add(col);
                }
            });

            colBtns.forEach(btn => {
                const b = btn as HTMLButtonElement;
                const colId = b.dataset.collection;
                if (colId && validCollectionsForBatch.has(colId)) {
                    b.style.display = 'block';
                    if (!firstVisibleColBtn) firstVisibleColBtn = b;
                } else {
                    b.style.display = 'none';
                }
            });

            if (autoClickFirst && firstVisibleColBtn) {
                (firstVisibleColBtn as HTMLButtonElement).click();
            }
        };

        const selectCollection = (collectionId: string, autoClickFirst: boolean = true) => {
            this.state.currentCollection = collectionId;
            colBtns.forEach(btn => {
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

            if (autoClickFirst && firstVisibleTextureBtn) {
                (firstVisibleTextureBtn as HTMLButtonElement).click();
            }
        };

        batchBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLButtonElement;
                const batchId = target.dataset.batch;
                if (batchId) {
                    selectBatch(batchId);
                }
            });
        });

        colBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLButtonElement;
                const colId = target.dataset.collection;
                if (colId && colId !== this.state.currentCollection) {
                    selectCollection(colId);
                }
            });
        });

        materialBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                materialBtns.forEach(b => b.classList.remove('active'));
                const target = e.currentTarget as HTMLButtonElement;
                target.classList.add('active');
                this.state.currentMaterialType = target.dataset.material as 'default' | 'velvet';

                this.loader.updateActiveMaterial();
                updateModeState();
                this.loader.updateTextureRepeats();
            });
        });

        const normalMapToggles = document.getElementById('normal-map-toggles');
        if (normalMapToggles) {
            normalMapToggles.addEventListener('click', (e) => {
                const btn = (e.target as HTMLElement).closest('.mode-btn');
                if (!btn) return;
                
                normalMapToggles.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.state.velvetNormalMode = btn.getAttribute('data-normal') as 'combined' | 'raw';
                this.loader.applyVelvetNormalMode();
            });
        }
        
        if (sheenIntensitySlider && sheenIntensityValue) {
            sheenIntensitySlider.addEventListener('input', (e) => {
                const val = parseFloat((e.target as HTMLInputElement).value);
                sheenIntensityValue.textContent = val.toFixed(2);
                const targetMat = this.state.currentMaterialType === 'velvet' ? this.materialManager.velvetMaterial : this.materialManager.fabricMaterial;
                targetMat.sheen = val;
                targetMat.needsUpdate = true;
            });
        }

        if (sheenRoughnessSlider && sheenRoughnessValue) {
            sheenRoughnessSlider.addEventListener('input', (e) => {
                const val = parseFloat((e.target as HTMLInputElement).value);
                sheenRoughnessValue.textContent = val.toFixed(2);
                const targetMat = this.state.currentMaterialType === 'velvet' ? this.materialManager.velvetMaterial : this.materialManager.fabricMaterial;
                targetMat.sheenRoughness = val;
                targetMat.needsUpdate = true;
            });
        }

        // if (sheenNormalStrengthSlider && sheenNormalStrengthValue) {
        //     sheenNormalStrengthSlider.addEventListener('input', (e) => {
        //         this.state.globalSheenNormalStrength = parseFloat((e.target as HTMLInputElement).value);
        //         sheenNormalStrengthValue.textContent = this.state.globalSheenNormalStrength.toFixed(2);
        //         if (this.materialManager.velvetMaterial.userData.shader) {
        //             this.materialManager.velvetMaterial.userData.shader.uniforms.uSheenNormalStrength.value = this.state.globalSheenNormalStrength;
        //         }
        //     });
        // }

        // if (sheenNormalRepeatSlider && sheenNormalRepeatValue) {
        //     sheenNormalRepeatSlider.addEventListener('input', (e) => {
        //         this.state.globalSheenNormalRepeat = parseFloat((e.target as HTMLInputElement).value);
        //         sheenNormalRepeatValue.textContent = this.state.globalSheenNormalRepeat.toFixed(2);
        //         if (this.materialManager.velvetMaterial.userData.shader) {
        //             this.materialManager.velvetMaterial.userData.shader.uniforms.uSheenNormalRepeat.value = this.state.globalSheenNormalRepeat / this.state.currentRepeat;
        //         }
        //     });
        // }

        const debugModeSelect = document.getElementById('debug-mode-select') as HTMLSelectElement;
        if (debugModeSelect) {
            debugModeSelect.addEventListener('change', (e) => {
                this.state.globalDebugMode = parseInt((e.target as HTMLSelectElement).value);
                if (this.materialManager.velvetMaterial.userData.shader) {
                    this.materialManager.velvetMaterial.userData.shader.uniforms.uDebugMode.value = this.state.globalDebugMode;
                }
                if (this.materialManager.fabricMaterial.userData.shader) {
                    this.materialManager.fabricMaterial.userData.shader.uniforms.uDebugMode.value = this.state.globalDebugMode;
                }
            });
        }

        const sheenColorGammaSlider = document.getElementById('sheen-color-gamma-slider') as HTMLInputElement;
        const sheenColorGammaValue = document.getElementById('sheen-color-gamma-value');
        if (sheenColorGammaSlider && sheenColorGammaValue) {
            sheenColorGammaSlider.addEventListener('input', (e) => {
                this.state.globalSheenColorGamma = parseFloat((e.target as HTMLInputElement).value);
                sheenColorGammaValue.textContent = this.state.globalSheenColorGamma.toFixed(2);
                if (this.materialManager.velvetMaterial.userData.shader) {
                    this.materialManager.velvetMaterial.userData.shader.uniforms.uSheenColorGamma.value = this.state.globalSheenColorGamma;
                }
            });
        }

        const sheenDesaturationSlider = document.getElementById('sheen-desaturation-slider') as HTMLInputElement;
        const sheenDesaturationValue = document.getElementById('sheen-desaturation-value');
        if (sheenDesaturationSlider && sheenDesaturationValue) {
            sheenDesaturationSlider.addEventListener('input', (e) => {
                this.state.globalSheenDesaturation = parseFloat((e.target as HTMLInputElement).value);
                sheenDesaturationValue.textContent = this.state.globalSheenDesaturation.toFixed(2);
                if (this.materialManager.velvetMaterial.userData.shader) {
                    this.materialManager.velvetMaterial.userData.shader.uniforms.uSheenDesaturation.value = this.state.globalSheenDesaturation;
                }
            });
        }

        const sheenDirLightSlider = document.getElementById('sheen-dir-light-slider') as HTMLInputElement;
        const sheenDirLightValue = document.getElementById('sheen-dir-light-value');
        if (sheenDirLightSlider && sheenDirLightValue) {
            sheenDirLightSlider.addEventListener('input', (e) => {
                this.state.globalSheenDirLight = parseFloat((e.target as HTMLInputElement).value);
                sheenDirLightValue.textContent = this.state.globalSheenDirLight.toFixed(2);
                if (this.materialManager.velvetMaterial.userData.shader) {
                    this.materialManager.velvetMaterial.userData.shader.uniforms.uSheenDirLight.value = this.state.globalSheenDirLight;
                }
            });
        }

        const sheenFillLightSlider = document.getElementById('sheen-fill-light-slider') as HTMLInputElement;
        const sheenFillLightValue = document.getElementById('sheen-fill-light-value');
        if (sheenFillLightSlider && sheenFillLightValue) {
            sheenFillLightSlider.addEventListener('input', (e) => {
                this.state.globalSheenFillLight = parseFloat((e.target as HTMLInputElement).value);
                sheenFillLightValue.textContent = this.state.globalSheenFillLight.toFixed(2);
                if (this.materialManager.velvetMaterial.userData.shader) {
                    this.materialManager.velvetMaterial.userData.shader.uniforms.uSheenFillLight.value = this.state.globalSheenFillLight;
                }
            });
        }

        const sheenHdriSlider = document.getElementById('sheen-hdri-slider') as HTMLInputElement;
        const sheenHdriValue = document.getElementById('sheen-hdri-value');
        if (sheenHdriSlider && sheenHdriValue) {
            sheenHdriSlider.addEventListener('input', (e) => {
                this.state.globalSheenHdri = parseFloat((e.target as HTMLInputElement).value);
                sheenHdriValue.textContent = this.state.globalSheenHdri.toFixed(2);
                if (this.materialManager.velvetMaterial.userData.shader) {
                    this.materialManager.velvetMaterial.userData.shader.uniforms.uSheenHdri.value = this.state.globalSheenHdri;
                }
            });
        }

        // Initialize default texture
        let defaultBtn = Array.from(textureBtns).find(btn => {
            const codeSpan = btn.querySelector('.tex-code');
            return codeSpan && codeSpan.textContent === this.state.currentTextureId;
        }) as HTMLButtonElement;

        if (defaultBtn) {
            const batchId = defaultBtn.dataset.batch;
            const colId = defaultBtn.dataset.collection;
            if (batchId) selectBatch(batchId, false);
            if (colId) selectCollection(colId, false);
            defaultBtn.click();
        } else if (batchBtns.length > 0) {
            const firstBatchId = (batchBtns[0] as HTMLButtonElement).dataset.batch;
            if (firstBatchId) selectBatch(firstBatchId);
        } else if (textureBtns.length > 0) {
            (textureBtns[0] as HTMLButtonElement).click();
        }

        // Apply initial state
        updateModeState();
    }
}
