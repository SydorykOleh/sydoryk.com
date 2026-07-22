import * as THREE from 'three';

// 1. Initialize the Physical Material with Sheen enabled
const velvetMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 1.0,
    sheen: 1.0, // Base sheen intensity
    sheenRoughness: 0.55,
    sheenColor: new THREE.Color(0xffffff)
});

// 2. Inject custom shader logic
velvetMaterial.onBeforeCompile = (shader) => {
    // Inject our custom parameters
    shader.uniforms.uSheenNormalMap = { value: customSheenNormalTexture };
    shader.uniforms.uSheenNormalStrength = { value: 1.0 };
    shader.uniforms.uSheenNormalRepeat = { value: 1.5 };
    shader.uniforms.uSheenColorGamma = { value: 2.5 };
    shader.uniforms.uSheenDesaturation = { value: 0.5 };

    shader.fragmentShader = `
        uniform sampler2D uSheenNormalMap;
        uniform float uSheenNormalStrength;
        uniform float uSheenNormalRepeat;
        uniform float uSheenColorGamma;
        uniform float uSheenDesaturation;
        vec3 customSheenNormal;
        ${shader.fragmentShader}
    `;

    // A. Procedural Sheen Color (Based on underlying diffuse)
    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <lights_physical_fragment>',
        `
        #include <lights_physical_fragment>
        #ifdef USE_SHEEN
            #ifdef USE_MAP
                // Extract procedural sheen color and allow desaturation
                vec3 sheenProcedural = clamp(pow(sampledDiffuseColor.rgb, vec3(1.0 / uSheenColorGamma)), 0.0, 1.0);
                float sheenLuma = dot(sheenProcedural, vec3(0.299, 0.587, 0.114));
                material.sheenColor = mix(sheenProcedural, vec3(sheenLuma), uSheenDesaturation) * sheenColor;
            #endif
        #endif
        `
    );

    // B. Calculate Custom Sheen Normal (RNM Blend)
    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <normal_fragment_maps>',
        `
        #include <normal_fragment_maps>
        customSheenNormal = normal; // Fallback
        #ifdef USE_NORMALMAP_TANGENTSPACE
            vec3 mapN_base = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
            mapN_base.xy *= normalScale;
            
            vec3 mapN_sheen = texture2D( uSheenNormalMap, vNormalMapUv * uSheenNormalRepeat ).xyz * 2.0 - 1.0;
            mapN_sheen.xy *= uSheenNormalStrength;
            
            vec3 t_rnm = mapN_base + vec3( 0.0, 0.0, 1.0 );
            vec3 u_rnm = mapN_sheen * vec3( -1.0, -1.0, 1.0 );
            vec3 rnm = t_rnm * dot( t_rnm, u_rnm ) / t_rnm.z - u_rnm;
            
            customSheenNormal = normalize( tbn * rnm );
        #endif
        `
    );

    // C. Inject custom normal into Sheen BRDF functions
    const parsChunk = THREE.ShaderChunk.lights_physical_pars_fragment;
    const modifiedParsChunk = parsChunk.replace(
        /BRDF_Sheen\(\s*directLight\.direction,\s*geometryViewDir,\s*geometryNormal/g,
        'BRDF_Sheen( directLight.direction, geometryViewDir, customSheenNormal'
    ).replace(
        /IBLSheenBRDF\(\s*geometryNormal/g,
        'IBLSheenBRDF( customSheenNormal'
    );
    
    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <lights_physical_pars_fragment>',
        modifiedParsChunk
    );

    // D. Prevent sheen from overly darkening the base specular reflection
    shader.fragmentShader = shader.fragmentShader.replace(
        'indirectSpecular *= sheenEnergyComp;',
        '// indirectSpecular *= sheenEnergyComp; // Disabled to prevent darkening'
    ).replace(
        'reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );',
        `
        // Prevent direct specular from being overly darkened by sheen energy comp
        reflectedLight.directSpecular += (irradiance / max(sheenEnergyComp, 0.01)) * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
        `
    );
};
