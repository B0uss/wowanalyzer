import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { ApplyBuffEvent, RemoveBuffEvent } from 'parser/core/Events';

import RestlessBlades from './RestlessBlades';

const SPELL = { id: 1259614, name: 'Deadly Pursuit', icon: 'ability_rogue_murderspree' };
const MULTIPLIER = 3;

export const calculateDeadlyPursuitCooldownReduction = (durationMs: number) =>
  Math.max(0, durationMs) * MULTIPLIER;

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

    const durationMs = event.timestamp - this.appliedAt;
    this.restlessBlades.reduceAffectedCooldowns(
      calculateDeadlyPursuitCooldownReduction(durationMs),
    );
    this.appliedAt = null;
  }
}

export default DeadlyPursuit;
