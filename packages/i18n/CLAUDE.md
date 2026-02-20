# I18n共享包 - packages/i18n

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **i18n**

## 概述

**国际化工具包** - 强大的国际化工作流程工具，支持提取、扫描和生成翻译文件

## 技术栈

- **框架**: i18next-scanner 4.4.0
- **构建**: esbuild 0.19.10, TypeScript 5.4.5
- **工具**: fast-glob 3.3.2, ts-morph 21.0.1
- **处理**: gulp-sort 2.0.0, vinyl-fs 3.0.3
- **数据**: crc 4.3.2, csv-stringify 6.4.5
- **依赖**: lodash.get 4.4.2, lodash.without 4.4.0, emoji-regex 10.3.0

## 目录结构

```
packages/i18n/
├── src/
│   ├── scanner/                 # 扫描器
│   │   ├── code-scanner.ts      # 代码扫描
│   │   ├── react-scanner.ts     # React扫描
│   │   └── extract-keys.ts      # 提取键
│   ├── generators/              # 生成器
│   │   ├── json-generator.ts    # JSON生成器
│   │   ├── csv-generator.ts     # CSV生成器
│   │   └── po-generator.ts      # PO生成器
│   ├── loaders/                 # 加载器
│   │   ├── json-loader.ts       # JSON加载器
│   │   ├── yaml-loader.ts       # YAML加载器
│   │   └── csv-loader.ts        # CSV加载器
│   ├── formats/                 # 格式化器
│   │   ├── json-formatter.ts    # JSON格式化
│   │   ├── csv-formatter.ts     # CSV格式化
│   │   └── po-formatter.ts      # PO格式化
│   ├── utils/                   # 工具函数
│   │   ├── path.utils.ts        # 路径工具
│   │   ├── file.utils.ts        # 文件工具
│   │   └── validation.utils.ts  # 验证工具
│   ├── types/                   # 类型定义
│   │   ├── translation.types.ts # 翻译类型
│   │   ├── scanner.types.ts     # 扫描器类型
│   │   └── generator.types.ts   # 生成器类型
│   ├── config/                  # 配置文件
│   │   ├── scanner.config.ts    # 扫描器配置
│   │   ├── generator.config.ts  # 生成器配置
│   │   └── i18n.config.ts       # I18N配置
│   ├── commands/                # 命令行
│   │   ├── extract.ts           # 提取命令
│   │   ├── generate.ts          # 生成命令
│   │   ├── validate.ts          # 验证命令
│   │   └── init.ts              # 初始化命令
│   └── index.ts                 # 主入口
├── dist/                        # 构建输出
├── package.json
└── tsconfig.json
```

## 核心功能

### 1. 代码扫描 (scanner/)

#### 代码扫描器 (src/scanner/code-scanner.ts)
```typescript
import { fastGlob } from 'fast-glob'
import { tsMorph } from 'ts-morph'
import { Project } from 'ts-morph'

export interface ScanOptions {
  include: string[]
  exclude?: string[]
  namespaces?: string[]
  defaultNamespace?: string
  outputPath?: string
}

export interface ScanResult {
  keys: TranslationKey[]
  files: string[]
  statistics: {
    totalFiles: number
    scannedFiles: number
    totalKeys: number
    newKeys: number
    modifiedKeys: number
  }
}

export interface TranslationKey {
  key: string
  path: string
  line: number
  column: number
  namespace: string
  description?: string
  comments?: string[]
  defaultValue?: string
  context?: string
}

export class CodeScanner {
  private project: Project

  constructor() {
    this.project = new Project({
      tsConfigFilePath: 'tsconfig.json',
    })
  }

  async scan(options: ScanOptions): Promise<ScanResult> {
    const files = await fastGlob(options.include, {
      exclude: options.exclude || [],
    })

    const keys: TranslationKey[] = []
    let scannedFiles = 0

    for (const file of files) {
      try {
        const sourceFile = this.project.addSourceFileAtPath(file)
        const fileKeys = this.scanSourceFile(sourceFile, options)
        keys.push(...fileKeys)
        scannedFiles++
      } catch (error) {
        console.warn(`Failed to scan file ${file}:`, error)
      }
    }

    return {
      keys,
      files,
      statistics: {
        totalFiles: files.length,
        scannedFiles,
        totalKeys: keys.length,
        newKeys: 0,
        modifiedKeys: 0,
      },
    }
  }

  private scanSourceFile(
    sourceFile: tsMorph.SourceFile,
    options: ScanOptions
  ): TranslationKey[] {
    const keys: TranslationKey[] = []

    // 扫描t()函数调用
    sourceFile.getDescendantsOfKind(tsMorph.SyntaxKind.CallExpression).forEach((call) => {
      const expression = call.getExpression()
      if (tsMorph.isIdentifier(expression) && expression.getText() === 't') {
        const args = call.getArguments()
        if (args.length > 0) {
          const keyArg = args[0]
          if (tsMorph.isStringLiteral(keyArg)) {
            const key = keyArg.getLiteralValue()
            const { pos } = keyArg
            const { line, column } = sourceFile.getLineAndColumnAtPos(pos)

            keys.push({
              key,
              path: sourceFile.getFilePath(),
              line,
              column,
              namespace: options.defaultNamespace || 'common',
            })
          }
        }
      }
    })

    // 扫描useTranslation hook
    sourceFile.getDescendantsOfKind(tsMorph.SyntaxKind.CallExpression).forEach((call) => {
      const expression = call.getExpression()
      if (tsMorph.isPropertyAccessExpression(expression)) {
        const propName = expression.getName()
        if (propName === 't' || propName === 'i18n') {
          const args = call.getArguments()
          if (args.length > 0) {
            const keyArg = args[0]
            if (tsMorph.isStringLiteral(keyArg)) {
              const key = keyArg.getLiteralValue()
              const { pos } = keyArg
              const { line, column } = sourceFile.getLineAndColumnAtPos(pos)

              keys.push({
                key,
                path: sourceFile.getFilePath(),
                line,
                column,
                namespace: options.defaultNamespace || 'common',
              })
            }
          }
        }
      }
    })

    return keys
  }
}

// 使用示例
const scanner = new CodeScanner()
const result = await scanner.scan({
  include: ['src/**/*.{ts,tsx,js,jsx}'],
  exclude: ['node_modules', 'dist', 'build'],
  defaultNamespace: 'common',
})

console.log('Scanned keys:', result.keys)
```

#### React扫描器 (src/scanner/react-scanner.ts)
```typescript
import { fastGlob } from 'fast-glob'
import { parse } from '@babel/parser'
import { traverse } from '@babel/traverse'
import { CallExpression, StringLiteral } from '@babel/types'

export class ReactScanner {
  async scanReact(options: ScanOptions): Promise<ScanResult> {
    const files = await fastGlob(options.include, {
      exclude: options.exclude || [],
      extensions: ['.tsx', '.jsx'],
    })

    const keys: TranslationKey[] = []

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8')
      const ast = parse(content, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
      })

      traverse(ast, {
        CallExpression: (path) => {
          const node = path.node as CallExpression

          // 检测 t('key') 或 i18n.t('key')
          if (
            node.callee.type === 'Identifier' &&
            node.callee.name === 't' &&
            node.arguments.length > 0 &&
            node.arguments[0].type === 'StringLiteral'
          ) {
            const key = (node.arguments[0] as StringLiteral).value
            const { line, column } = path.node.loc!.start

            keys.push({
              key,
              path: file,
              line,
              column,
              namespace: options.defaultNamespace || 'common',
            })
          }

          // 检测 useTranslation()
          if (
            node.callee.type === 'Identifier' &&
            node.callee.name === 'useTranslation' &&
            node.arguments.length === 0
          ) {
            // 处理useTranslation hook的使用
          }
        },
      })
    }

    return {
      keys,
      files,
      statistics: {
        totalFiles: files.length,
        scannedFiles: files.length,
        totalKeys: keys.length,
        newKeys: 0,
        modifiedKeys: 0,
      },
    }
  }
}
```

### 2. 翻译生成 (generators/)

#### JSON生成器 (src/generators/json-generator.ts)
```typescript
import fs from 'fs-extra'
import path from 'path'

export interface JsonGenerateOptions {
  outputPath: string
  languages: string[]
  namespace: string
  keys: TranslationKey[]
  metadata?: {
    project?: string
    version?: string
    timestamp?: string
  }
}

export class JsonGenerator {
  async generate(options: JsonGenerateOptions): Promise<void> {
    const { outputPath, languages, namespace, keys } = options

    for (const lang of languages) {
      const filePath = path.join(outputPath, lang, `${namespace}.json`)
      await fs.ensureFile(filePath)

      const translations: Record<string, string> = {}

      // 生成默认翻译
      keys.forEach((key) => {
        translations[key.key] = key.defaultValue || key.key
      })

      await fs.writeJson(filePath, translations, { spaces: 2 })

      console.log(`Generated ${filePath} with ${keys.length} keys`)
    }
  }
}
```

#### CSV生成器 (src/generators/csv-generator.ts)
```typescript
import { stringify } from 'csv-stringify'
import fs from 'fs-extra'

export interface CsvGenerateOptions {
  outputPath: string
  languages: string[]
  namespace: string
  keys: TranslationKey[]
}

export class CsvGenerator {
  async generate(options: CsvGenerateOptions): Promise<void> {
    const { outputPath, languages, namespace, keys } = options

    const headers = ['key', ...languages, 'description', 'context']
    const records: any[][] = []

    keys.forEach((key) => {
      const record = [key.key]
      languages.forEach(() => {
        record.push(key.defaultValue || key.key)
      })
      record.push(key.description || '')
      record.push(key.context || '')
      records.push(record)
    })

    const filePath = path.join(outputPath, `${namespace}.csv`)
    await fs.ensureFile(filePath)

    const stringifier = stringify({ header: true, columns: headers })
    const writable = fs.createWriteStream(filePath)

    stringifier.pipe(writable)
    records.forEach((record) => stringifier.write(record))
    stringifier.end()

    console.log(`Generated ${filePath} with ${keys.length} keys`)
  }
}
```

### 3. 翻译加载 (loaders/)

#### JSON加载器 (src/loaders/json-loader.ts)
```typescript
import fs from 'fs-extra'

export interface JsonLoadOptions {
  filePath: string
  namespace?: string
}

export async function loadJsonTranslations(options: JsonLoadOptions): Promise<Record<string, string>> {
  const { filePath } = options

  if (!(await fs.pathExists(filePath))) {
    throw new Error(`Translation file not found: ${filePath}`)
  }

  const content = await fs.readFile(filePath, 'utf-8')
  const translations = JSON.parse(content)

  return translations
}

export async function saveJsonTranslations(
  filePath: string,
  translations: Record<string, string>
): Promise<void> {
  await fs.ensureFile(filePath)
  await fs.writeFile(filePath, JSON.stringify(translations, null, 2), 'utf-8')
}
```

#### CSV加载器 (src/loaders/csv-loader.ts)
```typescript
import { parse } from 'csv-parse'
import fs from 'fs-extra'

export async function loadCsvTranslations(
  filePath: string,
  languages: string[]
): Promise<Record<string, Record<string, string>>> {
  const content = await fs.readFile(filePath, 'utf-8')

  return new Promise((resolve, reject) => {
    const translations: Record<string, Record<string, string>> = {}
    const parser = parse({ columns: true, skip_empty_lines: true })

    parser.on('readable', () => {
      let record
      while ((record = parser.read()) !== null) {
        const key = record.key
        languages.forEach((lang) => {
          if (!translations[lang]) {
            translations[lang] = {}
          }
          translations[lang][key] = record[lang] || key
        })
      }
    })

    parser.on('error', reject)
    parser.on('end', () => {
      resolve(translations)
    })

    parser.write(content)
    parser.end()
  })
}
```

### 4. 翻译验证 (utils/validation.utils.ts)
```typescript
export interface ValidationOptions {
  requiredLanguages: string[]
  checkMissing: boolean
  checkEmpty: boolean
  checkDuplicates: boolean
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

export interface ValidationError {
  type: 'missing_key' | 'missing_translation' | 'empty_translation' | 'duplicate_key'
  key: string
  language?: string
  message: string
}

export interface ValidationWarning {
  type: 'unused_key' | 'similar_translation'
  key: string
  language?: string
  message: string
}

export class TranslationValidator {
  validate(
    translations: Record<string, Record<string, string>>,
    keys: string[],
    options: ValidationOptions
  ): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []

    // 检查缺失的键
    if (options.checkMissing) {
      options.requiredLanguages.forEach((lang) => {
        const langTranslations = translations[lang] || {}
        keys.forEach((key) => {
          if (!(key in langTranslations)) {
            errors.push({
              type: 'missing_key',
              key,
              language: lang,
              message: `Missing translation for key "${key}" in language "${lang}"`,
            })
          }
        })
      })
    }

    // 检查空翻译
    if (options.checkEmpty) {
      options.requiredLanguages.forEach((lang) => {
        const langTranslations = translations[lang] || {}
        Object.entries(langTranslations).forEach(([key, value]) => {
          if (!value || value.trim() === '') {
            errors.push({
              type: 'empty_translation',
              key,
              language: lang,
              message: `Empty translation for key "${key}" in language "${lang}"`,
            })
          }
        })
      })
    }

    // 检查重复的键
    if (options.checkDuplicates) {
      const allKeys = new Set<string>()
      options.requiredLanguages.forEach((lang) => {
        const langTranslations = translations[lang] || {}
        Object.keys(langTranslations).forEach((key) => {
          if (allKeys.has(key)) {
            errors.push({
              type: 'duplicate_key',
              key,
              message: `Duplicate key "${key}" found in multiple languages`,
            })
          } else {
            allKeys.add(key)
          }
        })
      })
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }
}

// 使用示例
const validator = new TranslationValidator()
const result = validator.validate(
  translations,
  keys,
  {
    requiredLanguages: ['en', 'zh-CN'],
    checkMissing: true,
    checkEmpty: true,
    checkDuplicates: true,
  }
)

if (!result.isValid) {
  console.error('Validation failed:', result.errors)
}
```

### 5. 命令行工具 (commands/)

#### 提取命令 (src/commands/extract.ts)
```typescript
import { CodeScanner } from '../scanner/code-scanner'
import { JsonGenerator } from '../generators/json-generator'

export interface ExtractCommandOptions {
  include: string[]
  exclude?: string[]
  languages: string[]
  outputPath: string
  defaultNamespace?: string
}

export async function extractCommand(options: ExtractCommandOptions): Promise<void> {
  console.log('Starting translation extraction...')

  const scanner = new CodeScanner()
  const result = await scanner.scan({
    include: options.include,
    exclude: options.exclude || [],
    defaultNamespace: options.defaultNamespace || 'common',
  })

  console.log(`Found ${result.keys.length} translation keys`)

  const generator = new JsonGenerator()
  await generator.generate({
    outputPath: options.outputPath,
    languages: options.languages,
    namespace: options.defaultNamespace || 'common',
    keys: result.keys,
  })

  console.log('Extraction completed successfully!')
}

// 使用
extractCommand({
  include: ['src/**/*.{ts,tsx}'],
  languages: ['en', 'zh-CN'],
  outputPath: './public/locales',
  defaultNamespace: 'common',
})
```

#### 验证命令 (src/commands/validate.ts)
```typescript
import { loadJsonTranslations } from '../loaders/json-loader'
import { TranslationValidator } from '../utils/validation.utils'

export interface ValidateCommandOptions {
  translationsPath: string
  languages: string[]
  namespace: string
  checkMissing: boolean
  checkEmpty: boolean
}

export async function validateCommand(options: ValidateCommandOptions): Promise<void> {
  console.log('Starting translation validation...')

  const translations: Record<string, Record<string, string>> = {}

  for (const lang of options.languages) {
    const filePath = `${options.translationsPath}/${lang}/${options.namespace}.json`
    translations[lang] = await loadJsonTranslations({ filePath })
  }

  const validator = new TranslationValidator()
  const result = validator.validate(
    translations,
    [],
    {
      requiredLanguages: options.languages,
      checkMissing: options.checkMissing,
      checkEmpty: options.checkEmpty,
      checkDuplicates: true,
    }
  )

  if (result.isValid) {
    console.log('✅ All translations are valid!')
  } else {
    console.error('❌ Validation failed:')
    result.errors.forEach((error) => {
      console.error(`  - ${error.message}`)
    })
  }
}
```

## 依赖详情

### 核心依赖
```json
{
  "i18next-scanner": "^4.4.0",              // 扫描器
  "fast-glob": "^3.3.2",                    // 文件匹配
  "ts-morph": "^21.0.1",                    // TypeScript AST
  "gulp-sort": "^2.0.0",                    // 排序
  "vinyl-fs": "3.0.3",                      // 文件流
  "crc": "^4.3.2",                          // CRC校验
  "csv-stringify": "^6.4.5",                // CSV处理
  "emoji-regex": "^10.3.0",                 // Emoji正则
  "esbuild": "^0.19.10",                    // 构建工具
  "lodash.get": "^4.4.2",                   // 获取嵌套值
  "lodash.without": "^4.4.0"                // 移除元素
}
```

### 开发依赖
```json
{
  "@tongdelove/eslint-config": "workspace:*", // ESLint配置
  "@tongdelove/typescript-config": "workspace:^", // TypeScript配置
  "@types/fs-extra": "^11.0.4",              // FS Extra类型
  "@types/gulp-sort": "^2.0.4",              // Gulp Sort类型
  "@types/lodash.get": "^4.4.9",             // Lodash类型
  "@types/lodash.without": "^4.4.9",         // Lodash类型
  "@types/vinyl-fs": "^3.0.5"                // Vinyl FS类型
}
```

## 开发命令

```bash
# 构建
pnpm build                                   # TypeScript编译
pnpm dev                                     # 监听模式编译

# 代码质量
pnpm lint                                    # ESLint检查
pnpm lint:eslint                             // ESLint检查
pnpm lint:prettier                           // Prettier检查

# 清理
pnpm clean                                   # 清理dist目录
```

## 使用示例

### 在项目中提取翻译
```typescript
import { extractCommand } from '@tongdelove/i18n'

// 提取所有翻译键
await extractCommand({
  include: ['src/**/*.{ts,tsx,js,jsx}'],
  exclude: ['node_modules', 'dist'],
  languages: ['en', 'zh-CN', 'ja', 'ko'],
  outputPath: './public/locales',
  defaultNamespace: 'common',
})
```

### 生成翻译文件
```typescript
import { JsonGenerator } from '@tongdelove/i18n'

const generator = new JsonGenerator()
await generator.generate({
  outputPath: './public/locales',
  languages: ['en', 'zh-CN'],
  namespace: 'common',
  keys: [
    { key: 'welcome', path: 'src/App.tsx', line: 10, column: 5 },
    { key: 'logout', path: 'src/components/Header.tsx', line: 20, column: 3 },
  ],
})
```

### 验证翻译文件
```typescript
import { validateCommand } from '@tongdelove/i18n'

await validateCommand({
  translationsPath: './public/locales',
  languages: ['en', 'zh-CN', 'ja', 'ko'],
  namespace: 'common',
  checkMissing: true,
  checkEmpty: true,
})
```

## 配置文件

### i18n.config.ts
```typescript
export const i18nConfig = {
  // 默认语言
  defaultLanguage: 'zh-CN',

  // 支持的语言
  supportedLanguages: ['zh-CN', 'en', 'ja', 'ko', 'es', 'fr', 'de'],

  // 命名空间
  namespaces: ['common', 'auth', 'dashboard', 'settings'],

  // 扫描配置
  scanner: {
    include: ['src/**/*.{ts,tsx,js,jsx}'],
    exclude: ['node_modules', 'dist', 'build', 'tests'],
    defaultNamespace: 'common',
  },

  // 生成配置
  generator: {
    outputPath: './public/locales',
    format: 'json', // json, csv, po
    metadata: {
      project: 'Tongdelove',
      version: '1.0.0',
    },
  },

  // 验证配置
  validation: {
    requiredLanguages: ['zh-CN', 'en'],
    checkMissing: true,
    checkEmpty: true,
    checkDuplicates: true,
  },
}
```

## 最佳实践

### 1. 键命名规范
- 使用点分隔的层级结构：`dashboard.user.profile`
- 保持键名简洁有意义
- 避免在键中使用特殊字符

### 2. 翻译组织
- 按功能模块分组
- 使用命名空间分离不同上下文
- 公共翻译放在`common`命名空间

### 3. 代码扫描
- 使用TypeScript AST进行准确解析
- 区分静态字符串和动态内容
- 处理嵌套的组件结构

### 4. 文件管理
- 保持翻译文件的结构一致
- 定期验证和清理未使用的键
- 使用版本控制管理翻译变更

## 常见问题

### Q: 如何处理动态翻译键？
A:
```typescript
// ❌ 避免
const key = `greeting.${userType}`
t(key)

// ✅ 推荐
const key = userType === 'admin' ? 'greeting.admin' : 'greeting.user'
t(key)
```

### Q: 如何处理复数翻译？
A:
```typescript
// 使用计数参数
t('item_count', { count: items.length })
```

### Q: 如何处理嵌套对象？
A:
```typescript
// 保持扁平的键结构
t('user.profile.name')

// 避免嵌套对象
// t('user.profile', { name: 'John' })
```

## 相关资源

- [i18next文档](https://www.i18next.com/)
- [react-i18next文档](https://react.i18next.com/)
- [CSV规范](https://tools.ietf.org/html/rfc4180)

---

*最后更新: 2025-11-02*
