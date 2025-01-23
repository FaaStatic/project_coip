export type UserInfoUpdateDto = {
    /**
     * @type string, guid
    */
    userInfoId: string;
    /**
     * @type string | undefined
    */
    firstName?: string;
    /**
     * @type string | undefined
    */
    lastName?: string;
    /**
     * @type string | undefined
    */
    surname?: string;
    /**
     * @type string | undefined
    */
    description?: string;
    /**
     * @type string | undefined
    */
    religion?: string;
    /**
     * @type string | undefined
    */
    citizenOfCountry?: string;
    /**
     * @type string | undefined
    */
    dob?: string;
    /**
     * @type string | undefined
    */
    gender?: string;
    /**
     * @type string | undefined
    */
    idCardNumber?: string;
    /**
     * @type string | undefined
    */
    taxPayerNumber?: string;
    /**
     * @type string | undefined
    */
    marriage?: string;
    /**
     * @type boolean
    */
    status?: boolean | null;
    /**
     * @type string | undefined
    */
    contactNumber?: string;
    /**
     * @type string | undefined
    */
    position?: string;
};