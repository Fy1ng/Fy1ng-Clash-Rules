// FlClash / Mihomo — 5EPlay 开屏广告拦截
// 已实测：当前 FlClash Android 环境中 PROCESS-NAME 条件未可靠命中，
// 因此生产版使用全局广告域名规则。
// 注意：这些域名属于共享广告平台，可能同时影响其他 App 的广告请求。

function main(config) {
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

    // 快手广告链路
    ["DOMAIN", "v1-lm.adukwai.com"],
  ];

  const globalRules = rules.map(([type, value]) => `${type},${value},REJECT`);
  const originalRules = Array.isArray(config.rules) ? config.rules : [];
  config.rules = [...globalRules, ...originalRules];
  return config;
}
