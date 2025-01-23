import type { ApplicationDashboardDto } from "./ApplicationDashboardDto";

 export type GroupApplicationDto = {
    /**
     * @type string | undefined
    */
    applicationGroupName?: string;
    /**
     * @type array | undefined
    */
    applications?: ApplicationDashboardDto[];
};