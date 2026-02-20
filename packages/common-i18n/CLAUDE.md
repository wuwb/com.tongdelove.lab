# Common-I18n共享包 - packages/common-i18n

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **common-i18n**

## 概述

**通用国际化文件包** - 预置的通用翻译文件，支持多语言的常见术语和短语

## 技术栈

- **框架**: 基于JSON的翻译文件格式
- **工具**: ESLint, Prettier, TypeScript
- **格式**: JSON (支持嵌套结构)
- **质量**: 自定义lint规则确保翻译质量

## 目录结构

```
packages/common-i18n/
├── src/
│   ├── locales/                # 翻译文件目录
│   │   ├── en/                 # 英语
│   │   │   ├── common.json     # 通用术语
│   │   │   ├── buttons.json    # 按钮文本
│   │   │   ├── forms.json      # 表单标签
│   │   │   ├── messages.json   # 消息文本
│   │   │   ├── errors.json     # 错误信息
│   │   │   ├── dates.json      # 日期时间
│   │   │   ├── numbers.json    # 数字货币
│   │   │   ├── units.json      # 单位度量
│   │   │   ├── countries.json  # 国家名称
│   │   │   └── languages.json  # 语言名称
│   │   ├── zh-CN/              # 中文简体
│   │   │   ├── common.json
│   │   │   ├── buttons.json
│   │   │   ├── forms.json
│   │   │   ├── messages.json
│   │   │   ├── errors.json
│   │   │   ├── dates.json
│   │   │   ├── numbers.json
│   │   │   ├── units.json
│   │   │   ├── countries.json
│   │   │   └── languages.json
│   │   ├── zh-TW/              # 中文繁体
│   │   ├── ja/                 # 日语
│   │   ├── ko/                 # 韩语
│   │   ├── es/                 # 西班牙语
│   │   ├── fr/                 # 法语
│   │   ├── de/                 # 德语
│   │   ├── ru/                 # 俄语
│   │   └── pt/                 # 葡萄牙语
│   ├── generators/             # 生成器
│   │   ├── csv-export.ts       # CSV导出
│   │   ├── po-export.ts        # PO导出
│   │   └── json-merge.ts       # JSON合并
│   ├── validators/             # 验证器
│   │   ├── structure.validator.ts  # 结构验证
│   │   ├── completeness.validator.ts # 完整性验证
│   │   └── consistency.validator.ts # 一致性验证
│   ├── utils/                  # 工具函数
│   │   ├── key-matcher.ts      # 键匹配
│   │   ├── translation-loader.ts # 翻译加载器
│   │   └── fallback-resolver.ts # 回退解析器
│   ├── types/                  # 类型定义
│   │   ├── translation.types.ts # 翻译类型
│   │   ├── locale.types.ts     # 语言类型
│   │   └── namespace.types.ts  # 命名空间类型
│   └── index.ts                # 主入口
├── package.json
└── tsconfig.json
```

## 翻译文件示例

### 通用术语 (common.json)
```json
// 英语 (en/common.json)
{
  "app": {
    "name": "Tongdelove",
    "description": "Tongdelove Lab Application",
    "version": "Version",
    "copyright": "Copyright",
    "powered_by": "Powered by"
  },
  "common": {
    "yes": "Yes",
    "no": "No",
    "ok": "OK",
    "cancel": "Cancel",
    "confirm": "Confirm",
    "submit": "Submit",
    "save": "Save",
    "edit": "Edit",
    "delete": "Delete",
    "create": "Create",
    "update": "Update",
    "view": "View",
    "search": "Search",
    "filter": "Filter",
    "sort": "Sort",
    "loading": "Loading...",
    "success": "Success",
    "error": "Error",
    "warning": "Warning",
    "info": "Information",
    "close": "Close",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "home": "Home",
    "profile": "Profile",
    "settings": "Settings",
    "help": "Help",
    "about": "About",
    "contact": "Contact",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service"
  },
  "navigation": {
    "menu": "Menu",
    "dashboard": "Dashboard",
    "users": "Users",
    "products": "Products",
    "orders": "Orders",
    "reports": "Reports",
    "analytics": "Analytics",
    "settings": "Settings",
    "logout": "Logout"
  },
  "status": {
    "active": "Active",
    "inactive": "Inactive",
    "pending": "Pending",
    "approved": "Approved",
    "rejected": "Rejected",
    "draft": "Draft",
    "published": "Published",
    "archived": "Archived",
    "enabled": "Enabled",
    "disabled": "Disabled"
  },
  "time": {
    "now": "now",
    "today": "today",
    "yesterday": "yesterday",
    "tomorrow": "tomorrow",
    "this_week": "this week",
    "this_month": "this month",
    "this_year": "this year",
    "last_week": "last week",
    "last_month": "last month",
    "last_year": "last year",
    "next_week": "next week",
    "next_month": "next month",
    "next_year": "next year"
  }
}
```

```json
// 中文简体 (zh-CN/common.json)
{
  "app": {
    "name": "同德爱",
    "description": "同德爱实验室应用",
    "version": "版本",
    "copyright": "版权所有",
    "powered_by": "由...驱动"
  },
  "common": {
    "yes": "是",
    "no": "否",
    "ok": "确定",
    "cancel": "取消",
    "confirm": "确认",
    "submit": "提交",
    "save": "保存",
    "edit": "编辑",
    "delete": "删除",
    "create": "创建",
    "update": "更新",
    "view": "查看",
    "search": "搜索",
    "filter": "筛选",
    "sort": "排序",
    "loading": "加载中...",
    "success": "成功",
    "error": "错误",
    "warning": "警告",
    "info": "信息",
    "close": "关闭",
    "back": "返回",
    "next": "下一步",
    "previous": "上一步",
    "home": "首页",
    "profile": "个人资料",
    "settings": "设置",
    "help": "帮助",
    "about": "关于",
    "contact": "联系我们",
    "privacy": "隐私政策",
    "terms": "服务条款"
  },
  "navigation": {
    "menu": "菜单",
    "dashboard": "仪表盘",
    "users": "用户",
    "products": "产品",
    "orders": "订单",
    "reports": "报告",
    "analytics": "分析",
    "settings": "设置",
    "logout": "退出登录"
  },
  "status": {
    "active": "活跃",
    "inactive": "非活跃",
    "pending": "待处理",
    "approved": "已批准",
    "rejected": "已拒绝",
    "draft": "草稿",
    "published": "已发布",
    "archived": "已归档",
    "enabled": "已启用",
    "disabled": "已禁用"
  },
  "time": {
    "now": "现在",
    "today": "今天",
    "yesterday": "昨天",
    "tomorrow": "明天",
    "this_week": "本周",
    "this_month": "本月",
    "this_year": "今年",
    "last_week": "上周",
    "last_month": "上月",
    "last_year": "去年",
    "next_week": "下周",
    "next_month": "下月",
    "next_year": "明年"
  }
}
```

### 按钮文本 (buttons.json)
```json
{
  "primary": {
    "login": "Login",
    "register": "Register",
    "save_changes": "Save Changes",
    "submit_form": "Submit Form",
    "send_message": "Send Message",
    "create_account": "Create Account",
    "continue": "Continue",
    "start_now": "Start Now",
    "get_started": "Get Started",
    "buy_now": "Buy Now"
  },
  "secondary": {
    "cancel": "Cancel",
    "back": "Back",
    "previous": "Previous",
    "skip": "Skip",
    "not_now": "Not Now",
    "maybe_later": "Maybe Later",
    "view_all": "View All",
    "see_more": "See More",
    "read_more": "Read More",
    "learn_more": "Learn More"
  },
  "danger": {
    "delete": "Delete",
    "remove": "Remove",
    "deactivate": "Deactivate",
    "ban_user": "Ban User",
    "block": "Block",
    "report": "Report",
    "flag": "Flag",
    "reject": "Reject",
    "discard": "Discard",
    "clear": "Clear"
  },
  "icon": {
    "edit": "✏️",
    "delete": "🗑️",
    "save": "💾",
    "copy": "📋",
    "share": "📤",
    "download": "⬇️",
    "upload": "⬆️",
    "print": "🖨️",
    "search": "🔍",
    "filter": "🔽"
  }
}
```

### 表单标签 (forms.json)
```json
{
  "labels": {
    "email": "Email Address",
    "password": "Password",
    "confirm_password": "Confirm Password",
    "first_name": "First Name",
    "last_name": "Last Name",
    "full_name": "Full Name",
    "phone_number": "Phone Number",
    "mobile": "Mobile",
    "website": "Website",
    "company": "Company",
    "job_title": "Job Title",
    "address": "Address",
    "street": "Street",
    "city": "City",
    "state": "State",
    "province": "Province",
    "zip_code": "ZIP Code",
    "postal_code": "Postal Code",
    "country": "Country",
    "date_of_birth": "Date of Birth",
    "gender": "Gender",
    "language": "Language",
    "timezone": "Timezone",
    "currency": "Currency"
  },
  "placeholders": {
    "email": "Enter your email",
    "password": "Enter your password",
    "search": "Search...",
    "select_option": "Select an option",
    "enter_value": "Enter value",
    "upload_file": "Upload file",
    "write_message": "Write a message",
    "choose_date": "Choose date",
    "select_time": "Select time"
  },
  "validation": {
    "required": "This field is required",
    "email_invalid": "Please enter a valid email address",
    "password_too_short": "Password must be at least 8 characters",
    "password_mismatch": "Passwords do not match",
    "phone_invalid": "Please enter a valid phone number",
    "url_invalid": "Please enter a valid URL",
    "date_invalid": "Please enter a valid date",
    "number_invalid": "Please enter a valid number",
    "min_length": "Must be at least {{min}} characters",
    "max_length": "Must be no more than {{max}} characters",
    "min_value": "Value must be at least {{min}}",
    "max_value": "Value must be no more than {{max}}"
  },
  "options": {
    "gender": {
      "male": "Male",
      "female": "Female",
      "other": "Other",
      "prefer_not_to_say": "Prefer not to say"
    },
    "yes_no": {
      "yes": "Yes",
      "no": "No"
    },
    "boolean": {
      "true": "True",
      "false": "False"
    }
  }
}
```

### 错误信息 (errors.json)
```json
{
  "general": {
    "unexpected_error": "An unexpected error occurred",
    "network_error": "Network error. Please try again",
    "server_error": "Server error. Please try again later",
    "not_found": "Resource not found",
    "access_denied": "Access denied",
    "unauthorized": "You are not authorized to perform this action",
    "session_expired": "Your session has expired. Please log in again",
    "maintenance": "System is under maintenance"
  },
  "authentication": {
    "login_failed": "Invalid email or password",
    "signup_failed": "Failed to create account",
    "password_reset_failed": "Password reset failed",
    "email_not_verified": "Please verify your email address",
    "too_many_attempts": "Too many attempts. Please try again later",
    "account_locked": "Your account has been locked"
  },
  "validation": {
    "invalid_input": "Invalid input provided",
    "missing_field": "Required field is missing",
    "invalid_format": "Invalid format",
    "file_too_large": "File size exceeds maximum allowed",
    "unsupported_file_type": "Unsupported file type",
    "quota_exceeded": "Storage quota exceeded"
  },
  "api": {
    "rate_limit_exceeded": "Rate limit exceeded",
    "invalid_api_key": "Invalid API key",
    "api_unavailable": "API service is temporarily unavailable",
    "request_timeout": "Request timeout"
  },
  "file": {
    "upload_failed": "File upload failed",
    "file_not_found": "File not found",
    "permission_denied": "Permission denied",
    "disk_space_exceeded": "Insufficient disk space"
  },
  "messages": {
    "try_again": "Please try again",
    "contact_support": "Contact support if the problem persists",
    "check_connection": "Please check your internet connection",
    "reload_page": "Please reload the page",
    "clear_cache": "Try clearing your browser cache",
    "contact_administrator": "Contact administrator for assistance"
  }
}
```

### 日期时间 (dates.json)
```json
{
  "formats": {
    "date": "MM/DD/YYYY",
    "datetime": "MM/DD/YYYY HH:mm:ss",
    "time": "HH:mm:ss",
    "short_date": "MM/DD/YY",
    "long_date": "MMMM DD, YYYY",
    "relative": "relative"
  },
  "formats_zh": {
    "date": "YYYY年MM月DD日",
    "datetime": "YYYY年MM月DD日 HH:mm:ss",
    "time": "HH:mm:ss",
    "short_date": "YY年MM月DD日",
    "long_date": "YYYY年MM月DD日",
    "relative": "relative"
  },
  "months": {
    "full": {
      "january": "January",
      "february": "February",
      "march": "March",
      "april": "April",
      "may": "May",
      "june": "June",
      "july": "July",
      "august": "August",
      "september": "September",
      "october": "October",
      "november": "November",
      "december": "December"
    },
    "short": {
      "jan": "Jan",
      "feb": "Feb",
      "mar": "Mar",
      "apr": "Apr",
      "may": "May",
      "jun": "Jun",
      "jul": "Jul",
      "aug": "Aug",
      "sep": "Sep",
      "oct": "Oct",
      "nov": "Nov",
      "dec": "Dec"
    }
  },
  "months_zh": {
    "full": {
      "january": "一月",
      "february": "二月",
      "march": "三月",
      "april": "四月",
      "may": "五月",
      "june": "六月",
      "july": "七月",
      "august": "八月",
      "september": "九月",
      "october": "十月",
      "november": "十一月",
      "december": "十二月"
    },
    "short": {
      "jan": "1月",
      "feb": "2月",
      "mar": "3月",
      "apr": "4月",
      "may": "5月",
      "jun": "6月",
      "jul": "7月",
      "aug": "8月",
      "sep": "9月",
      "oct": "10月",
      "nov": "11月",
      "dec": "12月"
    }
  },
  "days": {
    "full": {
      "sunday": "Sunday",
      "monday": "Monday",
      "tuesday": "Tuesday",
      "wednesday": "Wednesday",
      "thursday": "Thursday",
      "friday": "Friday",
      "saturday": "Saturday"
    },
    "short": {
      "sun": "Sun",
      "mon": "Mon",
      "tue": "Tue",
      "wed": "Wed",
      "thu": "Thu",
      "fri": "Fri",
      "sat": "Sat"
    }
  },
  "days_zh": {
    "full": {
      "sunday": "星期日",
      "monday": "星期一",
      "tuesday": "星期二",
      "wednesday": "星期三",
      "thursday": "星期四",
      "friday": "星期五",
      "saturday": "星期六"
    },
    "short": {
      "sun": "日",
      "mon": "一",
      "tue": "二",
      "wed": "三",
      "thu": "四",
      "fri": "五",
      "sat": "六"
    }
  }
}
```

### 数字货币 (numbers.json)
```json
{
  "currency": {
    "usd": {
      "symbol": "$",
      "name": "US Dollar",
      "code": "USD",
      "decimal_places": 2
    },
    "cny": {
      "symbol": "¥",
      "name": "Chinese Yuan",
      "code": "CNY",
      "decimal_places": 2
    },
    "eur": {
      "symbol": "€",
      "name": "Euro",
      "code": "EUR",
      "decimal_places": 2
    },
    "jpy": {
      "symbol": "¥",
      "name": "Japanese Yen",
      "code": "JPY",
      "decimal_places": 0
    },
    "gbp": {
      "symbol": "£",
      "name": "British Pound",
      "code": "GBP",
      "decimal_places": 2
    }
  },
  "formatting": {
    "decimal_separator": ".",
    "thousands_separator": ",",
    "currency_position": "before" // before or after
  },
  "formatting_zh": {
    "decimal_separator": ".",
    "thousands_separator": ",",
    "currency_position": "before"
  },
  "percent": {
    "symbol": "%",
    "name": "Percent"
  },
  "units": {
    "k": "K",
    "m": "M",
    "b": "B",
    "t": "T"
  }
}
```

### 国家名称 (countries.json)
```json
{
  "en": {
    "CN": "China",
    "US": "United States",
    "JP": "Japan",
    "KR": "South Korea",
    "GB": "United Kingdom",
    "FR": "France",
    "DE": "Germany",
    "IT": "Italy",
    "ES": "Spain",
    "CA": "Canada",
    "AU": "Australia",
    "RU": "Russia",
    "BR": "Brazil",
    "IN": "India",
    "MX": "Mexico"
  },
  "zh-CN": {
    "CN": "中国",
    "US": "美国",
    "JP": "日本",
    "KR": "韩国",
    "GB": "英国",
    "FR": "法国",
    "DE": "德国",
    "IT": "意大利",
    "ES": "西班牙",
    "CA": "加拿大",
    "AU": "澳大利亚",
    "RU": "俄罗斯",
    "BR": "巴西",
    "IN": "印度",
    "MX": "墨西哥"
  }
}
```

## 工具函数

### 翻译加载器 (src/utils/translation-loader.ts)
```typescript
import fs from 'fs-extra'
import path from 'path'

export interface TranslationLoaderOptions {
  localesPath: string
  languages: string[]
  namespaces: string[]
  fallbackLanguage?: string
}

export interface LoadedTranslations {
  [language: string]: {
    [namespace: string]: Record<string, string>
  }
}

export class TranslationLoader {
  constructor(private options: TranslationLoaderOptions) {}

  async loadAll(): Promise<LoadedTranslations> {
    const { localesPath, languages, namespaces, fallbackLanguage } = this.options
    const translations: LoadedTranslations = {}

    for (const language of languages) {
      translations[language] = {}

      for (const namespace of namespaces) {
        const filePath = path.join(localesPath, language, `${namespace}.json`)

        if (await fs.pathExists(filePath)) {
          translations[language][namespace] = await fs.readJson(filePath)
        } else if (fallbackLanguage) {
          // 使用回退语言
          const fallbackPath = path.join(localesPath, fallbackLanguage, `${namespace}.json`)
          if (await fs.pathExists(fallbackPath)) {
            translations[language][namespace] = await fs.readJson(fallbackPath)
            console.warn(`Translation file not found for ${language}/${namespace}, using fallback`)
          }
        }
      }
    }

    return translations
  }

  async loadLanguage(language: string): Promise<Record<string, Record<string, string>>> {
    const { localesPath, namespaces, fallbackLanguage } = this.options
    const translations: Record<string, Record<string, string>> = {}

    for (const namespace of namespaces) {
      const filePath = path.join(localesPath, language, `${namespace}.json`)

      if (await fs.pathExists(filePath)) {
        translations[namespace] = await fs.readJson(filePath)
      } else if (fallbackLanguage) {
        const fallbackPath = path.join(localesPath, fallbackLanguage, `${namespace}.json`)
        if (await fs.pathExists(fallbackPath)) {
          translations[namespace] = await fs.readJson(fallbackPath)
        }
      }
    }

    return translations
  }
}
```

### 键匹配器 (src/utils/key-matcher.ts)
```typescript
export class KeyMatcher {
  /**
   * 检查键是否存在
   */
  static hasKey(translations: Record<string, any>, key: string): boolean {
    const keys = key.split('.')
    let current = translations

    for (const k of keys) {
      if (current[k] === undefined) {
        return false
      }
      current = current[k]
    }

    return true
  }

  /**
   * 获取键的值
   */
  static getKey(translations: Record<string, any>, key: string, fallback?: string): string {
    const keys = key.split('.')
    let current = translations

    for (const k of keys) {
      if (current[k] === undefined) {
        return fallback || key
      }
      current = current[k]
    }

    return typeof current === 'string' ? current : fallback || key
  }

  /**
   * 设置键的值
   */
  static setKey(translations: Record<string, any>, key: string, value: string): void {
    const keys = key.split('.')
    let current = translations

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i]
      if (current[k] === undefined || typeof current[k] !== 'object') {
        current[k] = {}
      }
      current = current[k]
    }

    current[keys[keys.length - 1]] = value
  }

  /**
   * 获取所有键
   */
  static getAllKeys(translations: Record<string, any>, prefix = ''): string[] {
    const keys: string[] = []

    for (const [key, value] of Object.entries(translations)) {
      const fullKey = prefix ? `${prefix}.${key}` : key

      if (typeof value === 'string') {
        keys.push(fullKey)
      } else if (typeof value === 'object') {
        keys.push(...this.getAllKeys(value, fullKey))
      }
    }

    return keys
  }

  /**
   * 检查两个翻译对象是否同步
   */
  static compare(translations1: Record<string, any>, translations2: Record<string, any>): {
    missing: string[]
    extra: string[]
    different: { key: string; value1: string; value2: string }[]
  } {
    const keys1 = new Set(this.getAllKeys(translations1))
    const keys2 = new Set(this.getAllKeys(translations2))

    const missing = Array.from(keys1).filter(k => !keys2.has(k))
    const extra = Array.from(keys2).filter(k => !keys1.has(k))
    const different: { key: string; value1: string; value2: string }[] = []

    for (const key of keys1) {
      if (keys2.has(key)) {
        const value1 = this.getKey(translations1, key)
        const value2 = this.getKey(translations2, key)
        if (value1 !== value2) {
          different.push({ key, value1, value2 })
        }
      }
    }

    return { missing, extra, different }
  }
}
```

### 回退解析器 (src/utils/fallback-resolver.ts)
```typescript
export class FallbackResolver {
  private fallbacks: Record<string, string[]> = {}

  /**
   * 添加回退语言
   */
  addFallback(language: string, fallback: string): void {
    if (!this.fallbacks[language]) {
      this.fallbacks[language] = []
    }
    this.fallbacks[language].push(fallback)
  }

  /**
   * 获取翻译，尝试回退语言
   */
  resolve(
    translations: Record<string, Record<string, any>>,
    key: string,
    language: string
  ): string {
    // 尝试当前语言
    if (KeyMatcher.hasKey(translations[language] || {}, key)) {
      return KeyMatcher.getKey(translations[language] || {}, key)
    }

    // 尝试回退语言
    const fallbacks = this.fallbacks[language] || []
    for (const fallback of fallbacks) {
      if (translations[fallback] && KeyMatcher.hasKey(translations[fallback], key)) {
        return KeyMatcher.getKey(translations[fallback], key)
      }
    }

    // 返回键本身作为最后的回退
    return key
  }

  /**
   * 初始化常见回退链
   */
  initDefaultFallbacks(): void {
    // zh-CN -> zh-TW -> en
    this.addFallback('zh-CN', 'zh-TW')
    this.addFallback('zh-CN', 'en')
    this.addFallback('zh-TW', 'en')

    // fr-FR -> fr -> en
    this.addFallback('fr-FR', 'fr')
    this.addFallback('fr-FR', 'en')
    this.addFallback('fr', 'en')

    // pt-BR -> pt -> es -> en
    this.addFallback('pt-BR', 'pt')
    this.addFallback('pt-BR', 'es')
    this.addFallback('pt-BR', 'en')
    this.addFallback('pt', 'es')
    this.addFallback('pt', 'en')
    this.addFallback('es', 'en')
  }
}
```

## 验证器

### 结构验证器 (src/validators/structure.validator.ts)
```typescript
export interface StructureValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export class StructureValidator {
  validate(translations: Record<string, any>): StructureValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // 检查所有值都是字符串
    const checkValues = (obj: any, path = ''): void => {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key

        if (typeof value === 'string') {
          // 检查字符串是否为空
          if (value.trim() === '') {
            warnings.push(`Empty translation at ${currentPath}`)
          }
        } else if (typeof value === 'object' && value !== null) {
          // 递归检查嵌套对象
          checkValues(value, currentPath)
        } else {
          errors.push(`Invalid value type at ${currentPath}: ${typeof value}`)
        }
      }
    }

    checkValues(translations)

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }
}
```

### 完整性验证器 (src/validators/completeness.validator.ts)
```typescript
export interface CompletenessValidationResult {
  isComplete: boolean
  missingKeys: { key: string; languages: string[] }[]
  completenessByLanguage: { language: string; percentage: number }[]
}

export class CompletenessValidator {
  validate(
    translations: Record<string, Record<string, any>>
  ): CompletenessValidationResult {
    const languages = Object.keys(translations)
    const allKeys = new Set<string>()

    // 收集所有键
    for (const language of languages) {
      const keys = KeyMatcher.getAllKeys(translations[language] || {})
      keys.forEach(key => allKeys.add(key))
    }

    const missingKeys: { key: string; languages: string[] }[] = []
    const completenessByLanguage: { language: string; percentage: number }[] = []

    // 检查每种语言的缺失键
    for (const key of allKeys) {
      const missingLanguages: string[] = []
      let presentCount = 0

      for (const language of languages) {
        if (!KeyMatcher.hasKey(translations[language] || {}, key)) {
          missingLanguages.push(language)
        } else {
          presentCount++
        }
      }

      if (missingLanguages.length > 0) {
        missingKeys.push({ key, languages: missingLanguages })
      }

      const percentage = (presentCount / languages.length) * 100
      completenessByLanguage.push({ language: languages[0], percentage })
    }

    return {
      isComplete: missingKeys.length === 0,
      missingKeys,
      completenessByLanguage,
    }
  }
}
```

## 主入口 (src/index.ts)

```typescript
// 导出翻译加载器
export { TranslationLoader, type TranslationLoaderOptions } from './utils/translation-loader'
export { KeyMatcher } from './utils/key-matcher'
export { FallbackResolver } from './utils/fallback-resolver'

// 导出验证器
export { StructureValidator } from './validators/structure.validator'
export { CompletenessValidator } from './validators/completeness.validator'

// 导出类型
export type { TranslationLoaderOptions, LoadedTranslations } from './utils/translation-loader'
export type { StructureValidationResult } from './validators/structure.validator'
export type { CompletenessValidationResult } from './validators/completeness.validator'
```

## 依赖详情

### 开发依赖
```json
{
  "@tongdelove/eslint-config": "workspace:*",    // ESLint配置
  "eslint": "^8.0.0",                           // ESLint
  "@typescript-eslint/eslint-plugin": "^7.0.0", // ESLint TypeScript插件
  "@typescript-eslint/parser": "^7.0.0",        // ESLint解析器
  "typescript": "^5.4.5"                         // TypeScript
}
```

## 使用示例

### 加载翻译
```typescript
import { TranslationLoader } from '@tongdelove/common-i18n'

const loader = new TranslationLoader({
  localesPath: './src/locales',
  languages: ['en', 'zh-CN', 'zh-TW', 'ja'],
  namespaces: ['common', 'buttons', 'forms', 'errors', 'dates'],
  fallbackLanguage: 'en',
})

const translations = await loader.loadAll()
```

### 验证翻译
```typescript
import { CompletenessValidator } from '@tongdelove/common-i18n'

const validator = new CompletenessValidator()
const result = validator.validate(translations)

console.log(`Completeness: ${result.completenessByLanguage[0].percentage.toFixed(2)}%`)
if (!result.isComplete) {
  console.error('Missing keys:', result.missingKeys)
}
```

### 检查同步
```typescript
import { KeyMatcher } from '@tongdelove/common-i18n'

const enTranslations = translations['en']
const zhTranslations = translations['zh-CN']

const result = KeyMatcher.compare(enTranslations, zhTranslations)
console.log('Missing keys in zh-CN:', result.missing)
console.log('Different translations:', result.different)
```

## 最佳实践

### 1. 键命名规范
- 使用层次化的点分隔符：`navigation.menu.dashboard`
- 保持键名简洁但有意义
- 避免在键中使用特殊字符

### 2. 文件组织
- 按功能模块分组翻译
- 使用一致的命名空间
- 保持文件的结构统一

### 3. 质量保证
- 定期验证翻译完整性
- 使用回退机制处理缺失翻译
- 保持翻译的版本同步

### 4. 性能优化
- 按需加载翻译文件
- 使用缓存减少读取次数
- 扁平化深层嵌套结构

## 常见问题

### Q: 如何处理复数形式？
A:
```json
{
  "item": {
    "one": "1 item",
    "other": "{{count}} items"
  }
}
```

### Q: 如何处理占位符？
A:
```json
{
  "greeting": "Hello, {{name}}!",
  "welcome_message": "Welcome, {{firstName}} {{lastName}}!"
}
```

### Q: 如何处理HTML？
A:
```json
{
  "notice": "Please read our <a href='/terms'>Terms of Service</a>"
}
```

## 相关资源

- [i18next](https://www.i18next.com/)
- [react-i18next](https://react.i18next.com/)
- [Unicode CLDR](https://cldr.unicode.org/)

---

*最后更新: 2025-11-02*
