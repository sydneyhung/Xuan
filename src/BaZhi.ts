import { Pillars, JieQi, Gan, Zhi, Util, Key } from './base';

/**
 * 八字
 */
export class BaZi {
  /** 四柱 */
  sizhu: {
    y: Zhu;
    m: Zhu;
    r: Zhu;
    s: Zhu;
  };

  /** 大運 */
  dayun: {
    start: string;
    yun: Array<string>;
    time: Array<string>;
  };

  /** 神煞 */
  shen: unknown;

  constructor(birth: Date, gender: number) {
    this.sizhu = this.getBaZi(birth);
    this.dayun = this.getDaYun(birth, gender);
  }

  getBaZi(time: Date) {
    const p = new Pillars(time);
    const ret = {
      y: new Zhu(p.yGan, p.yZhi, p.rGan),
      m: new Zhu(p.mGan, p.mZhi, p.rGan),
      r: new Zhu(p.rGan, p.rZhi),
      s: new Zhu(p.sGan, p.sZhi, p.rGan),
    };
    return ret;
  }

  getDaYun(birth: Date, gender: number) {
    const forward = Gan(this.sizhu.y.g).YinYang == gender;
    const jie = JieQi.getDate(
      birth.getFullYear(),
      JieQi.getJieQi(birth) + (forward ? 0 : 1)
    );
    const start = new Date(
      birth.getTime() + 120 * Math.abs(jie.getTime() - birth.getTime()) //??
    );
    const yun = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
      const jz = Util.JiaZi(this.sizhu.m.g, this.sizhu.m.z);
      return ((forward ? n : -n) + 60 + jz) % 60;
    });
    const year = [0, 1, 2, 3, 4, 5, 6, 7].map((n) =>
      Math.floor(start.getFullYear() + 10 * n)
    );
    return {
      start: `大運 ${start.getMonth() + 1}月${start.getDate()}日`,
      yun: yun.map((n) => Key.Gan[n % 10] + Key.Zhi[n % 12]),
      time: year.map((n) => n.toString()),
    };
  }
}

/**
 * 柱
 */
class Zhu {
  /** 天干 */
  g: number;

  /** 天干十神 */
  gs: number;

  /** 地支 */
  z: number;

  /** 地支藏干 */
  zg: Array<number>;

  /** 藏干十神 */
  zs: Array<number>;

  /** 旬空 */
  xk: Array<number>;

  /** 長生十二運 */
  yun: number;

  /** 納音 */
  nayin: number;

  constructor(g: number, z: number, r?: number) {
    const ref = r === undefined ? g : r;
    this.g = g;
    this.gs = Gan(ref).shiShen(g);
    this.z = z;
    this.zg = Zhi(z).CangGan;
    this.zs = this.zg.map((i) => Gan(ref).shiShen(i));
    this.xk = Star.XunKong(g, z);
    this.yun = Gan(ref).Yun(z);
    this.nayin = Util.NaYin(g, z);
  }
}

const Star = {
  /** 旬空: (rGan, rZhi) => [gan-idx] */
  XunKong: (rGan: number, rZhi: number) => {
    const xunShou = (rZhi - rGan + 12) % 12;
    const r = (xunShou + 10) % 12;
    return [r, r + 1];
  },

  /** 天乙貴人: (rGan, sZhi) => zhi-idx  */
  GuiRen: (rGan: number, sZhi: number) => {
    [1, 0, 11, 11, 1, 0, 1, 6, 5, 5][rGan] +
      [7, 8, 9, 9, 7, 8, 7, 2, 3, 3][rGan];
  },

  /** 驛馬: rZhi => zhi-idx */
  YiMa: (rZhi: number) => [2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8, 5][rZhi],
};

export const BaZiUtil = {
  log(v: BaZi) {
    const G = Key.Gan;
    const S = Key.ShiShen;
    const Z = Key.Zhi;
    const Y = Key.Yun;
    const N = Key.NaYin;
    const str =
      '時柱      日柱      月柱      年柱\n' +
      '------------------------------------\n' +
      `　${G[v.sizhu.s.g]}　　　` +
      `　${G[v.sizhu.r.g]}　　　` +
      `　${G[v.sizhu.m.g]}　　　` +
      `　${G[v.sizhu.y.g]}\n` +
      `　　${S[v.sizhu.s.gs]}　　　　　　　` +
      `　　${S[v.sizhu.m.gs]}　　` +
      `　　${S[v.sizhu.y.gs]}\n` +
      `　${Z[v.sizhu.s.z]}　　　` +
      `　${Z[v.sizhu.r.z]}　　　` +
      `　${Z[v.sizhu.m.z]}　　　` +
      `　${Z[v.sizhu.y.z]}\n` +
      `${G[v.sizhu.s.zg[0]]}　${S[v.sizhu.s.zs[0]]}　　` +
      `${G[v.sizhu.r.zg[0]]}　${S[v.sizhu.r.zs[0]]}　　` +
      `${G[v.sizhu.m.zg[0]]}　${S[v.sizhu.m.zs[0]]}　　` +
      `${G[v.sizhu.y.zg[0]]}　${S[v.sizhu.y.zs[0]]}\n` +
      `${G[v.sizhu.s.zg[1]] || '　'}　${S[v.sizhu.s.zs[1]] || '　'}　　` +
      `${G[v.sizhu.r.zg[1]] || '　'}　${S[v.sizhu.r.zs[1]] || '　'}　　` +
      `${G[v.sizhu.m.zg[1]] || '　'}　${S[v.sizhu.m.zs[1]] || '　'}　　` +
      `${G[v.sizhu.y.zg[1]] || '　'}　${S[v.sizhu.y.zs[1]] || '　'}\n` +
      `${G[v.sizhu.s.zg[2]] || '　'}　${S[v.sizhu.s.zs[2]] || '　'}　　` +
      `${G[v.sizhu.r.zg[2]] || '　'}　${S[v.sizhu.r.zs[2]] || '　'}　　` +
      `${G[v.sizhu.m.zg[2]] || '　'}　${S[v.sizhu.m.zs[2]] || '　'}　　` +
      `${G[v.sizhu.y.zg[2]] || '　'}　${S[v.sizhu.y.zs[2]] || '　'}\n` +
      '------------------------------------\n' +
      `${Z[v.sizhu.s.xk[0]]}${Z[v.sizhu.s.xk[1]]}　　　`.slice(0, 5) +
      `${Z[v.sizhu.r.xk[0]]}${Z[v.sizhu.r.xk[1]]}　　　`.slice(0, 5) +
      `${Z[v.sizhu.m.xk[0]]}${Z[v.sizhu.m.xk[1]]}　　　`.slice(0, 5) +
      `${Z[v.sizhu.y.xk[0]]}${Z[v.sizhu.y.xk[1]]}\n` +
      '------------------------------------\n' +
      `${Y[v.sizhu.s.yun]}　　　　`.slice(0, 5) +
      `${Y[v.sizhu.r.yun]}　　　　`.slice(0, 5) +
      `${Y[v.sizhu.m.yun]}　　　　`.slice(0, 5) +
      `${Y[v.sizhu.y.yun]}\n` +
      '------------------------------------\n' +
      `${N[v.sizhu.s.nayin]}　　　`.slice(0, 5) +
      `${N[v.sizhu.r.nayin]}　　　`.slice(0, 5) +
      `${N[v.sizhu.m.nayin]}　　　`.slice(0, 5) +
      `${N[v.sizhu.y.nayin]}\n` +
      '------------------------------------\n' +
      `${v.dayun.start}\n   ` +
      `${v.dayun.time[0]}  ${v.dayun.yun[0]}\n   ` +
      `${v.dayun.time[1]}  ${v.dayun.yun[1]}\n   ` +
      `${v.dayun.time[2]}  ${v.dayun.yun[2]}\n   ` +
      `${v.dayun.time[3]}  ${v.dayun.yun[3]}\n   ` +
      `${v.dayun.time[4]}  ${v.dayun.yun[4]}\n   ` +
      `${v.dayun.time[5]}  ${v.dayun.yun[5]}\n   ` +
      `${v.dayun.time[6]}  ${v.dayun.yun[6]}\n   ` +
      `${v.dayun.time[7]}  ${v.dayun.yun[7]}`;
    console.log(str);
  },
};
