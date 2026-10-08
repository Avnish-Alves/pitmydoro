'use client';

import { Box, ColorPicker, HStack, parseColor, Portal } from '@chakra-ui/react';
import { StickyNoteColor, StickyNotePalette } from '@/interfaces/StickyNote.interface';
import { STICKY_NOTE_COLORS, STICKY_NOTE_PALETTE } from '@/constants/StickyNotes';
import { resolveNotePalette } from '@/utils/notePalette.utils';
const CUSTOM_COLOR_PLACEHOLDER =
  'conic-gradient(#F5C4B3, #FAC775, #C0DD97, #9FE1CB, #B5D4F4, #CECBF6, #F4C0D1, #F5C4B3)';

interface ColorSwatchesProps {
  value: StickyNoteColor;
  palette: StickyNotePalette;
  palettes?: Record<StickyNoteColor, StickyNotePalette>;
  getAriaLabel: (color: StickyNoteColor) => string;
  onChange: (color: StickyNoteColor) => void;
  customColor?: string;
  customAriaLabel?: string;
  onCustomChange?: (hex: string) => void;
}

export const ColorSwatches = ({
  value,
  palette,
  palettes = STICKY_NOTE_PALETTE,
  getAriaLabel,
  onChange,
  customColor,
  customAriaLabel,
  onCustomChange,
}: ColorSwatchesProps) => {
  const selectedBorder = { base: palette.text, _dark: palette.textDark };
  const idleBorder = { base: 'rgba(0, 0, 0, 0.25)', _dark: 'rgba(255, 255, 255, 0.3)' };
  const customPalette = customColor ? resolveNotePalette(value, customColor) : null;

  return (
    <HStack gap={1}>
      {STICKY_NOTE_COLORS.map((color: StickyNoteColor) => {
        const selected = color === value && !customColor;

        return (
          <Box
            key={color}
            as='button'
            aria-label={getAriaLabel(color)}
            aria-pressed={selected}
            onClick={() => onChange(color)}
            width='18px'
            height='18px'
            rounded='full'
            cursor='pointer'
            bg={{
              base: palettes[color].swatch,
              _dark: palettes[color].surfaceDark,
            }}
            borderWidth={selected ? '2px' : '1px'}
            borderColor={selected ? selectedBorder : idleBorder}
          />
        );
      })}

      {onCustomChange && (
        <ColorPicker.Root
          defaultValue={parseColor(customColor ?? palette.swatch)}
          onValueChangeEnd={(details) => onCustomChange(details.value.toString('hex'))}
          positioning={{ placement: 'top' }}
          lazyMount
        >
          <ColorPicker.HiddenInput />
          <ColorPicker.Control>
            <ColorPicker.Trigger asChild>
              <Box
                as='button'
                data-pw-id='sticky-note-custom-color'
                aria-label={customAriaLabel}
                aria-pressed={!!customColor}
                width='18px'
                height='18px'
                minWidth='18px'
                minHeight='18px'
                padding='0'
                rounded='full'
                cursor='pointer'
                background={
                  customPalette
                    ? { base: customPalette.swatch, _dark: customPalette.surfaceDark }
                    : CUSTOM_COLOR_PLACEHOLDER
                }
                borderWidth={customColor ? '2px' : '1px'}
                borderColor={customColor ? selectedBorder : idleBorder}
              />
            </ColorPicker.Trigger>
          </ColorPicker.Control>
          <Portal>
            <ColorPicker.Positioner zIndex='popover'>
              <ColorPicker.Content>
                <ColorPicker.Area />
                <ColorPicker.ChannelSlider channel='hue' />
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </Portal>
        </ColorPicker.Root>
      )}
    </HStack>
  );
};
