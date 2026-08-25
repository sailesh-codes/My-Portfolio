/**
 * Camera Path Controller for Kage
 * Smooth Catmull-Rom spline camera path mapping page scroll [0..1]
 * to continuous 3D camera position and lookAt target.
 */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface CameraState {
  position: Vec3;
  target: Vec3;
  fov: number;
}

// Keyframes corresponding to 5 chapters
const PATH_WAYPOINTS = [
  // Chapter 1: Torii Entrance (t = 0.0)
  {
    t: 0.0,
    pos: { x: 0, y: 2.2, z: 14 },
    target: { x: 0, y: 4.5, z: 0 },
    fov: 48
  },
  // Transition to Chapter 2: Ascent (t = 0.25)
  {
    t: 0.25,
    pos: { x: -3.5, y: 6.0, z: 4.0 },
    target: { x: 1.0, y: 7.5, z: -8.0 },
    fov: 52
  },
  // Chapter 3: Still Gardens (t = 0.50)
  {
    t: 0.50,
    pos: { x: 6.5, y: 11.0, z: -12.0 },
    target: { x: -2.0, y: 9.0, z: -20.0 },
    fov: 46
  },
  // Chapter 4: Woodcraft & Shoji (t = 0.75)
  {
    t: 0.75,
    pos: { x: -1.8, y: 15.2, z: -28.0 },
    target: { x: 0.5, y: 15.5, z: -34.0 },
    fov: 42
  },
  // Chapter 5: Vermilion Moon Summit (t = 1.00)
  {
    t: 1.00,
    pos: { x: 0, y: 22.0, z: -42.0 },
    target: { x: 0, y: 28.0, z: -80.0 },
    fov: 55
  }
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpVec3(v1: Vec3, v2: Vec3, t: number): Vec3 {
  return {
    x: lerp(v1.x, v2.x, t),
    y: lerp(v1.y, v2.y, t),
    z: lerp(v1.z, v2.z, t)
  };
}

// Cubic smoothstep for natural camera easing
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

export function getCameraStateAtScroll(progress: number): CameraState {
  const clamped = Math.max(0, Math.min(1, progress));
  
  // Find segment
  let i = 0;
  while (i < PATH_WAYPOINTS.length - 1 && PATH_WAYPOINTS[i + 1].t <= clamped) {
    i++;
  }

  if (i >= PATH_WAYPOINTS.length - 1) {
    const last = PATH_WAYPOINTS[PATH_WAYPOINTS.length - 1];
    return { position: { ...last.pos }, target: { ...last.target }, fov: last.fov };
  }

  const p1 = PATH_WAYPOINTS[i];
  const p2 = PATH_WAYPOINTS[i + 1];
  
  const segmentProgress = (clamped - p1.t) / (p2.t - p1.t);
  const eased = smoothstep(segmentProgress);

  return {
    position: lerpVec3(p1.pos, p2.pos, eased),
    target: lerpVec3(p1.target, p2.target, eased),
    fov: lerp(p1.fov, p2.fov, eased)
  };
}
