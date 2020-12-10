export interface PayuResponse {
    url: string;
}
export declare enum PayuStatus {
    NOT_EXISTS = -1,
    ERROR = 0,
    PENDING = 1,
    SUCCESS = 2,
    TOO_MANY = 3,
    OTHER_STATUS = 4
}
