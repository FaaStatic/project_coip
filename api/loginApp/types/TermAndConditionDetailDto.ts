import type { Header } from "./Header";

 export type TermAndConditionDetailDto = {
    /**
     * @type boolean | undefined
    */
    termAndConditionStatus?: boolean;
    /**
     * @type array | undefined
    */
    termAndConditionHeader?: Header[];
    /**
     * @type integer | undefined, int32
    */
    termAndConditionVersion?: number;
};