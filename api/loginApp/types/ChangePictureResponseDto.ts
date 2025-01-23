export type ChangePictureResponseDto = {
    /**
     * @type string | undefined, guid
    */
    userProfileId?: string;
    /**
     * @type string | undefined
    */
    applicationCode?: string;
    /**
     * @type string | undefined
    */
    username?: string;
    /**
     * @type string | undefined
    */
    imageName?: string;
    /**
     * @type string | undefined
    */
    imagePath?: string;
    /**
     * @type string | undefined
    */
    updatedBy?: string;
    /**
     * @type string | undefined, date-time
    */
    updatedDate?: string;
};