import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    Character: {
      schema: {
        x: "int32",
        z: "int32",
        lastOnline: "int32",
      },
    },
    Buildings: {
      schema: {
        x: "int32",
        z: "int32",
        rotation: "int32",
        id: "bytes32",
        url: "string",
        structuresName: "string",
        structuresColor: "string",
      },
    },
    // Array of objects
    // colors : [
    //   {
    // },
  },
  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
      args: [],
    },
  ],
});
