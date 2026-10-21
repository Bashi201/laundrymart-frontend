# Continuous integration

GitHub Actions runs `.github/workflows/ci.yml` on every push and pull request.
You can also start it from Actions > Frontend CI > Run workflow.

The workflow uses Node.js 22, installs locked dependencies with `npm ci`, runs
`npm run lint`, and runs `npm run build`. A successful build uploads `dist/`
as the `frontend-dist` artifact, retained for seven days.

No repository secrets are required. There is currently no frontend test script;
the checks cover lint and production compilation. This workflow does not deploy.

Commit and push this file and `.github/workflows/ci.yml` in the frontend repository
to enable CI. To require CI before merging, configure the `Lint and build` check
in the repository's branch protection rules.
