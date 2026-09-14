# EdgeTunnel / Azure 自定义 Subconverter 配置

在 CMLiussss 的 `CM_Online_Full` 上只插入两个 `CUSTOM` 区块。原有 **43 条 ruleset、29 个分组、全部注释和配置开关按原顺序保留**，文本统一为 UTF-8、LF。新增 12 个国家/地区自动测速组、2 个网站选择组和 2 份 `.list`。

| 文件 | 用途 |
| --- | --- |
| `CM_Online_Full_Custom.ini` | 填入订阅转换站“远程配置”的完整配置 |
| `rules/custom-sites.list` | 常用网站；初始包含 `linux.do` |
| `rules/custom-media.list` | 直播网站；初始包含 `douyu.com`、`douyucdn.cn` |
| `upstream/CM_Online_Full.original.ini` | 本次使用的上游原文，便于核对 |
| `CM_Online_Full_Custom.patch` | 相对上游的增量对照，仅含新增行 |

**开始使用**

1. 将主 `.ini` 和 `rules` 目录放到能被转换后端读取的静态托管位置，例如 GitHub 仓库。保留这两个 `.list` 的文件名。
2. 修改主 `.ini` 中的两条新增 `ruleset` 地址：将 `https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main` 替换为你的实际 Raw 目录前缀。如果文件在仓库子目录内，前缀也要包含该目录。浏览器打开这两个完整地址时，应直接显示规则文本。
3. 在 [sub.cmliussss.com](https://sub.cmliussss.com/) 继续填写原始 EdgeTunnel 订阅与 Azure 节点来源。生成类型保持 **Clash**，后端保持 **肥羊提供-增强型后端**；将“远程配置”改填主 `.ini` 的 Raw URL，例如 `https://raw.githubusercontent.com/你的用户名/你的仓库/main/CM_Online_Full_Custom.ini`。
4. 重新生成长订阅链接，确认其 `config` 参数指向新 `.ini`，再生成 **v1.mk** 短链并导入客户端。旧短链如果仍引用原配置，就仍使用原配置。客户端使用规则模式，“仅输出节点信息”应关闭。

这份 `.ini` 含两处托管地址占位符，替换并托管后才可供在线后端读取。本地文件路径无法直接供远程后端访问。

**选择网站出口**

| 网站规则 | 客户端选择组 | 首次默认值 |
| --- | --- | --- |
| `linux.do` 及其子域名 | `自定义-网站` | `自定义-日本自动` |
| `douyu.com`、`douyucdn.cn` 及其子域名 | `自定义-直播` | `DIRECT` |

在这两个 `select` 组内，可以选择任一新增国家自动组，也可以直接选择某一条 EdgeTunnel / Azure 节点。选择具体节点后，该网站组就固定使用该节点；选择国家组后，由该国家组自动测速选优。两组互不影响。

默认值是示例，可在客户端随时切换。要改变新导入配置的默认值，把对应 `custom_proxy_group=自定义-网站` 或 `custom_proxy_group=自定义-直播` 行中希望使用的 `[]选项` 移到最前面。客户端可能记住已有的手动选择，更新订阅不会一定重置它。

也可以只修改新增的 `ruleset` 行，直接指定固定目标，例如：

```ini
; 整份网站清单固定交给日本自动组
ruleset=自定义-日本自动,https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/rules/custom-sites.list
; 整份直播清单固定交给某条真实存在的节点
ruleset=Azure-HK-01,https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/rules/custom-media.list
```

第二种写法中的节点名必须与转换后配置里的名称完全一致，包括空格、前缀和 Emoji。节点名不稳定时，使用默认的客户端选择组更方便。

**维护少量 `.list`**

使用 Surge / ACL4SSR 规则集语法，一个文件内可以放多条规则；同一文件的全部规则共用它在 `.ini` 中绑定的出口。例如：

```text
# 同一出口的多个网站
DOMAIN-SUFFIX,linux.do
DOMAIN-SUFFIX,example.org
DOMAIN,api.example.net
```

`DOMAIN-SUFFIX` 同时匹配根域名和子域名，`DOMAIN` 只匹配指定主机。`.list` 中不要添加 `payload:`，不要在每行末尾添加国家组或节点名。不同出口的网站放入不同清单；若确需第三种独立策略，再增加一份 `.list` 及其 `ruleset` 即可。

两条自定义 `ruleset` 已放在上游所有规则之前，因此会优先命中，包括优先于原来的广告、国内媒体、直连和 GEOIP 规则。只对清单覆盖的域名产生这个优先覆盖效果。两份清单不要重复添加同一个域名；有重叠时，前面的规则优先。

斗鱼示例包含一个常用资源域，未宣称覆盖所有播放、弹幕或第三方 CDN。需要时，根据客户端连接记录，把确认属于目标服务且需要同一出口的域名追加到相应清单。修改清单后需要更新客户端订阅，生效时间还受托管端和转换后端缓存影响。

**国家识别与测速**

已配置：香港、台湾、新加坡、日本、美国、韩国、英国、德国、法国、荷兰、加拿大、澳大利亚。每个新增 `自定义-…自动` 组都是独立 `url-test`，探测地址沿用上游的 `http://www.gstatic.com/generate_204`，间隔 300 秒，切换容差 0ms。客户端会依据最近的探测结果选择可用节点中的最低延迟者；这衡量探测地址延迟，不代表下载带宽或所有网站的访问速度。

名称匹配支持常见中文/英文名称、国旗、国家代码及部分机场代码，并忽略英文大小写。短代码带字母边界，例如 `Azure-JP-01`、`HK01`、`EdgeTunnel-LAX-02` 可以识别，`AUS` 和 `RUS` 不会因为含有 `US` 而混入美国组。`FRA` 按法兰克福识别为德国。

匹配针对**转换后端处理后的节点名称**。后端可能移除或重建名称开头的国旗，因此建议始终保留 `JP`、`HK` 等文本标记。名称没有地区标记时，静态 `.ini` 无法判断国家；该节点仍会出现在两个网站组的具体节点选项中。名称同时写了多个国家也可能匹配多组，建议按最终出口统一命名。

Cloudflare 的接入 POP、优选 IP 位置与 Azure 的实际出口国家可能不同。请按期望分类的真实出口命名；本配置不通过 IP 查询或实际连通测试推断出口国家。

每个新增自动组末尾的 `[]REJECT` 是空组保护：没有匹配节点时，该组只包含 `REJECT`，避免转换器默认补入 `DIRECT`。因此使用默认日本组前，请确认订阅中有被识别为日本的可用节点；否则改选已有国家组或具体节点。有可用真实节点时，`REJECT` 不会成为成功的测速候选。

上游原有 6 个地区测速组保留原名和 50–150ms 容差；新增组使用 `自定义-` 前缀，并采用 0ms 容差。原有业务组继续保持上游行为。Subconverter 在输出 YAML 时可能省略数值为 0 的 `tolerance` 字段，Clash/Mihomo 的该字段默认值为 0。

静态 INI 需要为各国家显式声明分组，不会自动为新出现的国家创建组。若有其他国家，可仿照新增组增加一行，并把 `[]新组名` 加入两个网站选择组的选项。

**上游更新与来源**

本文件基于 2026-09-14 获取的 [CMLiu 原配置](https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_Full.ini)，该文件最近一次提交为 [0efb438c6d6203025ab659f582ffb1bef14c2bc8](https://github.com/cmliu/ACL4SSR/commit/0efb438c6d6203025ab659f582ffb1bef14c2bc8)，提交时间 2026-07-02。此提交的原始文件与本次获取的 main 版本 SHA-256 相同：`84d8b81906526feeef855b01d38102b10adc157fcf6f63c98cd74707bc081ebf`。包内原文只做了 LF 换行规范化。

自定义 `.ini` 是该版本的快照。它保留了上游全部远程 `.list` 引用，这些规则内容仍由原地址维护；但上游以后调整分组或增删 `ruleset`，不会自动合并进你的 `.ini`。更新时获取新上游，对照本包 `.patch` 将两个 `CUSTOM` 区块合入，再核对差异即可。单独选择一份自定义外部配置也不会自动继承另一份远程 `.ini`。

配置及原有规则来自对应上游作者；原有注释和来源均已保留，许可条件以源仓库的声明为准。

- [Subconverter 官方外部配置与规则集语法](https://github.com/tindy2013/subconverter/blob/master/README-cn.md)
- [斗鱼域名清单参考](https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/Douyu/Douyu.list)
- [Mihomo URL-test 实现](https://github.com/MetaCubeX/mihomo/blob/v1.19.30/adapter/outboundgroup/urltest.go)

**已执行的验证**

- 增量比对：去除两个 `CUSTOM` 区块后，与上游规范化原文完全一致；43 条规则集引用与 29 个分组的顺序和内容保持一致。
- 实际转换：标准 Subconverter v0.9.0、增强开源版 asdlokj1qpi233/subconverter v0.9.9 均通过。覆盖 49 个正向节点名称、6 个易误匹配名称、12 个国家组、网站规则优先级、固定节点可选、分组引用与无循环检查；生成结果中原有分组、规则和节点数据保持一致。
- 空组检查：仅有一个日本节点时，其余新增国家组均为 `REJECT`，未自动变成 `DIRECT`。
- 内核检查：Mihomo v1.19.30 的 `-t` 检查接受增强版生成的完整及单地区节点配置。

转换测试使用虚构节点和本地规则夹具，国旗测试显式保留 Emoji；没有使用你的真实订阅，也未测试实际出口、网站连通性或真实延迟。在线肥羊 `/version` 当次返回 `subconverter v1.9.9 TG@feiyangdigital backend`，本地测试版本与该部署的版本标识不同，不能据此宣称已完成在线后端联调。
