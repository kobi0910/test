/* ==========================================================================
   《北海道・風光誌》 (HOKKAIDO ARCHIVE) - Vanilla JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let currentRegionId = 'otaru';
  let bookmarks = JSON.parse(localStorage.getItem('hokkaido_bookmarks') || '[]');
  let audioCtx = null;
  let noiseNode = null;
  let isPlayingAudio = false;

  // DOM Elements
  const navContainer = document.getElementById('regionNavContainer');
  const heroBg = document.getElementById('heroBg');
  const heroIssueBadge = document.getElementById('heroIssueBadge');
  const heroRomaji = document.getElementById('heroRomaji');
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroDesc = document.getElementById('heroDesc');
  const heroStats = document.getElementById('heroStats');
  const heroVerticalText = document.getElementById('heroVerticalText');
  const heroHotspots = document.getElementById('heroHotspots');

  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');

  const seasonalRegionName = document.getElementById('seasonalRegionName');
  const sliderWinterImg = document.getElementById('sliderWinterImg');
  const sliderWinterTitle = document.getElementById('sliderWinterTitle');
  const sliderWinterDesc = document.getElementById('sliderWinterDesc');
  const sliderSummerImg = document.getElementById('sliderSummerImg');
  const sliderSummerTitle = document.getElementById('sliderSummerTitle');
  const sliderSummerDesc = document.getElementById('sliderSummerDesc');
  const sliderClip = document.getElementById('sliderClip');
  const sliderHandle = document.getElementById('sliderHandle');
  const sliderContainer = document.getElementById('sliderContainer');

  const spotlightsGrid = document.getElementById('spotlightsGrid');
  const spotlightsTitle = document.getElementById('spotlightsTitle');

  // Modals & Drawers
  const mapModal = document.getElementById('mapModal');
  const photoModal = document.getElementById('photoModal');
  const journalDrawer = document.getElementById('journalDrawer');

  const btnOpenMap = document.getElementById('btnOpenMap');
  const btnCloseMap = document.getElementById('btnCloseMap');
  const btnOpenJournal = document.getElementById('btnOpenJournal');
  const btnCloseJournal = document.getElementById('btnCloseJournal');
  const btnClosePhoto = document.getElementById('btnClosePhoto');
  const journalBadge = document.getElementById('journalBadge');
  const journalList = document.getElementById('journalList');

  // ---------------------------------------------------------------------------
  // 1. Render Region Tabs
  // ---------------------------------------------------------------------------
  function renderNavTabs() {
    navContainer.innerHTML = '';
    HOKKAIDO_DATA.forEach((reg) => {
      const isActive = reg.id === currentRegionId;
      const btn = document.createElement('button');
      btn.className = `tab-btn ${isActive ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="tab-badge">${reg.issueNo.replace('ISSUE ', '')}</span>
        <span>${reg.nameJP}</span>
      `;
      btn.addEventListener('click', () => {
        currentRegionId = reg.id;
        renderNavTabs();
        renderRegion(currentRegionId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      navContainer.appendChild(btn);
    });
  }

  // ---------------------------------------------------------------------------
  // 2. Render Active Region Content
  // ---------------------------------------------------------------------------
  function renderRegion(regionId) {
    const data = HOKKAIDO_DATA.find((r) => r.id === regionId) || HOKKAIDO_DATA[0];

    // Hero Updates
    heroBg.src = data.coverImage;
    heroBg.onerror = () => { heroBg.src = data.coverFallback; };
    heroIssueBadge.textContent = data.issueNo;
    heroRomaji.textContent = `${data.nameRomaji} ARCHIVAL COLLECTION`;
    heroTitle.textContent = data.nameJP;
    heroSubtitle.textContent = data.subTitleJP;
    heroDesc.textContent = data.description;
    heroVerticalText.textContent = `「${data.tagline}」`;

    heroStats.innerHTML = `
      <div>📍 ${data.coordinates}</div>
      <div>🗓️ ${data.bestSeason}</div>
      <div>🌡️ ${data.averageTemp}</div>
    `;

    // Hotspots
    heroHotspots.innerHTML = '';
    data.hotspots.forEach((hs) => {
      const pin = document.createElement('div');
      pin.className = 'hotspot-pin';
      pin.style.left = `${hs.x}%`;
      pin.style.top = `${hs.y}%`;
      pin.innerHTML = `
        <div class="hotspot-circle">📷</div>
        <div class="hotspot-popup">
          <span style="font-size: 0.65rem; font-family: monospace; background: rgba(0,102,255,0.3); color: #60a5fa; padding: 2px 6px; border-radius: 4px;">${hs.tag}</span>
          <h4 style="font-family: var(--font-serif); font-weight: bold; color: #fff; margin-top: 0.5rem;">${hs.title}</h4>
          <p style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.25rem;">${hs.description}</p>
          <div style="font-family: monospace; font-size: 0.65rem; color: #64748b; margin-top: 0.5rem;">EXIF: ${hs.exif || '35mm f/1.8'}</div>
        </div>
      `;
      pin.querySelector('.hotspot-circle').addEventListener('click', (e) => {
        e.stopPropagation();
        pin.classList.toggle('open');
      });
      heroHotspots.appendChild(pin);
    });

    // Close hotspots when clicking outside
    document.addEventListener('click', () => {
      document.querySelectorAll('.hotspot-pin').forEach(p => p.classList.remove('open'));
    });

    // Quote
    quoteText.textContent = `"${data.editorialQuote}"`;
    quoteAuthor.textContent = `—— ${data.quoteAuthor}`;

    // Seasonal Pair Slider
    seasonalRegionName.textContent = `${data.nameJP} · 雙季風姿對比展演`;
    sliderWinterImg.src = data.seasonalPair.winterImage;
    sliderWinterTitle.textContent = data.seasonalPair.winterTitle;
    sliderWinterDesc.textContent = data.seasonalPair.winterDesc;

    sliderSummerImg.src = data.seasonalPair.summerImage;
    sliderSummerTitle.textContent = data.seasonalPair.summerTitle;
    sliderSummerDesc.textContent = data.seasonalPair.summerDesc;

    // Spotlights
    spotlightsTitle.textContent = `${data.nameJP} · 風光景致深度巡禮`;
    spotlightsGrid.innerHTML = '';

    data.attractions.forEach((spot) => {
      const isSaved = bookmarks.some((b) => b.id === spot.id);
      const card = document.createElement('div');
      card.className = 'spot-card';
      card.innerHTML = `
        <div class="spot-img-wrap">
          <img src="${spot.image}" alt="${spot.nameJP}" onerror="this.src='${spot.fallbackImage}'" />
          <button class="btn-bookmark ${isSaved ? 'active' : ''}" style="position: absolute; top: 0.75rem; right: 0.75rem; background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.2); color: #fff; width: 2rem; height: 2rem; border-radius: 50%; cursor: pointer;">
            ${isSaved ? '★' : '☆'}
          </button>
          <div style="position: absolute; bottom: 0.75rem; left: 0.75rem; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.65rem; color: #94a3b8;">
            📷 ${spot.exif}
          </div>
        </div>
        <div class="spot-body">
          <div>
            <div style="font-size: 0.75rem; color: #94a3b8;">${spot.nameEN}</div>
            <div class="spot-title">${spot.nameJP}</div>
            <div class="spot-tagline">${spot.tagline}</div>
            <div class="spot-desc">${spot.description}</div>
          </div>
          <div style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem;">
            <span style="font-family: monospace; color: #fbbf24;">⏱ ${spot.bestTime}</span>
            <button class="btn-inspect" style="background: none; border: none; color: #60a5fa; cursor: pointer; font-weight: 600;">檢視詳情 →</button>
          </div>
        </div>
      `;

      // Open Photo Modal
      card.querySelector('.btn-inspect').addEventListener('click', () => openPhotoInspector(spot));
      card.querySelector('.spot-img-wrap').addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn-bookmark')) {
          openPhotoInspector(spot);
        }
      });

      // Bookmark Toggle
      card.querySelector('.btn-bookmark').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBookmark(spot);
        renderRegion(currentRegionId);
      });

      spotlightsGrid.appendChild(card);
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Interactive Seasonal Image Drag Slider
  // ---------------------------------------------------------------------------
  let isDraggingSlider = false;

  function updateSlider(clientX) {
    const rect = sliderContainer.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    sliderClip.style.width = `${pct}%`;
    sliderHandle.style.left = `${pct}%`;
  }

  sliderContainer.addEventListener('mousedown', (e) => {
    isDraggingSlider = true;
    updateSlider(e.clientX);
  });
  window.addEventListener('mouseup', () => { isDraggingSlider = false; });
  window.addEventListener('mousemove', (e) => {
    if (isDraggingSlider) updateSlider(e.clientX);
  });
  sliderContainer.addEventListener('touchmove', (e) => {
    updateSlider(e.touches[0].clientX);
  });

  // ---------------------------------------------------------------------------
  // 4. Photo Inspector Modal
  // ---------------------------------------------------------------------------
  function openPhotoInspector(spot) {
    document.getElementById('photoModalImg').src = spot.image;
    document.getElementById('photoModalTitle').textContent = spot.nameJP;
    document.getElementById('photoModalSub').textContent = spot.nameEN;
    document.getElementById('photoModalTagline').textContent = spot.tagline;
    document.getElementById('photoModalDesc').textContent = spot.description;
    document.getElementById('photoModalExif').textContent = spot.exif;
    document.getElementById('photoModalTime').textContent = spot.bestTime;
    document.getElementById('photoModalGourmet').textContent = spot.gourmetNote || '十勝霜淇淋與現釀海鮮';
    document.getElementById('photoModalTip').textContent = spot.secretTip || '建議避開人潮於清晨拍攝。';

    photoModal.classList.add('open');
  }

  btnClosePhoto.addEventListener('click', () => photoModal.classList.remove('open'));

  // ---------------------------------------------------------------------------
  // 5. Travel Journal & Bookmarks
  // ---------------------------------------------------------------------------
  function toggleBookmark(spot) {
    const idx = bookmarks.findIndex((b) => b.id === spot.id);
    if (idx >= 0) {
      bookmarks.splice(idx, 1);
    } else {
      bookmarks.push(spot);
    }
    localStorage.setItem('hokkaido_bookmarks', JSON.stringify(bookmarks));
    updateJournalDrawer();
  }

  function updateJournalDrawer() {
    journalBadge.textContent = bookmarks.length;
    journalList.innerHTML = '';

    if (bookmarks.length === 0) {
      journalList.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: #64748b;">
          <div style="font-size: 2rem; opacity: 0.4;">🔖</div>
          <p style="margin-top: 0.5rem;">尚無收藏的景點剪影</p>
        </div>
      `;
      return;
    }

    bookmarks.forEach((spot) => {
      const item = document.createElement('div');
      item.style.cssText = `
        display: flex; gap: 1rem; padding: 0.75rem; background: rgba(15,23,42,0.8);
        border: 1px solid rgba(255,255,255,0.08); border-radius: 0.75rem; margin-bottom: 0.75rem;
      `;
      item.innerHTML = `
        <img src="${spot.image}" style="width: 4.5rem; height: 4.5rem; object-fit: cover; border-radius: 0.5rem;" />
        <div style="flex: 1;">
          <div style="font-family: var(--font-serif); font-weight: bold; color: #fff;">${spot.nameJP}</div>
          <div style="font-size: 0.75rem; color: #94a3b8;">${spot.nameEN}</div>
          <button class="btn-remove" style="background: none; border: none; color: #ef4444; font-size: 0.75rem; cursor: pointer; margin-top: 0.25rem;">移除</button>
        </div>
      `;
      item.querySelector('.btn-remove').addEventListener('click', () => {
        toggleBookmark(spot);
        renderRegion(currentRegionId);
      });
      journalList.appendChild(item);
    });
  }

  btnOpenJournal.addEventListener('click', () => {
    updateJournalDrawer();
    journalDrawer.classList.add('open');
  });
  btnCloseJournal.addEventListener('click', () => journalDrawer.classList.remove('open'));

  // ---------------------------------------------------------------------------
  // 6. SVG Hokkaido Map Modal
  // ---------------------------------------------------------------------------
  btnOpenMap.addEventListener('click', () => mapModal.classList.add('open'));
  btnCloseMap.addEventListener('click', () => mapModal.classList.remove('open'));

  document.querySelectorAll('.map-pin-group').forEach((g) => {
    g.addEventListener('click', () => {
      const regId = g.getAttribute('data-region');
      if (regId) {
        currentRegionId = regId;
        renderNavTabs();
        renderRegion(currentRegionId);
        mapModal.classList.remove('open');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 7. Ambient Audio Web Audio Generator
  // ---------------------------------------------------------------------------
  const btnToggleAudio = document.getElementById('btnToggleAudio');

  btnToggleAudio.addEventListener('click', () => {
    if (isPlayingAudio) {
      if (noiseNode) {
        noiseNode.stop();
        noiseNode.disconnect();
        noiseNode = null;
      }
      isPlayingAudio = false;
      btnToggleAudio.textContent = '🔇 極地風聲聲';
      btnToggleAudio.classList.remove('active');
    } else {
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 340;
        filter.Q.value = 3.0;

        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.08;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        whiteNoise.start();
        noiseNode = whiteNoise;
        isPlayingAudio = true;

        btnToggleAudio.textContent = '🔊 風聲聆聽中';
        btnToggleAudio.classList.add('active');
      } catch (err) {
        console.warn('Audio playback failed:', err);
      }
    }
  });

  // Init
  renderNavTabs();
  renderRegion(currentRegionId);
  updateJournalDrawer();
});
