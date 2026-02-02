import type {Route} from "./+types/_app.artists";
import type {Artist} from "~/features/artists/types";
import {routes} from "~/routes";
import {getArtists} from "~/features/artists/repositories/artistRepository.server";
import {mapApiErrorToResponse} from "~/lib/remix-errors";

export async function loader() {
    try {
        return await getArtists();
    } catch (err) {
        throw mapApiErrorToResponse(err);
    }
}

export function HydrateFallback() {
    return <div>Loading...</div>;
}

export default function Artists({loaderData}: Route.ComponentProps) {
    return (
        <div>
            <h1 className="text-xl">Artist list</h1>
            {loaderData.map((artist: Artist) => (
                <div key={artist.id}>
                    <a className={"text-sky-500"} href={routes.artistDetail(artist.slug)}>{artist.name}</a>
                </div>
            ))}
        </div>
    );
}