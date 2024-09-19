/**
 * Represents the dimensions of an AdUnit, LineItem, or Creative.
 * 
 * For interstitial size (out-of-page), native, ignored, and fluid size, the dimensions must be set to 1x1.
 * 
 * @see https://www.google.com/apis/ads/publisher/v202408
 */
export type Size = {
  /**
   * The width of the AdUnit, LineItem, or Creative.
   */
  width: number;

  /**
   * The height of the AdUnit, LineItem, or Creative.
   */
  height: number;

  /**
   * Indicates whether this size represents an aspect ratio.
   */
  isAspectRatio: boolean;
};
