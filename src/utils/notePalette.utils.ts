import tinycolor from 'tinycolor2';
import { StickyNoteColor, StickyNotePalette } from '@/interfaces/StickyNote.interface';
import { STICKY_NOTE_PALETTE } from '@/constants/StickyNotes';

const DARK_TEXT = '#1A1A1A';

const paletteCache = new Map<string, StickyNotePalette>();

export const paletteFromHex = (hex: string): StickyNotePalette => {
  const cached = paletteCache.get(hex);
  if (cached) return cached;

  const base = tinycolor(hex);
  const surface = base.toHexString();
  const text = tinycolor.mostReadable(base, [DARK_TEXT, '#FFFFFF']).toHexString();
  const accent = (
    base.isLight() ? base.clone().darken(15) : base.clone().lighten(20)
  ).toHexString();
  const palette: StickyNotePalette = {
    surface,
    surfaceDark: surface,
    text,
    textDark: text,
    accent,
    accentDark: accent,
    swatch: surface,
  };

  paletteCache.set(hex, palette);
  return palette;
};

export const resolveNotePalette = (
  color: StickyNoteColor,
  customColor?: string | null,
  palettes: Record<StickyNoteColor, StickyNotePalette> = STICKY_NOTE_PALETTE
): StickyNotePalette =>
  customColor && tinycolor(customColor).isValid() ? paletteFromHex(customColor) : palettes[color];
