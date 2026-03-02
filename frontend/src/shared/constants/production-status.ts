export const productionStatuses = {
  QUEUED: "в очереди",
  IN_PROGRESS: "в процессе",
  DONE: "выполнен",
} as const;

export type ProductionStatus = keyof typeof productionStatuses;
