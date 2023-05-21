export const getFullStructureName = (
  modelName: string,
  structureName: string
) => `${modelName}---structure---${structureName}`;

export const parseStructureData = (structureFullName: string) => {
  const [modelName, _, structureName] = structureFullName.split("---");
  return { modelName, structureName };
};
