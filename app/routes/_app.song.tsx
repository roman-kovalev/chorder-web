import type {Route} from "./+types/_app.song";
import {mapApiErrorToResponse} from "~/lib/remix-errors";
import {getSongBySlug} from "~/features/songs/repositories/songRepository.server";
import type {Song} from "~/features/songs/types";

export async function loader({params}: Route.LoaderArgs) {
    if (!params.slug) {
        throw new Response("Not found", {status: 404});
    }

    try {
        return await getSongBySlug(params.slug);
    } catch (err) {
        throw mapApiErrorToResponse(err);
    }
}

export const meta: Route.MetaFunction = ({loaderData}: Route.MetaArgs) => {
    if (!loaderData) {
        return [
            {title: "Song not found | Chorder"},
            {name: "robots", content: "noindex"},
        ];
    }

    const song: Song = loaderData

    return [
        {title: `${song.title} chords and lyrics | Chorder`},
        {name: "description", content: `Chords and lyrics for ${song.title}`},
    ]
}

export function HydrateFallback() {
    return <div>Loading...</div>;
}

export default function Song({loaderData}: Route.ComponentProps) {
    const song: Song = loaderData

    return (
        <div>
            <h1>{song.title}</h1>
            <div>{song.id}</div>
        </div>
    );
}