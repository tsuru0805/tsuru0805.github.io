// 工单_189 门户页交互：tab 过滤 + 搜索 + 施工格渲染。零依赖。
(function () {
  'use strict';

  const cardsEl = document.getElementById('cards');
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const searchInput = document.getElementById('search-input');

  const TYPE_LABEL = { project: 'PROJECT', note: 'NOTE', gist: 'GIST' };
  let activeFilter = 'all';

  function matchesFilter(p) {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'projects') return p.type === 'project';
    return p.type === 'note' || p.type === 'gist'; // notes tab
  }

  function matchesSearch(p, q) {
    if (!q) return true;
    const hay = (p.name + ' ' + p.desc + ' ' + p.tags.join(' ')).toLowerCase();
    return q.toLowerCase().split(/\s+/).every((w) => hay.includes(w));
  }

  function render() {
    const q = searchInput.value.trim();
    const items = PROJECTS.filter((p) => matchesFilter(p) && matchesSearch(p, q));
    cardsEl.innerHTML = '';
    items.forEach((p, i) => cardsEl.appendChild(buildCard(p, i)));
    if (!items.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-hint';
      empty.textContent = '404 not found... 换个词试试？';
      cardsEl.appendChild(empty);
    }
  }

  function buildCard(p, i) {
    const card = document.createElement('article');
    card.className = `card card-${p.variant} torn-${(i % 3) + 1}`;
    card.dataset.gist = p.type === 'gist' ? '1' : '';

    const iconBox = document.createElement('div');
    iconBox.className = 'card-icon';
    if (p.iconImg) {
      const ic = document.createElement('img');
      ic.src = p.iconImg;
      ic.alt = '';
      iconBox.appendChild(ic);
    } else {
      iconBox.textContent = p.icon;
    }

    const body = document.createElement('div');
    body.className = 'card-body';

    const typeEl = document.createElement('div');
    typeEl.className = 'card-type';
    typeEl.textContent = TYPE_LABEL[p.type];

    const nameEl = document.createElement('h2');
    nameEl.className = 'card-name';
    nameEl.textContent = p.name;

    const descEl = document.createElement('p');
    descEl.className = 'card-desc';
    descEl.textContent = p.desc;

    const metaEl = document.createElement('div');
    metaEl.className = 'card-meta';

    const tagsEl = document.createElement('div');
    tagsEl.className = 'card-tags';
    p.tags.forEach((t) => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = t;
      tagsEl.appendChild(chip);
    });

    const linkEl = document.createElement('a');
    linkEl.className = 'card-link';
    linkEl.textContent = `→ ${p.linkLabel}`;
    linkEl.href = p.link;
    if (p.link.startsWith('http')) {
      linkEl.target = '_blank';
      linkEl.rel = 'noopener';
    }

    metaEl.appendChild(tagsEl);
    metaEl.appendChild(linkEl);
    body.appendChild(typeEl);
    body.appendChild(nameEl);
    body.appendChild(descEl);
    body.appendChild(metaEl);
    card.appendChild(iconBox);
    card.appendChild(body);
    (STICKERS[p.name] || []).forEach((s) => {
      const img = document.createElement('img');
      img.className = `sticker ${s.cls}`;
      img.src = s.src;
      img.alt = '';
      img.style.width = s.w + 'px';
      if (s.rot) img.style.transform = `rotate(${s.rot}deg)`;
      card.appendChild(img);
    });
    return card;
  }

  // ── 页脚社交素材块:热区 + 涂鸦便签 toast ──
  const xLink = document.querySelector('.hot-x');
  if (xLink) xLink.href = SOCIAL.x;
  const mailBtn = document.querySelector('.hot-mail');
  let toastTimer = null;
  function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      t.innerHTML = '<span></span>';
      document.body.appendChild(t);
    }
    t.querySelector('span').textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }
  if (mailBtn) mailBtn.addEventListener('click', () => showToast(SOCIAL.mailToast));
  if (location.search.includes('toast=1')) showToast(SOCIAL.mailToast); // 调试:直接弹一次

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      render();
    });
  });

  searchInput.addEventListener('input', render);

  // 顶栏 GIST：跳到第一张 gist 卡
  document.querySelectorAll('[data-jump="gist"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const gistCard = cardsEl.querySelector('[data-gist="1"]');
      if (gistCard) gistCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // 施工记录像素格：固定 seed 的伪随机，刷新不跳
  (function pixelGrid() {
    const grid = document.getElementById('pixel-grid');
    if (!grid) return;
    let seed = 0x5eed189;
    const rand = () => {
      seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
      return ((seed >>> 0) % 1000) / 1000;
    };
    const GLYPHS = ['▚', '▞', '▛', '▜', '♥', '×'];
    for (let i = 0; i < 28; i++) {
      const cell = document.createElement('span');
      const r = rand();
      if (r > 0.7) {
        cell.className = 'px px-pink';
        cell.textContent = GLYPHS[Math.floor(rand() * GLYPHS.length)];
      } else if (r > 0.18) {
        cell.className = 'px px-ink';
        cell.textContent = GLYPHS[Math.floor(rand() * 4)];
      } else {
        cell.className = 'px px-empty';
      }
      grid.appendChild(cell);
    }
  })();

  render();
})();
