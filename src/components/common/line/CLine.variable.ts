import { LineColor } from './CLine.type';

export const LineColorClasses: Record<LineColor, string> = {
    [LineColor.Detault]: 'bg-primary/10',
    [LineColor.Primary]: 'bg-black/5',
    [LineColor.Background]: 'bg-background',
};
