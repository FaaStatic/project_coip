import type { PrivacyPolicyDetail } from "./PrivacyPolicyDetail";

 export type PrivacyPolicyHeader = {
    /**
     * @type string | undefined
    */
    title?: string;
    /**
     * @type array | undefined
    */
    privacyPolicyDetail?: PrivacyPolicyDetail[];
};