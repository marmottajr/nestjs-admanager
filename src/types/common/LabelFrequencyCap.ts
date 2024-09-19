import { FrequencyCap } from "./FrequencyCap";

/**
 * A LabelFrequencyCap assigns a frequency cap to a label.
 * The frequency cap limits the cumulative number of impressions of any ad units with this label 
 * that may be shown to a particular user over a specified time unit.
 * 
 * @see https://www.google.com/apis/ads/publisher/v202408
 */
export type LabelFrequencyCap = {
  /**
   * The frequency cap to be applied to the label.
   */
  frequencyCap: FrequencyCap;

  /**
   * The ID of the label being capped on the AdUnit.
   */
  labelId: number;
};
