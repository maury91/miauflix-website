# Miauflix website

A small, dependency-free static landing page for [Miauflix](https://github.com/maury91/miauflix), based on the supplied visual reference. Built with semantic HTML, CSS, and a small amount of browser JavaScript.

## Develop and build

Requires Node.js 22 or newer. No dependency installation is needed.

```sh
npm run dev
```

Open the printed local URL (default `http://127.0.0.1:4173`). In development, refresh the page after editing to rebuild the source.

```sh
npm run build
npm run check
npm run preview
```

Deploy the contents of `dist/` to any static web host. No server runtime, API keys, or access to the Miauflix application is required. URLs are relative, so the build also works under a subdirectory. Set `PORT` to use a different preview port.

## Source

- `src/index.html`: homepage, background loading, and screenshot carousel.
- `src/features.html`: full source, browsing, playback, TV, and profile sections.
- `src/partials/`: shared navigation and footer.
- `src/styles.css`: responsive layouts, dark and light themes, reduced-motion support.
- `src/script.js`: mobile navigation, theme preference, copy commands, and carousel controls.
- `scripts/build.mjs`: resolves icons, fingerprints CSS/JS, and writes the static build.
- `scripts/check.mjs`: checks both pages, cross-page anchors, build references, headings, and image attributes.

Content and documentation links are grounded in the sibling Miauflix repository's README and feature/setup guides. Hayase was consulted for presentation inspiration; its features are not represented as Miauflix features.

Product images are optimized locally and shipped with the site, never hotlinked. The home screenshot uses the anime row selected by the project owner, and the profile screens use the temporary display name “Miau” (the original name was restored after capture). Search uses fictional catalog artwork from Miauflix's test fixtures; the sources section uses the live provider overview, and the details screenshot uses the owner-supplied capture of The Fellowship of the Ring. Artwork illustrates the interface and does not imply bundled or distributed media. The Miauflix logo and favicon come from the app repository.


## Screenshot library

Original viewport captures are in `screenshots/`:

- `home-anime.jpg`: owner-selected home row featuring anime.
- `profile-selector.jpg`: Who’s watching.
- `profile-management.jpg`: Manage profiles.
- `profile-editor.jpg`: color and fabric options.
- `profile-shapes.jpg`: shape options.
- `profile-face.jpg`: eyes, mouth, and cheek options.
- `profile-accessories.jpg`: hats and accessories.

All profile captures use “Miau” rather than a personal name. No avatar changes were made. The deployed page includes optimized WebP versions of home, profile selector, and profile editor. The owner-supplied higher-resolution home and profile captures replace the earlier site images.

Source configuration captures (settings unchanged; credential inputs empty):

- `sources-overview.jpg`: enabled providers, testing controls, and request usage.
- `sources-provider-settings.jpg`: per-provider daily and per-minute request budgets.
- `sources-indexers.jpg`: indexer catalog, compatibility filters, and add controls.
- `sources-torznab.jpg`: blank form for connecting a Jackett/Prowlarr Torznab endpoint.
- `sources-repositories.jpg`: source repository list and blank repository URL form.

The homepage carousel cycles through source configuration, search, movie details, episodes, TV sign-in, and both profile screens. It shows three screenshots at a time at their natural aspect ratios in a perspective layout, with narrow previews at the sides. It rotates every five seconds while visible, pauses on hover or keyboard focus, and stops while the page is hidden. Reduced-motion preferences disable automatic movement by default. Previous/next, direct slide selection, and arrow/Home/End keys remain available. Without JavaScript the screenshots remain horizontally scrollable. The primary Read more button and main Features link open `features.html`; both pages work directly from the static build.

Carousel direction icons are Material Symbols chevron-backward and chevron-forward, bundled inline from the Iconify API (Google Material Symbols, Apache-2.0).

Owner-supplied originals (`*-1920.png`) include admin setup, service configuration, show episodes, home, profile selector, and profile editor. The homepage Easy setup section uses optimized account and service configuration screenshots. Other product screens appear in the homepage carousel; detailed sections remain on the Features page.

- `movie-details-1920.png`: owner-supplied movie details screenshot, used on the Features page and in the homepage carousel.
