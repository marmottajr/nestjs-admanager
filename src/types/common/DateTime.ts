/**
 * Represents a date combined with the time of day.
 * 
 * @see https://www.google.com/apis/ads/publisher/v202408
 */
export type DateTime = {
  /**
   * The date part of the DateTime object.
   */
  date: Date;

  /**
   * The hour of the day (0-23).
   */
  hour: number;

  /**
   * The minute of the hour (0-59).
   */
  minute: number;

  /**
   * The second of the minute (0-59).
   */
  second: number;

  /**
   * The time zone ID for the DateTime object (e.g., "America/New_York").
   */
  timeZoneId: string;
};
