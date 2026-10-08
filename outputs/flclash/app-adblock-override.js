// FlClash / Mihomo 精准开屏广告覆写
// 目标：仅在 5EPlay 与 Oopz 进程中拦截已确认的广告 SDK 请求，避免全局误伤。
// 使用：FlClash -> 当前配置 -> 覆写 -> 脚本模式，粘贴/选择本脚本内容。
// 注意：规则必须前置；脚本会把这些规则插到原订阅 rules 最前面。

function main(config) {
  const packages = [
    "com.fiveplay.sihz",
    "com.weilaishanhai.oopz",
  ];

  const adDomains = [
    // 上海领页 / CJMobile
    "api.shanghailingye.cn",
    "api.wxcjgg.cn",
    "vista.divms.cn",

    // 1RTB
    "sdk.1rtb.net",

    // 酷盈 / StatisticsLinks
    "adx-bj.statisticslinks.com",
    "adx-strategy-api-cn.statisticslinks.com",
    "adx-tk-sz.statisticslinks.com",
    "da.statisticslinks.com",
    "tk.statisticslinks.com",

    // 旺脉 / Baihe / 倍孜
    "sdk.adx.adwangmai.com",
    "ad.baihemob.com",
    "sdk.beizi.biz",

    // Sigmob
    "adservice.sigmob.cn",

    // 章鱼 Octopus
    "sdk.zhangyuyidong.cn",
    "sdklog.zhangyuyidong.cn",

    // 穿山甲 / Pangle
    "api-access.pangolin-sdk-toutiao.com",
    "api-access.pangolin-sdk-toutiao-b.com",

    // 腾讯优量汇 / GDT
    "sdk.e.qq.com",
    "sdkquic.e.qq.com",
    "c2.gdt.qq.com",
    "c3.gdt.qq.com",
    "mi.gdt.qq.com",
    "v2.gdt.qq.com",
    "v2mi.gdt.qq.com",
    "v3.gdt.qq.com",
    "v3mi.gdt.qq.com",
    "win.gdt.qq.com",

    // 快手广告
    "open.e.kuaishou.com",
    "open.e.kuaishou.cn",

    // Fancy / 泛为
    "g.fancyapi.com",
    "t2.fancyapi.com",

    // TopOn / AnyThink
    "adx.anythinktech.com",
    "cn-api.anythinktech.com",
    "cn-api-sec.anythinktech.com",

    // 其他当前 APK 中确认的广告请求端点
    "c.etoolads.cn",
    "nova-api.smartroi.cn",
    "obsidian.adbiding.cn",
  ];

  const preciseRules = [];
  for (const pkg of packages) {
    for (const domain of adDomains) {
      preciseRules.push(
        `AND,((PROCESS-NAME,${pkg}),(DOMAIN,${domain})),REJECT`
      );
    }
  }

  const originalRules = Array.isArray(config.rules) ? config.rules : [];
  config.rules = [...preciseRules, ...originalRules];
  return config;
}
