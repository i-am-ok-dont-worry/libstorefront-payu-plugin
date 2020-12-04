import { PayuForm } from "../types";
const qs = require('querystring');

export const buildPayuPostBody = (formData: PayuForm) => {
    if (formData && Object.keys(formData).length > 0) {
        return qs.stringify(formData);
    }

    return null;
};

