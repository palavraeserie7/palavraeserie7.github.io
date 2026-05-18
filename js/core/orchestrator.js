import { checkMaintenanceStatus } from "./maintenance.js";

window.addEventListener(
    "DOMContentLoaded",
    async () => {

        await checkMaintenanceStatus();

    }
);
