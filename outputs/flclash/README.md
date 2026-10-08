# FlClash 精准开屏广告覆写

适用于 Android FlClash / Mihomo，当前针对：

- 5EPlay：`com.fiveplay.sihz`
- Oopz：`com.weilaishanhai.oopz`

## 为什么不只用普通 ruleset

普通 Subconverter ruleset 能稳定表达域名规则，但无法可靠表达 Mihomo 的：

```text
AND,((PROCESS-NAME,包名),(DOMAIN,广告域名)),REJECT
```

而 Android Mihomo 的 `PROCESS-NAME` 可以直接匹配包名。使用覆写脚本后，广告域名只在上述两个 App 发起请求时被拒绝，不会影响其他 App。

## 使用方法

1. FlClash 打开当前订阅的“覆写”。
2. 选择“脚本”模式。
3. 新建覆写脚本，把 `app-adblock-override.js` 全文粘贴进去。
4. 将该脚本关联到当前订阅。
5. 打开“预览”，确认 `rules` 顶部出现 `AND,((PROCESS-NAME,...` 规则。
6. 重新启用配置后，强制停止 5EPlay / Oopz 再测试。

若此前广告 SDK 已缓存开屏素材或 waterfall 配置，可先清除 App 缓存再测；不要在规则未生效时清除数据。

## 已知限制

5EPlay 自身还存在 `5E平台` 第一方广告源。其广告列表接口位于正常业务域名
`ya-api-app.5eplay.com` 下的 `/v1/home/adv_slot/list`。

Clash/Mihomo 的路由规则无法匹配 HTTPS URL 路径，因此不能只用 Clash 规则精准拒绝这个路径；
直接拒绝整个 `ya-api-app.5eplay.com` 会影响正常业务，不加入本规则。

因此本覆写可以可靠拦截当前 APK 中的第三方开屏广告 SDK，但如果服务端切换到 5E 第一方广告，
需要使用支持 HTTPS MITM/URL rewrite 的工具按路径处理，而不是扩大 Clash 域名封锁范围。
