import type { ApplicationMenuDto } from "./ApplicationMenuDto";

 export type ApplicationViewDto = {
    /**
     * @type string, guid
    */
    applicationId?: string | null;
    /**
     * @type string | undefined
    */
    applicationCode?: string;
    /**
     * @type integer | undefined, int32
    */
    roleLevel?: number;
    /**
     * @type array | undefined
    */
    menus?: ApplicationMenuDto[];
};