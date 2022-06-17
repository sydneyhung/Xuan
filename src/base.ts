import * as JieQi from './JieQi';

// prettier-ignore
export const Key = {
  Empty: '　',
  YinYang: '陰陽',
  WuXing: '木火土金水',
  Gan: '甲乙丙丁戊己庚辛壬癸',
  Zhi: '子丑寅卯辰巳午未申酉戌亥',
  Yun:['長生', '沐浴', '冠帶', '臨官', '帝旺', '衰', '病', '死', '墓', '絕', '胎', '養'],
  LiuQin: '兄子財官父',
  LiuQin2: [
    '兄弟', '子孫', '妻財', '官鬼', '父母'
  ],
  ShiShen: '比食才殺梟劫傷財官印',
  ShiShen2: [
    '比肩', '食神', '偏財', '七殺', '偏印',
    '劫財', '傷官', '正財', '正官', '正印',
  ],
  TianJiang: '貴蛇朱合勾青空虎常玄陰后',
  TianJiang2: [
    '貴人', '螣蛇', '朱雀', '六合', '勾陳', '青龍',
    '天空', '白虎', '太常', '玄武', '太陰', '天后',
  ],
  YueJiang2: [
    '神后', '大吉', '功曹', '太衝', '天罡', '太乙',
    '勝光', '小吉', '傳送', '從魁', '河魁', '登明',
  ],
  Jie: [
    '大雪', '小寒', '立春', '驚蟄', '清明', '立夏', 
    '芒種', '小暑', '立秋', '白露', '寒露', '立冬', 
  ],
  Qi: [
    '冬至', '大寒', '雨水', '春分', '穀雨', '小滿',
    '夏至', '大暑', '處暑', '秋分', '霜降', '小雪', 
  ],
  JieQi: [
    '冬至', '小寒', '大寒', '立春', '雨水', '驚蟄',
    '春分', '清明', '穀雨', '立夏', '小滿', '芒種',
    '夏至', '小暑', '大暑', '立秋', '處暑', '白露',
    '秋分', '寒露', '霜降', '立冬', '小雪', '大雪',
  ],
  NaYin: [
    '海中金', '爐中火', '大林木', '路旁土', '劍鋒金', '山頭火',
    '澗下水', '城頭土', '白臘金', '楊柳木', '井泉水', '屋上土',
    '霹靂火', '松柏木', '長流水', '砂中金', '山下火', '平地木',
    '壁上土', '金箔金', '覆燈火', '天河水', '大驛土', '釵釧金',
    '桑柘木', '大溪水', '砂中土', '天上火', '石榴木', '大海水',
  ]
};

export const Util = {
  /**
   * 五行生剋
   * @param self  五行: 我
   * @param other  五行: 他
   * @returns index of key.LiuQin
   */
  shengKe(self: number, other: number) {
    return (other - self + 5) % 5;
  },

  /**
   * 十干生剋
   * @param self 天干: 日元
   * @param other 天干: 他
   * @returns index of key.ShiShen
   */
  shiShen(self: number, other: number) {
    const sk = this.shengKe(Gan(self).WuXing, Gan(other).WuXing);
    const yy = Gan(self).YinYang == Gan(other).YinYang ? 0 : 5;
    return sk + yy;
  },

  /** 納音 */
  NaYin(g: number, z: number) {
    for (let i = 0; i < 60; i++)
      if (i % 10 == g && i % 12 == z) return Math.floor(i / 2);
    return -1;
  },

  /** 年柱月柱 */
  getYM(time: Date) {
    let i = time.getFullYear() - 4;
    let j = JieQi.getJie(time);
    const isPrevYear = j < 2;
    j = j + (i % 5) * 12;
    i = isPrevYear ? i - 1 : i;
    return [i % 10, i % 12, j % 10, j % 12];
  },

  /** 日柱時柱 */
  getDH(time: Date) {
    const REF = new Date('1924-02-15T00:00:00.0').getTime(); // 甲子日
    let k = Math.floor((time.getTime() - REF) / (24 * 60 * 60 * 1000));
    const l = Math.round(time.getHours() / 2) + (k % 5) * 12;
    k = time.getHours() === 23 ? k + 1 : k;
    return [k % 10, k % 12, l % 10, l % 12];
  },
};

/**
 * 天干
 * @param i 天干
 * @returns 陰陽, 五行, 相合, 寄宮
 */
export function Gan(i: number) {
  const wx = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4][i];
  return {
    /** 陰陽: gna => index of `key.YinYang` */
    YinYang: (i + 1) % 2,

    /** 五行: gna => index of `key.WuXing` */
    WuXing: wx,

    /** 相合: gna => index of `key.Gan` */
    He: [5, 6, 7, 8, 9, 0, 1, 2, 3, 4][i],

    /** 寄宮: gna => index of `key.Zhi` */
    JiGong: [2, 4, 5, 7, 5, 7, 8, 10, 11, 1][i],

    /** 十二運 gan-idx => index of `key.Yun` */
    Yun: (z: number) => {
      const s = [1, 6, 10, 9, 10, 9, 7, 0, 4, 3];
      return i % 2 == 0 ? (s[i] + z) % 12 : (s[i] - z + 12) % 12;
    },

    /** 五行生剋: element-idx => index of `key.LiuQin` */
    shengKe: (o: number) => Util.shengKe(wx, o),

    /** 十干生剋: gan-idx => index of `key.ShiShen` */
    shiShen: (o: number) => Util.shiShen(i, o),
  };
}

/**
 * 地支
 * @param i 地支
 * @returns 陰陽, 五行, 孟仲季, 刑, 沖, 破, 害, 合, 三合, 三會, 藏干
 */
export function Zhi(i: number) {
  const wx = [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4][i];
  return {
    /** 陰陽: zhi => index of `key.YinYang` */
    YinYang: (i + 1) % 2,

    /** 五行: zhi => index of `key.WuXing` */
    WuXing: wx,

    /** 孟仲季: zhi => index of "孟仲季" */
    MZJ: (i + 1) % 3,

    /** 相刑: zhi => index of `key.Zhi` */
    Xing: [3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11][i],

    /** 相沖: zhi => index of `key.Zhi` */
    Chong: (i + 6) % 12,

    /** 相破: zhi => index of `key.Zhi` */
    Po: [9, 4, 11, 6, 1, 8, 3, 10, 5, 0, 7, 2][i],

    /** 相害: zhi => index of `key.Zhi` */
    Hai: [7, 6, 5, 4, 3, 2, 1, 0, 11, 10, 9, 8][i],

    /** 相合: zhi => index of `key.Zhi` */
    He: [1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2][i],

    /** 三合: zhi => array of indices of `key.Zhi` */
    SanHe: [i, (i + 4) % 12, (i + 8) % 12].sort((a, b) => a - b),

    /** 三會: zhi => array of indices of `key.Zhi` */
    SanHui: [
      i % 3 == 2 ? i : i % 3 == 0 ? (i + 11) % 12 : (i + 10) % 12,
      i % 3 == 0 ? i : i % 3 == 1 ? (i + 11) % 12 : (i + 1) % 12,
      i % 3 == 1 ? i : i % 3 == 2 ? (i + 2) % 12 : (i + 1) % 12,
    ],

    /** 藏干: zhi => array of indices of `key.Gan` */
    CangGan: [
      [9],
      [5, 9, 7],
      [0, 2, 4],
      [1],
      [4, 1, 9],
      [2, 4, 6],
      [3, 5],
      [5, 1, 3],
      [6, 8, 4],
      [7],
      [4, 7, 3],
      [8, 0],
    ][i],

    /** 五行生剋: element-idx => index of `key.LiuQin` */
    shengKe: (e: number) => Util.shengKe(wx, e),
  };
}

/**
 * 四柱
 * @param time
 * @returns 年干, 年支, 月干, 月支, 日干, 日支, 時干, 時支
 */
export class Pillars {
  time: Date;
  yGan: number;
  yZhi: number;
  mGan: number;
  mZhi: number;
  rGan: number;
  rZhi: number;
  sGan: number;
  sZhi: number;

  constructor(time: Date) {
    this.time = time;
    [this.yGan, this.yZhi, this.mGan, this.mZhi] = Util.getYM(time);
    [this.rGan, this.rZhi, this.sGan, this.sZhi] = Util.getDH(time);
  }
}

export const Shen = {
  /** 月令: time => zhi-idx */
  YueLing: (time: Date) => JieQi.getJie(time),

  /** 月將: time => zhi-idx */
  YueJiang: (time: Date) => (13 - JieQi.getQi(time)) % 12,

  /** 旬遁: (rGan, rZhi, zhi-idx) => gan-idx */
  XunDun: (rGan: number, rZhi: number, i: number) => {
    const xunShou = (rZhi - rGan + 12) % 12;
    const r = (i - xunShou + 12) % 12;
    return r > 9 ? -1 : r;
  },

  /** 天乙貴人: (rGan, sZhi) => zhi-idx  */
  GuiRen: (rGan: number, sZhi: number) => {
    const isDay = sZhi >= 3 && sZhi < 9;
    return isDay // 甲戊庚牛羊
      ? [1, 0, 11, 11, 1, 0, 1, 6, 5, 5][rGan]
      : [7, 8, 9, 9, 7, 8, 7, 2, 3, 3][rGan];
    // return isDay // 甲羊戊庚牛
    //   ? [7, 8, 9, 11, 1, 0, 1, 2, 3, 5][rGan]
    //   : [1, 0, 11, 9, 7, 8, 7, 6, 5, 3][rGan];
  },

  /** 驛馬: rZhi => zhi-idx */
  YiMa: (rZhi: number) => [2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8, 5][rZhi],
};
