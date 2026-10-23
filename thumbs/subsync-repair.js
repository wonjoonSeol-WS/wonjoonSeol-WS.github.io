// Draws the three tracks. Each cue is [left, right] in px on the 960px card; the "before" cues drift
// right before the ad break and left after it, and subsync-repair moves them back under their reference.
var cues = [
  { ref: [210, 330], before: [237, 371], after: [210, 341], ja: 'どこにいたの？', en: 'Where were you?', small: true },
  { ref: [355, 428], before: [382, 455], after: [355, 427], ja: '外。', en: 'Outside.', small: true },
  { ref: [434, 551], before: [462, 578], after: [434, 551], ja: 'こんな時間に？', en: 'At this hour?' },
  { ref: [620, 720], before: [596, 698], after: [620, 720], ja: 'わかってる。', en: 'I know.' },
  { ref: [747, 841], before: [723, 818], after: [747, 841], ja: '座って。', en: 'Sit down.' },
];
function row(name, text) {
  return '<div class="' + name + '">' + cues.map(function (c) {
    var x = c[name];
    return '<div class="cue' + (name !== 'ref' && c.small ? ' small' : '') + '" style="left:' + x[0] + 'px;width:' + (x[1] - x[0]) + 'px"' +
      (name === 'ref' ? ' lang="ja"' : '') + '>' + text(c) + '</div>';
  }).join('') + '</div>';
}
var lines = ['<line class="ad-line" x1="583" y1="50" x2="583" y2="445"/>']
  .concat([115, 255, 395].map(function (y) { return '<line class="track" x1="210" y1="' + y + '" x2="935" y2="' + y + '"/>'; }))
  .concat(cues.map(function (c) { return '<line class="drift" x1="' + c.ref[0] + '" y1="142" x2="' + c.before[0] + '" y2="229"/>'; }))
  .concat(cues.map(function (c) { return '<line class="fix" x1="' + c.after[0] + '" y1="283" x2="' + c.after[0] + '" y2="368"/>'; }));
document.body.insertAdjacentHTML('beforeend',
  '<svg viewBox="0 0 960 504">' + lines.join('') + '</svg>' +
  row('ref', function (c) { return c.ja; }) + row('before', function (c) { return c.en; }) + row('after', function (c) { return c.en; }));
