import { Pillars, Gan, Zhi, Util, Key, Shen } from './base';

/**
 * 八字
 */
export class BaZi {
  /** 四柱 */
  sizhu: { y: Zhu; m: Zhu; r: Zhu; s: Zhu };

  /** 大運 */
  dayun: Array<string>;

  constructor(time: Date, gender: string) {
    this.sizhu = this.getBaZi(time);
    this.dayun = this.getDaYun(gender);
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

  getDaYun(gender: string) {
    return [];
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

  /** 神煞 */
  shen: Array<string>;

  constructor(g: number, z: number, r?: number) {
    const ref = r === undefined ? g : r;
    this.g = g;
    this.gs = Gan(ref).shiShen(g);
    this.z = z;
    this.zg = Zhi(z).CangGan;
    this.zs = this.zg.map((i) => Gan(ref).shiShen(i));
    this.xk = Shen.XunKong(g, z);
    this.yun = Gan(ref).Yun(z);
    this.nayin = Util.NaYin(g, z);
    this.shen = [];
  }
}

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
      `${G[v.sizhu.s.g]}　　　　` +
      `${G[v.sizhu.r.g]}　　　　` +
      `${G[v.sizhu.m.g]}　　　　` +
      `${G[v.sizhu.y.g]}\n` +
      `  ${S[v.sizhu.s.gs]}　　　 日元 　　` +
      `  ${S[v.sizhu.m.gs]}　　　` +
      `  ${S[v.sizhu.y.gs]}\n` +
      `${Z[v.sizhu.s.z]}　　　　` +
      `${Z[v.sizhu.r.z]}　　　　` +
      `${Z[v.sizhu.m.z]}　　　　` +
      `${Z[v.sizhu.y.z]}\n` +
      ` ${G[v.sizhu.s.zg[0]]}${S[v.sizhu.s.zs[0]]} 　　` +
      ` ${G[v.sizhu.r.zg[0]]}${S[v.sizhu.r.zs[0]]} 　　` +
      ` ${G[v.sizhu.m.zg[0]]}${S[v.sizhu.m.zs[0]]} 　　` +
      ` ${G[v.sizhu.y.zg[0]]}${S[v.sizhu.y.zs[0]]}\n` +
      ` ${G[v.sizhu.s.zg[1]] || '　'}${S[v.sizhu.s.zs[1]] || '　'} 　　` +
      ` ${G[v.sizhu.r.zg[1]] || '　'}${S[v.sizhu.r.zs[1]] || '　'} 　　` +
      ` ${G[v.sizhu.m.zg[1]] || '　'}${S[v.sizhu.m.zs[1]] || '　'} 　　` +
      ` ${G[v.sizhu.y.zg[1]] || '　'}${S[v.sizhu.y.zs[1]] || '　'}\n` +
      ` ${G[v.sizhu.s.zg[2]] || '　'}${S[v.sizhu.s.zs[2]] || '　'} 　　` +
      ` ${G[v.sizhu.r.zg[2]] || '　'}${S[v.sizhu.r.zs[2]] || '　'} 　　` +
      ` ${G[v.sizhu.m.zg[2]] || '　'}${S[v.sizhu.m.zs[2]] || '　'} 　　` +
      ` ${G[v.sizhu.y.zg[2]] || '　'}${S[v.sizhu.y.zs[2]] || '　'}\n` +
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
      '------------------------------------\n';
    console.log(str);
  },
};
