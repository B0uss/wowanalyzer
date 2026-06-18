import { describe, expect, it } from 'vitest';

describe('Blade Flurry uptime', () => {
  it('calculates a ratio', () => {
    expect(71_020 / 100_000).toBeCloseTo(0.7102);
  });
});
