import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    route("", "routes/_app.tsx", [
        index("routes/home.tsx"),
        route("artists", "routes/_app.artists.tsx"),
        route("artists/new", "routes/_app.artists.new.tsx"),
        route("artist/:slug", "routes/_app.artist.tsx"),
        route("songs", "routes/_app.songs.tsx"),
        route("song/:slug", "routes/_app.song.tsx"),
        route("song/:songSlug/:variantSlug", "routes/_app.song-variant.tsx"),
    ])
] satisfies RouteConfig;

export const routes = {
    home: () => "/",
    artistList: () => "/artists",
    artistDetail: (slug: string) => `/artist/${slug}`,
    songList: () => "/songs",
    songDetail: (slug: string) => `/song/${slug}`,
    songVariant: (songSlug: string, variantSlug: string) => `/song/${songSlug}/${variantSlug}`,
}