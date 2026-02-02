import {apiRequest} from "~/lib/api-client.server";
import type {SongVariant} from "~/features/songs/types";


export async function getSongVariantBySlugs(songSlug: string, variantSlug: string) {
    return apiRequest<SongVariant>(`/api/songs/${encodeURIComponent(songSlug)}/${encodeURIComponent(variantSlug)}`);
}

export async function getSongVariantsBySongHandle(songHandle: string) {
    return apiRequest<SongVariant[]>(`/api/songs/${encodeURIComponent(songHandle)}/variants`);
}