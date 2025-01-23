import type { GeneralParameterDto } from "./GeneralParameterDto";

 export type PaginatedListOfGeneralParameterDto = {
    /**
     * @type array | undefined
    */
    data?: GeneralParameterDto[];
    /**
     * @type integer | undefined, int32
    */
    pageIndex?: number;
    /**
     * @type integer | undefined, int32
    */
    pageSize?: number;
    /**
     * @type integer | undefined, int32
    */
    totalCount?: number;
    /**
     * @type integer | undefined, int32
    */
    totalPageCount?: number;
    /**
     * @type integer | undefined, int32
    */
    startingNumber?: number;
    /**
     * @type boolean | undefined
    */
    hasPreviousPage?: boolean;
    /**
     * @type boolean | undefined
    */
    hasNextPage?: boolean;
};