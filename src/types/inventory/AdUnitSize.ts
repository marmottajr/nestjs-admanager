import { Size } from "./Size";

/**
 * Represents the size of an ad in an ad unit, including its environment and companions.
 * In most cases, this is a simple size with width and height (sometimes representing an aspect ratio).
 * 
 * @see https://www.google.com/apis/ads/publisher/v202408
 */
export type AdUnitSize = {
  /**
   * The permissible creative size that can be served inside this ad unit.
   */
  size: Size;

  /**
   * The environment type of the ad unit size.
   * Default value is EnvironmentType.BROWSER.
   */
  environmentType: EnvironmentType;

  /**
   * The companions for this ad unit size.
   * Companions are only valid if the environment is EnvironmentType.VIDEO_PLAYER.
   * If the environment is EnvironmentType.BROWSER, including companions will result in an error.
   */
  companions?: AdUnitSize[];

  /**
   * The full display string of the size, including companion sizes if applicable,
   * e.g., "300x250" or "300x250v (180x150)".
   */
  fullDisplayString: string;

  /**
   * Indicates whether the inventory size is audio.
   * If true, the size will be set to "1x1" and the environment will be set to EnvironmentType.VIDEO_PLAYER,
   * regardless of user input.
   */
  isAudio: boolean;
};

/**
 * Enumeration of possible environment types for the ad unit size.
 */
export enum EnvironmentType {
  BROWSER = 'BROWSER',
  VIDEO_PLAYER = 'VIDEO_PLAYER',
}
