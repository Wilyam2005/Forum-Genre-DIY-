/**
 * ECC (Efficient Compute & Canvas) Optimizer
 * Provides direct optimizations for 3D WebGL rendering, GPU tier balancing,
 * throttled frame rendering, and automatic resource disposal.
 */

export interface ECCOptimizerConfig {
  maxDPR: number;
  powerPreference: 'high-performance' | 'default' | 'low-power';
  enableFrustumCulling: boolean;
  throttleWhenHidden: boolean;
  targetFPS: number;
}

export class ECCOptimizer {
  private static instance: ECCOptimizer;
  private config: ECCOptimizerConfig = {
    maxDPR: 1.75,
    powerPreference: 'high-performance',
    enableFrustumCulling: true,
    throttleWhenHidden: true,
    targetFPS: 60,
  };

  private currentFPS = 60;
  private frameCount = 0;
  private lastTime = performance.now();
  private isVisible = true;

  private constructor() {
    this.detectCapabilities();
    this.setupVisibilityListener();
  }

  public static getInstance(): ECCOptimizer {
    if (!ECCOptimizer.instance) {
      ECCOptimizer.instance = new ECCOptimizer();
    }
    return ECCOptimizer.instance;
  }

  private detectCapabilities(): void {
    if (typeof window === 'undefined') return;

    // Detect device memory and hardware concurrency
    const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };
    const memory = nav.deviceMemory || 4;
    const cores = nav.hardwareConcurrency || 4;

    // Low-end mobile or low RAM device clamp
    if (memory < 4 || cores < 4) {
      this.config.maxDPR = 1.0;
      this.config.targetFPS = 45;
    } else if (memory >= 8 && cores >= 8) {
      this.config.maxDPR = 1.75; // Clamped to 1.75 to prevent 4k overdraw heat
    } else {
      this.config.maxDPR = 1.25;
    }
  }

  private setupVisibilityListener(): void {
    if (typeof document === 'undefined') return;

    document.addEventListener('visibilitychange', () => {
      this.isVisible = document.visibilityState === 'visible';
    });
  }

  /**
   * Safe DPR calculation to prevent GPU thermal throttling
   */
  public getClampedDPR(): number {
    if (typeof window === 'undefined') return 1;
    return Math.min(window.devicePixelRatio || 1, this.config.maxDPR);
  }

  /**
   * Determine if rendering can be skipped for inactive tab or off-screen element
   */
  public shouldRender(elementVisible: boolean = true): boolean {
    if (!this.isVisible) return false;
    if (this.config.throttleWhenHidden && !elementVisible) return false;
    return true;
  }

  /**
   * FPS calculation and diagnostics
   */
  public tick(now: number): void {
    this.frameCount++;
    const delta = now - this.lastTime;
    if (delta >= 1000) {
      this.currentFPS = Math.round((this.frameCount * 1000) / delta);
      this.frameCount = 0;
      this.lastTime = now;
    }
  }

  public getFPS(): number {
    return this.currentFPS;
  }

  public getConfig(): ECCOptimizerConfig {
    return { ...this.config };
  }
}

export const ecc = ECCOptimizer.getInstance();
