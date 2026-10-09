# FlClash 5EPlay 开屏广告规则

当前生产脚本：

- `app-adblock-override.js`

## 当前结论

实测结果：

- 加入哨兵规则后，`example.com` 被正常 REJECT，说明脚本覆写本身已经生效。
- 去掉 `PROCESS-NAME` 条件后，同一批 5E 广告域名可以成功去除开屏广告。
- 因此当前 FlClash / Android 环境中的失效点是进程匹配层，而不是广告域名集合。

Mihomo 文档说明 Android 理论上支持用 `PROCESS-NAME` 匹配包名，但 FlClash Android 历史上存在进程/UID 解析相关问题。为保证实际可用，生产脚本现在使用全局域名规则。

## 使用方法

1. FlClash 打开当前订阅的“覆写”。
2. 选择“脚本”模式。
3. 导入 `app-adblock-override.js`。
4. 将脚本关联到当前订阅并确认已启用。
5. 更新配置，重启 FlClash。
6. 强制停止 5EPlay、清除缓存，再启动测试。

## 影响范围

生产脚本不再使用 `PROCESS-NAME`，因此其中列出的共享广告平台域名会对所有 App 生效。

如果后续 FlClash 的 Android 进程识别恢复可靠，可重新测试：

- `5e-adblock-process-experimental.js`

诊断脚本：

- `5e-adblock-global-test.js`

其中包含 `example.com` 哨兵，只用于测试，不应长期启用。
