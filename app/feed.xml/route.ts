import { prisma } from "@/lib/prisma";

const baseUrl = "https://ai-workshop.example.com";

export async function GET() {
  const cases = await prisma.case.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: {
      slug: true,
      title: true,
      industry: true,
      clientName: true,
      background: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const items = cases
    .map(
      (c) => `    <item>
      <title>${escapeXml(c.title)}</title>
      <link>${baseUrl}/cases/${c.slug}</link>
      <guid isPermaLink="true">${baseUrl}/cases/${c.slug}</guid>
      <description>${escapeXml(c.background)}</description>
      <category>${escapeXml(c.industry)}</category>
      <pubDate>${new Date(c.createdAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI 官网工场</title>
    <link>${baseUrl}</link>
    <description>AI 辅助生成、专业团队交付的官网建设服务案例</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
