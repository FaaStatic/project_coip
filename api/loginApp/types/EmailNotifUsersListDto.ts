import type { EmailNotifUser } from "./EmailNotifUser";

 export type EmailNotifUsersListDto = {
    /**
     * @type string | undefined
    */
    branchCode?: string;
    /**
     * @type string | undefined
    */
    branchName?: string;
    /**
     * @type array | undefined
    */
    users?: EmailNotifUser[];
};