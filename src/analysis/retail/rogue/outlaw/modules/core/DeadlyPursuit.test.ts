import { describe, expect, it } from 'vitest';

const calculateCooldownReduction = (durationMs: number) => Math.max(0, durationMs) * 3;

describe('Deadly Pursuit cooldown recovery', () => {
  it('converts active duration into cooldown reduction', () => {
    expect(calculateCooldownReduction(5000)).toBe(15000);
  });

  it('never returns a negative reduction', () => {
    expect(calculateCooldownReduction(-1000)).toBe(0);
  });
});
