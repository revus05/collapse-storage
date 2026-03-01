export const colors = {
  RED: "Красный",
  GRAPHITE: "Графитовый",
  GREEN: "Зеленый",
  VIOLET: "Фиолетовый",
  ORANGE: "Оранжевый",
  DARK_RED: "Бордовый",
  BLACK: "Черный",
  CYAN: "Бирюзовый",
  PINK: "Розовый",
  WHITE: "Белый",
  LIME: "Лаймовый",
  YELLOW: "Желтый",
} as const;

export type Colors = keyof typeof colors;

export const colorsHex: Record<Colors, string> = {
  RED: "#8B3A3A",
  GRAPHITE: "#3A3A3A",
  GREEN: "#4F6F52",
  VIOLET: "#6B5B7A",
  ORANGE: "#C47A3D",
  DARK_RED: "#5A1F1F",
  BLACK: "#1E1E1E",
  CYAN: "#4F7F7A",
  PINK: "#B07A8C",
  WHITE: "#F2F2F2",
  LIME: "#8FA65A",
  YELLOW: "#C2A24D",
};

export const colorValues = Object.keys(colors) as Array<Colors>;
