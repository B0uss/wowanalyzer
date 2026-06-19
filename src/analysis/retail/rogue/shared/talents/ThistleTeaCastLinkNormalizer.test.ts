import { describe, expect, it } from 'vitest';
import SPELLS from 'common/SPELLS/rogue';
import { EventType } from 'parser/core/Events';
import {
  THISTLE_TEA_CAST_BUFFER_MS,
  THISTLE_TEA_EVENT_LINKS,
} from './ThistleTeaCastLinkNormalizer';

describe('Thistle Tea event linking', () => {
  it('links the energy gain to the Thistle Tea cast', () => {
    expect(THISTLE_TEA_EVENT_LINKS).toEqual([
      expect.objectContaining({
        linkingEventId: SPELLS.THISTLE_TEA.id,
        linkingEventType: EventType.ResourceChange,
        referencedEventId: SPELLS.THISTLE_TEA.id,
        referencedEventType: EventType.Cast,
      }),
    ]);
  });

  it('uses a small symmetric cast buffer', () => {
    expect(THISTLE_TEA_CAST_BUFFER_MS).toBe(50);
    expect(THISTLE_TEA_EVENT_LINKS[0].forwardBufferMs).toBe(THISTLE_TEA_CAST_BUFFER_MS);
    expect(THISTLE_TEA_EVENT_LINKS[0].backwardBufferMs).toBe(THISTLE_TEA_CAST_BUFFER_MS);
  });
});
