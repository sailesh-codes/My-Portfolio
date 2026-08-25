/**
 * Procedural Particle & Atmospheric Systems for Kage
 * Night rain, drifting amber maple leaves, floating embers, and rolling mountain fog.
 */

export interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
  color: [number, number, number];
  rot: number;
  vRot: number;
}

export class AtmosphereSystem {
  public rainParticles: Particle[] = [];
  public leafParticles: Particle[] = [];
  public emberParticles: Particle[] = [];
  
  private countRain = 600;
  private countLeaves = 150;
  private countEmbers = 120;

  constructor() {
    this.initRain();
    this.initLeaves();
    this.initEmbers();
  }

  private initRain() {
    this.rainParticles = [];
    for (let i = 0; i < this.countRain; i++) {
      this.rainParticles.push({
        x: (Math.random() - 0.5) * 40,
        y: Math.random() * 30 + 2,
        z: (Math.random() - 0.5) * 60 - 20,
        vx: -0.05 - Math.random() * 0.05,
        vy: -0.35 - Math.random() * 0.25,
        vz: -0.02,
        size: Math.random() * 0.8 + 0.4,
        alpha: Math.random() * 0.4 + 0.2,
        color: [0.7, 0.8, 0.95],
        rot: 0,
        vRot: 0
      });
    }
  }

  private initLeaves() {
    this.leafParticles = [];
    for (let i = 0; i < this.countLeaves; i++) {
      this.leafParticles.push({
        x: (Math.random() - 0.5) * 35,
        y: Math.random() * 25 + 1,
        z: (Math.random() - 0.5) * 55 - 15,
        vx: 0.02 + Math.random() * 0.04,
        vy: -0.04 - Math.random() * 0.03,
        vz: (Math.random() - 0.5) * 0.02,
        size: Math.random() * 0.35 + 0.15,
        alpha: Math.random() * 0.7 + 0.3,
        color: Math.random() > 0.4 ? [0.9, 0.4, 0.2] : [0.8, 0.65, 0.25], // Vermilion / Amber
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.05
      });
    }
  }

  private initEmbers() {
    this.emberParticles = [];
    for (let i = 0; i < this.countEmbers; i++) {
      this.emberParticles.push({
        x: (Math.random() - 0.5) * 20,
        y: Math.random() * 15,
        z: (Math.random() - 0.5) * 40 - 10,
        vx: (Math.random() - 0.5) * 0.015,
        vy: 0.03 + Math.random() * 0.03,
        vz: (Math.random() - 0.5) * 0.015,
        size: Math.random() * 0.2 + 0.1,
        alpha: Math.random() * 0.8 + 0.2,
        color: [0.95, 0.65, 0.25], // Warm glowing amber flame
        rot: 0,
        vRot: 0
      });
    }
  }

  public update(dt: number) {
    // Update Rain
    for (const p of this.rainParticles) {
      p.x += p.vx * dt * 60;
      p.y += p.vy * dt * 60;
      p.z += p.vz * dt * 60;

      if (p.y < 0) {
        p.y = 32;
        p.x = (Math.random() - 0.5) * 40;
        p.z = (Math.random() - 0.5) * 60 - 20;
      }
    }

    // Update Drifting Leaves
    for (const p of this.leafParticles) {
      p.x += (p.vx + Math.sin(p.y * 0.5) * 0.02) * dt * 60;
      p.y += p.vy * dt * 60;
      p.z += p.vz * dt * 60;
      p.rot += p.vRot * dt * 60;

      if (p.y < 0) {
        p.y = 28;
        p.x = (Math.random() - 0.5) * 35;
        p.z = (Math.random() - 0.5) * 55 - 15;
      }
    }

    // Update Embers
    for (const p of this.emberParticles) {
      p.x += (p.vx + Math.cos(p.y * 0.8) * 0.01) * dt * 60;
      p.y += p.vy * dt * 60;
      p.z += p.vz * dt * 60;

      if (p.y > 20) {
        p.y = 0.5;
        p.x = (Math.random() - 0.5) * 20;
        p.z = (Math.random() - 0.5) * 40 - 10;
      }
    }
  }
}
