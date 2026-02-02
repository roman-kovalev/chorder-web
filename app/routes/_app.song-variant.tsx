import type {Route} from "./+types/_app.song-variant";
import {mapApiErrorToResponse} from "~/lib/remix-errors";
import type {SongVariant} from "~/features/songs/types";
import {getSongVariantBySlugs} from "~/features/songs/repositories/songVariantRepository.server";

export async function loader({params}: Route.LoaderArgs) {
    try {
        return await getSongVariantBySlugs(params.songSlug, params.variantSlug);
    } catch (err) {
        throw mapApiErrorToResponse(err);
    }
}

export function HydrateFallback() {
    return <div>Loading...</div>;
}

export default function SongVariant({loaderData}: Route.ComponentProps) {
    const songVariant: SongVariant = loaderData

    return (
        <div>
            <h1>Song variant</h1>
            <div>{songVariant.id}</div>
            <div>{songVariant.title}</div>
        </div>
    );
}