export const units = {
  METER: "м.",
  SQUARE_METER: "кв. м.",
  PIECE: "шт.",
  KILOGRAM: "кг.",
} as const;

export type Units = keyof typeof units;
export const unitValues = Object.keys(units) as Array<Units>;
