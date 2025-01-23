export type Meta = {
    /**
     * @type integer | undefined, int32
    */
    totalItems?: number;
    /**
     * @type integer | undefined, int32
    */
    pageNumber?: number;
    /**
     * @type integer | undefined, int32
    */
    pageSize?: number;
    /**
     * @type integer | undefined, int32
    */
    totalPages?: number;
    /**
     * @type boolean | undefined
    */
    hasPreviousPage?: boolean;
    /**
     * @type boolean | undefined
    */
    hasNextPage?: boolean;
    /**
     * @type integer | undefined, int32
    */
    nextPageNumber?: number;
    /**
     * @type integer | undefined, int32
    */
    previousPageNumber?: number;
};