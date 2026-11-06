export type ScreenName = "home" | "calendar" | "squad" | "trainings" | "board" | "stats" | "scouting";
export type ScreenTheme = "light" | "dark";

/** Captures are 1440x900 viewports exported at 1600px wide. */
export const SCREEN_WIDTH = 1600;
export const SCREEN_HEIGHT = 1000;

export function screenSrc(name: ScreenName, theme: ScreenTheme): string {
  return `/screens/${name}-${theme}.webp`;
}
