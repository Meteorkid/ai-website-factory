"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Clock, FileText, HelpCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";

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

function validateContact(value: string, t: (key: string) => string): string | undefined {
  if (!value.trim()) return t("form.contactError");
  const isPhone = /^1[3-9]\d{9}$/.test(value.replace(/\s/g, ""));
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isWechat = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(value);
  if (!isPhone && !isEmail && !isWechat) {
    return t("form.contactInvalid");
  }
  return undefined;
}

export default function ContactPageClient() {
  const t = useTranslations("contact");
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

  const industries = t.raw("form.industries") as string[];
  const packages = t.raw("form.packages") as string[];
  const timelines = t.raw("form.timelines") as string[];
  const prepareItems = t.raw("sidebar.prepareItems") as string[];
  const quickFaqs = t.raw("sidebar.faqs") as Array<{ q: string; a: string }>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "company" && !value.trim()) {
      setErrors((prev) => ({ ...prev, company: t("form.companyError") }));
    } else if (name === "contactName" && !value.trim()) {
      setErrors((prev) => ({ ...prev, contactName: t("form.contactNameError") }));
    } else if (name === "contact") {
      const error = validateContact(value, t);
      if (error) setErrors((prev) => ({ ...prev, contact: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    if (!formData.company.trim()) newErrors.company = t("form.companyError");
    if (!formData.contactName.trim()) newErrors.contactName = t("form.contactNameError");
    const contactError = validateContact(formData.contact, t);
    if (contactError) newErrors.contact = contactError;
    if (!formData.privacyConsent) newErrors.privacyConsent = t("form.privacyError");

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
          <p className="section-kicker">{t("hero.kicker")}</p>
          <h1 className="headline-gradient mx-auto mt-3 max-w-4xl text-[42px] font-extrabold leading-none md:text-[76px]">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="reveal section-shell grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="warm-card rounded-[30px] p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">{t("form.title")}</h2>
              <p className="mt-2 text-sm text-muted">{t("form.desc")}</p>
            </div>

            {isSubmitted ? (
              <div className="liquid-glass rounded-[28px] p-10 text-center">
                <CheckCircle className="mx-auto mb-5 h-10 w-10 text-success" />
                <h3 className="text-2xl font-bold">{t("success.title")}</h3>
                <p className="mx-auto mt-3 max-w-md text-sm text-muted">{t("success.desc")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-semibold">
                    {t("form.company")} <span className="text-error">{t("form.required")}</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={t("form.companyPlaceholder")}
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
                      {t("form.industry")}
                    </label>
                    <select id="industry" name="industry" value={formData.industry} onChange={handleChange} className={inputClass}>
                      <option value="">{t("form.industryPlaceholder")}</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="package" className="mb-2 block text-sm font-semibold">
                      {t("form.package")}
                    </label>
                    <select id="package" name="package" value={formData.package} onChange={handleChange} className={inputClass}>
                      <option value="">{t("form.packagePlaceholder")}</option>
                      {packages.map((pkg) => (
                        <option key={pkg} value={pkg}>{pkg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="contactName" className="mb-2 block text-sm font-semibold">
                      {t("form.contactName")} <span className="text-error">{t("form.required")}</span>
                    </label>
                    <input
                      id="contactName"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={t("form.contactNamePlaceholder")}
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
                      {t("form.contact")} <span className="text-error">{t("form.required")}</span>
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      required
                      value={formData.contact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={t("form.contactPlaceholder")}
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
                      {t("form.timeline")}
                    </label>
                    <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} className={inputClass}>
                      <option value="">{t("form.timelinePlaceholder")}</option>
                      {timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>{timeline}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="reference" className="mb-2 block text-sm font-semibold">
                      {t("form.reference")}
                    </label>
                    <input
                      id="reference"
                      name="reference"
                      value={formData.reference}
                      onChange={handleChange}
                      placeholder={t("form.referencePlaceholder")}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="mb-2 block text-sm font-semibold">
                    {t("form.description")}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder={t("form.descriptionPlaceholder")}
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
                    <span className="text-sm text-muted">{t("form.privacyConsent")}</span>
                  </label>
                  {errors.privacyConsent && (
                    <p id="consent-error" className="mt-1.5 ml-7 text-xs text-error" role="alert">
                      {errors.privacyConsent}
                    </p>
                  )}
                </div>

                <button type="submit" disabled={isSubmitting} className="amber-button px-7 py-3.5 text-sm disabled:opacity-60">
                  {isSubmitting ? t("form.submitting") : <><Send className="h-4 w-4" /> {t("form.submit")}</>}
                </button>
              </form>
            )}
          </div>

          <aside className="grid gap-4 self-start">
            <div className="liquid-glass rounded-[30px] p-7">
              <FileText className="mb-5 h-7 w-7 text-accent" />
              <h2 className="text-2xl font-bold">{t("sidebar.prepareTitle")}</h2>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                {prepareItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="warm-card rounded-[30px] p-7">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
                <Clock className="h-5 w-5 text-accent" /> {t("sidebar.nextTitle")}
              </h2>
              <p className="text-sm leading-relaxed text-muted">{t("sidebar.nextDesc")}</p>
            </div>

            <div className="warm-card rounded-[30px] p-7">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
                <HelpCircle className="h-5 w-5 text-accent" /> {t("sidebar.faqTitle")}
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
