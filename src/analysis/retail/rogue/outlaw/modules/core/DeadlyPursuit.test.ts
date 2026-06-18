import { describe, expect, it } from 'vitest';
import { calculateDeadlyPursuitCooldownReduction } from './DeadlyPursuit';

describe('Deadly Pursuit cooldown recovery', () => {
  it('converts duration', () => {
    expect(calculateDeadlyPursuitCooldownReduction(5000)).toBe(15000);
  });

  it('clamps negative durations', () => {
    expect(calculateDeadlyPursuitCooldownReduction(-1000)).toBe(0);
  });
});
