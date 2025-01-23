import type { GraphDto } from "./GraphDto";

 export type GraphMonitoringUserDto = {
    /**
     * @type array | undefined
    */
    login?: GraphDto[];
    /**
     * @type array | undefined
    */
    remind?: GraphDto[];
    /**
     * @type array | undefined
    */
    notLogin?: GraphDto[];
};