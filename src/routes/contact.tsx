import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "../content/ContactPage";
import { useWebsiteActions } from "../lib/website-navigation";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & RFQ | Advay Engineers – Toolroom Works, Rajkot" },
      {
        name: "description",
        content:
          "Submit your 2D/3D component drawings (STEP, IGES, DXF) for injection mould feasibility review, DFM consultation and competitive manufacturing quotations.",
      },
      {
        name: "keywords",
        content:
          "Contact Advay Engineers, RFQ Injection Moulds, Veraval Shapar Rajkot, Toolroom Quotation, CAD Drawing Upload, Plastic Tooling Quote Gujarat, Krunal Adhvaryu",
      },
      { name: "author", content: "Advay Engineers" },
      { property: "og:site_name", content: "Advay Engineers" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://advayengineers.com/contact" },
      {
        property: "og:title",
        content: "Contact & RFQ | Advay Engineers – Toolroom Works, Rajkot",
      },
      {
        property: "og:description",
        content:
          "Submit your 2D/3D component drawings (STEP, IGES, DXF) for injection mould feasibility review, DFM consultation and competitive manufacturing quotations.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Advay Engineers Technical Engineering Drawings and RFQ Blueprint Desk",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Contact & RFQ | Advay Engineers – Toolroom Works, Rajkot",
      },
      {
        name: "twitter:description",
        content:
          "Submit your 2D/3D component drawings (STEP, IGES, DXF) for injection mould feasibility review, DFM consultation and competitive manufacturing quotations.",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    links: [{ rel: "canonical", href: "https://advayengineers.com/contact" }],
  }),
  component: Page,
});

function Page() {
  const actions = useWebsiteActions();
  return <ContactPage {...actions} />;
}
