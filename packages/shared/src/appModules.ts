const whatsappModule = {
  id: "1",
  name: "Whatsapp Business API",
  description: "Whatsapp Business API",
} as const;

const dashboardModule = {
  id: "10",
  name: "Dash",
  description: "Dashboard page for all modules",
} as const;

const appModules = [whatsappModule, dashboardModule];

const moduleIdEnum = appModules.map((module) => module.id);
type IAppModules = (typeof appModules)[number];

export type { IAppModules };
export { whatsappModule, dashboardModule, moduleIdEnum };
export default appModules;
