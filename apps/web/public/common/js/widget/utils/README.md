# 交易线工具脚本

    utils
     |-- base64.js // base64加密解密
     |-- md5.js // md5加密
     `-- verify.js // 交易常用表单验证

### base64

base64加密解密

#### encode

> base64加密

参数： `string` - 字符串

返回： `string` - 加密后的字符串

示例： `base64.encode('abc')`

输出： `YWJj`

#### decode

> base64解密

参数： `string` - 字符串

返回： `string` - 解密后的字符串

示例： `base64.decode('YWJj')`

输出： `abc`

### md5

> md5加密

参数： `string` - 字符串

返回： `string` - 加密后的字符串

示例： `md5('abc')`

输出： `900150983cd24fb0d6963f7d28e17f72`

### verify

常用表单验证

#### validSmsCode

> 验证短信验证码格式

参数： `string` - 短信验证码

返回： `bool` - 短信验证码是否有效

示例： `verify.validSmsCode('439121')`

输出： true

#### validMobile

> 验证手机格式

参数： `string` - 手机号码

返回： `bool` - 手机号码是否有效

示例： `verify.validMobile('17617811711')`

输出： true

#### validName

> 验证真实姓名格式

参数： `string` - 真实姓名

返回： `bool` - 真实姓名是否有效

示例： `verify.validName('扑街')`

输出： true

#### validIDCard

> 验证身份证格式

参数： `string` - 身份证

返回： `bool` - 身份证是否有效

示例： `verify.validIDCard('430703199009290074')`

输出： true

---

## 单元测试

### 配置

    sudo cnpm install mocha -g

### 测试

	mocha tester/tester

