// @ts-ignore
// noinspection JSNonASCIINames,JSAnnotator

const is = (...x) => 音韻地位.屬於(...x);
const when = (...x) => 音韻地位.判斷(...x);

const shared = {};
window.shared = shared;

if (!音韻地位) {
  return [
    ["標調方式", [1, "數字（默認）", "附標", "不標", "五度"]],
    ["拼式版本", [1, "優化（默認）", "原始", "注音", "拼音", "音位", "音值"]],
  ];
}

// if (is`明母 尤東韻`) 音韻地位 = 音韻地位.調整('${音韻地位.韻 === "尤" ? "侯" : 音韻地位.韻}韻 一等 不分類');
if (is("云母 通攝 舒聲")) {
  音韻地位 = 音韻地位.調整("匣母", ["匣母三等"]);
}

function 拼式(original = "", bopomofo = "", pinyin = "", phoneme = "", allophone = "") {
  switch (選項.拼式版本) {
    case "音值":
      return allophone;
    case "音位":
      return phoneme;
    case "拼音":
      return pinyin;
    case "注音":
      return bopomofo;
    default:
      return original;
  }
}

function rules(obj) {
  if (typeof obj != "object" || obj == null) {
    return obj;
  }
  return Object.entries(obj).map(([key, value]) => {
    if (typeof value == "object" && value != null) {
      return [key, rules(value)];
    } else {
      return [key, value];
    }
  });
}

const INITIALS = {
  _: ["", "", "", "", ""],
  P: ["p", "ㄆ", "p", "pʰ", "pʰ"],
  B: ["b", "ㄅ", "b", "p", "b̥"],
  F: ["f", "ㄈ", "f", "f", "f"],
  V: ["v", "ㄪ", "v", "ʋ", "ʋ"],
  M: ["m", "ㄇ", "m", "m", "m"],
  D: ["d", "ㄉ", "d", "t", "d̥"],
  T: ["t", "ㄊ", "t", "tʰ", "tʰ"],
  N: ["n", "ㄋ", "n", "n", "n"],
  NY: ["ny", "ㄬ", "gn", "ɲ", "ɲ̟"],
  L: ["l", "ㄌ", "l", "l", "l̠"],
  TZ: ["tz", "ㄗ", "z", "ts", "d̥͡z̟̊"],
  TS: ["ts", "ㄘ", "c", "tsʰ", "t͡s̟ʰ"],
  S: ["s", "ㄙ", "s", "s", "s̟"],
  ZH: ["zh", "ㄓ", "zh", "tʂ", "d̥͡ʐ̺̊"],
  CH: ["ch", "ㄔ", "ch", "tʂʰ", "t͡ʂ̺ʰ"],
  SH: ["sh", "ㄕ", "sh", "ʂ", "ʂ̺"],
  RH: ["r", "ㄖ", "r", "ɻ", "ɻ̺"],
  G: ["g", "ㄍ", "g", "k", "ɡ̊"],
  K: ["k", "ㄎ", "k", "kʰ", "kʰ"],
  H: ["h", "ㄏ", "h", "x", "x̞"],
  NG: ["ng", "ㄫ", "ng", "ŋ", "ŋ"],
  CHI: ["ch", "ㄑ", "q", "tɕʰ", "t͡ɕʰ"],
  J: ["j", "ㄐ", "j", "tɕ", "d̥͡ʑ̥"],
  HS: ["hs", "ㄒ", "x", "ɕ", "ɕ"],
};

function getInitialKey() {
  return when(
    rules({
      幫母: { "C類": "F", "": "B" },
      滂母: { "C類": "F", "": "P" },
      並母: { "C類": "F", "平聲": "P", "": "B" },
      明母: { "C類": "V", "": "M" },

      端母: "D",
      透母: "T",
      定母: { "平聲": "T", "": "D" },
      泥母: "N",

      孃母: "NY",
      來母: "L",

      精母: "TZ",
      清母: "TS",
      從母: { "平聲": "TS", "": "TZ" },
      心邪母: "S",

      知莊章母: "ZH",
      徹初昌母: "CH",
      澄崇母: { "平聲": "CH", "": "ZH" },
      常母: { "平聲": "CH", "": "SH" },
      生書俟船母: "SH",
      日母: "RH",

      見母: "G",
      溪母: "K",
      羣母: { "平聲": "K", "": "G" },
      曉匣母: "H",
      疑母: "NG",

      ["以母 蟹攝 三四等 合口"]: "RH", //「銳」
      影云以母: "_",
    }),
  );
}

const FINALS = {
  _: ["", "-", "", "", ""],
  UNG: ["ung", "-", "ong", "ʊŋ", "ʷʊ̟ŋ̚ʷ"],
  IUNG: ["iung", "-", "iong", "jʊŋ", "j͗ʊ̟ŋ̚ʷ"],
  ANG: ["ang", "-", "ang", "ɑŋ", "ɑ̟ŋ̚"],
  UANG: ["uang", "-", "uang", "wɑŋ", "wɑ̟ŋ̚"],
  IANG: ["iang", "-", "iang", "jɑŋ", "jɑ̟ŋ̚"],
  EI: ["ei", "-", "ei", "eɪ", "əɪ"],
  I: ["i", "-", "i", "i", "i"],
  Z: ["z", "-", "i", "ɹ̩", "ɹ̟̍"],
  R: ["r", "-", "i", "ɻ̍", "ɻ̺̍"],
  EE: ["ee", "-", "i", "ɻi", "ɻi"],
  ER: ["er", "-", "er", "ɚ", "ə̠ɻ˕"],
  UAI: ["uai", "-", "uai", "waɪ", "wa̠ɪ̯"],
  UEI: ["uei", "-", "ui", "weɪ", "we̠ɪ̯"],
  YU: ["yu", "-", "ü", "y", "y˗"],
  YU2: ["yu", "-", "ü", "y", "y˗"],
  U: ["u", "-", "u", "u", "u"],
  V: ["u", "-", "u", "ʋ̩", "ʋ̩ˠ"],
  IO: ["io", "-", "io", "jo", "j͗ʏ̯̈o̜̽"],
  AI: ["ai", "-", "ai", "aɪ", "a̠ɪ̯"],
  OI: ["oi", "-", "oi", "-", "-"],
  IAI: ["iai", "-", "iai", "jai", "jæi̯"],
  UA: ["ua", "-", "ua", "wa", "wä"],
  EN: ["en", "-", "en", "ən", "ə̟n̚"],
  IN: ["in", "-", "in", "in", "ji̞n̚"],
  UEN: ["uen", "-", "un", "wən", "wən̚"],
  YUN: ["yun", "-", "ün", "yn", "ɥy˕n̚"],
  AN: ["an", "-", "an", "an", "a̠n̚"],
  UAN: ["uan", "-", "uan", "wan", "wa̠n̚"],
  UON: ["uon", "-", "uon", "wɔn", "wɔn̚"],
  IEN: ["ien", "-", "ian", "jɛn", "jɛ̠n̚"],
  YUAN: ["yuen", "-", "üan", "ɥæn", "ɥʏ̯̈æ̠͗n̚"],
  AU: ["au", "-", "ao", "ɑʊ", "ɑ̟ʊ̯"],
  IAU: ["iau", "-", "iao", "jɑʊ", "jɑ̟ʊ̯"],
  O: ["o", "-", "o", "o", "ʷo̜̽"],
  UO: ["uo", "-", "uo", "wo", "wo̜̽"],
  IE: ["ie", "-", "iê", "jɛ", "jɛ̠"],
  YUE: ["yue", "-", "üê", "ɥɛ", "ɥɛ̠"],
  IA: ["ia", "-", "ia", "ja", "jä"],
  A: ["a", "-", "a", "a", "ä"],
  AE: ["ae", "-", "ê", "ɛ", "ɛ̠"],
  ENG: ["eng", "-", "eng", "əŋ", "əŋ̚"],
  UENG: ["ueng", "-", "ueng", "wɤŋ", "wə̹ŋ̚"],
  ING: ["ing", "-", "ing", "iŋ", "jɪŋ̚"],
  OU: ["ou", "-", "ou", "oʊ", "ʷo̜̽ʊ̯"],
  IU: ["iu", "-", "iu", "jʊ", "j͗ʊ"],

  EM: ["em", "", "em", "əm", "ə̟m̚"],
  IM: ["im", "", "im", "im", "ji̞m̚"],
  AM: ["am", "", "am", "am", "a̠m̚"],
  OM: ["om", "", "om", "ɔm", "ɔm̚"],
  IEM: ["iem", "", "iam", "jɛm", "jɛ̠m̚"],
  UAM: ["uam", "", "uam", "wam", "wa̠m̚"],

  UK: ["uk", "", "ug", "uk", "uk̚"],
  YUK: ["yuk", "", "üg", "yk", "y˗k̚"],
  OK: ["ok", "", "og", "ok", "ʷo̜̽k̚"],
  UOK: ["uok", "", "uog", "wok", "wo̜̽k̚"],
  IOK: ["iok", "", "iog", "jok", "j͗ʏ̯̈o̜̽k̚"],
  RT: ["it", "", "id", "ɻ̍t", "ɻ̺̍t̚"],
  IT: ["it", "", "id", "it", "it̚"],
  UT: ["ut", "", "ud", "ut", "ut̚"],
  YUT: ["yut", "", "üd", "yt", "y˗t̚"],
  YUET: ["yuet", "", "üêd", "ɥɛt", "ɥɛ̠t̚"],
  ET: ["et", "", "ed", "ət", "ə̟t̚"],
  AT: ["at", "", "ad", "at", "ät̚"],
  OT: ["ot", "", "od", "ot", "ʷo̜̽t̚"],
  UOT: ["uot", "", "uod", "wot", "wo̜̽t̚"],
  IAT: ["iat", "", "iad", "jat", "jät̚"],
  IET: ["iet", "", "iêd", "jɛt", "jɛ̠t̚"],
  AET: ["aet", "", "êd", "ɛt", "ɛ̠t̚"],
  RK: ["ik", "", "ig", "ɻ̍k", "ɻ̺̍k̚"],
  EK: ["ek", "", "eg", "ək", "ə̟k̚"],
  IK: ["ik", "", "ig", "ik", "ik̚"],
  RP: ["ip", "", "ib", "ɻ̍p", "ɻ̺̍p̚"],
  EP: ["ep", "", "eb", "əp", "ə̟p̚"],
  IP: ["ip", "", "ib", "ip", "ip̚"],
  AP: ["ap", "", "ab", "ap", "äp̚"],
  OP: ["op", "", "ob", "op", "ʷo̜̽p̚"],
  IEP: ["iep", "", "iêb", "jɛp", "jɛ̠p̚"],
  IAP: ["iap", "", "iab", "jap", "jäp̚"],
  UAP: ["uap", "", "uab", "wap", "wäp̚"],
  UAT: ["uat", "", "uad", "wat", "wät̚"],
  YUOK: ["yuok", "", "üog", "ɥok", "ɥ͗ʏ̯̈o̜̽k̚"],
};

function getFinalKey() {
  const 捲舌 = "莊章組 或 知徹澄日母";
  return when(
    rules({
      舒聲: {
        通攝: {
          一等: "UNG",
          三等: { "幫組 或 影母": "UNG", [捲舌]: "UNG", "": "IUNG" },
        },
        江攝: { "幫組": "ANG", [捲舌]: "UANG", "": "IANG" },
        止攝: {
          幫組: { "B類": "EI", "": "I" },
          開口: { "精組": "Z", "莊章組": "R", "知徹澄母": "EE", "日母": "ER", "": "I" },
          合口: { "幫組": "I", "莊組": "UAI", "": "UEI" },
        },
        遇攝: {
          魚韻: { "章組 或 知徹澄日母": "YU", "莊組": "U", "": "IO" },
          虞韻: { [`${捲舌} 或 幫組`]: "U", "": "YU" },
          模韻: "U",
        },
        蟹攝: {
          齊祭韻: {
            "開口 或 幫組": { "莊組": "R", "": "I" },
            "合口": { "": "UEI" },
          },
          泰韻: { "幫組": "UEI", "開口 或 精組": "AI", "合口": "OI" },
          佳韻: {
            "開口 或 幫組": { "見影組 或 孃母": "IAI", "": "AI" },
            "合口": { "見影組 或 孃母": "UA", "": "UAI" },
          },
          皆夬韻: {
            "開口 或 幫組": { "見影組 或 孃母": "IAI", "": "AI" },
            "合口": "UAI",
          },
          咍韻: { "精組": "AI", "": "OI" },
          灰韻: "UEI",
          廢韻: { 幫組: "I", 開口: "EI", 合口: "UEI" },
        },
        臻攝: {
          真韻: {
            "開口 或 幫組": { [捲舌]: "EN", "": "IN" },
            "合口": { [捲舌]: "UEN", "": "YUN" },
          },
          臻殷韻: { [捲舌]: "EN", "": "IN" },
          文韻: { "幫組": "EN", "": "YUN" },
          痕韻: "EN",
          魂韻: "UEN", // 有異讀
        },
        山攝: {
          寒韻: {
            "開口": "AN",
            "合口 或 幫組": { "幫端精組 或 來母": "UAN", "": "UON" },
          },
          刪山韻: {
            "開口 或 幫組": { "見影組 或 孃母": "IEN", "": "AN" },
            "合口": "UAN",
          },
          元韻: {
            "開口": "IEN",
            "合口 或 幫組": { "幫組": "AN", "": "YUAN" },
          },
          先韻: {
            "開口 或 幫組": "IEN",
            "合口": { [捲舌]: "UEN", "": "YUAN" },
          },
          仙韻: {
            "開口 或 幫組": { [捲舌]: "AN", "": "IEN" },
            "合口": { [捲舌]: "UAN", "": "YUAN" },
          },
        },
        效攝: {
          三四等: { [捲舌]: "AU", "": "IAU" },
          二等: { "見影組": "IAU", "": "AU" },
          一等: "AU",
        },
        果攝: {
          歌韻: { "開口 或 幫組": "O", "合口": "UO" },
          戈韻: { 開口: "IE", 合口: "YUE" },
        },
        假攝: {
          二等: { "開口 或 幫組": { "見影組": "IA", "": "A" }, "合口": "UA" },
          三四等: { [捲舌]: "AE", "": "IE" },
        },
        宕攝: {
          一等: { 幫組: "ANG", 開口: "ANG", 合口: "UANG" },
          三等: {
            幫組: "ANG",
            開口: { "莊組": "UANG", [捲舌]: "ANG", "": "IANG" },
            合口: "UANG",
          },
        },
        梗曾攝: {
          一二等: { "開口 或 幫組": "ENG", "合口": "UENG" },
          三四等: {
            "開口 或 幫組": { [捲舌]: "ENG", "": "ING" },
            "合口": "IUNG",
          },
        },
        流攝: {
          三等: { [`${捲舌} 或 幫組 C類`]: "OU", "": "IU" },
          一等: "OU",
        },
        深攝: { [捲舌]: "EM", "": "IM" },
        咸攝: {
          覃韻: { "泥來母": "AM", "": "OM" },
          談韻: "AM",
          鹽添咸嚴韻: { [捲舌]: "AM", "": "IEM" },
          銜韻: { [`${捲舌} 或 幫組`]: "AM", "": "IEM" },
          凡韻: { "幫組": "AM", [捲舌]: "UAM", "": null },
        },
      },

      入聲: {
        通攝: {
          一等: "UK",
          三等: { "莊章組 或 知徹澄日母 或 幫組": "UK", "": "YUK" },
        },
        江攝: { "幫組": "OK", "莊章組 或 知徹澄日母": "UOK", "": "IOK" },
        臻攝: {
          真韻: {
            "開口 或 幫組": { [捲舌]: "RT", "": "IT" },
            "合口": { [捲舌]: "UT", "": "YUT" },
          },
          臻殷韻: { [捲舌]: "RT", "": "IT" },
          文韻: { "幫組": "UT", "見影組 或 孃母": "YUET", "": "YUT" },
          痕韻: "ET",
          魂韻: "UT", // 有異讀
        },
        山攝: {
          寒韻: { "開口": { "精端組 或 來母": "AT", "": "OT" }, "合口 或 幫組": "UOT" },
          刪山韻: {
            "開口 或 幫組": { "見影組 或 孃母": "IAT", "": "AT" },
            "合口": "UAT",
          },
          元韻: {
            "開口": "IET",
            "合口 或 幫組": { "幫組": "AT", "": "YUET" },
          },
          先韻: {
            "開口 或 幫組": "IET",
            "合口": { [捲舌]: "UT", "": "YUET" },
          },
          仙韻: {
            "開口 或 幫組": { [捲舌]: "AET", "": "IET" },
            "合口": { [捲舌]: "UOT", "": "YUET" },
          },
        },
        宕攝: {
          一等: { "開口 或 幫組": "OK", "合口": "UOK" },
          三等: {
            幫組: "OK",
            開口: { [捲舌]: "OK", "": "IOK" },
            合口: "YUOK",
          },
        },
        梗攝: {
          二等: { "開口 或 幫組": "EK", "合口": "UOK" },
          三四等: {
            "開口 或 幫組": { [捲舌]: "RK", "": "IK" },
            "合口": { [捲舌]: "UK", "": "YUK" },
          },
        },
        曾攝: {
          三等: {
            "章組": "RK",
            "開口 或 幫組": { [捲舌]: "EK", "": "IK" },
            "合口": "YUK",
          },
          一等: { "開口 或 幫組": "EK", "合口": "UOK" },
        },
        深攝: { "章組": "RP", [捲舌]: "EP", "": "IP" },
        咸攝: {
          覃韻: { "泥來母": "AP", "": "OP" },
          談韻: "AP",
          鹽添嚴韻: { [捲舌]: "EP", "": "IEP" },
          咸銜韻: { [`${捲舌} 或 幫組`]: "AP", "": "IAP" },
          凡韻: { "幫組": "AP", [捲舌]: "UAP", "": null },
        },
      },
    }),
  );
}

const TONES = {
  輕: [0, 0, 0, 0, 0],
  陰平: [1, 1, 1, 1, 1],
  陽平: [2, 2, 2, 2, 2],
  上: [3, 3, 3, 3, 3],
  去: [4, 4, 4, 4, 4],
  陰入: [5, 5, 5, 5, 5],
  陽入: [6, 6, 6, 6, 6],
};

function getToneKey() {
  return when(
    rules({
      清音: { 平聲: "陰平", 上聲: "上", 去聲: "去", 入聲: "陰入" },
      濁音: { 平聲: "陽平", 上聲: { 全濁: "去", 次濁: "上" }, 去聲: "去", 入聲: "陽入" },
    }),
  );
}

let finalKey = getFinalKey();
let initialKey = getInitialKey();
let toneKey = getToneKey();
let isIOrYu =
  finalKey.startsWith("I") || finalKey.startsWith("Y") || finalKey.startsWith("R") || finalKey.startsWith("Z");

if (isIOrYu) {
  initialKey = {
    G: "J",
    K: "CHI",
    H: "HS",
    NG: "NY",
  }[initialKey] ?? initialKey;
} else {
  initialKey ??= {
    NY: "NG",
  }[initialKey] ?? initialKey;
}

if (initialKey === "F" && finalKey === "U") {
  finalKey = "V";
} else if (initialKey === "RH" && finalKey === "ER") {
  initialKey = "_";
}

function nml(ret) {
  [
    [/^gu([aeo])/, "gw$1"],
    [/^ku([aeo])/, "kw$1"],
    [/^hu([aeo])/, "hw$1"],
    [/^ngu([aeo])/, "ngw$1"],
    [/^r([aue])/, "rh$1"],
    [/^([bpmfv]?)ung$/, "$1ong"],

    [/^i$/, "yi"],
    [/^in$/, "yin"],
    [/^im$/, "yim"],
    [/^ing$/, "ying"],
    [/^ip$/, "yip"],
    [/^it$/, "yit"],
    [/^ik$/, "yik"],
    [/^i/, "y"],
    [/^u$/, "wu"],
    [/^ut$/, "wut"],
    [/^uk$/, "wuk"],
    [/^ung/, "ung"],
    [/^u/, "w"],
    [/^nyy/, "ny"],
  ].forEach(([o, n]) => {
    ret = ret.replace(o, n);
  });
  return ret;
}

function nml2(ret) {
  return (
    {
      tzou: "tzow",
      tsou: "tsow",
      sou: "sow",
      zhou: "zhow",
      chou: "chow",
      shou: "show",
      rou: "row",
      buen: "bun",
      puen: "pun",
      muen: "mun",
      buei: "bui",
      puei: "pui",
      muei: "mui",
      tzz: "tz",
    }[ret] ?? ret
  );
}

function build(initialKey, finalKey, toneKey) {
  let initialData = INITIALS[initialKey];
  let finalData = FINALS[finalKey];
  let toneData = TONES[toneKey];
  let ret = 拼式(...initialData) + 拼式(...finalData);
  return (選項.拼式版本 === "優化（默認）" ? nml2(nml(ret)) : ret) + 拼式(...toneData);
}

shared.initials = INITIALS;
shared.finals = FINALS;
shared.build = build;

return build(initialKey, finalKey, toneKey);
