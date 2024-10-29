import { ConfigApp, ConfigAuth, ConfigDB } from "./config.schema";
import { validateEnv } from "./config.validate";

export const CONFIG_APP = validateEnv(ConfigApp);

export const CONFIG_DB = validateEnv(ConfigDB);

export const CONFIG_AUTH = validateEnv(ConfigAuth);