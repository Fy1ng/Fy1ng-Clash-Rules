# Fy1ng Clash Rules

基于 CMLiussss `CM_Online_Full` 的 EdgeTunnel / Azure Subconverter 配置。

当前版本保留上游 43 条 ruleset，并新增两份自定义规则清单；策略组改为“手动优先”：

- 取消 `♻️ 自动选择` 及全部国家/地区 `url-test`。
- 保留 `📶 官方优选` 的 `load-balance`。
- 新增 `⭐ 常用节点`：按节点名称筛选主流云/VPS 厂商和常见 AI 服务标签（包括 GrokBot、MuseAI；国内云覆盖腾讯云、阿里云、华为云、百度智能云、京东云、火山引擎、天翼云、移动云、联通云、UCloud、青云、七牛云、金山云、浪潮云、首都在线、白山云等中英文品牌与常用别名），仅手动选择，不测速。
- 香港、台湾、新加坡、日本、美国、韩国、英国、德国、法国、荷兰、加拿大、澳大利亚共 12 个国家/地区组均为手动 `select`。
- OpenAI、Telegram、YouTube、Netflix、微软、Apple、游戏、媒体等业务组可直接选择任意真实节点，不必先进入 `☑️ 手动切换`。
- `自定义-网站` 默认进入 `🇯🇵 日本节点`；`自定义-直播` 默认 `DIRECT`。

在 [订阅转换站](https://sub.cmliussss.com/) 的“远程配置”中填写：

```text
https://raw.githubusercontent.com/Fy1ng/Fy1ng-Clash-Rules/main/outputs/edgetunnel-subconverter/CM_Online_Full_Custom.ini
```

保持生成类型为 Clash、后端为“肥羊提供-增强型后端”，重新生成订阅及 v1.mk 短链。

- [详细说明](outputs/edgetunnel-subconverter/README.md)
- [常用网站清单](outputs/edgetunnel-subconverter/rules/custom-sites.list)
- [直播网站清单](outputs/edgetunnel-subconverter/rules/custom-media.list)
- [完整配置包](outputs/edgetunnel-subconverter.zip)

节点连接信息由用户自己的订阅提供。
