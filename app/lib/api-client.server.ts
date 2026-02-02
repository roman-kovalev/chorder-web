import { env } from "./env.server"
import {ApiError, type ApiResponse} from "~/lib/api-types";

const API_BASE_URL = env.API_URL;

type ApiRequestInit = Omit<RequestInit, "body"> & { body?: unknown };

export async function apiRequest<T>(path: string, init: ApiRequestInit = {}) {
    const url = new URL(path, API_BASE_URL);

    const res = await fetch(url, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init.headers || {})
        },
        body: init.body ? JSON.stringify(init.body) : undefined
    });

    let json: ApiResponse<T> | undefined;

    try {
        json = await res.json() as ApiResponse<T>;
    } catch (e) {
        throw new ApiError({
            code: "INVALID_RESPONSE",
            message: "Failed to parse API response",
            status: res.status,
        })
    }

    if (!res.ok) {
        throw new ApiError({
            code: json?.error?.code ?? "HTTP_ERROR",
            message: json?.error?.message ?? `Request failed with status ${res.status}`,
            details: json?.error?.details,
            status: res.status,
        })
    }

    if (!json.success) {
        throw new ApiError({
            code: json.error.code,
            message: json.error.message,
            details: json.error.details,
            status: res.status,
        })
    }

    return json.data;
}