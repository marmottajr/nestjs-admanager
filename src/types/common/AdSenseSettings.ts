/**
 * Contains the AdSense configuration for an AdUnit.
 * 
 * @see https://www.google.com/apis/ads/publisher/v202408
 */
export type AdSenseSettings = {
  /**
   * Specifies the border-style of the AdUnit.
   * Optional. Defaults to the setting of the ad unit's parent or ancestor, or BorderStyle.DEFAULT if not set.
   */
  borderStyle?: AdSenseSettings.BorderStyle;

  /**
   * Specifies the font family of the AdUnit.
   * Optional. Defaults to the setting of the ad unit's parent or ancestor, or FontFamily.DEFAULT if not set.
   */
  fontFamily?: AdSenseSettings.FontFamily;

  /**
   * Specifies the font size of the AdUnit.
   * Optional. Defaults to the setting of the ad unit's parent or ancestor, or FontSize.DEFAULT if not set.
   */
  fontSize?: AdSenseSettings.FontSize;
};

/**
 * Namespace for AdSenseSettings enums.
 */
export namespace AdSenseSettings {
  /**
   * Enumeration of possible border styles for the AdUnit.
   */
  export enum BorderStyle {
    DEFAULT = 'DEFAULT', // Uses the default border-style of the browser.
    NOT_ROUNDED = 'NOT_ROUNDED', // Uses a cornered border-style.
    SLIGHTLY_ROUNDED = 'SLIGHTLY_ROUNDED', // Uses a slightly rounded border-style.
    VERY_ROUNDED = 'VERY_ROUNDED', // Uses a rounded border-style.
  }

  /**
   * Enumeration of possible font families for the AdUnit.
   */
  export enum FontFamily {
    DEFAULT = 'DEFAULT',
    ARIAL = 'ARIAL',
    TAHOMA = 'TAHOMA',
    GEORGIA = 'GEORGIA',
    TIMES = 'TIMES',
    VERDANA = 'VERDANA',
  }

  /**
   * Enumeration of possible font sizes for the AdUnit.
   */
  export enum FontSize {
    DEFAULT = 'DEFAULT',
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE',
  }
}
