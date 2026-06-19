import { describe, expect, it } from 'vitest';
import { calculateBladeFlurryUptime } from './BladeFlurryUptime';

describe('Blade Flurry uptime', () => {
  it('calculates the fight uptime ratio', () => {
    expect(calculateBladeFlurryUptime(71020, 100000)).toBeCloseTo(0.7102);
  });

  it('handles a zero-length fight', () => {
    expect(calculateBladeFlurryUptime(1000, 0)).toBe(0);
  });
});
