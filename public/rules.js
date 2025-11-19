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
  CHY: ["chy", "ㄑ", "q", "tɕʰ", "t͡ɕʰ"],
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
  ONG: ["ong", "-", "oeng", "ɔŋ", "ɔ̟ŋ̚ʷ", -2],
  UNG: ["ung", "-", "ong", "ʊŋ", "ʷʊ̟ŋ̚ʷ", -2],
  IUNG: ["iung", "-", "iong", "jʊŋ", "j͗ʊ̟ŋ̚ʷ", -2],
  ANG: ["ang", "-", "ang", "ɑŋ", "ɑ̟ŋ̚", -2],
  UANG: ["uang", "-", "uang", "wɑŋ", "wɑ̟ŋ̚", -2],
  YUANG: ["yuang", "-", "üang", "ɥɑŋ", "ɥɑ̟ŋ̚", -2],
  IANG: ["iang", "-", "iang", "jɑŋ", "jɑ̟ŋ̚", -2],
  EI: ["ei", "-", "ei", "eɪ", "əɪ", -1],
  IEI: ["iei", "-", "iei", "jeɪ", "jəɪ", -1],
  I: ["i", "-", "i", "i", "i", 0],
  Z: ["z", "-", "i", "ɹ̩", "ɹ̟̍", 0],
  R: ["r", "-", "i", "ɻ̍", "ɻ̺̍", 0],
  EE: ["ee", "-", "i", "ɻi", "ɻi", -1],
  ER: ["er", "-", "er", "ɚ", "ə̠ɻ˕", -1],
  UAI: ["uai", "-", "uai", "waɪ", "wa̠ɪ̯", -1],
  UEI: ["uei", "-", "ui", "weɪ", "we̠ɪ̯", -1],
  YU: ["yu", "-", "ü", "y", "y˗", 0],
  YU2: ["yu", "-", "ü", "y", "y˗", 0],
  U: ["u", "-", "u", "u", "u", 0],
  V: ["u", "-", "u", "ʋ̩", "ʋ̩ˠ", 0],
  IO: ["io", "-", "io", "jo", "j͗ʏ̯̈o̜̽", 0],
  AI: ["ai", "-", "ai", "aɪ", "a̠ɪ̯", -1],
  OI: ["oi", "-", "oi", "-", "-", -1],
  UOI: ["uoi", "-", "uoi", "-", "-", -1],
  IAI: ["iai", "-", "iai", "jai", "jæi̯", -1],
  UA: ["ua", "-", "ua", "wa", "wä", 0],
  EN: ["en", "-", "en", "ən", "ə̟n̚", -1],
  IN: ["in", "-", "in", "in", "ji̞n̚", -1],
  UEN: ["uen", "-", "un", "wən", "wən̚", -1],
  YUN: ["yun", "-", "ün", "yn", "ɥy˕n̚", -1],
  AN: ["an", "-", "an", "an", "a̠n̚", -1],
  UAN: ["uan", "-", "uan", "wan", "wa̠n̚", -1],
  ON: ["on", "-", "on", "ɔn", "ɔn̚", -1],
  UON: ["uon", "-", "uon", "wɔn", "wɔn̚", -1],
  IEN: ["ien", "-", "ien", "jɛn", "jɛ̠n̚", -1],
  IAN: ["ian", "-", "ian", "jan", "ja̠̠n̚", -1],
  YUEN: ["yuen", "-", "üan", "ɥæn", "ɥʏ̯̈æ̠͗n̚", -1],
  YUAN: ["yuan", "-", "üan", "ɥæn", "ɥʏ̯̈æ̠͗n̚", -1],
  AU: ["au", "-", "ao", "ɑʊ", "ɑ̟ʊ̯", -1],
  UAU: ["uau", "-", "uao", "wɑʊ", "wɑ̟ʊ̯", -1],
  IAU: ["iau", "-", "iao", "jɑʊ", "jɑ̟ʊ̯", -1],
  IEU: ["ieu", "-", "iêu", "jɛʊ", "jɛ̠ʊ̯", -1],
  O: ["o", "-", "o", "o", "ʷo̜̽", 0],
  UO: ["uo", "-", "uo", "wo", "wo̜̽", 0],
  IE: ["ie", "-", "iê", "jɛ", "jɛ̠", 0],
  YUE: ["yue", "-", "üê", "ɥɛ", "ɥɛ̠", 0],
  IA: ["ia", "-", "ia", "ja", "jä", 0],
  A: ["a", "-", "a", "a", "ä", 0],
  AE: ["ae", "-", "ê", "ɛ", "ɛ̠", 0],
  ENG: ["eng", "-", "eng", "əŋ", "əŋ̚", -2],
  UENG: ["ueng", "-", "ueng", "wɤŋ", "wə̹ŋ̚", -2],
  YUENG: ["yueng", "-", "üeng", "ɥɤŋ", "ɥə̹ŋ̚", -2],
  ING: ["ing", "-", "ing", "iŋ", "jɪŋ̚", -2],
  OU: ["ou", "-", "ou", "oʊ", "ʷo̜̽ʊ̯", -1],
  IU: ["iu", "-", "iu", "jʊ", "j͗ʊ", -1],
  IOU: ["iou", "-", "iu", "jʊ", "j͗ʊ", -1],
  UE: ["ue", "-", "uê", "-", "-", 0],

  EM: ["em", "", "em", "əm", "ə̟m̚", -1],
  IM: ["im", "", "im", "im", "ji̞m̚", -1],
  AM: ["am", "", "am", "am", "a̠m̚", -1],
  OM: ["om", "", "om", "ɔm", "ɔm̚", -1],
  IEM: ["iem", "", "iem", "jɛm", "jɛ̠m̚", -1],
  IAM: ["iam", "", "iam", "jam", "ja̠̠m̚", -1],
  UAM: ["uam", "", "uam", "wam", "wa̠m̚", -1],

  UK: ["uk", "", "ug", "uk", "uk̚", -1],
  YUK: ["yuk", "", "üg", "yk", "y˗k̚", -1],
  OK: ["ok", "", "og", "ok", "ʷo̜̽k̚", -1],
  UOK: ["uok", "", "uog", "wok", "wo̜̽k̚", -1],
  IOK: ["iok", "", "iog", "jok", "j͗ʏ̯̈o̜̽k̚", -1],
  RT: ["it", "", "id", "ɻ̍t", "ɻ̺̍t̚", -1],
  IT: ["it", "", "id", "it", "it̚", -1],
  UT: ["ut", "", "ud", "ut", "ut̚", -1],
  YUT: ["yut", "", "üd", "yt", "y˗t̚", -1],
  YUET: ["yuet", "", "üêd", "ɥɛt", "ɥɛ̠t̚", -1, -1],
  YUEK: ["yuek", "", "üêg", "ɥɛk", "ɥɛ̠k̚", -1, -1],
  ET: ["et", "", "ed", "ət", "ə̟t̚", -1],
  AT: ["at", "", "ad", "at", "ät̚", -1],
  OT: ["ot", "", "od", "ot", "ʷo̜̽t̚", -1],
  UOT: ["uot", "", "uod", "wot", "wo̜̽t̚", -1],
  IAT: ["iat", "", "iad", "jat", "jät̚", -1],
  IET: ["iet", "", "iêd", "jɛt", "jɛ̠t̚", -1],
  AET: ["aet", "", "êd", "ɛt", "ɛ̠t̚", -1],
  RK: ["ik", "", "ig", "ɻ̍k", "ɻ̺̍k̚", -1],
  EK: ["ek", "", "eg", "ək", "ə̟k̚", -1],
  AK: ["ak", "", "ag", "ak", "ä̟k̚", -1],
  IK: ["ik", "", "ig", "ik", "ik̚", -1],
  RP: ["ip", "", "ib", "ɻ̍p", "ɻ̺̍p̚", -1],
  EP: ["ep", "", "eb", "əp", "ə̟p̚", -1],
  IP: ["ip", "", "ib", "ip", "ip̚", -1],
  AP: ["ap", "", "ab", "ap", "äp̚", -1],
  OP: ["op", "", "ob", "op", "ʷo̜̽p̚", -1],
  IEP: ["iep", "", "iêb", "jɛp", "jɛ̠p̚", -1],
  IAP: ["iap", "", "iab", "jap", "jäp̚", -1],
  UAP: ["uap", "", "uab", "wap", "wäp̚", -1],
  UAT: ["uat", "", "uad", "wat", "wät̚", -1],
  YUOK: ["yuok", "", "üog", "ɥok", "ɥ͗ʏ̯̈o̜̽k̚", -1],
};

function getFinalKey() {
  const 捲舌 = "莊章組 或 知徹澄日母";
  return when(
    rules({
      舒聲: {
        通攝: {
          一等: "UNG",
          三等: { "幫章組 或 日母 東韻": "UNG", "": "IUNG" },
        },
        江攝: "ONG",
        止攝: {
          幫組: { "B類": "EI", "": "I" },
          開口: { "精組": "Z", "莊章組": "R", "日母": "ER", "": "I" },
          合口: { "莊組": "UAI", "": "UEI" },
        },
        遇攝: {
          魚韻: { "莊幫組": "U", "": "IO" },
          虞韻: { "莊幫組": "U", "": "YU" },
          模韻: "U",
        },
        蟹攝: {
          齊祭韻: {
            "幫組": "I",
            "開口 或 幫組": { "見影組 或 孃母": "IEI", "莊組": "R", "精章組 或 知徹澄日母": "I", "": "EI" },
            "合口": { "": "UEI" },
          },
          泰韻: { 幫組: "OI", 開口: "AI", 合口: "UEI" },
          佳韻: {
            "開口 或 幫組": { "見影組 或 孃母": "IAI", "": "AI" },
            "合口": "UA",
          },
          皆夬韻: {
            "開口 或 幫組": { "見影組 或 孃母": "IAI", "": "AI" },
            "合口": "UAI",
          },
          咍韻: "OI",
          灰韻: { "幫組": "OI", "": "UOI" },
          廢韻: { "合口": "UEI", "": "EI" },
        },
        臻攝: {
          真韻: { "開口 或 幫組": "IN", "合口": "YUN" },
          臻殷韻: { [捲舌]: "EN", "": "IN" },
          文韻: { "幫組": "EN", "": "YUN" },
          痕韻: "EN",
          魂韻: "UEN",
        },
        山攝: {
          寒韻: {
            幫組: "UAN",
            開口: { "端組 或 來母": "AN", "": "ON" },
            合口: { "端組 或 來母": "UAN", "": "UON" },
          },
          刪山韻: {
            "開口 或 幫組": { "見影組 或 孃母": "IAN", "": "AN" },
            "合口": "UAN",
          },
          元韻: {
            "開口": "IEN",
            "合口 或 幫組": { "幫組": "AN", "見組 或 曉匣母": "YUAN", "": "YUEN" },
          },
          先韻: { "開口 或 幫組": "IEN", "見組 合口 或 曉匣母 合口": "YUAN", "合口": "YUEN" },
          仙韻: {
            "開口 或 幫組": { "莊組": "AN", "": "IEN" },
            "合口": { "莊組": "UAN", "見組 或 曉匣母": "YUAN", "": "YUEN" },
          },
        },
        效攝: {
          四等: "IEU",
          三等: { "幫知組": "IEU", "": "IAU" },
          二等: { "見影組": "IAU", "": "AU" },
          一等: { "幫組": "UAU", "": "AU" },
        },
        果攝: {
          一二等: { "開口 或 幫組": "O", "合口": "UO" },
          三等: { "開口 或 幫組": "IE", 合口: "YUE" },
        },
        假攝: {
          二等: { "開口 或 幫組": { "見影組": "IA", "": "A" }, "合口": "UA" },
          三四等: "IE",
        },
        宕攝: {
          一等: { 幫組: "ANG", 開口: "ANG", 合口: "UANG" },
          三等: {
            幫組: "ANG",
            開口: { "莊組": "UANG", "章組": "ANG", "": "IANG" },
            合口: "YUANG",
          },
        },
        梗曾攝: {
          一二等: { "開口 或 幫組": "ENG", "合口": "UENG" },
          三四等: {
            "開口 或 幫組": { "莊組": "ENG", "": "ING" },
            "合口": "YUENG",
          },
        },
        流攝: {
          三等: { "莊幫組 C類": "OU", "見影組": "IOU", "": "IU" },
          一等: "OU",
        },
        深攝: { "莊組": "EM", "": "IM" },
        咸攝: {
          覃韻: { "泥母": "AM", "": "OM" },
          談韻: "AM",
          鹽添嚴韻: { "莊組": "AM", "": "IEM" },
          咸韻: { "莊組": "AM", "": "IAM" },
          銜韻: { "莊幫組": "AM", "": "IAM" },
          凡韻: { "幫組": "AM", [捲舌]: "UAM", "": null }, //	TODO:𠑆
        },
      },

      入聲: {
        通攝: {
          一等: "UK",
          三等: { "幫組": "UK", "": "YUK" },
        },
        江攝: { "幫莊章組 或 知徹澄日母": "OK", "": "IOK" },
        臻攝: {
          真韻: {
            "開口 或 幫組": { [捲舌]: "RT", "": "IT" },
            "合口": { "莊組": "UT", "": "YUT" },
          },
          臻殷韻: { "莊組": "ET", "": "IT" },
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
            "合口": "YUET",
          },
          仙韻: {
            "開口 或 幫組": { "莊組": "AT", "": "IET" },
            "合口": { "莊組": "UOT", "": "YUET" },
          },
        },
        宕攝: {
          一等: { "開口 或 幫組": "OK", "合口": "UOK" },
          三等: {
            幫組: "OK",
            開口: { "莊組": "OK", "": "IOK" },
            合口: "YUOK",
          },
        },
        梗攝: {
          二等: { "開口 或 幫組": "EK", "合口": "UOK" },
          三四等: {
            "開口 或 幫組": { [捲舌]: "RK", "": "IK" },
            "合口": "YUEK", // TODO:?
          },
        },
        曾攝: {
          三等: {
            "莊組": "EK",
            "開口 或 幫組": { [捲舌]: "RK", "": "IK" },
            "合口": "YUK",
          },
          一等: { "開口 或 幫組": "AK", "合口": "UOK" },
        },
        深攝: { "章組": "RP", [捲舌]: "EP", "": "IP" },
        咸攝: {
          覃韻: { "泥來母": "AP", "": "OP" },
          談韻: "AP",
          鹽添嚴韻: { "莊組": "EP", "": "IEP" },
          咸韻: { "莊幫組": "AP", "": "IAP" },
          銜韻: { "莊幫組": "AP", "": "IAP" },
          凡韻: { "幫組": "AP", [捲舌]: "UAP", "": null },
        },
      },
    }),
  );
}

const TONES = {
  輕: [0, 0, 0, 0, 0, ""],
  陰平: [1, 1, 1, 1, 1, "\u0304"],
  陽平: [2, 2, 2, 2, 2, "\u0301"],
  上: [3, 3, 3, 3, 3, "\u030C"],
  去: [4, 4, 4, 4, 4, "\u0300"],
  陰入: [5, 5, 5, 5, 5, "\u0304"],
  陽入: [6, 6, 6, 6, 6, "\u0302"],
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
  initialKey =
    {
      G: "J",
      K: "CHY",
      H: "HS",
      NG: "NY",
    }[initialKey] ?? initialKey;
} else {
  initialKey ??=
    {
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
    [/^r([iy])/, "rh$1"],

    [/^i$/, "yi"],
    [/^in$/, "yin"],
    [/^im$/, "yim"],
    [/^ing$/, "ying"],
    [/^ip$/, "yip"],
    [/^it$/, "yit"],
    [/^ik$/, "yik"],
    [/^iu$/, "yiu"],
    [/^iou$/, "yiu"],
    [/^i/, "y"],
    [/^u$/, "wu"],
    [/^ut$/, "wut"],
    [/^uk$/, "wuk"],
    [/^ung/, "ung"],
    [/^u/, "w"],
    [/^nyy/, "ny"],
    // [/^chyyu(.+)/, "chyu$1"],
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

      chyuen: "chiuen",
      chyuet: "chiuet",
      chyut: "chuet",
      chyuk: "chuek",
      chyu: "chue",
      chyun: "chun",
      chio: "cheo",

      zhyuen: "zhiuen",
      zhyuet: "zhiuet",
      zhyut: "zhuet",
      zhyuk: "zhuek",
      zhyu: "zhue",
      zhyun: "zhun",
      zhio: "zheo",

      shyuen: "shiuen",
      shyuet: "shiuet",
      shyut: "shuet",
      shyuk: "shuek",
      shyu: "shue",
      shyun: "shun",
      shio: "sheo",

      chyie: "chye",
      chyien: "chyen",
      chyiem: "chyem",
      chyiep: "chyep",
      chyiet: "chyet",

      chyia: "chya",
      chyiam: "chyam",
      chyian: "chyan",
      chyiap: "chyap",
      chyiat: "chyat",
      chyiau: "chyau",
      chyiang: "chyang",
      chyieu: "chyeu",
      chyio: "chyo",
      chyiok: "chyok",
      chyiung: "chyung",

      chyyueng: "chyueng",
      chyyuan: "chyuan",
      chyyu: "chyu",
      chyyun: "chyun",
      chyyue: "chyue",
      chyyuet: "chyuet",
      chyyuek: "chyuek",
      chyyuok: "chyuok",
      chyyuang: "chyuang",
      chyyuk: "chyuk",

      chyiei: "chiei",
      chyiai: "chiai",
      chyiou: "chiou",
    }[ret] ?? ret
  );
}

function build(initialKey, finalKey, toneKey) {
  let initialData = INITIALS[initialKey];
  let finalData = FINALS[finalKey];
  let toneData = TONES[toneKey];

  let initialStr = 拼式(...initialData);
  let finalStr = 拼式(...finalData);
  let toneStr = 拼式(...toneData);
  let ret = initialStr + finalStr;
  if (選項.拼式版本 === "優化（默認）") {
    ret = nml2(nml(ret));
    if (選項.標調方式 === "附標") {
      let splitI = ret.length + (finalData[5] ?? 0);
      ret = ret.substring(0, splitI) + toneData[5] + ret.substring(splitI);
    }
  }
  if (選項.標調方式 !== "不標") {
    ret += toneStr;
  }
  return ret;
}

shared.initials = INITIALS;
shared.finals = FINALS;
shared.build = build;

return build(initialKey, finalKey, toneKey);
