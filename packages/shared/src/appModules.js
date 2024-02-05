const whatsappModule = {
    id: "1",
    name: "Whatsapp Business API",
    description: "Whatsapp Business API",
};
const dashboardModule = {
    id: "10",
    name: "Dash",
    description: "Dashboard page for all modules",
};
const appModules = [whatsappModule, dashboardModule];
const moduleIdEnum = appModules.map((module) => module.id);
export { whatsappModule, dashboardModule, moduleIdEnum };
export default appModules;
