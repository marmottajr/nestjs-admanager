/**
 * Represents a limit on the number of times a single viewer can be exposed to the same LineItem within a specified time period.
 * 
 * @see https://www.google.com/apis/ads/publisher/v202408
 */
export type FrequencyCap = {
  /**
   * The maximum number of impressions that can be served to a user within a specified time period.
   */
  maxImpressions: number;

  /**
   * The number of time units to represent the total time period.
   */
  numTimeUnits: number;

  /**
   * The unit of time for specifying the time period.
   */
  timeUnit: TimeUnit;
};

/**
 * Enumeration of possible time units for specifying the frequency cap's time period.
 */
export enum TimeUnit {
  MINUTE = 'MINUTE',
  HOUR = 'HOUR',
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  LIFETIME = 'LIFETIME',
  POD = 'POD', // Per pod of ads in a video stream. Only valid for VIDEO_PLAYER environment.
  STREAM = 'STREAM', // Per video stream. Only valid for VIDEO_PLAYER environment.
  UNKNOWN = 'UNKNOWN', // If the actual value is not exposed by the API version.
}
