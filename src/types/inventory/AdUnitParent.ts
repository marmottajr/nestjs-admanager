/**
 * Represents the summary of a parent AdUnit.
 * This type is based on the Google Ads API (v202408).
 * 
 * @see https://www.google.com/apis/ads/publisher/v202408
 */
export type AdUnitParent = {
  /**
   * The ID of the parent AdUnit.
   * This value is read-only and is populated by Google.
   */
  id: string;

  /**
   * The name of the parent AdUnit.
   * This value is read-only and is populated by Google.
   */
  name: string;

  /**
   * A string used to uniquely identify the ad unit for serving purposes.
   * This value is read-only and is assigned by Google when the ad unit is created.
   */
  adUnitCode: string;
};
