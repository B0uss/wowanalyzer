import { formatPercentage } from 'common/format';
import SPELLS from 'common/SPELLS';
import { SpellLink } from 'interface';
import Analyzer from 'parser/core/Analyzer';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';

class BladeFlurryUptime extends Analyzer {
  get percentUptime(): number {
    return this.selectedCombatant.getBuffUptime(SPELLS.BLADE_FLURRY.id) / this.owner.fightDuration;
  }

  statistic() {
    return (
      <Statistic position={STATISTIC_ORDER.CORE(101)} size="flexible">
        <div className="pad">
          <label>
            <SpellLink spell={SPELLS.BLADE_FLURRY} /> Uptime
          </label>
          <div className="value">{formatPercentage(this.percentUptime)}%</div>
        </div>
      </Statistic>
    );
  }
}

export default BladeFlurryUptime;
