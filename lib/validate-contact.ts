// 联系表单验证工具

export interface ContactFormData {
  company?: string;
  industry?: string;
  contactName?: string;
  contact?: string;
  package?: string;
  timeline?: string;
  reference?: string;
  description?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// 手机号正则：1开头，第二位3-9，共11位
const PHONE_RE = /^1[3-9]\d{9}$/;
// 邮箱正则
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 微信号正则：字母开头，6-20位字母数字下划线短横线
const WECHAT_RE = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;

export function validateContact(data: ContactFormData): ValidationResult {
  if (!data.company?.trim()) {
    return { valid: false, error: "请填写公司或项目名称" };
  }
  if (!data.contactName?.trim()) {
    return { valid: false, error: "请填写联系人姓名" };
  }
  if (!data.contact?.trim()) {
    return { valid: false, error: "请填写联系方式" };
  }

  const cleaned = data.contact.replace(/\s/g, "");
  const isPhone = PHONE_RE.test(cleaned);
  const isEmail = EMAIL_RE.test(cleaned);
  const isWechat = WECHAT_RE.test(cleaned);

  if (!isPhone && !isEmail && !isWechat) {
    return { valid: false, error: "请输入有效的手机号、邮箱或微信号" };
  }

  return { valid: true };
}

export function isPhone(value: string): boolean {
  return PHONE_RE.test(value.replace(/\s/g, ""));
}

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.replace(/\s/g, ""));
}

export function isWechat(value: string): boolean {
  return WECHAT_RE.test(value.replace(/\s/g, ""));
}
