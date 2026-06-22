import * as THREE from 'three';
import type { FabricState } from './FabricState';

export class FabricMaterials {
    state: FabricState;

    fabricMaterial: THREE.MeshPhysicalMaterial;
    velvetMaterial: THREE.MeshPhysicalMaterial;
    neutralMaterial: THREE.MeshBasicMaterial;

    constructor(state: FabricState) {
        this.state = state;

        this.fabricMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 1.0,
            metalness: 0.0,
            envMapIntensity: 0.0,
            lightMap: null, // Initialized dynamically
            lightMapIntensity: 0.0,
            normalScale: new THREE.Vector2(state.sliderStates[state.currentMode].normalStrength, state.sliderStates[state.currentMode].normalStrength),
            // @ts-ignore
            specularIntensity: state.sliderStates[state.currentMode].specularAmount
        });
        this.fabricMaterial.onBeforeCompile = (shader: any) => this.shaderOverride(shader, this.fabricMaterial);

        this.velvetMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 1.0,
            metalness: 0.0,
            envMapIntensity: 0.0,
            lightMap: null,
            lightMapIntensity: 0.0,
            normalScale: new THREE.Vector2(state.sliderStates[state.currentMode].normalStrength, state.sliderStates[state.currentMode].normalStrength),
            // @ts-ignore
            specularIntensity: state.sliderStates[state.currentMode].specularAmount,
            sheen: state.globalSheenIntensity,
            sheenRoughness: state.globalSheenRoughness,
            sheenColor: state.globalSheenColor
        });
        this.velvetMaterial.onBeforeCompile = (shader: any) => this.shaderOverride(shader, this.velvetMaterial);

        this.neutralMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: null
        });
    }

    shaderOverride(shader: any, material: any) {
        shader.uniforms.uTextureBlend = { value: this.state.globalTextureBlend };
        shader.uniforms.uLmGain = { value: this.state.globalLmGain };
        shader.uniforms.uLmGamma = { value: this.state.globalLmGamma };
        shader.uniforms.uPbrGain = { value: this.state.sliderStates[this.state.currentMode].pbrGain };
        shader.uniforms.uPbrGamma = { value: this.state.sliderStates[this.state.currentMode].pbrGamma };
        
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
            '#include <opaque_fragment>',
            `
            #include <opaque_fragment>
            
            #ifdef USE_LIGHTMAP
                vec4 rawBake = texture2D( lightMap, vLightMapUv );
                // Apply LM Gain and Gamma, then clamp to 1.0
                rawBake.rgb = clamp(pow(rawBake.rgb * uLmGain, vec3(1.0 / uLmGamma)), 0.0, 1.0);
                
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
    }
}
