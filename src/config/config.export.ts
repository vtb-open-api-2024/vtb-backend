import { 
  ConfigApp, 
  ConfigAuth, 
  ConfigCipher, 
  ConfigDB, 
  ConfigOpenExchangeRates, 
  ConfigUcaller
} from "./config.schema";

import { validateEnv } from "./config.validate";

export const CONFIG_APP = validateEnv(ConfigApp);

export const CONFIG_DB = validateEnv(ConfigDB);

export const CONFIG_AUTH = validateEnv(ConfigAuth);

export const CONFIG_CIPHER = validateEnv(ConfigCipher);

export const CONFIG_UCALLER = validateEnv(ConfigUcaller);

export const CONFIG_OPEN_EXCHANGE_RATES = validateEnv(ConfigOpenExchangeRates);