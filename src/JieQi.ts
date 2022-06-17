/**
 * @param date
 * @param q?  0:節氣 1:中氣
 * @returns index of key.JieQi
 */
export function getJieQi(date: Date, q?: number) {
  const _q = q !== undefined;
  const time = date.getTime();
  const year = date.getFullYear();
  const dates = Data[year - 1920].split(',');
  for (let i = _q ? q : 0; i < dates.length; i += _q ? 2 : 1) {
    const ymStr = `${year}-${('0' + (Math.floor(i / 2) + 1)).slice(-2)}-`;
    const rsStr = `${dates[i].slice(0, 2)}T${dates[i].slice(2)}:00:00.000Z`;
    if (time < new Date(ymStr + rsStr).getTime())
      return _q ? Math.floor(i / 2) : i;
  }
  return 0;
}
/**
 * 節氣
 * @param date
 * @returns index of key.Jie
 */
export function getJie(date: Date) {
  return getJieQi(date, 0);
}

/**
 * 中氣
 * @param date
 * @returns index of key.Qi
 */
export function getQi(date: Date) {
  return getJieQi(date, 1);
}

// 小寒 ~ 冬至, 1920 ~
// https://destiny.to/app/calendar/SolarTerms
export const Data = [
  '0512,2012,0412,1912,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0712,2312,0712,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0712,2212,0712,2312,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0512,2012,0412,2012,0512,2112,0512,2112,0712,2312,0712,2312,0712,2312,0812,2312,0712,2212,0712,2112',
  '0512,2012,0412,1812,0512,2012,0512,2012,0512,2112,0612,2112,0712,2312,0712,2312,0812,2312,0812,2312,0712,2212,0712,2212',
  '0512,2012,0412,1912,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0712,2312,0712,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0712,2212,0712,2312,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0512,2012,0412,2012,0512,2112,0512,2112,0712,2212,0712,2312,0712,2312,0812,2312,0712,2212,0712,2112',
  '0512,2012,0412,1812,0512,2012,0512,2012,0512,2112,0612,2112,0712,2312,0712,2312,0712,2312,0812,2312,0712,2212,0712,2212',
  '0512,2012,0412,1912,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0512,2012,0412,2012,0512,2112,0512,2112,0712,2212,0712,2312,0712,2312,0812,2312,0712,2212,0712,2112',
  '0512,2012,0412,1812,0512,2012,0512,2012,0512,2112,0612,2112,0712,2312,0712,2312,0712,2312,0812,2312,0712,2212,0712,2212',
  '0512,2012,0412,1912,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0512,2012,0412,2012,0512,2112,0512,2112,0712,2212,0712,2312,0712,2312,0812,2312,0712,2212,0712,2112',
  '0512,2012,0412,1812,0512,2012,0512,2012,0512,2112,0512,2112,0712,2312,0712,2312,0712,2312,0812,2312,0712,2212,0712,2212',
  '0512,2012,0412,1912,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0815,2315,0715,2215,0615,2115',
  '0515,2015,0315,1815,0515,2015,0415,2015,0515,2115,0515,2115,0715,2215,0715,2315,0715,2315,0815,2315,0715,2215,0715,2115',
  '0515,2015,0415,1815,0515,2015,0515,2015,0515,2115,0515,2115,0715,2315,0715,2315,0715,2315,0815,2315,0715,2215,0715,2215',
  '0515,2015,0415,1915,0515,2015,0415,1915,0515,2015,0515,2015,0615,2215,0715,2215,0715,2215,0715,2215,0615,2115,0615,2115',
  '0515,1915,0315,1815,0515,2015,0415,1915,0515,2015,0515,2115,0615,2215,0715,2215,0715,2215,0815,2315,0715,2215,0615,2115',
  '0515,2015,0315,1815,0515,2015,0415,2015,0515,2115,0515,2115,0715,2215,0715,2315,0715,2315,0815,2315,0715,2215,0715,2115',
  '0515,2015,0415,1815,0515,2015,0515,2015,0515,2115,0515,2115,0715,2315,0715,2315,0715,2315,0815,2315,0715,2215,0715,2215',
  '0515,2015,0415,1915,0515,2015,0415,1915,0415,2015,0515,2015,0615,2215,0715,2215,0715,2215,0715,2215,0615,2115,0615,2115',
  '0515,1915,0315,1815,0515,2015,0415,1915,0515,2015,0515,2115,0615,2215,0715,2215,0715,2212,0712,2312,0712,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,2012,0512,2115,0515,2115,0715,2215,0715,2315,0715,2215,0812,2312,0712,2212,0712,2112',
  '0512,2012,0312,1812,0512,2012,0412,2015,0515,2115,0515,2115,0715,2315,0715,2315,0715,2315,0815,2315,0712,2212,0712,2212',
  '0512,2012,0412,1912,0412,2012,0412,1912,0415,2015,0515,2015,0615,2215,0615,2215,0715,2215,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0515,2015,0515,2115,0615,2215,0715,2215,0715,2215,0712,2312,0712,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0515,2015,0515,2115,0715,2215,0715,2315,0715,2215,0812,2312,0712,2212,0712,2112',
  '0512,2012,0312,1812,0512,2012,0412,2012,0515,2115,0515,2115,0715,2315,0715,2315,0715,2315,0812,2312,0712,2212,0712,2212',
  '0512,2012,0412,1912,0415,2015,0415,1915,0415,2015,0515,2015,0615,2215,0615,2215,0715,2215,0715,2215,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0415,1915,0515,2015,0515,2115,0615,2215,0715,2215,0715,2215,0715,2315,0712,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0415,1915,0515,2015,0515,2115,0715,2215,0715,2315,0715,2215,0815,2315,0712,2212,0612,2112',
  '0512,2012,0312,1812,0512,2012,0415,2015,0515,2115,0515,2115,0715,2215,0715,2315,0715,2315,0812,2312,0712,2212,0712,2112',
  '0512,2012,0412,1912,0412,1912,0415,1915,0415,2015,0515,2015,0615,2215,0615,2215,0715,2215,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0415,1915,0515,2015,0515,2115,0615,2215,0715,2215,0715,2215,0712,2312,0712,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0415,1915,0515,2015,0515,2115,0615,2215,0715,2215,0715,2215,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0512,2012,0415,2015,0515,2115,0515,2115,0715,2215,0715,2315,0715,2315,0812,2312,0712,2212,0712,2112',
  '0512,2012,0412,1812,0412,1912,0412,1912,0412,2012,0515,2015,0615,2215,0615,2215,0615,2215,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0512,2012,0515,2015,0615,2215,0715,2215,0715,2215,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0512,2012,0412,2012,0512,2112,0512,2112,0712,2212,0712,2312,0712,2312,0812,2312,0712,2212,0712,2112',
  '0512,2012,0412,1812,0412,1912,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0512,2012,0412,2012,0512,2112,0512,2112,0712,2212,0712,2312,0712,2312,0812,2312,0712,2212,0712,2112',
  '0512,2012,0412,1812,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0512,2012,0412,2012,0512,2112,0512,2112,0712,2212,0712,2312,0712,2312,0812,2312,0712,2212,0712,2112',
  '0512,2012,0412,1812,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0412,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0415,1915,0515,2015,0515,2115,0615,2215,0715,2215,0715,2215,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0512,2012,0415,2015,0515,2115,0515,2115,0715,2215,0715,2315,0715,2215,0812,2312,0712,2212,0712,2112',
  '0512,2012,0412,1812,0412,1912,0312,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0712,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0512,2012,0412,2012,0512,2012,0512,2112,0715,2215,0715,2315,0715,2215,0812,2312,0712,2212,0712,2112',
  '0512,2012,0412,1812,0412,1912,0312,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0712,2312,0712,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0712,2212,0712,2312,0712,2212,0812,2312,0712,2212,0712,2112',
  '0512,2012,0312,1812,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0412,2012,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0712,2312,0712,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2312,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1812,0412,1912,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2312,0712,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0812,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0712,2312,0712,2212,0612,2112',
  '0512,2012,0312,1812,0412,1912,0312,1912,0412,1912,0412,2012,0612,2112,0612,2212,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2112,0612,2212,0712,2212,0712,2212,0712,2312,0712,2112,0612,2112',
  '0512,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,2012,0612,2112,0612,2212,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0412,2012,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2312,0712,2112,0612,2112',
  '0512,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1812,0412,1912,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2312,0712,2112,0612,2112',
  '0512,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0512,2012,0512,2012,0612,2212,0712,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,1912,0412,2012,0612,2112,0612,2212,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0612,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0612,2112,0612,2212,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0512,2012,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0712,2212,0712,2212,0612,2112,0612,2112',
  '0512,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,1912,0512,2112,0612,2112,0612,2112,0612,2212,0612,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0412,1912,0412,1912,0412,2012,0512,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,1912,0512,2112,0612,2112,0612,2112,0612,2212,0612,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,1912,0512,2112,0612,2112,0612,2112,0612,2212,0612,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1812,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,1912,0512,2112,0612,2112,0612,2112,0612,2112,0512,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0412,1912,0312,1812,0412,1912,0412,1912,0512,2112,0612,2112,0612,2112,0612,2112,0512,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0412,1912,0312,1812,0312,1912,0412,1912,0512,2112,0512,2112,0612,2112,0612,2112,0512,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,1912,0412,2012,0612,2112,0612,2212,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0412,1912,0312,1812,0312,1912,0412,1912,0512,2112,0512,2112,0612,2112,0612,2112,0512,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0612,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,1912,0412,2012,0612,2112,0612,2212,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0412,1912,0312,1812,0312,1912,0412,1912,0512,2112,0512,2112,0612,2112,0612,2112,0512,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0612,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2212,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0412,1912,0312,1812,0312,1912,0412,1912,0512,2112,0512,2112,0612,2112,0612,2112,0512,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,1912,0512,2112,0612,2112,0612,2112,0612,2212,0612,2012,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0312,1812,0312,1812,0312,1912,0412,1912,0512,2112,0512,2112,0512,2112,0612,2112,0512,2012,0512,2012',
  '0312,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,1912,0512,2112,0612,2112,0612,2112,0612,2212,0612,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0612,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
  '0412,1912,0312,1812,0312,1812,0312,1812,0312,1912,0312,1912,0512,2112,0512,2112,0512,2112,0612,2112,0512,2012,0512,2012',
  '0312,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,1912,0512,2112,0612,2112,0612,2112,0612,2212,0612,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1812,0312,1812,0312,1812,0312,1912,0312,1912,0512,2112,0512,2112,0512,2112,0612,2112,0512,2012,0512,2012',
  '0312,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,1912,0512,2112,0612,2112,0612,2112,0612,2112,0512,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0312,1812,0312,1812,0312,1912,0312,1912,0512,2112,0512,2112,0512,2112,0612,2112,0512,2012,0512,2012',
  '0312,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,1912,0512,2112,0512,2112,0612,2112,0612,2112,0512,2012,0512,2012',
  '0412,1812,0212,1712,0412,1912,0312,1812,0412,1912,0412,2012,0512,2112,0612,2112,0612,2112,0712,2212,0612,2112,0512,2012',
  '0412,1912,0212,1712,0412,1912,0312,1912,0412,2012,0412,2012,0612,2112,0612,2212,0612,2212,0712,2212,0612,2112,0612,2012',
  '0412,1912,0312,1712,0412,1912,0412,1912,0412,2012,0412,2012,0612,2212,0612,2212,0612,2212,0712,2212,0612,2112,0612,2112',
];
