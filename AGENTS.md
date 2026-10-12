<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Preserve the imported TanStack website modules and asset references verbatim; use the target project's existing package versions and hosting bootstrap so the original experience runs without redesign.
- Keep the imported legacy HTML entry at the project root as an archival source file; TanStack routes remain the active entry because that HTML references a legacy entry absent from the export.
