import { describe, expect, it } from 'vitest';
import {
  DEADLY_PURSUIT,
  DEADLY_PURSUIT_COOLDOWN_RATE_MULTIPLIER,
  calculateDeadlyPursuitCooldownReduction,
} from './DeadlyPursuit';

describe('Deadly Pursuit cooldown recovery', () => {
  it('uses the confirmed spell id', () => {
    expect(DEADLY_PURSUIT.id).toBe(1259614);
  });

  it('uses a total cooldown rate multiplier of three', () => {
    expect(DEADLY_PURSUIT_COOLDOWN_RATE_MULTIPLIER).toBe(3);
  });

  it('converts active duration into cooldown reduction', () => {
    expect(calculateDeadlyPursuitCooldownReduction(5000)).toBe(15000);
  });

  it('returns zero for no active duration', () => {
    expect(calculateDeadlyPursuitCooldownReduction(0)).toBe(0);
  });

  it('preserves millisecond precision', () => {
    expect(calculateDeadlyPursuitCooldownReduction(1250)).toBe(3750);
  });

  it('clamps negative durations', () => {
    expect(calculateDeadlyPursuitCooldownReduction(-1000)).toBe(0);
  });
});
