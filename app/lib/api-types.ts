export type ApiSuccess<T> = {
    success: true;
    data: T;
    error: null
}

export type ApiFailure = {
    success: false;
    data: null;
    error: {
        code: string;
        message: string;
        details?: unknown;
    }
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export class ApiError extends Error {
    code: string;
    details?: unknown;
    status?: number;

    constructor(opts: {code: string, message: string, details?: unknown; status?: number}) {
        super(opts.message);
        this.code = opts.code;
        this.details = opts.details;
        this.status = opts.status;
    }
}
