import type { UserDto } from "./UserDto";

 export type PaginatedListOfUserDto = {
    /**
     * @type array | undefined
    */
    data?: UserDto[];
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