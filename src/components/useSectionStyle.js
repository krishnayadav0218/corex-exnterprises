import { useSiteData } from '../context/SiteDataContext';

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
