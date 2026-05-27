import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, industry, contactName, contact, package: pkg, timeline, reference, description } = body;

    if (!company?.trim()) {
      return NextResponse.json({ error: "请填写公司或项目名称" }, { status: 400 });
    }
    if (!contactName?.trim()) {
      return NextResponse.json({ error: "请填写联系人姓名" }, { status: 400 });
    }
    if (!contact?.trim()) {
      return NextResponse.json({ error: "请填写联系方式" }, { status: 400 });
    }

    const cleaned = contact.replace(/\s/g, "");
    const isPhone = /^1[3-9]\d{9}$/.test(cleaned);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned);
    const isWechat = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(cleaned);
    if (!isPhone && !isEmail && !isWechat) {
      return NextResponse.json({ error: "请输入有效的手机号、邮箱或微信号" }, { status: 400 });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        company: company.trim(),
        industry: industry || null,
        contactName: contactName.trim(),
        contact: contact.trim(),
        package: pkg || null,
        timeline: timeline || null,
        reference: reference || null,
        description: description || null,
      },
    });

    return NextResponse.json({ data: submission }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "提交失败，请稍后重试" }, { status: 500 });
  }
}
