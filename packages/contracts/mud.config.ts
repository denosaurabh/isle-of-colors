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
    // Building: {
    //   schema: {
    //     x: "int32",
    //     z: "int32",
    //     rotation: "int32",
    //     id: "string",
    //   },
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
