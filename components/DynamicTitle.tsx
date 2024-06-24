'use client';

import { useEffect } from 'react';

interface DynamicTitleProps {
  title: string;
}

export function DynamicTitle({ title }: DynamicTitleProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}