import { Pillars, Gan, Zhi, Shen, Util, Key } from './base';

type LiuRenInput = {
  yueJiang: number;
  zhan: number;
  rGan: number;
  rZhi: number;
};

/**
 * 六壬
 */
export class LiuRen {
  constructor(input: Date | LiuRenInput) {
    let data: LiuRenInput;
    if (input instanceof Date) {
      this.pillars = new Pillars(input);
      data = {
        yueJiang: Shen.YueJiang(input),
        zhan: this.pillars.sZhi,
        rGan: this.pillars.rGan,
        rZhi: this.pillars.rZhi,
      };
    } else data = input;
    this.pan = new Pan(data);
    this.ke = new Ke(this.pan, data);
    this.chuan = new Chuan(this.pan, this.ke);
    this.data = data;
  }

  /** data */
  data: LiuRenInput;

  /** 四柱 */
  pillars?: Pillars;

  /** 天地盤 */
  pan: Pan;

  /** 四課 */
  ke: Ke;

  /** 三傳 */
  chuan: Chuan;
}

/**
 * 天地盤
 */
class Pan {
  constructor(input: LiuRenInput) {
    const { yueJiang, zhan, rGan, rZhi } = input;
    this.diff = (zhan - yueJiang + 12) % 12;
    this.zhi = this.getZhiShen(yueJiang, zhan);
    this.gan = this.zhi.map((i) => Shen.XunDun(rGan, rZhi, i));
    this.jiang = this.getTianJiang(rGan, zhan);
  }

  /** ZhiShen Array 0~11 */
  zhi: Array<number>;

  /** DunGan Array 0~11 */
  gan: Array<number>;

  /** TianJiang Array 0~11 */
  jiang: Array<number>;

  /** Tian-Di index difference */
  diff = 0;

  /**
   * 支神
   * @param yueJiang 月將
   * @param sZhi 占時
   * @returns index: 地盤; value: 天盤
   */
  getZhiShen(yueJiang: number, sZhi: number) {
    const z = [...Array(12).keys()];
    const i = (yueJiang - sZhi + 12) % 12;
    return [...z.slice(i), ...z.slice(0, i)];
  }

  /**
   * 天將
   * @param rGan 日干
   * @param sZhi 占時
   * @returns index: 地盤; value: 天將
   */
  getTianJiang(rGan: number, sZhi: number) {
    const i = (Shen.GuiRen(rGan, sZhi) + this.diff) % 12;
    const s = [...Array(12).keys()];
    const t = i < 5 || i == 11 ? s : [0, ...s.slice(1).reverse()];
    return [...t.slice(12 - i), ...t.slice(0, 12 - i)];
  }
}

/**
 * 四課
 */
class Ke {
  constructor(p: Pan, input: LiuRenInput) {
    const { rGan, rZhi } = input;
    const r = Gan(rGan).JiGong;
    this.earth = [r, p.zhi[r], rZhi, p.zhi[rZhi]];
    this.heaven = this.earth.map((i) => p.zhi[i]);
    this.jiang = this.earth.map((i) => p.jiang[i]);
    this.rGan = rGan;
    this.rZhi = rZhi;
  }

  /** DiPan ZhiShen Array 0~3 */
  earth: Array<number>;

  /** TianPan ZhiShen Array 0~3 */
  heaven: Array<number>;

  /** TianJiang Array 0~3 */
  jiang: Array<number>;

  /** RiGan */
  rGan: number;

  /** RiZhi */
  rZhi: number;
}

/**
 * 三傳
 */
class Chuan {
  constructor(p: Pan, k: Ke) {
    this.zhi = this.getChuan(p, k);
    this.gan = this.zhi.map((i) => Shen.XunDun(k.rGan, k.rZhi, i));
    this.jiang = this.zhi.map((i) => p.jiang[p.zhi.indexOf(i)]);
    this.qin = this.zhi.map((i) => Gan(k.rGan).shengKe(Zhi(i).WuXing));
  }

  /** ZhiShen Array 0~2 */
  zhi: Array<number>;

  /** DunGan Array 0~2 */
  gan: Array<number>;

  /** TianJiang Array 0~2 */
  jiang: Array<number>;

  /** LiuQin Array 0~2 */
  qin: Array<number>;

  /** 九宗門 */
  method = '';

  getChuan(p: Pan, k: Ke) {
    const wg = Gan(k.rGan).WuXing;
    const wu = k.heaven.map((i) => Zhi(i).WuXing);
    const wl = k.earth.map((i) => Zhi(i).WuXing);
    wl[0] = wg;
    const _z = [0, 1, 2, 3].filter((i) => Util.shengKe(wl[i], wu[i]) == 2);
    const _k = [0, 1, 2, 3].filter((i) => Util.shengKe(wl[i], wu[i]) == 3);
    const yz = [0, 1, 2, 3].filter((i) => Util.shengKe(wu[i], wg) == 2);
    const yk = [0, 1, 2, 3].filter((i) => Util.shengKe(wu[i], wg) == 3);
    const hasZK = _z.length > 0 || _k.length > 0;
    const hasYK = yz.length > 0 || yk.length > 0;

    if (p.diff == 0) {
      return this.FuYin(k);
    } else if (p.diff == 6) {
      return this.FanYin(k, p);
    } else if (Gan(k.rGan).JiGong == k.rZhi && !hasZK) {
      return this.BaZhuan(k);
    } else if (new Set(k.heaven).size == 3 && !hasZK && !hasYK) {
      return this.BieZe(k, p);
    } else if (new Set(k.heaven).size == 4 && !hasZK && !hasYK) {
      return this.AngXing(k, p);
    } else if (hasZK) {
      return this.ZeiKe(k, p);
    } else if (hasYK) {
      return this.YaoKe(k, p);
    } else return [];
  }

  ZeiKe(k: Ke, p: Pan) {
    const wu = k.heaven.map((i) => Zhi(i).WuXing);
    const wl = k.earth.map((i) => Zhi(i).WuXing);
    wl[0] = Gan(k.rGan).WuXing;
    const _z = [0, 1, 2, 3]
      .filter((i) => Util.shengKe(wl[i], wu[i]) == 2)
      .map((i) => k.heaven[i]);
    const _k = [0, 1, 2, 3]
      .filter((i) => Util.shengKe(wl[i], wu[i]) == 3)
      .map((i) => k.heaven[i]);
    let c1: number;
    const arr = _z.length > 0 ? _z : _k; /*賊vs剋*/
    if (new Set(arr).size == 1) {
      this.method = _z.length > 0 ? '重審' : '元首';
      c1 = arr[0];
    } else if (arr.length > 1) {
      this.method = '知一';
      const r = Gan(k.rGan).YinYang;
      const brr = arr.filter((i) => Zhi(i).YinYang == r);
      const crr = arr.filter((i) => Zhi(i).YinYang != r);
      if (new Set(brr).size == 1) c1 = brr[0];
      else {
        this.method = '涉害';
        const arr1 = brr.length > 0 ? brr : crr;
        const arr2 = arr1.map((i) => p.zhi.indexOf(i));
        const arr3 = arr2.map((i) => Zhi(i).MZJ);
        c1 = arr1[arr3.indexOf(Math.min(...arr3))];
      }
    } else return []; /*沒有賊剋 -> 返吟法*/
    const c2 = p.zhi[c1];
    const c3 = p.zhi[c2];
    return [c1, c2, c3];
  }

  YaoKe(k: Ke, p: Pan) {
    this.method = '遙剋';
    const wu = k.heaven.map((i) => Zhi(i).WuXing);
    const wg = Gan(k.rGan).WuXing;
    const _kr = [0, 1, 2, 3]
      .filter((i) => Util.shengKe(wu[i], wg) == 2)
      .map((i) => k.heaven[i]);
    const _rk = [0, 1, 2, 3]
      .filter((i) => Util.shengKe(wu[i], wg) == 3)
      .map((i) => k.heaven[i]);
    let c1: number;
    const arr = _kr.length > 0 ? _kr : _rk; /*剋日vs被日剋*/
    if (new Set(arr).size == 1) {
      c1 = arr[0];
    } else if (arr.length > 1) {
      const r = Gan(k.rGan).YinYang; /*取比用*/
      const brr = arr.filter((i) => Zhi(i).YinYang == r);
      if (new Set(brr).size == 1) c1 = brr[0];
      else return []; /*沒有涉害*/
    } else return []; /*沒有遙剋*/
    const c2 = p.zhi[c1];
    const c3 = p.zhi[c2];
    return [c1, c2, c3];
  }

  AngXing(k: Ke, p: Pan) {
    this.method = '昂星';
    switch (Gan(k.rGan).YinYang) {
      case 1: //剛日: 酉上神, 支上神, 干上神
        return [p.zhi[9], k.heaven[2], k.heaven[0]];
      case 0: //柔日: 酉下神, 干上神, 支上神
        return [p.zhi.indexOf(9), k.heaven[0], k.heaven[2]];
      default:
        return [];
    }
  }

  BieZe(k: Ke, p: Pan) {
    this.method = '別責';
    switch (Gan(k.rGan).YinYang) {
      case 1: //剛日: 干合上神, 干上神, 干上神
        const i = Gan(Gan(k.rGan).He).JiGong;
        return [p.zhi[i], k.heaven[0], k.heaven[0]];
      case 0: //柔日: 支前三合神, 干上神, 干上神
        const sanHe = Zhi(k.rZhi).SanHe;
        const j = (sanHe.indexOf(k.rZhi) + 1) % 3;
        return [sanHe[j], k.heaven[0], k.heaven[0]];
      default:
        return [];
    }
  }

  BaZhuan(k: Ke) {
    this.method = '八專';
    switch (Gan(k.rGan).YinYang) {
      case 1: //剛日: 第一課上神+2, 干上神, 干上神
        return [(k.heaven[0] + 2) % 12, k.heaven[0], k.heaven[0]];
      case 0: //柔日: 第四課上神-2, 干上神, 干上神
        return [(k.heaven[3] + 10) % 12, k.heaven[0], k.heaven[0]];
      default:
        return [];
    }
  }

  FuYin(k: Ke) {
    this.method = '伏吟';
    if (Gan(k.rGan).YinYang == 1 || k.rGan == 1 || k.rGan == 9) {
      const c1 = k.heaven[0];
      const x1 = Zhi(c1).Xing;
      const c2 = x1 == c1 ? k.heaven[2] : x1;
      const x2 = Zhi(c2).Xing;
      const c3 = x2 == c2 || x2 == c1 ? Zhi(c2).Chong : x2;
      return [c1, c2, c3];
    } else {
      const c1 = k.heaven[2];
      const x1 = Zhi(c1).Xing;
      const c2 = x1 == c1 ? k.heaven[0] : x1;
      const x2 = Zhi(c2).Xing;
      const c3 = x2 == c2 || x2 == c1 ? Zhi(c2).Chong : x2;
      return [c1, c2, c3];
    }
  }

  FanYin(k: Ke, p: Pan) {
    const zk = this.ZeiKe(k, p);
    this.method = '返吟';
    if (zk.length) return zk;
    else return [Shen.YiMa(k.rZhi), k.heaven[2], k.heaven[0]];
  }
}

export const LiuRenUtil = {
  log(v: LiuRen | Pan | Ke | Chuan | Pillars) {
    if (v instanceof LiuRen) {
      if (v.pillars) this.log(v.pillars);
      this.log(v.chuan);
      this.log(v.ke);
      this.log(v.pan);
    } else if (v instanceof Pan) {
      const z: Array<string> = v.zhi.map((i) => Key.Zhi[i]);
      const j: Array<string> = v.jiang.map((i) => Key.TianJiang[i]);
      const str =
        `   ${j[5]} ${j[6]} ${j[7]} ${j[8]}   \n` +
        `   ${z[5]} ${z[6]} ${z[7]} ${z[8]}   \n` +
        `${j[4]} ${z[4]}       ${z[9]} ${j[9]}\n` +
        `${j[3]} ${z[3]}       ${z[10]} ${j[10]}\n` +
        `   ${z[2]} ${z[1]} ${z[0]} ${z[11]}   \n` +
        `   ${j[2]} ${j[1]} ${j[0]} ${j[11]}   \n`;
      console.log(str);
    } else if (v instanceof Ke) {
      const j: Array<string> = v.jiang.map((i) => Key.TianJiang[i]);
      const t: Array<string> = v.heaven.map((i) => Key.Zhi[i]);
      const d: Array<string> = v.earth.map((i) => Key.Zhi[i]);
      const str =
        `   ${j[3]} ${j[2]} ${j[1]} ${j[0]}\n` +
        `   ${t[3]} ${t[2]} ${t[1]} ${t[0]}\n` +
        `   ${d[3]} ${d[2]} ${d[1]} ${Key.Gan[v.rGan]}\n`;
      console.log(str);
    } else if (v instanceof Chuan) {
      const z = v.zhi.map((i) => Key.Zhi[i]);
      const g = v.gan.map((i) => (i < 0 ? '𐩒' : Key.Gan[i]));
      const j = v.jiang.map((i) => Key.TianJiang[i]);
      const q = v.qin.map((i) => Key.LiuQin[i]);
      const str =
        `   ${g[0]} ${q[0]} ${z[0]} ${j[0]}\n` +
        `   ${g[1]} ${q[1]} ${z[1]} ${j[1]}\n` +
        `   ${g[2]} ${q[2]} ${z[2]} ${j[2]}\n`;
      console.log(str);
    } else if (v instanceof Pillars) {
      const _tG = Key.Gan;
      const _dZ = Key.Zhi;
      const g = [v.yGan, v.mGan, v.rGan, v.sGan];
      const z = [v.yZhi, v.mZhi, v.rZhi, v.sZhi];
      const str =
        `${v.time.toString()}\n` +
        `   ${_tG[g[3]]} ${_tG[g[2]]} ${_tG[g[1]]} ${_tG[g[0]]}\n` +
        `   ${_dZ[z[3]]} ${_dZ[z[2]]} ${_dZ[z[1]]} ${_dZ[z[0]]}\n` +
        `   時 日 月 年\n`;
      console.log(str);
    }
  },
};
