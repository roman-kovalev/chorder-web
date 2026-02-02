import {apiRequest} from "~/lib/api-client.server";
import type {Artist} from "~/features/artists/types";

export async function getArtists(): Promise<Artist[]> {
    return apiRequest<Artist[]>("/api/artists");
}

export async function getArtistBySlug(slug: string): Promise<Artist> {
    return apiRequest<Artist>(`/api/artists/${encodeURIComponent(slug)}`);
}

export type CreateArtistPayload = {
    name: string;
    slug?: string;
};

export async function createArtist(payload: CreateArtistPayload) {
    return apiRequest<Artist>(
        "/api/artists",
        {
            method: "POST",
            body: JSON.stringify(payload),
        },
    );
}