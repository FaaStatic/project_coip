import type { PermissionListDto } from "./PermissionListDto";

 export type PaginatedListOfPermissionListDto = {
    /**
     * @type array | undefined
    */
    data?: PermissionListDto[];
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