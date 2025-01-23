import type { AttributeDto } from "./AttributeDto";

 export type AttributeListDto = {
    /**
     * @type string | undefined
    */
    attributeName?: string;
    /**
     * @type array | undefined
    */
    atrributes?: AttributeDto[];
};