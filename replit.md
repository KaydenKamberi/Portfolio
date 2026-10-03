# Portfolio

The repository is intentionally empty to start. The user requested only what is
necessary for a working preview and wants the GitHub repository link preserved.
Do not build a full portfolio or migrate the project unless requested.

## Run

Use the **Start application** workflow, which runs:

```sh
python3 -m http.server 5000 --bind 0.0.0.0 --directory public
```

The preview page is `public/index.html`. Only the `public` directory is served.
No third-party packages or secrets are required. This is a static development
preview, not a production server.

## Repository

Keep the existing GitHub connection to
https://github.com/KaydenKamberi/Portfolio.
Changes made here are local until committed and pushed through Git.