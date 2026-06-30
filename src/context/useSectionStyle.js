import { useSiteData } from '../context/SiteDataContext';

/**
 * Returns inline style object with CSS custom properties for a section,
 * based on admin-configured font size / colors. Falls back gracefully
 * if styling data is missing.
 */
export default function useSectionStyle(sectionKey) {
  const { data } = useSiteData();
  const s = (data.styling && data.styling[sectionKey]) || {};
  const fontScale = (s.fontSize || 100) / 100;

  return {
    '--sec-font-scale': fontScale,
    '--sec-title-color': s.titleColor || undefined,
    '--sec-text-color': s.textColor || undefined,
    '--sec-bg-color': s.bgColor || undefined,
  };
}
