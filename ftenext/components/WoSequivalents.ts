const equivalentsObject = {
  'BU': 123,
  'UH': 2312,
  'SY': 321,
  'UB': 201,
  'UI': 300,
  'UF': 345,
  'UP': 560,
  'UN': 540,
  'EA': 450,
  'FI': 456,
  'EC': 309,
  'EE': 230,
  'UY': 320,
  'DW': 230,
  'EI': 360,
  'DY': 450,
  'HQ': 409,
};
const equivalentsArray = Object.entries(equivalentsObject);
export const equivalentsMap: Map<string, number> = new Map(equivalentsArray);

const termEquivalentObject = {
  'longTerm': 1.6,
  'shortTerm': 2.2,
};
const termEquivalentArray = Object.entries(termEquivalentObject);
export const termEquivalentMap: Map<string, number> = new Map(termEquivalentArray);

export function getClassEquivalent(key: string) {
  return equivalentsMap.get(key);
}

export function getTermEquivalent(key: string) {
  return termEquivalentMap.get(key);
}