export interface ExchangeRatesResponse {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: {
    [currency: string]: number;
  };
}