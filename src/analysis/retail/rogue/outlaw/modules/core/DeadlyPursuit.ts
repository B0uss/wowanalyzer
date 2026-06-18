import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { ApplyBuffEvent, RemoveBuffEvent } from 'parser/core/Events';

import RestlessBlades from './RestlessBlades';

const SPELL = { id: 1259614, name: 'Deadly Pursuit', icon: 'ability_rogue_murderspree' };
const MULTIPLIER = 3;

class DeadlyPursuit extends Analyzer {
  static dependencies = { restlessBlades: RestlessBlades };
  protected restlessBlades!: RestlessBlades;
  private appliedAt: number | null = null;

  constructor(options: Options) {
    super(options);
    this.addEventListener(Events.applybuff.by(SELECTED_PLAYER).spell(SPELL), this.onApply);
    this.addEventListener(Events.removebuff.by(SELECTED_PLAYER).spell(SPELL), this.onRemove);
  }

  private onApply(event: ApplyBuffEvent) {
    this.appliedAt = event.timestamp;
  }

  private onRemove(event: RemoveBuffEvent) {
    if (this.appliedAt === null) {
      return;
    }
    const durationMs = Math.max(0, event.timestamp - this.appliedAt);
    this.restlessBlades.reduceAffectedCooldowns(durationMs * MULTIPLIER);
    this.appliedAt = null;
  }
}

export default DeadlyPursuit;
