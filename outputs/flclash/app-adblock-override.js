// FlClash / Mihomo — 5EPlay 精准开屏广告覆写
// 目标：完整复刻“最初实测可去除 5E 开屏广告”的规则，但仅作用于 5EPlay 进程。
// Oopz 不再做网络层广告拦截：它的启动流程依赖开屏广告状态机，网络 REJECT 可能导致无法进入。
// 注意：规则必须前置；脚本会把这些规则插到原订阅 rules 最前面。

function main(config) {
  const pkg = "com.fiveplay.sihz";

  // 严格按最初实测有效规则恢复，不再自行缩减。
  const rules = [
    // 腾讯优量汇 / GDT
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

    // Sigmob
    ["DOMAIN-SUFFIX", "sigmob.cn"],

    // 1RTB
    ["DOMAIN", "sdk.1rtb.net"],
    ["DOMAIN", "sdk-report.1rtb.com"],

    // 酷盈
    ["DOMAIN", "adx-bj.statisticslinks.com"],
    ["DOMAIN", "adx-strategy-api-cn.statisticslinks.com"],
    ["DOMAIN", "adx-tk-sz.statisticslinks.com"],
    ["DOMAIN", "da.statisticslinks.com"],
    ["DOMAIN", "tk.statisticslinks.com"],

    // Bayes / Mercury
    ["DOMAIN", "ad.bayescom.com"],
    ["DOMAIN", "mantis.bayescom.com"],

    // Baihe
    ["DOMAIN", "ad.baihemob.com"],

    // AdBiding
    ["DOMAIN", "bid.adbiding.cn"],
    ["DOMAIN", "obsidian.adbiding.cn"],
    ["DOMAIN", "mat.adbiding.cn"],
    ["DOMAIN", "sdk.adbiding.cn"],
    ["DOMAIN", "slog.adbiding.cn"],
    ["DOMAIN", "t.adbiding.cn"],

    // 旺脉
    ["DOMAIN", "sdk.adx.adwangmai.com"],

    // AdScope / 倍孜
    ["DOMAIN", "xyz.adscope.com"],
    ["DOMAIN", "sdk.beizi.biz"],

    // AdSet / 神蓍广告
    ["DOMAIN", "fpvideo.shenshiads.com"],

    // 其他当前 APK 广告接口
    ["DOMAIN", "c.etoolads.cn"],
    ["DOMAIN", "nova-api.smartroi.cn"],

    // 快手广告链路（最初规则中明确存在）
    ["DOMAIN", "v1-lm.adukwai.com"],
  ];

  const preciseRules = rules.map(
    ([type, value]) =>
      `AND,((PROCESS-NAME,${pkg}),(${type},${value})),REJECT`
  );

  const originalRules = Array.isArray(config.rules) ? config.rules : [];
  config.rules = [...preciseRules, ...originalRules];
  return config;
}
