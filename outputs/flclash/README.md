# FlClash 精准开屏广告覆写

适用于 Android FlClash / Mihomo，当前仅针对：

- 5EPlay：`com.fiveplay.sihz`

Oopz 不再使用网络层广告拦截。其启动流程依赖开屏广告状态机，直接 REJECT 广告网络可能导致无法进入 App。

## 为什么使用进程限定规则

普通 Subconverter ruleset 只能做全局域名拦截；本脚本使用 Mihomo：

```text
AND,((PROCESS-NAME,com.fiveplay.sihz),(DOMAIN,广告域名)),REJECT
```

因此同一广告域名在其他 App 中不会被拦截。

## 当前规则来源

脚本完整恢复了最初实际测试中能够去除 5EPlay 开屏广告的规则集合，不再对该集合做二次缩减。包括 GDT、Sigmob、1RTB、酷盈、Bayes、AdBiding、旺脉、AdScope、快手广告链路等。

## 使用方法

1. FlClash 打开当前订阅的“覆写”。
2. 选择“脚本”模式。
3. 新建覆写脚本，把 `app-adblock-override.js` 全文粘贴进去。
4. 将该脚本关联到当前订阅。
5. 打开“预览”，确认 `rules` 顶部出现 `AND,((PROCESS-NAME,com.fiveplay.sihz)...`。
6. 重新启用配置后，强制停止 5EPlay 并清除缓存，再启动测试。

## 关于 5E 第一方广告接口

APK 中确实还存在：

```text
https://ya-api-app.5eplay.com/v1/home/adv_slot/list
```

但“最初域名规则实际可去除开屏广告”的测试结果说明，当前出现的开屏广告并不必然来自该第一方接口。该接口与正常业务共用 `ya-api-app.5eplay.com`，Clash 无法按 HTTPS URL 路径单独拦截，因此本方案不封整个域名。
