import { describe, expect, it } from 'vitest';
import SPELLS from 'common/SPELLS';
import TALENTS from 'common/TALENTS/rogue';
import { RESTLESS_BLADES_AFFECTED_ABILITIES } from './RestlessBlades';

describe('Restless Blades affected abilities', () => {
  it('matches the Midnight cooldown list', () => {
    expect(RESTLESS_BLADES_AFFECTED_ABILITIES).toEqual([
      SPELLS.SPRINT.id,
      SPELLS.BLADE_FLURRY.id,
      SPELLS.ROLL_THE_BONES.id,
      SPELLS.GRAPPLING_HOOK.id,
      SPELLS.BETWEEN_THE_EYES.id,
      TALENTS.BLADE_RUSH_TALENT.id,
      TALENTS.KILLING_SPREE_TALENT.id,
      TALENTS.KEEP_IT_ROLLING_TALENT.id,
      TALENTS.ADRENALINE_RUSH_TALENT.id,
    ]);
  });

  it('does not reduce Vanish', () => {
    expect(RESTLESS_BLADES_AFFECTED_ABILITIES).not.toContain(SPELLS.VANISH.id);
  });
});
