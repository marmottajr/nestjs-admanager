/**
 * Represents a network in the system.
 * 
 * @see https://www.google.com/apis/ads/publisher/v202408
 */
export type Network = {
  /**
   * The unique ID of the Network.
   * This field is read-only and assigned by Google.
   */
  id: number;

  /**
   * The display name of the network.
   */
  displayName: string;

  /**
   * The network code.
   * If the current login has access to multiple networks, this code must be provided in the SOAP request headers for all requests.
   * This field is read-only.
   */
  networkCode: string;

  /**
   * The property code associated with the network.
   * This field is read-only.
   */
  propertyCode: string;

  /**
   * The time zone associated with the delivery of orders and reporting.
   * This field is read-only.
   */
  timeZone: string;

  /**
   * The primary currency code for the network.
   * This field is read-only.
   */
  currencyCode: string;

  /**
   * The secondary currencies that can be used as an alternative to the primary currency for trafficking line items.
   */
  secondaryCurrencyCodes: string[];

  /**
   * The AdUnit.id of the top-most ad unit to which descendant ad units can be added.
   * Should be used for the AdUnit.parentId when first building inventory hierarchy.
   * This field is read-only.
   */
  effectiveRootAdUnitId: string;

  /**
   * Whether this network is a test network.
   * This field is read-only.
   */
  isTest: boolean;
};
