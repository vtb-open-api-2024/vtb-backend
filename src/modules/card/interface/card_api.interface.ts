export interface CardApiPayload {
  cardId: number;
  curdNum: string;
  firstName: string;
  secondName: string;
  exp: Date;
  balance: string;
  cvc: number;
}