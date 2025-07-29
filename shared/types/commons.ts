import type { SVGAttributes, FunctionalComponent } from 'vue';

/**
 * Lucide Icons
 */

interface LucideProps extends Partial<SVGAttributes> {
  size?: 24 | number;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = FunctionalComponent<LucideProps>;
