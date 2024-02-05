declare const whatsappModule: {
    readonly id: "1";
    readonly name: "Whatsapp Business API";
    readonly description: "Whatsapp Business API";
};
declare const dashboardModule: {
    readonly id: "10";
    readonly name: "Dash";
    readonly description: "Dashboard page for all modules";
};
declare const appModules: ({
    readonly id: "1";
    readonly name: "Whatsapp Business API";
    readonly description: "Whatsapp Business API";
} | {
    readonly id: "10";
    readonly name: "Dash";
    readonly description: "Dashboard page for all modules";
})[];
declare const moduleIdEnum: ("1" | "10")[];
type IAppModules = (typeof appModules)[number];
export type { IAppModules };
export { whatsappModule, dashboardModule, moduleIdEnum };
export default appModules;
//# sourceMappingURL=appModules.d.ts.map