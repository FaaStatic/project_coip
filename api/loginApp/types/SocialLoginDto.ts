import type { FacebookDto } from "./FacebookDto";
import type { WebUtcdto } from "./WebUtcdto";

 export type SocialLoginDto = {
    /**
     * @type string | undefined
    */
    tokenAuthorization?: string;
    /**
     * @type string | undefined
    */
    provider?: string;
    /**
     * @type boolean | undefined
    */
    loginParse?: boolean;
    /**
     * @type object | undefined
    */
    facebookModel?: FacebookDto;
    /**
     * @type object | undefined
    */
    webUTCModel?: WebUtcdto;
};