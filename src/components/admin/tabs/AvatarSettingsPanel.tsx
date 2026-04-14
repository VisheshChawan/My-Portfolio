'use client';

import { useAvatarStore, defaultAvatarSettings } from '@/store/avatarStore';
import { Circle, Square, RectangleHorizontal, RotateCcw } from 'lucide-react';

export default function AvatarSettingsPanel() {
  const { settings, updateSettings, resetSettings } = useAvatarStore();

  const Slider = ({
    label,
    value,
    min,
    max,
    step = 1,
    unit = 'px',
    onChange,
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    onChange: (v: number) => void;
  }) => (
    <div>
      <div className="flex justify-between mb-1.5">
        <label className="text-[0.6rem] uppercase tracking-widest text-white/50">{label}</label>
        <span className="text-[0.6rem] text-[var(--accent-primary)] font-mono">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[var(--accent-primary)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
      />
    </div>
  );

  const Toggle = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: boolean;
    onChange: (v: boolean) => void;
  }) => (
    <div className="flex items-center justify-between">
      <span className="text-[0.65rem] uppercase tracking-wider">{label}</span>
      <div
        onClick={() => onChange(!value)}
        className={`toggle ${value ? 'on' : ''}`}
      />
    </div>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <h4 className="text-[0.6rem] uppercase tracking-widest text-[#5a6175] mb-3 mt-6 first:mt-0 flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-[var(--accent-primary)]" />
      {title}
    </h4>
  );

  return (
    <div className="space-y-2 pb-12 text-[#c4cad6]">
      {/* Reset button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={resetSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[0.6rem] uppercase tracking-widest border border-white/10 text-white/40 hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/30 transition-colors"
        >
          <RotateCcw size={12} /> Reset Defaults
        </button>
      </div>

      {/* ─── Shape Preset ─── */}
      <SectionTitle title="Frame Shape" />
      <div className="grid grid-cols-3 gap-2 mb-4">
        {([
          { id: 'circle', icon: <Circle size={18} />, label: 'Circle' },
          { id: 'rounded', icon: <RectangleHorizontal size={18} />, label: 'Rounded' },
          { id: 'square', icon: <Square size={18} />, label: 'Square' },
        ] as const).map((shape) => (
          <button
            key={shape.id}
            onClick={() => {
              const radiusMap = { circle: 50, rounded: 20, square: 0 };
              updateSettings({ shapePreset: shape.id, customRadius: radiusMap[shape.id] });
            }}
            className={`flex flex-col items-center gap-1.5 p-3 border text-[0.55rem] uppercase tracking-widest transition-all ${
              settings.shapePreset === shape.id
                ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[var(--accent-primary)]/5'
                : 'border-white/10 text-white/40 hover:text-white hover:border-white/30'
            }`}
          >
            {shape.icon}
            {shape.label}
          </button>
        ))}
      </div>

      <Slider
        label="Custom Border Radius"
        value={settings.customRadius}
        min={0} max={50} unit="%"
        onChange={(v) => updateSettings({ customRadius: v, shapePreset: v >= 50 ? 'circle' : v >= 10 ? 'rounded' : 'square' })}
      />

      {/* ─── Desktop Size ─── */}
      <SectionTitle title="Frame Size" />
      <div className="space-y-3">
        <Slider label="Desktop" value={settings.desktopSize} min={100} max={500} onChange={(v) => updateSettings({ desktopSize: v })} />
        <Slider label="Tablet" value={settings.tabletSize} min={80} max={400} onChange={(v) => updateSettings({ tabletSize: v })} />
        <Slider label="Mobile" value={settings.mobileSize} min={60} max={300} onChange={(v) => updateSettings({ mobileSize: v })} />
      </div>

      {/* ─── Border ─── */}
      <SectionTitle title="Border & Effects" />
      <div className="space-y-3">
        <Slider label="Border Width" value={settings.borderWidth} min={0} max={8} onChange={(v) => updateSettings({ borderWidth: v })} />
        <Slider label="Glow Intensity" value={settings.glowIntensity} min={0} max={100} unit="%" onChange={(v) => updateSettings({ glowIntensity: v })} />
        <Slider label="Shadow Depth" value={settings.shadowDepth} min={0} max={100} unit="%" onChange={(v) => updateSettings({ shadowDepth: v })} />
        <Slider label="Rotation / Tilt" value={settings.rotation} min={-45} max={45} unit="°" onChange={(v) => updateSettings({ rotation: v })} />
        <Toggle label="Spinning Glow Ring" value={settings.spinGlow} onChange={(v) => updateSettings({ spinGlow: v })} />
      </div>

      {/* ─── Desktop Position ─── */}
      <SectionTitle title="Desktop Position" />
      <div className="space-y-3">
        <Slider label="X Offset (Left ↔ Right)" value={settings.desktopX} min={-200} max={200} onChange={(v) => updateSettings({ desktopX: v })} />
        <Slider label="Y Offset (Up ↕ Down)" value={settings.desktopY} min={-200} max={200} onChange={(v) => updateSettings({ desktopY: v })} />
      </div>

      {/* ─── Mobile Position ─── */}
      <SectionTitle title="Mobile Position" />
      <div className="space-y-3">
        <Slider label="X Offset" value={settings.mobileX} min={-100} max={100} onChange={(v) => updateSettings({ mobileX: v })} />
        <Slider label="Y Offset" value={settings.mobileY} min={-100} max={100} onChange={(v) => updateSettings({ mobileY: v })} />
      </div>

      {/* ─── Spacing & Layer ─── */}
      <SectionTitle title="Spacing & Layering" />
      <div className="space-y-3">
        <Slider label="Inner Padding" value={settings.padding} min={0} max={20} onChange={(v) => updateSettings({ padding: v })} />
        <Slider label="Z-Index Layer" value={settings.zIndex} min={1} max={100} unit="" onChange={(v) => updateSettings({ zIndex: v })} />
      </div>
    </div>
  );
}
