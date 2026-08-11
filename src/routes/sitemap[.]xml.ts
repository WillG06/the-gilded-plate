// Server-side sitemap handler removed for SPA/static build.
// A static sitemap.xml can be placed in /public for GitHub Pages.
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap.xml")({});
