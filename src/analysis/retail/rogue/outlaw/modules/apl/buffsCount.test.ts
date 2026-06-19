import { describe, expect, it } from 'vitest';
import { EventType } from 'parser/core/Events';
import { buffsCount } from './buffsCount';

const BUFFS = [
  { id: 1, name: 'One', icon: 'one' },
  { id: 2, name: 'Two', icon: 'two' },
];

const makeEvent = (type: EventType, spellId: number, timestamp: number) =>
  ({ type, ability: { guid: spellId }, timestamp }) as never;

describe('buffsCount', () => {
  it('tracks applied and removed buffs', () => {
    const condition = buffsCount(BUFFS, 1, 'atLeast');
    let state = condition.init({} as never);

    state = condition.update(state, makeEvent(EventType.ApplyBuff, 1, 1000));
    expect(
      condition.validate(state, makeEvent(EventType.Cast, 99, 1300), BUFFS[0], []),
    ).toBe(true);

    state = condition.update(state, makeEvent(EventType.RemoveBuff, 1, 1400));
    expect(
      condition.validate(state, makeEvent(EventType.Cast, 99, 1700), BUFFS[0], []),
    ).toBe(false);
  });

  it('ignores newly applied buffs for 200ms', () => {
    const condition = buffsCount(BUFFS, 1, 'atLeast');
    const state = condition.update(
      condition.init({} as never),
      makeEvent(EventType.ApplyBuff, 1, 1000),
    );

    expect(
      condition.validate(state, makeEvent(EventType.Cast, 99, 1100), BUFFS[0], []),
    ).toBe(false);
    expect(
      condition.validate(state, makeEvent(EventType.Cast, 99, 1300), BUFFS[0], []),
    ).toBe(true);
  });
});
