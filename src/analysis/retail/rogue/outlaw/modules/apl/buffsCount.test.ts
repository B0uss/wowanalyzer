import { describe, expect, it } from 'vitest';
import { EventType } from 'parser/core/Events';
import { buffsCount } from './buffsCount';

const BUFFS = [
  { id: 1, name: 'One', icon: 'one' },
  { id: 2, name: 'Two', icon: 'two' },
];

const event = (type: EventType, spellId: number, timestamp: number) =>
  ({ type, ability: { guid: spellId }, timestamp }) as never;

describe('buffsCount', () => {
  it('tracks applied and removed buffs', () => {
    const condition = buffsCount(BUFFS, 1, 'atLeast');
    let state = condition.init();

    state = condition.update(state, event(EventType.ApplyBuff, 1, 1000));
    expect(condition.validate(state, event(EventType.Cast, 99, 1300))).toBe(true);

    state = condition.update(state, event(EventType.RemoveBuff, 1, 1400));
    expect(condition.validate(state, event(EventType.Cast, 99, 1700))).toBe(false);
  });

  it('ignores buffs applied by the current cast window', () => {
    const condition = buffsCount(BUFFS, 1, 'atLeast');
    const state = condition.update(condition.init(), event(EventType.ApplyBuff, 1, 1000));

    expect(condition.validate(state, event(EventType.Cast, 99, 1100))).toBe(false);
    expect(condition.validate(state, event(EventType.Cast, 99, 1300))).toBe(true);
  });

  it('supports less-than comparisons', () => {
    const condition = buffsCount(BUFFS, 1, 'lessThan');
    const state = condition.init();

    expect(condition.validate(state, event(EventType.Cast, 99, 1000))).toBe(true);
  });
});
