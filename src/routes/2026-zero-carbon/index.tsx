import { createFileRoute } from "@tanstack/react-router";
import { ResilientTaiwan2026Page, fetchResilientTaiwanData } from "@/page/2026-zero-carbon";

export const Route = createFileRoute("/2026-zero-carbon/")({
  headers: () => {
    return {
      "cache-control": "public, max-age=31536000, stale-while-revalidate=86400",
    };
  },
  loader: async () => {
    const resilientTaiwanData = await fetchResilientTaiwanData();
    return resilientTaiwanData;
  },
  head: ({ loaderData }) => {
    return {
      links: [
        {
          rel: "canonical",
          href: "https://www.mirrormedia.mg/projects/2026-zero-carbon",
        },
      ],
      meta: [
        {
          title: "2026零碳永續論壇-鏡週刊",
        },
        {
          name: "robots",
          content: "index, max-image-preview:large",
        },
        {
          name: "description",
          content: loaderData?.metadata.pageInfo.introduction.content ?? "",
        },
        {
          property: "og:description",
          content: loaderData?.metadata.pageInfo.introduction.content ?? "",
        },
        {
          property: "og:image",
          content:
            loaderData?.metadata.pageInfo.introduction.instruction ??
            "https://v3-statics.mirrormedia.mg/images/87c3f5e5-e8ee-4521-a60c-89950e8e1e3e.jpg",
        },
        {
          property: "og:url",
          content: "/projects/2026-zero-carbon",
        },
        {
          property: "og:site_name",
          content: "2026零碳永續論壇-鏡週刊",
        },
      ],
    };
  },
  component: ResilientTaiwan2026Page,
});
