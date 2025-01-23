import type { PortalApplications } from "./PortalApplications";

 export type ApplicationCategoryDto = {
    /**
     * @type string | undefined, guid
    */
    applicationCategoryId?: string;
    /**
     * @type string | undefined
    */
    categoryCode?: string;
    /**
     * @type string | undefined
    */
    categoryDescription?: string;
    /**
     * @type array | undefined
    */
    applications?: PortalApplications[];
};