# wonjoonseol.github.io

Index of my projects, served at https://wonjoonseol.github.io/ (English), /ko/ (Korean) and /ja/ (Japanese).

Edit `projects.mjs`, then run `node build.mjs` to regenerate `index.html`, `ko/index.html` and `ja/index.html`.

Each thumbnail `assets/thumbs/<name>.webp` is rendered from the 960x504 page `thumbs/<name>.html` by `node render-thumbs.mjs [name ...]`, which also writes a 2400x1260 copy to `assets/thumbs/full/` for sharp screens and the enlarged view. It needs Google Chrome; set `CHROME` if it is not in the usual place.

Project sites link here with `?from=<project id>`, which marks that project on the page.
