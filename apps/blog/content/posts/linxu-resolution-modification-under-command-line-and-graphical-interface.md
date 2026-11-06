---
title: "Linxu 命令行及图形界面下分辨率的修改"
description: "对命令行界面： 找到文件 /boot/grub/menu.lst 修改以下代码 kernel /boot/vm …"
date: "2024-05-12"
tags: ["quote"]
author: "WuWenbin"
---

对命令行界面：

找到文件 `/boot/grub/menu.lst`

修改以下代码
    
    
    kernel /boot/vmlinuz-2.6.30.9 root=UUID=1b8a4d20-df4e-42f0-9a88-832a38240ed1 ro quiet vga=0×314

中的 `vga=` 后面的参数，相应参数所对应分辨率见下表：

| Colours | 640×400 | 640×480 | 800×600 | 1024×768 | 1152×864 | 1280×1024 | 1600×1200 |
|---------|---------|---------|---------|----------|----------|-----------|-----------|
| 4 bits  | ?       | ?       | 0×302   | ?        | ?        | ?         | ?         |
| 8 bits  | 0×300   | 0×301   | 0×303   | 0×305    | 0×161    | 0×307     | 0×31C     |
| 16 bits | ?       | 0×311   | 0×314   | 0×317    | 0×163    | 0×31A     | 0×31E     |
| 24 bits | ?       | 0×312   | 0×315   | 0×318    | ?        | 0×31B     | 0×31F     |
| 32 bits | ?       | ?       | ?       | ?        | 0×164    | ?         | ?         |

有时候修改按相同格式修改成16进制数还是不能显示正确分辨率，这是可以将相应16进制改成10进制

转换为十进制之后可以得到如下对应关系： 

| Colours | 640×400 | 640×480 | 800×600 | 1024×768 | 1152×864 | 1280×1024 | 1600×1200 |
|---------|---------|---------|---------|----------|----------|-----------|-----------|
| 4 bits  | ?       | ?       | 770     | ?        | ?        | ?         | ?         |
| 8 bits  | 768     | 769     | 771     | 773      | 353      | 775       | 796       |
| 16 bits | ?       | 785     | 788     | 791      | 355      | 794       | 798       |
| 24 bits | ?       | 786     | 789     | 792      | ?        | 795       | 799       |
| 32 bits | ?       | ?       | ?       | ?        | 356      | ?         | ?         |

对图形界面 `xwindow`：

找到文件`/etc/Xll/xorg.conf`

修改以下代码：
    
    
    # DefaultDepth 8
    # DefaultDepth 16
    DefaultDepth 24
    # DefaultDepth 32
    Subsection “Display”
    Depth 8
    Depth 24
    Modes “1366×768″ “1024×768″ “800×600″ “640×480″
    EndSubsection
    EndSubsection
    Modes “1366×768″ “1024×768″ “800×600″ “640×480″
    Subsection “Display”
    Depth 16
    Subsection “Display”
    Modes “800×600″ “640×480″
    EndSubsection
    Subsection “Display”
    Depth 32
    Modes “1366×768″ “1024×768″ “800×600″ “640×480″
    EndSubsection
    EndSection

我们看到 `DefaultDepth 24` 前没有 `#`，说明这个是被选定的没有注释掉，即默认色彩深度为 24

在下面几行的代码中找到对应的
    
    
    Subsection “Display”
    Depth 24
    Modes “800×600″ “640×480″
    EndSubsection

将 `Modes` 后面的第一个参数改成你需要的分辨率就可以了。

### 相关文章

  * #### [二三年十月第二周](<https://blog.tongdelove.com/%e4%ba%8c%e4%b8%89%e5%b9%b4%e5%8d%81%e6%9c%88%e7%ac%ac%e4%ba%8c%e5%91%a8/> "二三年十月第二周")
  * #### [](<https://blog.tongdelove.com/853-2/>)
  * #### [](<https://blog.tongdelove.com/851-2/>)
  * #### [](<https://blog.tongdelove.com/850-2/>)
  * #### [](<https://blog.tongdelove.com/849-2/>)
