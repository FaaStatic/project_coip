import type { Application } from "./Application";

 export type ApplicationMenu = {
    /**
     * @type string | undefined, guid
    */
    menuId?: string;
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
    /**
     * @type object | undefined
    */
    application?: Application;
    /**
     * @type string | undefined
    */
    parentMenu?: string;
    /**
     * @type string | undefined
    */
    menuCode?: string;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
    /**
     * @type string | undefined
    */
    menuDescription?: string;
    /**
     * @type boolean | undefined
    */
    isPrivate?: boolean;
    /**
     * @type integer | undefined, int32
    */
    sequence?: number;
    /**
     * @type string | undefined
    */
    url?: string;
    /**
     * @type string | undefined
    */
    icon?: string;
    /**
     * @type string | undefined
    */
    roleLevels?: string;
};