export type AuditTrailHeaderDto = {
    /**
     * @type string | undefined, guid
    */
    auditTrailHeaderId?: string;
    /**
     * @type string | undefined
    */
    userName?: string;
    /**
     * @type string | undefined
    */
    menu?: string;
    /**
     * @type string | undefined
    */
    action?: string;
    /**
     * @type string | undefined
    */
    resultCode?: string;
    /**
     * @type string | undefined, date-time
    */
    createdDate?: string;
};