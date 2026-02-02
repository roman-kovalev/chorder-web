import {ApiError} from "~/lib/api-types";

export function mapApiErrorToResponse(err: unknown) {
    if (!(err instanceof ApiError)) {
        return new Response("Internal server error", {status: 500});
    }

    switch (err.code) {
        case "VALIDATION_ERROR": return new Response(err.message, {status: 400});
        case "UNAUTHORIZED": return new Response("Unauthorized", {status: 401});
        case "FORBIDDEN": return new Response("Forbidden", {status: 403});
        case "NOT_FOUND": return new Response("Not found", {status: 404});
        default: return new Response(err.message || "Internal server error", {
            status: err.status ?? 500
        });
    }
}
