import { ColumnEnum } from "./ColumnEnum";
import { DateRangeEnum } from "./DateRangeEnum";
import { DimensionAttributeEnum } from "./DimensionAttributeEnum";
import { DimensionEnum } from "./DimensionEnum";

/**
 * A ReportQuery object allows you to specify the selection criteria for generating a report. 
 * Only reports with at least one Column are supported.
 * This type is based on the Google Ads API (v202408).
 * 
 * @see https://developers.google.com/ad-manager/api/reference/v202408/ReportService.ReportQuery
 */
export type ReportQuery = {
  /**
   * The list of break-down types being requested in the report. 
   * The generated report will contain the dimensions in the same order as requested. 
   * This field is required.
   */
  dimensions: DimensionEnum[];

  /**
   * The ad unit view for the report. Defaults to AdUnitView.TOP_LEVEL.
   */
  adUnitView?: 'TOP_LEVEL' | 'FLAT' | 'HIERARCHICAL';

  /**
   * The list of trafficking statistics and revenue information being requested in the report. 
   * The generated report will contain the columns in the same order as requested. 
   * This field is required.
   */
  columns: ColumnEnum[];

  /**
   * The list of break-down attributes being requested in this report. 
   * Some DimensionAttribute values can only be used with certain Dimension values that must be 
   * included in the dimensions attribute. 
   * The generated report will contain the attributes in the same order as requested.
   */
  dimensionAttributes?: DimensionAttributeEnum[];

  /**
   * The list of CustomField.id being requested in this report. 
   * To add a CustomField to the report, you must include its corresponding Dimension, 
   * determined by the CustomField.entityType, as a dimension.
   */
  customFieldIds?: number[];

  /**
   * The list of content CMS metadata key IDs being requested in this report. 
   * Each of these IDs must have been defined in the CMS metadata key. 
   * This will include dimensions in the form of CMS_METADATA_KEY[id]_ID and 
   * CMS_METADATA_KEY[id]_VALUE where where ID is the ID of the CMS metadata value and VALUE is the name.
   * To add IDs, you must include Dimension.CMS_METADATA in dimensions, and specify a non-empty list 
   * of content CMS metadata key IDs. The order of content CMS metadata columns in the report 
   * correspond to the place of Dimension.CMS_METADATA in dimensions. 
   */
  cmsMetadataKeyIds?: number[];

  /**
   * The list of custom dimension custom targeting key IDs being requested in this report. 
   * This will include dimensions in the form of TOP_LEVEL_DIMENSION_KEY[id]_ID and 
   * TOP_LEVEL_DIMENSION_KEY[id]_VALUE where ID is the ID of the custom targeting value 
   * and VALUE is the name.
   * To add IDs, you must include Dimension.CUSTOM_DIMENSION in dimensions, and specify a 
   * non-empty list of custom targeting key IDs. 
   * The order of cusotm dimension columns in the report correspond to the place of 
   * Dimension.CUSTOM_DIMENSION in dimensions. 
   */
  customDimensionKeyIds?: number[];

  /**
   * The start date from which the reporting information is gathered. 
   * The ReportQuery#dateRangeType field must be set to DateRangeType.CUSTOM_DATE in order to use this.
   */
  startDate?: Date;

  /**
   * The end date up to which the reporting information is gathered. 
   * The ReportQuery#dateRangeType field must be set to DateRangeType.CUSTOM_DATE in order to use this.
   */
  endDate?: Date;

  /**
   * The period of time for which the reporting data is being generated. 
   * In order to define custom time periods, set this to DateRangeType.CUSTOM_DATE. 
   * If set to DateRangeType.CUSTOM_DATE, then ReportQuery.startDate and ReportQuery.endDate will be used.
   */
  dateRangeType?: DateRangeEnum;

  /**
   * Specifies a filter to use for reporting on data. 
   * This filter will be used in conjunction (joined with an AND statement) with the date range 
   * selected through dateRangeType, startDate, and endDate. 
   * The syntax currently allowed for Statement.query is
   * [WHERE <condition> {AND <condition> ...}]
   * <condition>
   *     := <property> = <value>
   * <condition>
   *     := <property> = <bind variable>
   * <condition> := <property> IN <list>
   * <bind variable> := :<name>
   * where property is the enumeration name of a Dimension that can be filtered.
   * For example, the statement "WHERE LINE_ITEM_ID IN (34344, 23235)" can be used to 
   * generate a report for a specific set of line items
   * Filtering on IDs is highly recommended over filtering on names, especially for geographical entities. 
   * When filtering on names, matching is case sensitive.
   */
  statement?: { query: string };

  /**
   * The currency for revenue metrics. Defaults to the network currency if left null. 
   * The supported currency codes can be found in this Help Center article.
   */
  reportCurrency?: string;

  /**
   * The time zone for reporting data. Defaults to the network time zone if left null.
   */
  timeZoneType?: 'UNKNOWN' | 'PUBLISHER' | 'PACIFIC';
};


