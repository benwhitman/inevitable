export enum Operator {
  LESS_THAN
}

export interface Literal {
  value: String | number | boolean;
}

export interface Collection {
  values: Literal[];
}

export interface Predicate {
  operator: Operator;
  operand1: Literal | Predicate;
  operand2: Literal | Predicate;
}
