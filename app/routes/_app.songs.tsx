import type {Route} from "./+types/_app.songs";
import type {Song} from "~/features/songs/types";
import {routes} from "~/routes";
import {getSongs} from "~/features/songs/repositories/songRepository.server";
import {mapApiErrorToResponse} from "~/lib/remix-errors";

export async function loader(): Promise<Song[]> {
    try {
        return await getSongs();
    } catch (err) {
        throw mapApiErrorToResponse(err);
    }
}

export function HydrateFallback() {
    return <div>Loading...</div>;
}

export default function Songs({loaderData}: Route.ComponentProps) {
    return (
        <div>
            <h1 className="text-xl">Song list</h1>
            {loaderData.map((song: Song) => (
                <div key={song.id}>
                    <div><a className={"text-sky-500"} href={routes.songDetail(song.slug)}>{song.title}</a></div>
                </div>
            ))}
        </div>
    )
}