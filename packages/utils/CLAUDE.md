# Utils共享包 - packages/utils

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **utils**

## 概述

**通用工具函数库** - 提供项目中通用的工具函数和辅助方法

## 技术栈

- **语言**: TypeScript 5.4.5
- **工具库**: Lodash, Date-fns
- **构建**: TypeScript Compiler

## 目录结构

```
packages/utils/
├── src/
│   ├── array/                  # 数组工具
│   │   ├── index.ts
│   │   ├── chunk.ts            # 数组分块
│   │   ├── unique.ts           # 去重
│   │   └── flatten.ts          # 扁平化
│   ├── object/                 # 对象工具
│   │   ├── index.ts
│   │   ├── pick.ts             # 选择属性
│   │   ├── omit.ts             # 排除属性
│   │   └── deepClone.ts        # 深拷贝
│   ├── string/                 # 字符串工具
│   │   ├── index.ts
│   │   ├── camelCase.ts        # 驼峰命名
│   │   ├── kebabCase.ts        # 短横线命名
│   │   └── truncate.ts         # 截断字符串
│   ├── date/                   # 日期工具
│   │   ├── index.ts
│   │   ├── format.ts           # 格式化
│   │   ├── diff.ts             # 日期差
│   │   └── isValid.ts          # 验证日期
│   ├── validation/             # 验证工具
│   │   ├── index.ts
│   │   ├── isEmail.ts          # 邮箱验证
│   │   ├── isPhone.ts          # 手机验证
│   │   └── isUrl.ts            # URL验证
│   ├── storage/                # 存储工具
│   │   ├── index.ts
│   │   ├── localStorage.ts     # 本地存储
│   │   └── sessionStorage.ts   # 会话存储
│   └── index.ts                # 主入口
├── tests/                      # 测试文件
├── package.json
└── tsconfig.json
```

## 核心工具函数

### 数组工具 (array/)

#### chunk - 数组分块
```typescript
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// 使用示例
chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
```

#### unique - 数组去重
```typescript
export const unique = <T>(array: T[], key?: keyof T): T[] => {
  if (!key) {
    return [...new Set(array)];
  }
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};
```

### 对象工具 (object/)

#### pick - 选择属性
```typescript
export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};
```

#### deepClone - 深拷贝
```typescript
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const clonedObj = {} as { [key: string]: any };
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj as T;
  }

  return obj;
};
```

### 字符串工具 (string/)

#### camelCase - 驼峰命名
```typescript
export const camelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};
```

#### truncate - 截断字符串
```typescript
export const truncate = (str: string, length: number, suffix = '...'): string => {
  if (str.length <= length) {
    return str;
  }
  return str.slice(0, length) + suffix;
};
```

### 日期工具 (date/)

#### format - 格式化日期
```typescript
export const format = (
  date: Date | string,
  format: string = 'YYYY-MM-DD'
): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};
```

### 验证工具 (validation/)

#### isEmail - 邮箱验证
```typescript
export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

#### isPhone - 手机验证
```typescript
export const isPhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};
```

### 存储工具 (storage/)

#### localStorage
```typescript
export const localStorage = {
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('localStorage set error:', error);
    }
  },

  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue ?? null;
    } catch (error) {
      console.error('localStorage get error:', error);
      return defaultValue ?? null;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('localStorage remove error:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('localStorage clear error:', error);
    }
  }
};
```

## 使用示例

### 基础使用

```typescript
import { chunk, unique, camelCase, isEmail } from '@tongdelove/utils';

// 数组分块
const batches = chunk([1, 2, 3, 4, 5, 6], 2);
// [[1, 2], [3, 4], [5, 6]]

// 数组去重
const numbers = unique([1, 2, 2, 3, 3, 4]);
// [1, 2, 3, 4]

// 字符串转换
const camelStr = camelCase('hello-world');
// 'helloWorld'

// 验证邮箱
const validEmail = isEmail('user@example.com');
// true
```

### 在React中使用

```typescript
import { useState, useEffect } from 'react';
import { localStorage } from '@tongdelove/utils';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return localStorage.get(key, initialValue);
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.set(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};
```

## 性能优化

### 1. 缓存计算结果
对于复杂计算，使用缓存：
```typescript
const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};
```

### 2. 类型守卫
提供类型守卫函数：
```typescript
export const isDefined = <T>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
};

export const isEmpty = (value: unknown): boolean => {
  if (value == null) return true;
  if (Array.isArray(value) || typeof value === 'string') return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};
```

## 测试策略

### 单元测试示例

```typescript
import { describe, it, expect } from 'vitest';
import { chunk, unique, camelCase } from '../src';

describe('chunk', () => {
  it('should chunk array into smaller arrays', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('should handle chunk size larger than array', () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });
});

describe('unique', () => {
  it('should remove duplicates from array', () => {
    expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
  });
});
```

## 最佳实践

### 1. 函数设计原则
- **单一职责**: 每个函数只做一件事
- **纯函数**: 避免副作用，易于测试
- **类型安全**: 提供完整的TypeScript类型定义

### 2. 错误处理
```typescript
export const safeGet = <T>(obj: any, path: string, defaultValue?: T): T | undefined => {
  try {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      if (result == null) return defaultValue;
      result = result[key];
    }
    return result !== undefined ? result : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};
```

### 3. 性能考虑
- 使用迭代而非递归 (避免栈溢出)
- 避免在循环中创建新对象
- 使用合适的算法复杂度

## 常见问题

### Q: 如何处理循环引用？
A: 使用 `deepClone` 时检测循环引用：
```typescript
export const deepClone = <T>(obj: T, visited = new WeakSet()): T => {
  if (obj === null || typeof obj !== 'object') return obj;

  if (visited.has(obj)) throw new Error('Circular reference detected');
  visited.add(obj);

  // ... 实现深拷贝逻辑
};
```

### Q: 如何优化大数据集处理？
A: 使用分块和懒加载：
```typescript
export const processInChunks = async <T>(
  items: T[],
  processor: (chunk: T[]) => Promise<void>,
  chunkSize: number = 1000
) => {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    await processor(chunk);
    // 可选: 添加延迟以防止阻塞
    await new Promise(resolve => setTimeout(resolve, 0));
  }
};
```

### Q: 如何添加新的工具函数？
A:
1. 在相应的子目录中创建文件
2. 导出函数和类型
3. 在子目录的 `index.ts` 中导出
4. 在主 `index.ts` 中更新
5. 添加测试用例

## 相关资源

- [Lodash文档](https://lodash.com/docs)
- [Date-fns文档](https://date-fns.org/docs)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

---

*最后更新: 2025-11-02*
