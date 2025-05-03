type DataObject = Record<string, unknown>;

export const convertToStringsRecord = (object: DataObject = {}): Record<string, string> => {
  if (typeof object !== 'object') return {};

  const strParamsObject: Record<string, string> = {};

  for (const key in object) {
    const value = object[key];
    if (value === null || value === undefined) continue;
    strParamsObject[key] = value.toString();
  }

  return strParamsObject;
};
