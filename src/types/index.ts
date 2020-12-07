export interface PayuResponse {
    url: string,
}

export enum PayuStatus {
    NOT_EXISTS = 1, // Order doesn't exist
    ERROR = 0,  // An error with payment has been occurred
    PENDING = 1,    // Shop is still waiting for confirmation of payment
    SUCCESS = 2,    // Order has been paid successfully
    TOO_MANY = 3,   // Order has been paid before
    OTHER_STATUS = 4 // Status different than ERROR or PENDING
}
