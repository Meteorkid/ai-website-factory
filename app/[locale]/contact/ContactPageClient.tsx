"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Clock, FileText, HelpCircle, Send } from "lucide-react";

interface FormData {
  company: string;
  industry: string;
  contactName: string;
  contact: string;
  package: string;
  timeline: string;
  reference: string;
  description: string;
  privacyConsent: boolean;
}

interface FormErrors {
  company?: string;
  contactName?: string;
  contact?: string;
  privacyConsent?: string;
}

const industries = ["AI / SaaS", "企业服务", "教育培训", "本地服务", "制造业", "招商展示", "其他"];
const packages = ["Starter", "Pro", "Premium", "不确定，需要建议"];
const timelines = ["越快越好", "1 周内", "2 周内", "1 个月内", "暂不确定"];

const quickFaqs = [
  { q: "提交后会发生什么？", a: "我们会先判断页面范围、素材完整度和适合的套餐。" },
  { q: "资料不完整可以提交吗？", a: "可以。资料不完整时，会先进入需求梳理阶段。" },
  { q: "是否必须先确定套餐？", a: "不需要。可以先描述目标，我们再给出建议。" },
];

function validateContact(value: string): string | undefined {
  if (!value.trim()) return "请填写联系方式";
  const isPhone = /^1[3-9]\d{9}$/.test(value.replace(/\s/g, ""));
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isWechat = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(value);
  if (!isPhone && !isEmail && !isWechat) {
    return "请输入有效的手机号、邮箱或微信号";
  }
  return undefined;
}

export default function ContactPageClient() {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    industry: "",
    contactName: "",
    contact: "",
    package: "",
    timeline: "",
    reference: "",
    description: "",
    privacyConsent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "company" && !value.trim()) {
      setErrors((prev) => ({ ...prev, company: "请填写公司或项目名称" }));
    } else if (name === "contactName" && !value.trim()) {
      setErrors((prev) => ({ ...prev, contactName: "请填写联系人姓名" }));
    } else if (name === "contact") {
      const error = validateContact(value);
      if (error) setErrors((prev) => ({ ...prev, contact: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    if (!formData.company.trim()) newErrors.company = "请填写公司或项目名称";
    if (!formData.contactName.trim()) newErrors.contactName = "请填写联系人姓名";
    const contactError = validateContact(formData.contact);
    if (contactError) newErrors.contact = contactError;
    if (!formData.privacyConsent) newErrors.privacyConsent = "请阅读并同意隐私政策";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: formData.company,
          industry: formData.industry,
          contactName: formData.contactName,
          contact: formData.contact,
          package: formData.package,
          timeline: formData.timeline,
          reference: formData.reference,
          description: formData.description,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "提交失败");
      }
      setIsSubmitted(true);
    } catch (err) {
      setErrors({ contact: err instanceof Error ? err.message : "提交失败，请稍后重试" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-2xl border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30";
  const inputClass = `${inputBase} border-border focus:border-accent`;
  const inputErrorClass = `${inputBase} border-error focus:border-error`;

  return (
    <>
      <section className="pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="section-shell text-center">
          <p className="section-kicker">Contact</p>
          <h1 className="headline-gradient mx-auto mt-3 max-w-4xl text-[42px] font-extrabold leading-none md:text-[76px]">
            先提交需求，再判断方案。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            告诉我们行业、页面范围、上线时间和参考网站，我们会根据资料完整度给出初步建议。
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="reveal section-shell grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="warm-card rounded-[30px] p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">需求表单</h2>
              <p className="mt-2 text-sm text-muted">当前表单用于收集项目 Brief，正式接入方式可按部署环境配置。</p>
            </div>

            {isSubmitted ? (
              <div className="liquid-glass rounded-[28px] p-10 text-center">
                <CheckCircle className="mx-auto mb-5 h-10 w-10 text-success" />
                <h3 className="text-2xl font-bold">已收到需求信息</h3>
                <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                  下一步可以根据你的资料完整度，整理页面范围、套餐建议和启动清单。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-semibold">
                    公司或项目名称 <span className="text-error">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="请输入公司或项目名称"
                    className={errors.company ? inputErrorClass : inputClass}
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? "company-error" : undefined}
                  />
                  {errors.company && (
                    <p id="company-error" className="mt-1.5 text-xs text-error" role="alert">
                      {errors.company}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="industry" className="mb-2 block text-sm font-semibold">
                      所属行业
                    </label>
                    <select id="industry" name="industry" value={formData.industry} onChange={handleChange} className={inputClass}>
                      <option value="">请选择行业</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="package" className="mb-2 block text-sm font-semibold">
                      意向套餐
                    </label>
                    <select id="package" name="package" value={formData.package} onChange={handleChange} className={inputClass}>
                      <option value="">请选择</option>
                      {packages.map((pkg) => (
                        <option key={pkg} value={pkg}>
                          {pkg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="contactName" className="mb-2 block text-sm font-semibold">
                      联系人 <span className="text-error">*</span>
                    </label>
                    <input
                      id="contactName"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="请输入联系人姓名"
                      className={errors.contactName ? inputErrorClass : inputClass}
                      aria-invalid={!!errors.contactName}
                      aria-describedby={errors.contactName ? "contactName-error" : undefined}
                    />
                    {errors.contactName && (
                      <p id="contactName-error" className="mt-1.5 text-xs text-error" role="alert">
                        {errors.contactName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact" className="mb-2 block text-sm font-semibold">
                      联系方式 <span className="text-error">*</span>
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      required
                      value={formData.contact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="手机号、邮箱或微信"
                      inputMode="text"
                      className={errors.contact ? inputErrorClass : inputClass}
                      aria-invalid={!!errors.contact}
                      aria-describedby={errors.contact ? "contact-error" : undefined}
                    />
                    {errors.contact && (
                      <p id="contact-error" className="mt-1.5 text-xs text-error" role="alert">
                        {errors.contact}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="timeline" className="mb-2 block text-sm font-semibold">
                      期望上线时间
                    </label>
                    <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} className={inputClass}>
                      <option value="">请选择</option>
                      {timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="reference" className="mb-2 block text-sm font-semibold">
                      参考网站
                    </label>
                    <input
                      id="reference"
                      name="reference"
                      value={formData.reference}
                      onChange={handleChange}
                      placeholder="可填写 1-3 个链接"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="mb-2 block text-sm font-semibold">
                    需求描述
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="请说明官网用途、目标客户、需要展示的产品或服务、是否已有素材"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-accent"
                      aria-describedby={errors.privacyConsent ? "consent-error" : undefined}
                    />
                    <span className="text-sm text-muted">
                      我已阅读并同意将所填信息用于项目沟通，不会用于其他用途。
                    </span>
                  </label>
                  {errors.privacyConsent && (
                    <p id="consent-error" className="mt-1.5 ml-7 text-xs text-error" role="alert">
                      {errors.privacyConsent}
                    </p>
                  )}
                </div>

                <button type="submit" disabled={isSubmitting} className="amber-button px-7 py-3.5 text-sm disabled:opacity-60">
                  {isSubmitting ? "提交中..." : <><Send className="h-4 w-4" /> 提交需求</>}
                </button>
              </form>
            )}
          </div>

          <aside className="grid gap-4 self-start">
            <div className="liquid-glass rounded-[30px] p-7">
              <FileText className="mb-5 h-7 w-7 text-accent" />
              <h2 className="text-2xl font-bold">建议准备</h2>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                {["公司简介与业务介绍", "Logo、品牌色和图片素材", "目标客户与转化目标", "参考网站或竞品网站", "已有域名或备案信息"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="warm-card rounded-[30px] p-7">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
                <Clock className="h-5 w-5 text-accent" /> 下一步
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                我们会先确认预算、行业、页面数量、上线时间和资料完整度，再判断是否适合标准套餐或需要单独评估。
              </p>
            </div>

            <div className="warm-card rounded-[30px] p-7">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
                <HelpCircle className="h-5 w-5 text-accent" /> 常见问题
              </h2>
              <div className="space-y-4">
                {quickFaqs.map((faq) => (
                  <div key={faq.q}>
                    <p className="font-semibold">{faq.q}</p>
                    <p className="mt-1 flex gap-2 text-sm text-muted">
                      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" /> {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
