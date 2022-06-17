import { Key, LiuRen, LiuRenUtil } from '../src';

let count = 0;
for (let g = 0; g < 10; g++) {
  for (let z = g % 2; z < 12; z += 2)
    for (let i = 0; i < 12; i++) {
      const r = new LiuRen({
        yueJiang: 0,
        zhan: i,
        rGan: g,
        rZhi: z,
      });
      if (r.chuan.method == '返吟') {
        count++;
        console.log(
          Key.Gan[r.ke.rGan] + Key.Zhi[r.ke.rZhi] + '日',
          Key.Zhi[r.ke.heaven[0]],
          r.chuan.zhi.map((i) => Key.Zhi[i]),
          r.chuan.method
        );
        LiuRenUtil.log(r.ke);
      }
    }
}
console.log(count, '課');
