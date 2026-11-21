export type HeroBackground = 'silk' | 'echo' | 'meridian' | 'ribbons';

// Choose independently for viewports below and above 768px.
export const heroBackgroundConfig: { mobile: HeroBackground; desktop: HeroBackground } = {
    mobile: 'ribbons',
    desktop: 'meridian',
};
