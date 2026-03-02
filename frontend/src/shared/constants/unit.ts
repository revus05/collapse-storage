export const units = {
  METER: "Метр",
  SQUARE_METER: "Квадратный метр",
  PIECE: "Штука",
  KILOGRAM: "КилограмМ",
} as const;

export type Units = keyof typeof units;
export const unitValues = Object.keys(units) as Array<Units>;
