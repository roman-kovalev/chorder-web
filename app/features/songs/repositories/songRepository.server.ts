import type { Song } from "../types";
import {apiRequest} from "~/lib/api-client.server";

export async function getSongs(): Promise<Song[]> {
  return apiRequest<Song[]>("/api/songs");
}

export async function getSongBySlug(slug: string): Promise<Song> {
  return apiRequest<Song>(`/api/songs/${encodeURIComponent(slug)}`);
}
