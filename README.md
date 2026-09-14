# Fy1ng Clash Rules

基于 CMLiussss `CM_Online_Full` 的 EdgeTunnel / Azure Subconverter 配置，保留上游 43 条规则集引用及 29 个分组，新增 12 个国家/地区自动测速组和两份自定义网站清单。

在 [订阅转换站](https://sub.cmliussss.com/) 的“远程配置”中填写 [自定义 INI Raw 地址](https://raw.githubusercontent.com/Fy1ng/Fy1ng-Clash-Rules/main/outputs/edgetunnel-subconverter/CM_Online_Full_Custom.ini)：

```text
https://raw.githubusercontent.com/Fy1ng/Fy1ng-Clash-Rules/main/outputs/edgetunnel-subconverter/CM_Online_Full_Custom.ini
```

保持生成类型为 Clash、后端为“肥羊提供-增强型后端”，重新生成订阅及 v1.mk 短链。示例默认 `linux.do → 自定义-日本自动`、`douyu.com → DIRECT`，可在客户端分别改选国家组或具体节点。

- [使用说明、来源与验证范围](outputs/edgetunnel-subconverter/README.md)
- [常用网站清单](outputs/edgetunnel-subconverter/rules/custom-sites.list)
- [直播网站清单](outputs/edgetunnel-subconverter/rules/custom-media.list)
- [完整配置包](outputs/edgetunnel-subconverter.zip)

该仓库维护配置、规则及说明。节点连接信息由用户自己的订阅提供。`work/` 中的本地工具和测试夹具已通过 `.gitignore` 排除。
