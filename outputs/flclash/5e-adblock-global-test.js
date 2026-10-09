// 5EPlay 广告规则诊断脚本：仅用于确认 PROCESS-NAME 是否导致规则失效。
// 警告：本脚本不限制进程，所列广告域名会对所有 App 全局 REJECT。
// 测试完成后请切回 app-adblock-override.js。

function main(config) {
  const rules = [
    ["DOMAIN", "sdk.e.qq.com"],
    ["DOMAIN", "sdkquic.e.qq.com"],
    ["DOMAIN", "c2.gdt.qq.com"],
    ["DOMAIN", "c3.gdt.qq.com"],
    ["DOMAIN", "mi.gdt.qq.com"],
    ["DOMAIN", "v2.gdt.qq.com"],
    ["DOMAIN", "v2mi.gdt.qq.com"],
    ["DOMAIN", "v3.gdt.qq.com"],
    ["DOMAIN", "v3mi.gdt.qq.com"],
    ["DOMAIN", "win.gdt.qq.com"],
    ["DOMAIN", "union.eff.qq.com"],
    ["DOMAIN", "pgdt.ugdtimg.com"],
    ["DOMAIN", "qzs.gdtimg.com"],
    ["DOMAIN", "adsmind.ugdtimg.com"],
    ["DOMAIN-SUFFIX", "sigmob.cn"],
    ["DOMAIN", "sdk.1rtb.net"],
    ["DOMAIN", "sdk-report.1rtb.com"],
    ["DOMAIN", "adx-bj.statisticslinks.com"],
    ["DOMAIN", "adx-strategy-api-cn.statisticslinks.com"],
    ["DOMAIN", "adx-tk-sz.statisticslinks.com"],
    ["DOMAIN", "da.statisticslinks.com"],
    ["DOMAIN", "tk.statisticslinks.com"],
    ["DOMAIN", "ad.bayescom.com"],
    ["DOMAIN", "mantis.bayescom.com"],
    ["DOMAIN", "ad.baihemob.com"],
    ["DOMAIN", "bid.adbiding.cn"],
    ["DOMAIN", "obsidian.adbiding.cn"],
    ["DOMAIN", "mat.adbiding.cn"],
    ["DOMAIN", "sdk.adbiding.cn"],
    ["DOMAIN", "slog.adbiding.cn"],
    ["DOMAIN", "t.adbiding.cn"],
    ["DOMAIN", "sdk.adx.adwangmai.com"],
    ["DOMAIN", "xyz.adscope.com"],
    ["DOMAIN", "sdk.beizi.biz"],
    ["DOMAIN", "fpvideo.shenshiads.com"],
    ["DOMAIN", "c.etoolads.cn"],
    ["DOMAIN", "nova-api.smartroi.cn"],
    ["DOMAIN", "v1-lm.adukwai.com"],
  ];

  const globalRules = rules.map(([type, value]) => `${type},${value},REJECT`);
  const originalRules = Array.isArray(config.rules) ? config.rules : [];
  config.rules = [...globalRules, ...originalRules];
  return config;
}
