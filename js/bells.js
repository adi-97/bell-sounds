(function (app) {
  const ART = {
    pooja: `
      <path d="M60 1 C67 8 68 15 60 20 C52 15 53 8 60 1 Z" fill="url(#gold)"/>
      <path d="M60 6 C63 10 63 14 60 17" stroke="#fff" stroke-opacity=".5" stroke-width="1.2" fill="none"/>
      <ellipse cx="60" cy="22" rx="9" ry="3" fill="url(#lip)"/>
      <path d="M53 24 Q60 30 67 24 L64.5 33 Q60 36 55.5 33 Z" fill="url(#brass)"/>
      <ellipse cx="60" cy="35" rx="7.5" ry="2.5" fill="url(#lip)"/>
      <rect x="56.5" y="36" width="7" height="12" fill="url(#brass)"/>
      <ellipse cx="60" cy="41" rx="5" ry="1.6" fill="url(#lip)"/>
      <ellipse cx="60" cy="50" rx="9.5" ry="4.5" fill="url(#brass)"/>
      <ellipse cx="60" cy="56" rx="12.5" ry="3" fill="url(#lip)"/>
      <path d="M60 57 C45 57 39 68 38 86 C37 100 35 112 22 124 L98 124 C85 112 83 100 82 86 C81 68 75 57 60 57 Z" fill="url(#brass)"/>
      <path d="M60 57 C45 57 39 68 38 86 C37 100 35 112 22 124 L98 124 C85 112 83 100 82 86 C81 68 75 57 60 57 Z" fill="url(#shade)"/>
      <path d="M40 76 Q60 80 80 76 M38.5 82 Q60 86 81.5 82" stroke="#7a4c0c" stroke-width="1.4" fill="none" opacity=".7"/>
      <path d="M44 66 Q48 60 52 66 Q56 60 60 66 Q64 60 68 66 Q72 60 76 66" stroke="#7a4c0c" stroke-width="1.2" fill="none" opacity=".6"/>
      <path d="M36.5 104 Q60 109 83.5 104 M34 110 Q60 115 86 110" stroke="#7a4c0c" stroke-width="1.4" fill="none" opacity=".7"/>
      <path d="M48 63 C44 74 42 92 39 112" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round" fill="none"/>
      <ellipse cx="60" cy="124" rx="39" ry="5.5" fill="url(#lip)"/>
      <ellipse cx="60" cy="124" rx="33" ry="3.2" fill="url(#mouth)"/>
      <g class="clapper" style="transform-origin:60px 123px"><line x1="60" y1="123" x2="60" y2="134" stroke="#4a2f08" stroke-width="2.5"/><circle cx="60" cy="139" r="5.5" fill="url(#brass)"/></g>`,
    temple1: `
      <circle cx="60" cy="9" r="6.5" fill="none" stroke="url(#gold)" stroke-width="3.5"/>
      <path d="M50 24 Q50 14 60 14 Q70 14 70 24 Z" fill="url(#gold)"/>
      <ellipse cx="60" cy="24" rx="14" ry="3" fill="url(#lip)"/>
      <path d="M60 25 C47 25 43 37 43 56 L41 98 C40 108 34 114 24 120 L96 120 C86 114 80 108 79 98 L77 56 C77 37 73 25 60 25 Z" fill="url(#gold)"/>
      <path d="M60 25 C47 25 43 37 43 56 L41 98 C40 108 34 114 24 120 L96 120 C86 114 80 108 79 98 L77 56 C77 37 73 25 60 25 Z" fill="url(#shade)"/>
      <path d="M46 40 Q51 29 56 40 Q60 29 64 40 Q69 29 74 40" stroke="#8a5a0c" stroke-width="1.4" fill="none" opacity=".7"/>
      <path d="M43.5 46 Q60 49 76.5 46 M43 52 Q60 55 77 52" stroke="#8a5a0c" stroke-width="1.4" fill="none" opacity=".7"/>
      <text x="60" y="86" text-anchor="middle" font-size="24" font-family="Poppins, sans-serif" fill="#8a5a0c" opacity=".75">ॐ</text>
      <path d="M41 98 Q60 102 79 98 M39 106 Q60 110 81 106" stroke="#8a5a0c" stroke-width="1.4" fill="none" opacity=".7"/>
      <g fill="#8a5a0c" opacity=".6"><circle cx="46" cy="102" r="1.3"/><circle cx="53" cy="103" r="1.3"/><circle cx="60" cy="103.5" r="1.3"/><circle cx="67" cy="103" r="1.3"/><circle cx="74" cy="102" r="1.3"/></g>
      <path d="M50 32 C47 50 46 80 43 106" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round" fill="none"/>
      <ellipse cx="60" cy="120" rx="37" ry="5.5" fill="url(#lip)"/>
      <ellipse cx="60" cy="120" rx="31" ry="3.2" fill="url(#mouth)"/>
      <g class="clapper" style="transform-origin:60px 119px"><line x1="60" y1="119" x2="60" y2="132" stroke="#4a2f08" stroke-width="2.5"/><circle cx="60" cy="137" r="6" fill="url(#gold)"/></g>`,
    temple2: `
      <circle cx="60" cy="8" r="6" fill="none" stroke="url(#copper)" stroke-width="3.5"/>
      <path d="M51 23 Q51 13 60 13 Q69 13 69 23 Z" fill="url(#copper)"/>
      <ellipse cx="60" cy="23" rx="15" ry="3" fill="url(#lip)"/>
      <path d="M60 23 C40 23 32 36 31 58 L29 92 C28 104 18 112 6 118 L114 118 C102 112 92 104 91 92 L89 58 C88 36 80 23 60 23 Z" fill="url(#copper)"/>
      <path d="M60 23 C40 23 32 36 31 58 L29 92 C28 104 18 112 6 118 L114 118 C102 112 92 104 91 92 L89 58 C88 36 80 23 60 23 Z" fill="url(#shade)"/>
      <path d="M36 46 Q42 31 48 46 Q54 31 60 46 Q66 31 72 46 Q78 31 84 46" stroke="#6a3410" stroke-width="1.6" fill="url(#copper)" fill-opacity=".35" opacity=".8"/>
      <path d="M33 51 Q60 55 87 51" stroke="#6a3410" stroke-width="1.6" fill="none" opacity=".7"/>
      <g fill="#6a3410" opacity=".6"><circle cx="40" cy="72" r="2"/><circle cx="50" cy="73" r="2"/><circle cx="60" cy="73.5" r="2"/><circle cx="70" cy="73" r="2"/><circle cx="80" cy="72" r="2"/></g>
      <path d="M30 86 Q60 91 90 86 M29 93 Q60 98 91 93" stroke="#6a3410" stroke-width="1.6" fill="none" opacity=".7"/>
      <path d="M43 31 C37 50 35 80 31 104" stroke="#fff" stroke-opacity=".45" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <ellipse cx="60" cy="118" rx="55" ry="6.5" fill="url(#lip)"/>
      <ellipse cx="60" cy="118" rx="48" ry="3.8" fill="url(#mouth)"/>
      <g class="clapper" style="transform-origin:60px 117px"><line x1="60" y1="117" x2="60" y2="132" stroke="#4a2408" stroke-width="3"/><circle cx="60" cy="137" r="7" fill="url(#copper)"/></g>`
  };

  const BELLS = [
    { id: 'pooja', name: 'Pooja Bell', hung: true,
      f0: 1180, decay: 3.2, attack: .002, noise: .25, beat: 2.5, gain: .45,
      hits: [[0, 1], [.16, .5], [.31, .28]],
      partials: [[1, 1, 1], [2.02, .55, .6], [2.76, .7, .55], [4.12, .35, .35], [5.4, .3, .28], [6.8, .15, .2], [8.2, .08, .15]] },
    { id: 'temple1', name: 'Temple Bell 1', hung: true,
      f0: 2100, decay: 5, attack: .001, noise: .2, beat: 5, gain: .35,
      partials: [[1, 1, 1], [1.48, .6, .7], [2.13, .45, .5], [2.94, .3, .35], [3.8, .15, .25]] },
    { id: 'temple2', name: 'Temple Bell 2', hung: true,
      f0: 660, decay: 4.5, attack: .002, noise: .22, beat: 1.6, gain: .45,
      partials: [[1, 1, 1], [1.96, .45, .7], [2.74, .55, .5], [3.6, .3, .35], [4.9, .2, .25], [6.4, .1, .18]] },
  ];

  Object.assign(app, { ART, BELLS });
})(window.BellApp = window.BellApp || {});
