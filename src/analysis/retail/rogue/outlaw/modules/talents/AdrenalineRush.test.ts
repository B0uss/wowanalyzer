import { describe, expect, it } from 'vitest';
import { isAdrenalineRushComboPointUsageGood } from './AdrenalineRush';

describe('Adrenaline Rush combo point usage', () => {
  it('accepts zero through two combo points', () => {
    expect(isAdrenalineRushComboPointUsageGood(0)).toBe(true);
    expect(isAdrenalineRushComboPointUsageGood(1)).toBe(true);
    expect(isAdrenalineRushComboPointUsageGood(2)).toBe(true);
  });

  it('rejects casts above two combo points', () => {
    expect(isAdrenalineRushComboPointUsageGood(3)).toBe(false);
    expect(isAdrenalineRushComboPointUsageGood(7)).toBe(false);
  });
});
