import * as THREE from 'three';

export interface SliderState {
    pbrGain: number;
    pbrGamma: number;
    normalStrength: number;
    specularAmount: number;
    lightInt: number;
    fillInt: number;
    hdriInt: number;
}

export class FabricState {
    currentModel = 'chair_bake.gltf';
    currentPreset = 'normal';
    currentTextureId = 'SOH-02';
    currentCollection = '';
    currentAngle = 0; // 0, 1, 2
    currentRepeat = 12;
    
    globalTextureBlend = 1.0;
    globalLmGain = 1.0;
    globalLmGamma = 1.3;
    
    currentMode: 'baked' | 'normal' = 'baked';
    
    sliderStates: Record<'baked' | 'normal', SliderState> = {
        baked: { pbrGain: 1.1, pbrGamma: 1.05, normalStrength: 2.0, specularAmount: 1.0, lightInt: 0.9, fillInt: 2.0, hdriInt: 0.4 },
        normal: { pbrGain: 1.0, pbrGamma: 1.0, normalStrength: 1.8, specularAmount: 1.0, lightInt: 1.0, fillInt: 0.5, hdriInt: 0.6 }
    };
    
    globalHdriRotation = 270;
    globalHdriIntensity = 0.8;
    globalLightIntensity = 0.5;
    globalLightRotation = 270;
    globalFillIntensity = 1.0;
    currentYOffset = -0.70;
    
    activeRenders: string[] = [];
    
    currentMaterialType: 'default' | 'velvet' = 'default';
    globalSheenIntensity = 1.0;
    globalSheenRoughness = 0.55;
    // globalSheenNormalStrength = 0.7;
    // globalSheenNormalRepeat = 1.5;
    globalSheenColorGamma = 2.5;
    globalSheenDesaturation = 0.5;
    globalSheenDirLight = 1.0;
    globalSheenFillLight = 1.0;
    globalSheenHdri = 1.0;
    globalDebugMode = 0;
    velvetNormalMode: 'combined' | 'raw' = 'combined';
    
    // Callbacks to trigger UI or Scene updates when state changes via code
    onStateChange: () => void = () => {};
}
