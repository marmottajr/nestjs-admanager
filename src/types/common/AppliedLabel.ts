/**
 * Represents a Label that can be applied to an entity.
 * To negate an inherited label, create an AppliedLabel with the labelId of the inherited label and set isNegated to true.
 * 
 * @see https://www.google.com/apis/ads/publisher/v202408
 */
export type AppliedLabel = {
  /**
   * The ID of a created Label.
   */
  labelId: number;

  /**
   * Set to true to negate the effects of the label with the specified labelId.
   */
  isNegated: boolean;
};
