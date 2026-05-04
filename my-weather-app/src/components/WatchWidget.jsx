import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

// ─── Preset palettes ───────────────────────────────────────────────────────────
const FACE_PRESETS = [
  '#0f172a','#000000','#1a1a1a','#2d3436','#4b5563',
  '#dc2626','#2563eb','#16a34a','#d97706','#7c3aed',
  'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)',
  'linear-gradient(45deg,#4c0519,#881337)',
  'linear-gradient(to right,#004d4d,#009999)',
  'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
  'linear-gradient(to top,#09203f 0%,#537895 100%)',
  'linear-gradient(120deg,#f093fb 0%,#f5576c 100%)',
  'linear-gradient(to right,#243949 0%,#517fa4 100%)',
  'linear-gradient(to top,#30cfd0 0%,#330867 100%)',
  'linear-gradient(45deg,#ff9a9e 0%,#fad0c4 100%)',
  '#ffffff',
];
const BORDER_PRESETS = [
  '#ffffff','#000000','#ffd700','#c0c0c0','#cd7f32',
  '#b91c1c','#1d4ed8','#047857','#6d28d9','#475569',
  'linear-gradient(45deg,#8e9eab,#eef2f3)',
  'linear-gradient(45deg,#232526,#414345)',
  'linear-gradient(45deg,#ff9a9e 0%,#fecfef 99%,#fecfef 100%)',
  'linear-gradient(120deg,#a1c4fd 0%,#c2e9fb 100%)',
  'linear-gradient(to top,#cfd9df 0%,#e2ebf0 100%)',
  'linear-gradient(45deg,#f321d7 0%,#ffec61 100%)',
  'linear-gradient(45deg,#2af598 0%,#009efd 100%)',
  'linear-gradient(to top,#fddb92 0%,#d1f9ce 100%)',
  '#34495e','#ecf0f1',
];

const ROMAN = ['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
const POSITIONS = {
  12:{x:50,y:8},  1:{x:75,y:8},  2:{x:92,y:25},
   3:{x:92,y:50}, 4:{x:92,y:75}, 5:{x:75,y:92},
   6:{x:50,y:92}, 7:{x:25,y:92}, 8:{x:8,y:75},
   9:{x:8,y:50}, 10:{x:8,y:25}, 11:{x:25,y:8},
};

const DEFAULT_PREFS = {
  face: '#0f172a',
  border: '#ffffff',
  dialStyle: 'numeric',
  fontFamily: "'Montserrat', sans-serif",
  handColor: '#ffffff',
  secColor: '#ef4444',
  dialColor: '#ffffff',
  handShape: 'h-classic',
  overlayColor: '#000000',
  overlayOpacity: 0.3,
  digitalFont: 'monospace',
};

// ─── Digital font options ──────────────────────────────────────────────────────
const DIGITAL_FONTS = [
  { label: 'Mono',       value: 'monospace',                      preview: '12:30 PM' },
  { label: 'Orbitron',   value: "'Orbitron', sans-serif",          preview: '12:30 PM' },
  { label: 'Bebas',      value: "'Bebas Neue', sans-serif",        preview: '12:30 PM' },
  { label: 'Playfair',   value: "'Playfair Display', serif",       preview: '12:30 PM' },
  { label: 'Montserrat', value: "'Montserrat', sans-serif",        preview: '12:30 PM' },
  { label: 'Courier',    value: "'Courier New', monospace",        preview: '12:30 PM' },
  { label: 'Georgia',    value: 'Georgia, serif',                  preview: '12:30 PM' },
  { label: 'Impact',     value: "Impact, sans-serif",              preview: '12:30 PM' },
  { label: 'Trebuchet',  value: "'Trebuchet MS', sans-serif",      preview: '12:30 PM' },
];

const STORAGE_KEY = 'chrono_pro_v7_prefs';

// ─── Tiny Watch Face (display-only, no controls) ───────────────────────────────
function WatchFace({ prefs, timezone, size = 160 }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 50);
    return () => clearInterval(id);
  }, []);

  // Compute time in the given timezone
  const getLocaleTime = () => {
    if (!timezone) return time;
    try {
      const str = time.toLocaleString('en-US', { timeZone: timezone });
      return new Date(str);
    } catch {
      return time;
    }
  };

  const t = getLocaleTime();
  const ms = t.getMilliseconds ? time.getMilliseconds() : 0;
  const s  = t.getSeconds();
  const m  = t.getMinutes();
  const h  = t.getHours();

  const sDeg = ((s + ms / 1000) / 60) * 360;
  const mDeg = ((m + s / 60) / 60) * 360;
  const hDeg = ((h % 12 + m / 60) / 12) * 360;

  const pad = (n) => String(n).padStart(2, '0');

  // Hand shape clip-paths
  const handClips = {
    'h-classic': '',
    'h-sword':   'polygon(50% 0%, 100% 20%, 80% 100%, 20% 100%, 0% 20%)',
    'h-pencil':  'polygon(20% 100%, 80% 100%, 80% 15%, 50% 0%, 20% 15%)',
    'h-arrow':   'polygon(50% 0%, 100% 30%, 70% 30%, 70% 100%, 30% 100%, 30% 30%, 0% 30%)',
    'h-diamond': 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    'h-bolt':    'polygon(40% 0%, 100% 0%, 70% 45%, 100% 45%, 30% 100%, 50% 50%, 20% 50%)',
    'h-hollow':  '',
    'h-taper':   'polygon(40% 0, 60% 0, 100% 100%, 0 100%)',
    'h-fancy':   'polygon(50% 0%, 100% 50%, 50% 60%, 100% 100%, 0% 100%, 50% 60%, 0% 50%)',
    'h-minimal': '',
  };

  const isHollow = prefs.handShape === 'h-hollow';
  const isMinimal = prefs.handShape === 'h-minimal';
  const clip = handClips[prefs.handShape] || '';

  const hourW  = isMinimal ? 2 : Math.round(size * 0.028 * 1.8);
  const minW   = isMinimal ? 2 : Math.round(size * 0.028);
  const hourH  = Math.round(size * 0.25);
  const minH   = Math.round(size * 0.40);
  const secH   = Math.round(size * 0.45);

  const handStyle = (deg, w, h, color, isSecond = false) => ({
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    width: isSecond ? 2 : w,
    height: h,
    background: isHollow && !isSecond ? 'transparent' : color,
    border: isHollow && !isSecond ? `2px solid ${prefs.handColor}` : 'none',
    borderRadius: (!clip && !isHollow) ? 10 : 0,
    clipPath: clip || 'none',
    transformOrigin: 'bottom center',
    transform: `translateX(-50%) rotate(${deg}deg)`,
    zIndex: isSecond ? 10 : 5,
  });

  const bgStyle = (val) => {
    if (!val) return {};
    if (val.startsWith('linear-gradient') || val.startsWith('radial-gradient')) {
      return { background: val };
    }
    if (val.startsWith('http') || val.startsWith('url')) {
      const cleaned = val.replace(/url\('|'\)/g, '');
      return { background: `url('${cleaned}') center/100% 100% no-repeat` };
    }
    return { background: val };
  };

  const dialMarks = () => {
    if (prefs.dialStyle === 'none') return null;
    return Array.from({ length: 12 }, (_, i) => {
      const num = i + 1;
      const pos = POSITIONS[num];
      let label = '';
      if (prefs.dialStyle === 'numeric') label = String(num);
      else if (prefs.dialStyle === 'roman') label = ROMAN[num % 12];
      else if (prefs.dialStyle === 'dots') label = '●';
      else if (prefs.dialStyle === 'squares') label = '■';
      else if (prefs.dialStyle === 'bullets') label = '•';
      else if (prefs.dialStyle === 'minimal') label = '|';
      const fontSize = size * 0.075;
      return (
        <div
          key={num}
          style={{
            position: 'absolute',
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: 'translate(-50%, -50%)',
            fontWeight: 700,
            color: prefs.dialColor,
            fontFamily: prefs.fontFamily,
            fontSize,
            zIndex: 2,
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            lineHeight: 1,
          }}
        >
          {label}
        </div>
      );
    });
  };

  const borderR = Math.round(size * 0.158);
  const faceR   = Math.round(size * 0.118);
  const padPx   = Math.round(size * 0.039);
  const pinSize = Math.round(size * 0.037);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        padding: padPx,
        borderRadius: borderR,
        boxShadow: '0 20px 60px -10px rgba(0,0,0,0.7)',
        flexShrink: 0,
        ...bgStyle(prefs.border),
      }}
    >
      {/* Watch face */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: faceR,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)',
          ...bgStyle(prefs.face),
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: prefs.overlayColor,
            opacity: prefs.overlayOpacity,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {/* Dial marks */}
        {dialMarks()}
        {/* Hour hand */}
        <div style={handStyle(hDeg, hourW, hourH, prefs.handColor)} />
        {/* Min hand */}
        <div style={handStyle(mDeg, minW, minH, prefs.handColor)} />
        {/* Sec hand */}
        <div style={handStyle(sDeg, 2, secH, prefs.secColor, true)} />
        {/* Center pin */}
        <div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: pinSize, height: pinSize,
            background: '#fff',
            border: '2px solid #000',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
          }}
        />
      </div>
    </div>
  );
}

// ─── Digital Clock (standalone, below analog watch) ───────────────────────────
function DigitalClock({ timezone, digitalFont }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const getLocaleTime = () => {
    if (!timezone) return time;
    try {
      const str = time.toLocaleString('en-US', { timeZone: timezone });
      return new Date(str);
    } catch {
      return time;
    }
  };

  const t = getLocaleTime();
  const h24 = t.getHours();
  const m   = t.getMinutes();
  const s   = t.getSeconds();
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  const h12  = h24 % 12 || 12;
  const pad  = (n) => String(n).padStart(2, '0');
  const display = `${pad(h12)}:${pad(m)}:${pad(s)} ${ampm}`;

  return (
    <div
      className="text-center mt-4 px-2 py-1 rounded-lg bg-white/5 border border-white/10"
      style={{
        fontFamily: digitalFont || 'monospace',
        fontSize: 17,
        letterSpacing: '0.15em',
        color: 'rgba(255,255,255,0.85)',
      }}
    >
      {display}
    </div>
  );
}

// ─── Swatch grid ─────────────────────────────────────────────────────────────────
function SwatchGrid({ presets, onSelect }) {
  return (
    <div className="grid grid-cols-10 gap-1">
      {presets.map((p, i) => (
        <button
          key={i}
          onClick={() => onSelect(p)}
          title={p}
          className="aspect-square rounded-md border-2 border-transparent hover:border-white hover:scale-110 transition-all"
          style={{ background: p }}
        />
      ))}
    </div>
  );
}

// ─── Full Editor Panel ─────────────────────────────────────────────────────────
function WatchEditorPanel({ isOpen, onClose, onSave, savedPrefs, timezone }) {
  const [prefs, setPrefs] = useState({ ...savedPrefs });
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  // Reset draft whenever panel opens
  useEffect(() => {
    if (isOpen) setPrefs({ ...savedPrefs });
  }, [isOpen, savedPrefs]);

  const set = (key, val) => setPrefs((p) => ({ ...p, [key]: val }));

  const handleSave = () => {
    onSave(prefs);
    onClose();
  };

  const handleCloseRequest = () => setShowCloseConfirm(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-stretch justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleCloseRequest}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-slate-900/98 border-l border-white/10 flex flex-col h-full overflow-hidden"
        style={{ backdropFilter: 'blur(30px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div>
            <h2 className="text-base font-black italic uppercase tracking-tight text-white">
              CHRONO<span className="text-blue-400">STUDIO</span>
            </h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Watch Customizer</p>
          </div>
          <button
            onClick={handleCloseRequest}
            className="p-2 rounded-lg hover:bg-white/10 transition-all text-white/60 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Preview comparison ── */}
        <div className="flex items-center justify-center gap-4 px-5 py-4 bg-slate-950/50 border-b border-white/10 flex-shrink-0">
          <div className="flex flex-col items-center gap-1">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Saved</p>
            <WatchFace prefs={savedPrefs} timezone={timezone} size={90} />
            <DigitalClock timezone={timezone} digitalFont={savedPrefs.digitalFont} />
          </div>
          <ChevronRight size={20} className="text-white/30 flex-shrink-0" />
          <div className="flex flex-col items-center gap-1">
            <p className="text-[9px] text-blue-400 uppercase tracking-widest">Preview</p>
            <WatchFace prefs={prefs} timezone={timezone} size={90} />
            <DigitalClock timezone={timezone} digitalFont={prefs.digitalFont} />
          </div>
        </div>

        {/* ── Scrollable controls ── */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">

          {/* 1. Wallpapers */}
          <section>
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">1. Wallpapers</p>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-400 mb-1 font-semibold">Watch Face</p>
                <SwatchGrid presets={FACE_PRESETS} onSelect={(v) => set('face', v)} />
                <div className="flex gap-1 mt-2">
                  <input
                    type="text"
                    placeholder="Image URL..."
                    className="flex-1 bg-slate-800 p-2 text-[10px] rounded border border-slate-700 outline-none focus:border-blue-500 text-white placeholder-slate-500"
                    onKeyDown={(e) => { if (e.key === 'Enter') set('face', e.target.value); }}
                  />
                  <button
                    className="bg-blue-600 px-3 py-1 text-[10px] font-bold rounded hover:bg-blue-500 uppercase text-white"
                    onClick={(e) => set('face', e.target.previousSibling.value)}
                  >Apply</button>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 mb-1 font-semibold">Frame Border</p>
                <SwatchGrid presets={BORDER_PRESETS} onSelect={(v) => set('border', v)} />
                <div className="flex gap-1 mt-2">
                  <input
                    type="text"
                    placeholder="Image URL..."
                    className="flex-1 bg-slate-800 p-2 text-[10px] rounded border border-slate-700 outline-none focus:border-blue-500 text-white placeholder-slate-500"
                    onKeyDown={(e) => { if (e.key === 'Enter') set('border', e.target.value); }}
                  />
                  <button
                    className="bg-blue-600 px-3 py-1 text-[10px] font-bold rounded hover:bg-blue-500 uppercase text-white"
                    onClick={(e) => set('border', e.target.previousSibling.value)}
                  >Apply</button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Overlay */}
          <section className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">2. Visibility Overlay</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Overlay Color</span>
                <input
                  type="color"
                  value={prefs.overlayColor}
                  onChange={(e) => set('overlayColor', e.target.value)}
                  className="w-8 h-8 bg-transparent border-none cursor-pointer rounded"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-slate-400">Opacity</span>
                  <span className="text-[10px] text-blue-400 font-bold">{Math.round(prefs.overlayOpacity * 100)}%</span>
                </div>
                <input
                  type="range" min="0" max="100"
                  value={Math.round(prefs.overlayOpacity * 100)}
                  onChange={(e) => set('overlayOpacity', e.target.value / 100)}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          </section>

          {/* 3. Dial & Typography */}
          <section>
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">3. Dial & Typography</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <select
                value={prefs.dialStyle}
                onChange={(e) => set('dialStyle', e.target.value)}
                className="bg-slate-800 p-2 text-xs rounded border border-slate-700 outline-none text-white"
              >
                <option value="numeric">Arabic Numbers</option>
                <option value="roman">Royal Roman</option>
                <option value="dots">Modern Dots</option>
                <option value="squares">Tech Squares</option>
                <option value="minimal">Simple Ticks</option>
                <option value="bullets">Bullets (•)</option>
                <option value="none">None (Ghost)</option>
              </select>
              <select
                value={prefs.fontFamily}
                onChange={(e) => set('fontFamily', e.target.value)}
                className="bg-slate-800 p-2 text-xs rounded border border-slate-700 outline-none text-white"
              >
                <option value="'Montserrat', sans-serif">Montserrat</option>
                <option value="'Playfair Display', serif">Playfair</option>
                <option value="'Orbitron', sans-serif">Orbitron</option>
                <option value="'Bebas Neue', sans-serif">Bebas</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-400">Dial Color</span>
              <input
                type="color"
                value={prefs.dialColor}
                onChange={(e) => set('dialColor', e.target.value)}
                className="w-6 h-6 bg-transparent border-none cursor-pointer"
              />
            </div>
          </section>

          {/* 4. Hands */}
          <section>
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">4. Hands Mechanics</p>
            <select
              value={prefs.handShape}
              onChange={(e) => set('handShape', e.target.value)}
              className="w-full bg-slate-800 p-2 text-xs rounded border border-slate-700 outline-none mb-3 text-white"
            >
              <option value="h-classic">Style 1: Classic Bold</option>
              <option value="h-sword">Style 2: Sword Blade</option>
              <option value="h-pencil">Style 3: Pencil Precision</option>
              <option value="h-arrow">Style 4: Aviator Arrow</option>
              <option value="h-diamond">Style 5: Diamond Luxury</option>
              <option value="h-bolt">Style 6: Lightning Bolt</option>
              <option value="h-hollow">Style 7: Hollow Skeleton</option>
              <option value="h-taper">Style 8: Elegant Taper</option>
              <option value="h-fancy">Style 9: Royal Ornate</option>
              <option value="h-minimal">Style 10: Ultra Minimal</option>
            </select>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-slate-900 rounded-lg">
                <p className="text-[9px] text-slate-500 uppercase mb-1">Hour / Min</p>
                <input
                  type="color"
                  value={prefs.handColor}
                  onChange={(e) => set('handColor', e.target.value)}
                  className="w-full h-6 bg-transparent border-none cursor-pointer"
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-lg">
                <p className="text-[9px] text-slate-500 uppercase mb-1">Second Hand</p>
                <input
                  type="color"
                  value={prefs.secColor}
                  onChange={(e) => set('secColor', e.target.value)}
                  className="w-full h-6 bg-transparent border-none cursor-pointer"
                />
              </div>
            </div>
          </section>

          {/* 5. Digital Clock Font */}
          <section>
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">5. Digital Clock Font</p>
            {/* Live preview */}
            <div
              className="text-center py-3 px-2 mb-3 rounded-xl bg-slate-950 border border-white/10"
              style={{
                fontFamily: prefs.digitalFont,
                fontSize: 18,
                letterSpacing: '0.15em',
                color: 'white',
              }}
            >
              {(() => {
                const now = new Date();
                const h = now.getHours() % 12 || 12;
                const m = String(now.getMinutes()).padStart(2, '0');
                const s = String(now.getSeconds()).padStart(2, '0');
                const ap = now.getHours() >= 12 ? 'PM' : 'AM';
                return `${String(h).padStart(2,'0')}:${m}:${s} ${ap}`;
              })()}
            </div>
            {/* Font grid */}
            <div className="grid grid-cols-3 gap-2">
              {DIGITAL_FONTS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => set('digitalFont', f.value)}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    prefs.digitalFont === f.value
                      ? 'border-blue-400 bg-blue-500/20'
                      : 'border-slate-700 bg-slate-800 hover:border-slate-500'
                  }`}
                >
                  <p
                    className="text-white text-[11px] mb-1"
                    style={{ fontFamily: f.value }}
                  >
                    {f.preview}
                  </p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wide">{f.label}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Reset */}
          <button
            onClick={() => setPrefs({ ...DEFAULT_PREFS })}
            className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-red-400 border border-slate-800 rounded-xl transition-all"
          >
            Factory Reset
          </button>
        </div>

        {/* ── Footer actions ── */}
        <div className="flex gap-3 px-5 py-4 border-t border-white/10 flex-shrink-0">
          <button
            onClick={handleCloseRequest}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all"
          >
            Save Design
          </button>
        </div>
      </motion.div>

      {/* ── Close confirmation popup ── */}
      <AnimatePresence>
        {showCloseConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center p-4"
            onClick={() => setShowCloseConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border-4 border-red-900 rounded-2xl p-6 max-w-xs w-full shadow-2xl"
            >
              <h3 className="text-base font-bold text-white mb-1">Discard changes?</h3>
              <p className="text-xs text-slate-400 mb-5">Your unsaved edits will be lost.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCloseConfirm(false)}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold text-white bg-red-500/30 border border-white/20 hover:border-white/40 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setShowCloseConfirm(false); onClose(); }}
                  className="flex-1 py-2 rounded-xl text-sm font-bold text-white border border-white/50 bg-blue-600/30 hover:bg-blue-500/40 transition-all"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main exported widget (sidebar embed) ─────────────────────────────────────
export default function WatchWidget({ timezone }) {
  const [savedPrefs, setSavedPrefs] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return { ...DEFAULT_PREFS, ...stored };
    } catch {
      return { ...DEFAULT_PREFS };
    }
  });
  const [editorOpen, setEditorOpen] = useState(false);

  const handleSave = useCallback((newPrefs) => {
    setSavedPrefs(newPrefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
  }, []);

  return (
    <>
      {/* ── Sidebar card ── */}
      <div className="mx-4 3xl:mt-4 mt-1 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">

        {/* Left 70%: watch + digital clock below */}
        <div className="flex flex-col items-center" style={{ width: '70%' }}>
          <WatchFace prefs={savedPrefs} timezone={timezone} size={150} />
          <DigitalClock timezone={timezone} digitalFont={savedPrefs.digitalFont} />
        </div>

        {/* Right 30%: vertical CTA */}
        <button
          onClick={() => setEditorOpen(true)}
          className="flex flex-col items-center justify-center gap-2 py-2 rounded-xl hover:bg-white/10 transition-all group"
          style={{ width: '30%' }}
        >
          <p className="text-[10px] font-bold text-white text-center leading-tight">Style Your Watch</p>
          <p className="text-[9px] text-white/40 text-center">Tap to Customize</p>
          <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center group-hover:bg-blue-500/40 transition-all mt-1">
            <ChevronRight size={14} className="text-blue-300" />
          </div>
        </button>
      </div>

      {/* ── Editor panel ── */}
      <AnimatePresence>
        {editorOpen && (
          <WatchEditorPanel
            isOpen={editorOpen}
            onClose={() => setEditorOpen(false)}
            onSave={handleSave}
            savedPrefs={savedPrefs}
            timezone={timezone}
          />
        )}
      </AnimatePresence>
    </>
  );
}
