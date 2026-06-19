import { describe, expect, it } from 'vitest';
import SPELLS from 'common/SPELLS';
import TALENTS from 'common/TALENTS/rogue';
import { PREPARATION_COOLDOWN_SPELLS } from './Preparation';

describe('Preparation cooldown spell list', () => {
  it('contains every supported Outlaw cooldown', () => {
    expect(PREPARATION_COOLDOWN_SPELLS).toEqual([
      SPELLS.BLADE_FLURRY.id,
      SPELLS.BETWEEN_THE_EYES.id,
      TALENTS.BLADE_RUSH_TALENT.id,
      TALENTS.KILLING_SPREE_TALENT.id,
      TALENTS.ADRENALINE_RUSH_TALENT.id,
    ]);
  });

  it('does not contain duplicate spell ids', () => {
    expect(new Set(PREPARATION_COOLDOWN_SPELLS).size).toBe(
      PREPARATION_COOLDOWN_SPELLS.length,
    );
  });
});
