/**
 * @description FleetPerformanceAchievementParameterIndexPicaVm
*/
export type FleetPerformanceAchievementParameterIndexPicaVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets assessmentArea
     * @type string
    */
    assessmentArea?: string | null;
    /**
     * @description Gets or sets fleetId
     * @type string
    */
    fleetId?: string | null;
    /**
     * @description Gets or sets startDatePica
     * @type string, date-time
    */
    startDatePica?: string | null;
    /**
     * @description Gets or sets description
     * @type string
    */
    description?: string | null;
    /**
     * @description Gets or sets comment
     * @type string
    */
    comment?: string | null;
    /**
     * @description Gets or sets recommendation
     * @type string
    */
    recommendation?: string | null;
    /**
     * @description Gets or sets score
     * @type number | undefined, double
    */
    score?: number;
};