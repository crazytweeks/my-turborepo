import { router } from "../trpc.js";
import { getAllConfigs, getConfig, updateConfig } from "./config.js";

const wpRoutes = router({
  config: router({
    getAllConfigs: getAllConfigs,
    getConfig: getConfig,
    updateConfig: updateConfig,
  }),
});

export default wpRoutes;
