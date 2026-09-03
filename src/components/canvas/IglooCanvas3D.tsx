import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Mesh, Sphere, Program, Geometry, OGLRenderingContext } from 'ogl';
import { gsap, ScrollTrigger } from '../../lib/gsap';

// Helper to generate an Icosahedron geometry for OGL
function createIcosahedronGeometry(gl: OGLRenderingContext, radius = 2.2) {
  const t = (1.0 + Math.sqrt(5.0)) / 2.0;

  const vertices = [
    -1, t, 0,  1, t, 0, -1, -t, 0,  1, -t, 0,
     0, -1, t,  0, 1, t,  0, -1, -t,  0, 1, -t,
     t, 0, -1,  t, 0, 1, -t, 0, -1, -t, 0, 1,
  ];

  const indices = [
    0, 11, 5,  0, 5, 1,   0, 1, 7,   0, 7, 10,  0, 10, 11,
    1, 5, 9,   5, 11, 4,  11, 10, 2, 10, 7, 6,   7, 1, 8,
    3, 9, 4,   3, 4, 2,   3, 2, 6,   3, 6, 8,   3, 8, 9,
    4, 9, 5,   2, 4, 11,  6, 2, 10,  8, 6, 7,   9, 8, 1,
  ];

  // Scale by radius and normalize
  const posArray: number[] = [];
  const normArray: number[] = [];

  for (let i = 0; i < indices.length; i += 3) {
    const i1 = indices[i] * 3;
    const i2 = indices[i + 1] * 3;
    const i3 = indices[i + 2] * 3;

    const v1 = [vertices[i1], vertices[i1 + 1], vertices[i1 + 2]];
    const v2 = [vertices[i2], vertices[i2 + 1], vertices[i2 + 2]];
    const v3 = [vertices[i3], vertices[i3 + 1], vertices[i3 + 2]];

    // Face normal for faceted Igloo Inc look
    const ax = v2[0] - v1[0], ay = v2[1] - v1[1], az = v2[2] - v1[2];
    const bx = v3[0] - v1[0], by = v3[1] - v1[1], bz = v3[2] - v1[2];

    let nx = ay * bz - az * by;
    let ny = az * bx - ax * bz;
    let nz = ax * by - ay * bx;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len; ny /= len; nz /= len;

    // Push flat faceted triangle vertices
    for (const v of [v1, v2, v3]) {
      const vLen = Math.hypot(v[0], v[1], v[2]) || 1;
      posArray.push((v[0] / vLen) * radius, (v[1] / vLen) * radius, (v[2] / vLen) * radius);
      normArray.push(nx, ny, nz);
    }
  }

  return new Geometry(gl, {
    position: { size: 3, data: new Float32Array(posArray) },
    normal: { size: 3, data: new Float32Array(normArray) },
  });
}

export const IglooCanvas3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── 1. OGL WebGL Renderer & Camera ──
    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 2),
      powerPreference: 'high-performance',
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 45, aspect: window.innerWidth / window.innerHeight, near: 0.1, far: 100 });
    camera.position.set(0, 0, 8);

    const scene = new Transform();
    const crystalGroup = new Transform();
    crystalGroup.setParent(scene);

    // ── 2. Faceted Crystal Shader Program (Igloo Inc dark glass) ──
    const crystalGeo = createIcosahedronGeometry(gl, 2.2);

    const crystalProgram = new Program(gl, {
      vertex: /* glsl */ `
        attribute vec3 position;
        attribute vec3 normal;

        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform mat3 normalMatrix;

        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 vertPos = modelViewMatrix * vec4(position, 1.0);
          vPosition = vertPos.xyz;
          gl_Position = projectionMatrix * vertPos;
        }
      `,
      fragment: /* glsl */ `
        precision highp float;

        varying vec3 vNormal;
        varying vec3 vPosition;

        uniform vec3 uMouseLight;

        void main() {
          vec3 viewDir = normalize(-vPosition);
          vec3 normal = normalize(vNormal);

          // Ambient & Directional Lights
          vec3 lightDir1 = normalize(vec3(1.0, 1.5, 2.0));
          vec3 lightDir2 = normalize(vec3(-1.5, -1.0, 1.0));

          float diff1 = max(dot(normal, lightDir1), 0.0);
          float diff2 = max(dot(normal, lightDir2), 0.0);

          // Mouse Light
          vec3 mouseDir = normalize(uMouseLight - vPosition);
          float mouseDiff = max(dot(normal, mouseDir), 0.0);

          // Fresnel Rim Light (Cyan/Purple Igloo Inc Glow)
          float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);

          vec3 baseColor = vec3(0.04, 0.02, 0.12);
          vec3 purpleGlow = vec3(0.66, 0.33, 0.97) * (diff1 * 0.8 + fresnel * 1.5);
          vec3 cyanGlow = vec3(0.02, 0.71, 0.83) * (diff2 * 0.6 + fresnel * 0.8);
          vec3 mouseHighlight = vec3(0.91, 0.47, 0.97) * pow(mouseDiff, 4.0) * 2.0;

          vec3 finalColor = baseColor + purpleGlow + cyanGlow + mouseHighlight;
          float alpha = 0.85 + fresnel * 0.15;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      uniforms: {
        uMouseLight: { value: [0, 0, 5] },
      },
      transparent: true,
      cullFace: false,
    });

    const crystalMesh = new Mesh(gl, { geometry: crystalGeo, program: crystalProgram });
    crystalMesh.setParent(crystalGroup);

    // Inner Glowing Core Sphere
    const coreGeo = new Sphere(gl, { radius: 0.9, widthSegments: 16, heightSegments: 16 });
    const coreProgram = new Program(gl, {
      vertex: /* glsl */ `
        attribute vec3 position;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: /* glsl */ `
        precision highp float;
        void main() {
          gl_FragColor = vec4(0.23, 0.51, 0.96, 0.45);
        }
      `,
      transparent: true,
    });
    const coreMesh = new Mesh(gl, { geometry: coreGeo, program: coreProgram });
    coreMesh.setParent(crystalGroup);

    // ── 3. Ambient Floating Particles ──
    const particleCount = 300;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 22;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }

    const particleGeo = new Geometry(gl, {
      position: { size: 3, data: pPositions },
    });

    const particleProgram = new Program(gl, {
      vertex: /* glsl */ `
        attribute vec3 position;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 3.5;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragment: /* glsl */ `
        precision highp float;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          gl_FragColor = vec4(0.75, 0.52, 0.98, 0.6 * (1.0 - dist * 2.0));
        }
      `,
      transparent: true,
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry: particleGeo, program: particleProgram });
    particles.setParent(scene);

    // ── 4. Mouse Move Listener ──
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotationRef.current.x = y * 0.4;
      targetRotationRef.current.y = x * 0.4;

      crystalProgram.uniforms.uMouseLight.value = [x * 4, -y * 4, 5];
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── 5. GSAP ScrollTrigger Integration ──
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    scrollTimeline.to(crystalGroup.position, { x: 2.2, y: -0.4, z: -1, duration: 1, ease: 'power2.inOut' }, 0);
    scrollTimeline.to(crystalGroup.rotation, { x: Math.PI * 0.5, y: Math.PI * 0.8, duration: 1, ease: 'power2.inOut' }, 0);

    scrollTimeline.to(crystalGroup.position, { x: 0, y: 0.2, z: 1, duration: 1, ease: 'power2.inOut' }, 1);
    scrollTimeline.to(crystalGroup.scale, { x: 0.75, y: 0.75, z: 0.75, duration: 1, ease: 'power2.inOut' }, 1);

    scrollTimeline.to(crystalGroup.position, { x: -2.4, y: -0.6, z: -0.5, duration: 1, ease: 'power2.inOut' }, 2);
    scrollTimeline.to(crystalGroup.rotation, { x: Math.PI * 1.2, y: Math.PI * 1.5, duration: 1, ease: 'power2.inOut' }, 2);
    scrollTimeline.to(crystalGroup.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 1, ease: 'power2.inOut' }, 2);

    // ── 6. Resize Listener & RAF Loop ──
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.perspective({ aspect: window.innerWidth / window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      crystalGroup.rotation.y += 0.003;
      crystalGroup.rotation.x += 0.001;

      crystalGroup.rotation.x += (targetRotationRef.current.x - crystalGroup.rotation.x) * 0.05;
      crystalGroup.rotation.y += (targetRotationRef.current.y - crystalGroup.rotation.y) * 0.05;

      particles.rotation.y += 0.0005;

      renderer.render({ scene, camera });
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      scrollTimeline.kill();
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ background: '#030306' }}
    />
  );
};

export default IglooCanvas3D;
