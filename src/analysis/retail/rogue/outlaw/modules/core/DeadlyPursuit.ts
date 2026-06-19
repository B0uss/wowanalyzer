import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { ApplyBuffEvent, RefreshBuffEvent, RemoveBuffEvent } from 'parser/core/Events';

import RestlessBlades from './RestlessBlades';

export const DEADLY_PURSUIT = {
  id: 1259614,
  name: 'Deadly Pursuit',
  icon: 'ability_rogue_murderspree',
};

export const DEADLY_PURSUIT_COOLDOWN_RATE_MULTIPLIER = 3;

export const calculateDeadlyPursuitCooldownReduction = (durationMs: number) =>
  Math.max(0, durationMs) * DEADLY_PURSUIT_COOLDOWN_RATE_MULTIPLIER;

class DeadlyPursuit extends Analyzer {
  static dependencies = { restlessBlades: RestlessBlades };
  protected restlessBlades!: RestlessBlades;
  private appliedAt: number | null = null;

  constructor(options: Options) {
    super(options);
    this.addEventListener(Events.applybuff.by(SELECTED_PLAYER).spell(DEADLY_PURSUIT), this.onApply);
    this.addEventListener(
      Events.refreshbuff.by(SELECTED_PLAYER).spell(DEADLY_PURSUIT),
      this.onRefresh,
    );
    this.addEventListener(Events.removebuff.by(SELECTED_PLAYER).spell(DEADLY_PURSUIT), this.onRemove);
  }

  private onApply(event: ApplyBuffEvent) {
    this.appliedAt = event.timestamp;
  }

  private onRefresh(event: RefreshBuffEvent) {
    if (this.appliedAt === null) {
      this.appliedAt = event.timestamp;
    }
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
