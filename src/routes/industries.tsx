import { createFileRoute } from "@tanstack/react-router";
import { IndustriesPage } from "../content/IndustriesPage";
import { useWebsiteActions } from "../lib/website-navigation";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries & Applications | Advay Engineers – Plastic Tooling Solutions" },
      {
        name: "description",
        content:
          "Custom moulds and engineered plastic parts across Automotive, Electrical, Industrial, Irrigation, Consumer Goods, Thin-Wall Enclosures, and Sanitary applications.",
      },
      {
        name: "keywords",
        content:
          "Industries Plastic Moulding, Automotive Parts Moulds, Electrical Switchgear, Drip Irrigation Fittings, Industrial Enclosures, Advay Engineers",
      },
      { name: "author", content: "Advay Engineers" },
      { property: "og:site_name", content: "Advay Engineers" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://advayengineers.com/applications" },
      {
        property: "og:title",
        content: "Industries & Applications | Advay Engineers – Plastic Tooling Solutions",
      },
      {
        property: "og:description",
        content:
          "Custom moulds and engineered plastic parts across Automotive, Electrical, Industrial, Irrigation, Consumer Goods, Thin-Wall Enclosures, and Sanitary applications.",
      },
      {
        property: "og:image",
        content:
          "https://id-preview--7812fedb-978a-4d3f-b7af-27b541ebd405.lovable.app/__l5e/assets-v1/a135d4bb-4715-4c80-93b9-b1824200a9e1/hero_applications_parts_new.jpg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Advay Engineers Industry Applications & Engineered Plastic Components",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Industries & Applications | Advay Engineers – Plastic Tooling Solutions",
      },
      {
        name: "twitter:description",
        content:
          "Custom moulds and engineered plastic parts across Automotive, Electrical, Industrial, Irrigation, Consumer Goods, Thin-Wall Enclosures, and Sanitary applications.",
      },
      {
        name: "twitter:image",
        content:
          "https://id-preview--7812fedb-978a-4d3f-b7af-27b541ebd405.lovable.app/__l5e/assets-v1/a135d4bb-4715-4c80-93b9-b1824200a9e1/hero_applications_parts_new.jpg",
      },
    ],
    links: [{ rel: "canonical", href: "https://advayengineers.com/applications" }],
  }),
  component: Page,
});

function Page() {
  const actions = useWebsiteActions();
  return <IndustriesPage {...actions} />;
}
