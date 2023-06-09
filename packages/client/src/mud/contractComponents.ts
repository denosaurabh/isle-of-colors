/* Autogenerated file. Do not edit manually. */

import { TableId } from "@latticexyz/utils";
import { defineComponent, Type as RecsType, World } from "@latticexyz/recs";

export function defineContractComponents(world: World) {
  return {
    Counter: (() => {
      const tableId = new TableId("", "Counter");
      return defineComponent(
        world,
        {
          value: RecsType.Number,
        },
        {
          metadata: {
            contractId: tableId.toHexString(),
            tableId: tableId.toString(),
          },
        }
      );
    })(),
    Character: (() => {
      const tableId = new TableId("", "Character");
      return defineComponent(
        world,
        {
          x: RecsType.Number,
          z: RecsType.Number,
          lastOnline: RecsType.Number,
        },
        {
          metadata: {
            contractId: tableId.toHexString(),
            tableId: tableId.toString(),
          },
        }
      );
    })(),
    Buildings: (() => {
      const tableId = new TableId("", "Buildings");
      return defineComponent(
        world,
        {
          x: RecsType.Number,
          z: RecsType.Number,
          rotation: RecsType.Number,
          id: RecsType.String,
          url: RecsType.String,
          structuresName: RecsType.String,
          structuresColor: RecsType.String,
        },
        {
          metadata: {
            contractId: tableId.toHexString(),
            tableId: tableId.toString(),
          },
        }
      );
    })(),
  };
}
