import Analyzer, { Options } from 'parser/core/Analyzer';
import Events from 'parser/core/Events';
import SpellUsable from 'parser/shared/modules/SpellUsable';
import TALENTS from 'common/TALENTS/rogue';
import SPELLS from 'common/SPELLS';

export const PREPARATION_COOLDOWN_SPELLS = [
  SPELLS.BLADE_FLURRY.id,
  SPELLS.BETWEEN_THE_EYES.id,
  TALENTS.BLADE_RUSH_TALENT.id,
  TALENTS.KILLING_SPREE_TALENT.id,
  TALENTS.ADRENALINE_RUSH_TALENT.id,
] as const;

class Preparation extends Analyzer {
  static dependencies = {
    spellUsable: SpellUsable,
  };

  protected spellUsable!: SpellUsable;

  constructor(options: Options) {
    super(options);

    this.active = this.selectedCombatant.hasTalent(TALENTS.PREPARATION_TALENT);

    this.addEventListener(Events.cast.spell(SPELLS.PREPARATION), (event) => {
      PREPARATION_COOLDOWN_SPELLS.forEach((spellId) => {
        this.spellUsable.endCooldown(spellId, event.timestamp);
      });
    });
  }
}

export default Preparation;
