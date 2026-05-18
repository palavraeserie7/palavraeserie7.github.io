import { checkMaintenanceStatus }
from "./maintenance.js";

window.addEventListener(
    "DOMContentLoaded",
    async () => {

        console.log(
            "ORCHESTRATOR OK"
        );

        await checkMaintenanceStatus();

    }
);
