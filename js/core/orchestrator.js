import { checkMaintenanceStatus }
from "./maintenance.js";

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await checkMaintenanceStatus();

    }
);
