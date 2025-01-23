import type { Body } from "./Body";

 export type Header = {
    /**
     * @type string | undefined
    */
    title?: string;
    /**
     * @type array | undefined
    */
    termAndConditionDetail?: Body[];
};