// SYSTEM NOTE: See `docs/fabric-viewer-workflow.md` for architecture, workflows, and rules regarding the fabric configurator.
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
            lightMap: null, // Initialized dynamically
            lightMapIntensity: 0.0,
            normalScale: new THREE.Vector2(state.sliderStates[state.currentMode].normalStrength, -state.sliderStates[state.currentMode].normalStrength),
            // @ts-ignore
            specularIntensity: state.sliderStates[state.currentMode].specularAmount,
            sheen: 0.4,
            sheenRoughness: 0.5,
            sheenColor: new THREE.Color(0xffffff)
        });
        this.fabricMaterial.onBeforeCompile = (shader: any) => this.shaderOverride(shader, this.fabricMaterial);

        this.velvetMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 1.0,
            metalness: 0.0,
            lightMap: null,
            lightMapIntensity: 0.0,
            normalScale: new THREE.Vector2(state.sliderStates[state.currentMode].normalStrength, -state.sliderStates[state.currentMode].normalStrength),
            // @ts-ignore
            specularIntensity: state.sliderStates[state.currentMode].specularAmount,
            sheen: 0.7,
            sheenRoughness: 0.7,
            sheenColor: new THREE.Color(0xffffff)
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
        
        shader.uniforms.uSheenColorGamma = { value: this.state.globalSheenColorGamma };
        shader.uniforms.uSheenDesaturation = { value: this.state.globalSheenDesaturation };
        shader.uniforms.uSheenDirLight = { value: this.state.globalSheenDirLight };
        shader.uniforms.uSheenFillLight = { value: this.state.globalSheenFillLight };
        shader.uniforms.uSheenHdri = { value: this.state.globalSheenHdri };
        shader.uniforms.uDebugMode = { value: this.state.globalDebugMode };
        
        material.userData.shader = shader;
        
        shader.fragmentShader = `
            uniform float uTextureBlend;
            uniform float uLmGain;
            uniform float uLmGamma;
            uniform float uPbrGain;
            uniform float uPbrGamma;
            uniform int uDebugMode;
            uniform float uSheenColorGamma;
            uniform float uSheenDesaturation;
            uniform float uSheenDirLight;
            uniform float uSheenFillLight;
            uniform float uSheenHdri;
            ${shader.fragmentShader}
        `;

        // 1. Procedural Sheen Color
        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <lights_physical_fragment>',
            `
            #include <lights_physical_fragment>
            #ifdef USE_SHEEN
                #ifdef USE_MAP
                    // We use sampledDiffuseColor which is in linear space. 
                    // We apply a custom gamma curve to determine the procedural sheen color.
                    vec3 sheenProcedural = clamp(pow(sampledDiffuseColor.rgb, vec3(1.0 / uSheenColorGamma)), 0.0, 1.0);
                    // Desaturate the procedural sheen based on the slider
                    float sheenLuma = dot(sheenProcedural, vec3(0.299, 0.587, 0.114));
                    material.sheenColor = mix(sheenProcedural, vec3(sheenLuma), uSheenDesaturation) * sheenColor;
                #endif
            #endif
            `
        );

        // 2. Sheen Normal logic - Removed as we now use standard geometryNormal

        // 3. Apply custom sheen intensity multipliers (Direct and Indirect)
        const parsChunk = THREE.ShaderChunk.lights_physical_pars_fragment;
        const modifiedParsChunk = parsChunk.replace(
            'sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );',
            'sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness ) * uSheenDirLight;'
        ).replace(
            'sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;',
            'sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI * uSheenHdri;'
        );
        
        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <lights_physical_pars_fragment>',
            modifiedParsChunk
        );
        
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

            if (uDebugMode == 1) {
                #ifdef USE_SHEEN
                    gl_FragColor = vec4(geometryNormal * 0.5 + 0.5, 1.0);
                #else
                    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
                #endif
            } else if (uDebugMode == 2) {
                #ifdef USE_SHEEN
                    gl_FragColor = vec4(material.sheenColor, 1.0);
                #endif
            } else if (uDebugMode == 3) {
                #ifdef USE_SHEEN
                    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
                #else
                    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
                #endif
            } else if (uDebugMode == 4) {
                #ifdef USE_SHEEN
                    gl_FragColor = vec4(sheenSpecularDirect + sheenSpecularIndirect, 1.0);
                #else
                    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
                #endif
            } else if (uDebugMode == 5) {
                gl_FragColor = vec4(totalSpecular, 1.0);
            }
            `
        );

        // Prevent sheen from darkening the base specular reflection, which causes the fabric to look darker
        shader.fragmentShader = shader.fragmentShader.replace(
            'indirectSpecular *= sheenEnergyComp;',
            '// indirectSpecular *= sheenEnergyComp; // disabled to prevent darkening'
        ).replace(
            'reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );',
            `
            #ifdef USE_SHEEN
                // Prevent direct specular from being overly darkened by sheen energy comp (which was multiplied into irradiance earlier)
                reflectedLight.directSpecular += (irradiance / max(sheenEnergyComp, 0.01)) * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
            #else
                reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
            #endif
            `
        ).replace(
            'reflectedLight.indirectDiffuse += diffuse;',
            `
            reflectedLight.indirectDiffuse += diffuse;
            #ifdef USE_SHEEN
                // Fix: Three.js normally only applies sheen to IBL environment maps.
                // This adds sheen contribution from Ambient Lights (Fill Int) and Lightmaps!
                sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI * uSheenFillLight;
            #endif
            `
        );
    }
}
