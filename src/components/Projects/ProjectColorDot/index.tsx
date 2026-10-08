'use client';

import { Box } from '@chakra-ui/react';
import { StickyNoteColor } from '@/interfaces/StickyNote.interface';
import { PROJECT_INDICATOR_SIZE, PROJECT_PALETTE } from '@/constants/Projects';
import { resolveNotePalette } from '@/utils/notePalette.utils';

interface ProjectColorDotProps {
  color: StickyNoteColor;
  customColor?: string;
  size?: string;
  title?: string;
}

export const ProjectColorDot = ({
  color,
  customColor,
  size = PROJECT_INDICATOR_SIZE,
  title,
}: ProjectColorDotProps) => {
  const palette = resolveNotePalette(color, customColor, PROJECT_PALETTE);

  return (
    <Box
      as='span'
      display='inline-block'
      title={title}
      aria-hidden={!title}
      width={size}
      height={size}
      minWidth={size}
      rounded='full'
      flexShrink={0}
      bg={{ base: palette.accent, _dark: palette.accentDark }}
    />
  );
};
