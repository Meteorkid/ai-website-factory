import { describe, it, expect } from "vitest";
import {
  validateContact,
  isPhone,
  isEmail,
  isWechat,
  ContactFormData,
} from "./validate-contact";

describe("validateContact", () => {
  const base: ContactFormData = {
    company: "测试公司",
    contactName: "张三",
    contact: "13812345678",
  };

  it("完整数据通过验证", () => {
    expect(validateContact(base)).toEqual({ valid: true });
  });

  it("可选字段为空时通过", () => {
    expect(validateContact(base)).toEqual({ valid: true });
  });

  describe("必填字段校验", () => {
    it("缺少公司名称", () => {
      const result = validateContact({ ...base, company: "" });
      expect(result.valid).toBe(false);
      expect(result.error).toBe("请填写公司或项目名称");
    });

    it("公司名称为空白", () => {
      const result = validateContact({ ...base, company: "   " });
      expect(result.valid).toBe(false);
    });

    it("缺少联系人姓名", () => {
      const result = validateContact({ ...base, contactName: "" });
      expect(result.valid).toBe(false);
      expect(result.error).toBe("请填写联系人姓名");
    });

    it("缺少联系方式", () => {
      const result = validateContact({ ...base, contact: "" });
      expect(result.valid).toBe(false);
      expect(result.error).toBe("请填写联系方式");
    });

    it("字段为 undefined", () => {
      expect(validateContact({}).valid).toBe(false);
      expect(validateContact({ company: "A" }).valid).toBe(false);
      expect(validateContact({ company: "A", contactName: "B" }).valid).toBe(
        false
      );
    });
  });

  describe("联系方式格式校验", () => {
    it("无效格式被拒绝", () => {
      const result = validateContact({ ...base, contact: "abc" });
      expect(result.valid).toBe(false);
      expect(result.error).toBe("请输入有效的手机号、邮箱或微信号");
    });

    it("带空格的手机号通过", () => {
      const result = validateContact({ ...base, contact: "138 1234 5678" });
      expect(result.valid).toBe(true);
    });

    it("邮箱格式通过", () => {
      const result = validateContact({ ...base, contact: "test@example.com" });
      expect(result.valid).toBe(true);
    });

    it("微信号格式通过", () => {
      const result = validateContact({ ...base, contact: "wx_user1" });
      expect(result.valid).toBe(true);
    });
  });
});

describe("isPhone", () => {
  it("有效手机号", () => {
    expect(isPhone("13812345678")).toBe(true);
    expect(isPhone("15900001111")).toBe(true);
    expect(isPhone("18688889999")).toBe(true);
    expect(isPhone("17700001111")).toBe(true);
  });

  it("带空格的手机号", () => {
    expect(isPhone("138 1234 5678")).toBe(true);
    expect(isPhone(" 13812345678 ")).toBe(true);
  });

  it("无效手机号", () => {
    expect(isPhone("12812345678")).toBe(false); // 第二位不在3-9
    expect(isPhone("1381234567")).toBe(false); // 10位
    expect(isPhone("138123456789")).toBe(false); // 12位
    expect(isPhone("23812345678")).toBe(false); // 不是1开头
    expect(isPhone("abcdefghijk")).toBe(false);
  });
});

describe("isEmail", () => {
  it("有效邮箱", () => {
    expect(isEmail("test@example.com")).toBe(true);
    expect(isEmail("user.name@domain.org")).toBe(true);
    expect(isEmail("a@b.c")).toBe(true);
  });

  it("无效邮箱", () => {
    expect(isEmail("test@")).toBe(false);
    expect(isEmail("@example.com")).toBe(false);
    expect(isEmail("testexample.com")).toBe(false);
    expect(isEmail("")).toBe(false);
    expect(isEmail("test @example.com")).toBe(false);
  });
});

describe("isWechat", () => {
  it("有效微信号", () => {
    expect(isWechat("wx_user1")).toBe(true);
    expect(isWechat("Abcdef")).toBe(true); // 6位，字母开头
    expect(isWechat("A1234567890123456789")).toBe(true); // 20位
  });

  it("无效微信号", () => {
    expect(isWechat("1abcdef")).toBe(false); // 数字开头
    expect(isWechat("abcde")).toBe(false); // 5位，太短
    expect(isWechat("A12345678901234567890")).toBe(false); // 21位，太长
    expect(isWechat("abc def")).toBe(false); // 含空格
  });
});
