import type {Route} from "./+types/_app.artists.new";
import type {Artist} from "~/features/artists/types";
import {routes} from "~/routes";
import {type CreateArtistPayload, createArtist} from "~/features/artists/repositories/artistRepository.server";
import {mapApiErrorToResponse} from "~/lib/remix-errors";
import {Form, redirect, useNavigation, data} from "react-router";
import {ApiError} from "~/lib/api-types";

type ActionData = {
    errors?: {
        name?: string;
        slug?: string;
        general?: string;
    };
}

export async function action({request}: Route.ActionArgs) {
    const formData: FormData = await request.formData();
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;

    const errors: ActionData["errors"] = {};

    if (!name.trim()) {
        errors.name = "Name is required";
    }

    if (slug && !slug.match(/^[a-z0-9-]+$/)) {
        errors.slug = "Slug must contain only lowercase letters, numbers and dashes";
    }

    if (errors.name || errors.slug) {
        return data({errors}, {status: 400});
    }

    try {
        const payload: CreateArtistPayload = {
            name: name.trim(),
            slug: slug?.trim() ? slug.trim() : undefined,
        };

        const artist: Artist = await createArtist(payload);

        return redirect(routes.artistDetail(artist.slug));
    } catch (err) {
        if (err instanceof ApiError) {
            if (err.code === "VALIDATION_ERROR") {
                return data({
                    errors: {
                        ...(typeof err.details === "object" ? err.details as any : {}),
                        general: err.message,
                    },
                }, {status: 400});
            }
        }

        throw mapApiErrorToResponse(err);
    }
}

export function HydrateFallback() {
    return <div>Loading...</div>;
}

export default function NewArtist({actionData}: Route.ComponentProps) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const errors = actionData?.errors ?? {};

    return (
        <div className="max-w-lg space-y-4">
            <h1 className="text-xl font-semibold">New artist</h1>

            {errors.general && <div className="text-red-500">{errors.general}</div>}

            <Form method="POST" className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="w-1/2 rounded border px-3 py-2 text-sm"
                    />
                    {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-red-600">
                            {errors.name}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="slug" className="block text-sm font-medium mb-1">Slug (optional)</label>
                    <input
                        id="slug"
                        name="slug"
                        type="text"
                        className="w-1/2 rounded border px-3 py-2 text-sm"
                    />
                    {errors.slug && (
                        <p id="name-error" className="mt-1 text-xs text-red-600">
                            {errors.slug}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 disabled:opacity-50"
                >Create
                </button>
            </Form>
        </div>
    );
}
