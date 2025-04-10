export type StatusCondition = {
  name: string;
  color: string;
};

export type Combatant = {
  id: string;
  name: string;
  initiative: number;
  statusConditions: StatusCondition[];
};
