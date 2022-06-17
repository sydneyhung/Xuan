const DiZhi = '子丑寅卯辰巳午未申酉戌亥';
const XingXiu = [
  ['虛', (90 / 7) * 0, 348.5],
  ['女', (90 / 7) * 1, 359.5],
  ['牛', (90 / 7) * 2, 8],
  ['斗', (90 / 7) * 3, 22.5],
  ['箕', (90 / 7) * 4, 38],
  ['尾', (90 / 7) * 5, 51],
  ['心', (90 / 7) * 6, 63],
  ['房', (90 / 7) * 7, 69],
  ['氐', (90 / 7) * 8, 80],
  ['亢', (90 / 7) * 9, 94],
  ['角', (90 / 7) * 10, 105.5],
  ['軫', (90 / 7) * 11, 121],
  ['翼', (90 / 7) * 12, 141],
  ['張', (90 / 7) * 13, 160.5],
  ['星', (90 / 7) * 14, 172.5],
  ['柳', (90 / 7) * 15, 181.5],
  ['鬼', (90 / 7) * 16, 188.5],
  ['井', (90 / 7) * 17, 204.5],
  ['參', (90 / 7) * 18, 224.5],
  ['觜', (90 / 7) * 19, 230],
  ['畢', (90 / 7) * 20, 238],
  ['昴', (90 / 7) * 21, 250.5],
  ['胃', (90 / 7) * 22, 263],
  ['婁', (90 / 7) * 23, 277],
  ['奎', (90 / 7) * 24, 291],
  ['壁', (90 / 7) * 25, 304.5],
  ['室', (90 / 7) * 26, 319.5],
  ['危', (90 / 7) * 27, 336],
];
const YueFen = [
  ['正', (90 / 7) * 26, 319.5],
  ['二', (90 / 7) * 24, 291],
  ['三', (90 / 7) * 22, 263],
  ['四', (90 / 7) * 20, 238],
  ['五', (90 / 7) * 17, 204.5],
  ['六', (90 / 7) * 15, 181.5],
  ['七', (90 / 7) * 13, 160.5],
  ['八', (90 / 7) * 10, 105.5],
  ['九', (90 / 7) * 8, 80],
  ['十', (90 / 7) * 6, 63],
  ['十一', (90 / 7) * 3, 22.5],
  ['十二', (90 / 7) * 1, 359.5],
];

// 月將
for (var i = 0; i < DiZhi.length; i++) {
  const newDiv = document.createElement('div');
  newDiv.className = 'yueJiang';
  newDiv.innerHTML = DiZhi[i];
  newDiv.style.transform = `rotate(${30 * i}deg) translateY(81px)`;
  document.getElementById('tp').appendChild(newDiv);
}

// 二十八星宿
for (var i = 0; i < XingXiu.length; i++) {
  const newDiv = document.createElement('div');
  newDiv.className = 'xingXiu';
  newDiv.innerHTML = XingXiu[i][0];
  newDiv.style.transform = `rotate(${XingXiu[i][1]}deg) translateY(108px)`;
  document.getElementById('tp').appendChild(newDiv);
}

// 十二月份 marker
for (var i = 0; i < YueFen.length; i++) {
  const newDiv = document.createElement('div');
  newDiv.className = 'yueFen';
  newDiv.innerHTML = '．'; //YueFen[i][0];
  newDiv.style.transform = `rotate(${YueFen[i][1]}deg) translateY(99px)`;
  document.getElementById('tp').appendChild(newDiv);
}

// 天盤rotate
const TP = document.getElementById('tp');
const TP_offset = TP.getBoundingClientRect();
var TP_ROTATE = false;
var TP_ANG_1 = 0;
var TP_ANG_2 = 0;

TP.addEventListener('touchstart', (e) => {
  TP_ROTATE = true;
  var x = e.touches[0].clientX - (TP_offset.left + TP_offset.width / 2);
  var y = e.touches[0].clientY - (TP_offset.top + TP_offset.height / 2);
  TP_ANG_1 = 90 - Math.atan2(x, y) * (180 / Math.PI) - TP_ANG_2;
});

TP.addEventListener('touchmove', (e) => {
  if (TP_ROTATE) {
    var x = e.touches[0].clientX - (TP_offset.left + TP_offset.width / 2);
    var y = e.touches[0].clientY - (TP_offset.top + TP_offset.height / 2);
    TP_ANG_2 = 90 - Math.atan2(x, y) * (180 / Math.PI) - TP_ANG_1;
    TP.style.transform = `rotate(${TP_ANG_2}deg)`;
  }
});

window.addEventListener('touchend', (e) => {
  SP_ROTATE = false;
  TP_ROTATE = false;
});
