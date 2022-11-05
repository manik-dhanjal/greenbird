export const PENDING = 'pending';
export const SUCCESS = 'success';
export const FAILED = 'failed';

export const REQUEST_SUCCESS = (data,message="") => {
    return {
        data:data,
        status:SUCCESS,
        message:message
    }
}
export const REQUEST_PENDING = (data={},message="") => {
    return {
        data:data,
        status:PENDING,
        message:message
    }
}
export const REQUEST_FAILED = (data={},message="") => {
    return {
        data:data,
        status:FAILED,
        message:message
    }
}