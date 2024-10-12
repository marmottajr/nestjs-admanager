/**
 * Enumerations for date ranges
 */
export declare enum DateRangeEnum {
  /**
   * The current day.
   */
  TODAY = 'TODAY',
  
  /**
   * The previous day.
   */
  YESTERDAY = 'YESTERDAY',

  /**
   * The last week, from Monday to Sunday.
   */
  LAST_WEEK = 'LAST_WEEK',

  /**
   * The previous month.
   */
  LAST_MONTH = 'LAST_MONTH',

  /**
   * The last 3 full months. For example, if today is May 5, 2017, 
   * then LAST_3_MONTHS would go from February 1 to April 30.
   */
  LAST_3_MONTHS = 'LAST_3_MONTHS',

  /**
   * This will report on the last 93 days for the following columns: 
   * Column.UNIQUE_REACH_IMPRESSIONS, Column.UNIQUE_REACH_FREQUENCY, and Column.UNIQUE_REACH.
   */
  REACH_LIFETIME = 'REACH_LIFETIME',

  /**
   * Specifying this value will enable the user to specify 
   * ReportQuery.startDate and ReportQuery.endDate.
   */
  CUSTOM_DATE = 'CUSTOM_DATE',

  /**
   * The next day.
   */
  NEXT_DAY = 'NEXT_DAY',

  /**
   * The next ninety days.
   */
  NEXT_90_DAYS = 'NEXT_90_DAYS',

  /**
   * The next week, from Monday to Sunday.
   */
  NEXT_WEEK = 'NEXT_WEEK',

  /**
   * The next month.
   */
  NEXT_MONTH = 'NEXT_MONTH',

  /**
   * Beginning of the next day until the end of the next month.
   */
  CURRENT_AND_NEXT_MONTH = 'CURRENT_AND_NEXT_MONTH',

  /**
   * The next quarter.
   */
  NEXT_QUARTER = 'NEXT_QUARTER',

  /**
   * The next three months.
   */
  NEXT_3_MONTHS = 'NEXT_3_MONTHS',

  /**
   * The next twelve months.
   */
  NEXT_12_MONTHS = 'NEXT_12_MONTHS'
}
