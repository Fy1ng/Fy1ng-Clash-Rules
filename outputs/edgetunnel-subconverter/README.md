# Fy1ng Clash Rules — 手动节点版

此配置基于仓库内的 `upstream/CM_Online_Full.original.ini`，保留上游 43 条 ruleset，并在其基础上加入四份自定义规则清单，同时重构策略组。

## 本版行为

常规自动测速已关闭。配置中不存在 `url-test` 策略组，也不存在 `♻️ 自动选择`。

唯一保留的自动型策略是：

```ini
custom_proxy_group=📶 官方优选`load-balance`...
```

因此 `📶 官方优选` 仍会按原上游配置工作，并使用 `http://www.gstatic.com/generate_204` 做健康检查/负载均衡；其余国家和业务分组均由用户手动选择。


## ⭐ 常用节点

新增 `⭐ 常用节点`，类型为纯手动 `select`，不会测速。它只根据**转换后的节点名称**筛选节点，并保留 `REJECT` 作为空组保护。

默认匹配范围包括：

- 主流云/VPS：AWS/Amazon、Azure、GCP/Google Cloud、Oracle/OCI、Cloudflare、DigitalOcean、Vultr、Linode/Akamai、Hetzner、OVH、Scaleway、UpCloud、Leaseweb、Contabo、Netcup、RackNerd、DMIT、GreenCloud、CloudCone、BuyVM、HostHatch、Bandwagon/搬瓦工，以及腾讯云/Tencent Cloud/QCloud、阿里云/Aliyun/AliCloud/Alibaba Cloud、华为云/Huawei Cloud、百度智能云/Baidu Cloud/BCE、京东云/JDCloud、火山引擎/Volcengine/Volcano Engine/BytePlus、天翼云/CTYun/China Telecom Cloud、移动云/China Mobile Cloud/ECloud、联通云/China Unicom Cloud/Unicom Cloud/Wo Cloud、UCloud/优刻得、青云/QingCloud、七牛云/Qiniu、金山云/Kingsoft Cloud/KSCloud/Ksyun、浪潮云/Inspur Cloud、首都在线/Capital Online、白山云/Baishan Cloud、IBM Cloud。
- AI 服务/模型标签：GrokBot、MuseAI、OpenAI/ChatGPT/Codex、Anthropic/Claude、Gemini/Google AI、xAI/Grok、DeepSeek、OpenRouter、Perplexity、Cursor、Windsurf、Copilot、Kimi/Moonshot、Qwen/通义、Zhipu/智谱、SiliconFlow/硅基流动、AgentRouter。

没有使用 `AI`、`DO` 这类过短泛词，避免普通节点名称被大量误匹配。若你的机场对节点使用了其他品牌缩写，只需编辑 `CM_Online_Full_Custom.ini` 中 `custom_proxy_group=⭐ 常用节点` 这一行的正则。

`⭐ 常用节点` 已加入主节点选择、各业务组以及四个自定义分流组，但不会加入国家/地区组，避免“日本组”等地区分组跳到其他国家。它都放在原有默认选项之后，因此不会改变新配置原本的默认出口。

## 国家/地区组

以下 12 个分组全部为 `select`：

- 🇭🇰 香港节点
- 🇹🇼 台湾节点
- 🇸🇬 狮城节点
- 🇯🇵 日本节点
- 🇺🇲 美国节点
- 🇰🇷 韩国节点
- 🇬🇧 英国节点
- 🇩🇪 德国节点
- 🇫🇷 法国节点
- 🇳🇱 荷兰节点
- 🇨🇦 加拿大节点
- 🇦🇺 澳大利亚节点

它们仅根据转换后的节点名称做正则归类，不测速、不自动切换。每组保留 `REJECT` 作为空组保护，防止没有匹配节点时被转换器补成 `DIRECT`。

节点名称建议保留 `JP`、`HK`、`US`、机场代码或明确国家名称。Cloudflare 接入点位置不等于真实出口国家，应按实际出口给节点命名。

## 业务组可直接选择真实节点

这些业务组末尾加入 `.*`，因此在 Clash/Mihomo 客户端中可以直接选择真实节点：

- 📲 电报消息
- 🤖 OpenAi
- 📹 油管视频
- 🎥 奈飞视频
- 📺 巴哈姆特
- 📺 哔哩哔哩
- 🌍 国外媒体
- 🌏 国内媒体
- 📢 谷歌FCM
- Ⓜ️ 微软Bing
- Ⓜ️ 微软云盘
- Ⓜ️ 微软服务
- 🍎 苹果服务
- 🎮 游戏平台
- 🎶 网易音乐
- 🐟 漏网之鱼

例如可以分别设置：

```text
🤖 OpenAi   → Azure-US-01
📹 油管视频 → JP-02
📲 电报消息 → SG-01
```

这样三个业务分组彼此独立。

如果业务组选择的是 `🇯🇵 日本节点` 这样的国家组，那么使用的是该国家组当前手动选中的节点；多个业务如果都引用同一个国家组，会共享该国家组的选择。需要完全独立时，直接在各业务组中选择具体真实节点。

## 自定义规则

自定义规则位于所有上游 ruleset 之前，因此优先命中：

```ini
ruleset=自定义-网站,.../rules/custom-sites.list
ruleset=自定义-直播,.../rules/custom-media.list
ruleset=Any,.../rules/any.list
ruleset=Bybit EU,.../rules/bybit-eu.list
```

当前：

- `custom-sites.list`：`linux.do`、`agentrouter.org`
- `custom-media.list`：`douyu.com`、`douyucdn.cn`
- `any.list`：`anyrouter.top` 及全部子域名，独立 `Any` 组，默认日本。
- `bybit-eu.list`：`bybit.eu` 及全部子域名和已核实的外部依赖，独立 `Bybit EU` 组，默认德国。

`自定义-网站` 默认选择 `🇯🇵 日本节点`，但日本组内部的具体节点由你手动选择；也可在 `自定义-网站` 中直接选择某一条真实节点。

`自定义-直播` 默认 `DIRECT`。

## Bybit EU 覆盖与来源

核查日期：2026-09-30。核心规则 `DOMAIN-SUFFIX,bybit.eu` 覆盖根域名及任意层级子域名，包括 `www`、`api`、`stream`、`static`、`announcements`、`affiliates` 等，无须逐个列出。

同时覆盖公开页面中发现的共享静态资源、极验验证码、风控和监控主机、Google/Apple 登录资源、统计脚本，以及官方 API 文档和 PSD2 沙箱。共享服务使用 `DOMAIN` 精确匹配；这些主机在其他网站上被使用时也会进入 `Bybit EU` 组，Clash 域名规则无法按发起网页区分。

来源：

- [官网](https://www.bybit.eu/en-EU)、[登录](https://www.bybit.eu/en-EU/login)、[注册](https://www.bybit.eu/en-EU/register)、[现货交易](https://www.bybit.eu/en-EU/trade/spot/BTC/EUR)：公开 HTML 的脚本、资源和预连接地址。
- [前端监控脚本](https://www.bybit.eu/common-static/infra-static/monitor/monitor.latest.js)：生产监控主机；排除 SIT 测试域名。
- [官方 API 接入说明](https://bybit-exchange.github.io/docs/v5/guide)：EU API 使用 `api.bybit.eu`。
- [EU PSD2 文档](https://bybit-exchange.github.io/eu-docs/fin)：`bybit-xs2a-sandbox.finapi.io`。
- `appleid.apple.com` 是 Apple 登录配套端点，页面已核实加载 `appleid.cdn-apple.com` 登录 SDK；前者作为该登录方式的补充。

未将页脚中的全球站、其他地区站、社交媒体外链或整个 Google/Apple/CDN 根域名纳入。核心 EU 域名的所有子域名均已覆盖，但公开页面核查无法保证穷尽登录后的 KYC、支付及 App 专属第三方端点；遇到遗漏可按客户端连接日志补充精确主机。也不通过固定 IP 规则匹配会变化且可能共享的 CDN 地址。

两个新组都是独立手动 `select`，支持地区组、常用节点、DIRECT 和任意真实节点。

## 使用

在 `sub.cmliussss.com` 中保持生成类型为 Clash、后端为“肥羊提供-增强型后端”，远程配置填写：

```text
https://raw.githubusercontent.com/Fy1ng/Fy1ng-Clash-Rules/main/outputs/edgetunnel-subconverter/CM_Online_Full_Custom.ini
```

重新生成长订阅和 v1.mk 短链后导入客户端。旧短链若仍指向旧配置，不会自动切换到本版。

## 文件

| 文件 | 用途 |
| --- | --- |
| `CM_Online_Full_Custom.ini` | 当前完整远程配置 |
| `CM_Online_Full_Custom.patch` | 相对上游快照的差异 |
| `rules/custom-sites.list` | 自定义网站 |
| `rules/custom-media.list` | 自定义直播 |
| `rules/any.list` | AnyRouter 独立分流 |
| `rules/bybit-eu.list` | Bybit EU 独立分流 |
| `upstream/CM_Online_Full.original.ini` | 上游快照 |

## 静态校验

本次打包执行了以下检查：

- 活跃上游 ruleset 为 43 条，自定义 ruleset 为 4 条。
- 总策略组为 39 个。
- 不存在任何 `url-test` 策略组。
- 不存在 `♻️ 自动选择` 的定义或引用。
- 仅存在一个 `load-balance` 策略组，即 `📶 官方优选`。
- 12 个国家/地区组均为 `select`。
- `⭐ 常用节点` 为 `select`，并使用名称正则筛选节点。
- `🤖 OpenAi` 等业务组均带 `.*`，可直接列出真实节点。

此处是静态配置校验，不等同于使用真实订阅对在线转换后端和 Mihomo 内核做完整联调。
