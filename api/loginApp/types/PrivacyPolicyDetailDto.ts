import type { PrivacyPolicyHeader } from "./PrivacyPolicyHeader";

 export type PrivacyPolicyDetailDto = {
    /**
     * @type array | undefined
    */
    privacyPolicyHeader?: PrivacyPolicyHeader[];
    /**
     * @type string | undefined
    */
    case?: string;
    /**
     * @type integer | undefined, int32
    */
    privacyPolicyVersion?: number;
};