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
        // owner: "bytes32",
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
