import type {Route} from "./+types/_app.artist";
import {mapApiErrorToResponse} from "~/lib/remix-errors";
import {getArtistBySlug} from "~/features/artists/repositories/artistRepository.server";
import type {Artist} from "~/features/artists/types";

export async function loader({params}: Route.LoaderArgs) {
    if (!params.slug) {
        throw new Response("Not found", {status: 404});
    }

    try {
        return await getArtistBySlug(params.slug);
    } catch (err) {
        throw mapApiErrorToResponse(err);
    }
}

export const meta: Route.MetaFunction = ({loaderData}: Route.MetaArgs) => {
    if (!(loaderData instanceof Artist)) {
        return [
            {title: "Artist not found | Chorder"},
            {name: "robots", content: "noindex"},
        ];
    }

    const artist: Artist = loaderData

    return [
        {title: `${artist.name} chords and lyrics | Chorder`},
        {name: "description", content: `Chords and lyrics for songs by ${artist.name}`}
    ]
}

export function HydrateFallback() {
    return <div>Loading...</div>;
}

export default function Artist({loaderData}: Route.ComponentProps) {
    return (
        <div>
            <h1>Artist</h1>
            <div>{loaderData.id}</div>
            <div>{loaderData.name}</div>
        </div>
    )
}