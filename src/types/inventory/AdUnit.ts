import { AdSenseSettings } from "../common/AdSenseSettings";
import { AdUnitParent } from "./AdUnitParent";
import { AdUnitSize } from "./AdUnitSize";
import { AppliedLabel } from "../common/AppliedLabel";
import { DateTime } from "../common/DateTime";
import { LabelFrequencyCap } from "../common/LabelFrequencyCap";

/**
 * Represents an AdUnit, a chunk of identified inventory for the publisher.
 * It contains all the necessary settings associated with inventory for serving ads, 
 * and can also be the parent of other ad units in the inventory hierarchy.
 * 
 * @see https://www.google.com/apis/ads/publisher/v202408
 */
export type AdUnit = {
  /**
   * Uniquely identifies the AdUnit. This value is read-only and assigned by Google when an ad unit is created.
   * Required for updates.
   */
  id: string;

  /**
   * The ID of the ad unit's parent. Every ad unit has a parent except the root ad unit, which is created by Google.
   * Required during creation and becomes read-only afterward.
   */
  parentId: string;

  /**
   * True if the ad unit has any children. This field is read-only and populated by Google.
   */
  hasChildren: boolean;

  /**
   * The path to this ad unit in the hierarchy, represented as a list from the root to this ad unit's parent.
   * For root ad units, this list is empty. This field is read-only and populated by Google.
   */
  parentPath: AdUnitParent[];

  /**
   * The name of the ad unit. This field is required and must be unique (case-insensitive). Maximum length is 255 characters.
   */
  name: string;

  /**
   * Optional description of the ad unit. Maximum length is 65,535 characters.
   */
  description?: string;

  /**
   * The value to use for the HTML link's target attribute. Defaults to TargetWindow.TOP if not specified.
   */
  targetWindow?: TargetWindow;

  /**
   * The status of the ad unit. Defaults to InventoryStatus.ACTIVE.
   * Can only be modified through actions in InventoryService.performAdUnitAction.
   */
  status: InventoryStatus;

  /**
   * A string used to uniquely identify the ad unit for ad serving purposes.
   * This attribute is optional and cannot be changed after creation.
   */
  adUnitCode?: string;

  /**
   * The permissible creative sizes that can be served inside this ad unit. Optional.
   */
  adUnitSizes?: AdUnitSize[];

  /**
   * Indicates whether this is an interstitial ad unit.
   */
  isInterstitial: boolean;

  /**
   * Indicates whether this is a native ad unit.
   */
  isNative: boolean;

  /**
   * Indicates whether this is a fluid ad unit.
   */
  isFluid: boolean;

  /**
   * If true, the ad unit must be explicitly targeted; it won't be implicitly targeted when its parent is targeted.
   */
  explicitlyTargeted: boolean;

  /**
   * AdSense-specific settings. Can be overwritten by setting adSenseSettingsSource to PropertySourceType.DIRECTLY_SPECIFIED.
   */
  adSenseSettings?: AdSenseSettings;

  /**
   * Specifies the source of adSenseSettings. Can be set to PARENT or DIRECTLY_SPECIFIED.
   */
  adSenseSettingsSource: ValueSourceType;

  /**
   * The set of label frequency caps applied directly to this ad unit. Maximum of 10 label frequency caps per ad unit.
   */
  appliedLabelFrequencyCaps: LabelFrequencyCap[];

  /**
   * Contains labels applied directly and those inherited from parent ad units. Read-only and assigned by Google.
   */
  effectiveLabelFrequencyCaps: LabelFrequencyCap[];

  /**
   * The set of labels applied directly to this ad unit.
   */
  appliedLabels: AppliedLabel[];

  /**
   * Contains labels applied directly and those inherited from parent ad units. Read-only and assigned by Google.
   */
  effectiveAppliedLabels: AppliedLabel[];

  /**
   * IDs of all teams this ad unit is on, including those inherited from parent ad units. Read-only.
   */
  effectiveTeamIds: number[];

  /**
   * IDs of all teams this ad unit is directly on.
   */
  appliedTeamIds: number[];

  /**
   * The date and time this ad unit was last modified.
   */
  lastModifiedDateTime: DateTime;

  /**
   * The smart size mode for this ad unit. Defaults to SmartSizeMode.NONE for fixed sizes.
   */
  smartSizeMode: SmartSizeMode;

  /**
   * The interval in seconds for mobile app ad units to refresh automatically. Valid values: 30-120 seconds. Optional.
   */
  refreshRate?: number;

  /**
   * Specifies an ID for a channel in an external set-top box campaign management system. Read-only.
   * Only meaningful if isSetTopBoxEnabled is true.
   */
  externalSetTopBoxChannelId?: string;

  /**
   * Specifies whether this ad unit represents an external set-top box channel. Read-only.
   */
  isSetTopBoxEnabled: boolean;

  /**
   * The application ID for the CTV application this ad unit belongs to. Optional.
   */
  applicationId?: number;
};

/**
 * Enum for TargetWindow values.
 * Specifies the target attribute for HTML links.
 */
export enum TargetWindow {
  TOP = 'TOP',
  BLANK = 'BLANK',
}

/**
 * Enum for InventoryStatus values.
 */
export enum InventoryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

/**
 * Enum for SmartSizeMode values.
 */
export enum SmartSizeMode {
  UNKNOWN = 'UNKNOWN',
  NONE = 'NONE',
  SMART_BANNER = 'SMART_BANNER',
  DYNAMIC_SIZE = 'DYNAMIC_SIZE',
}
/**
 * Enum for ValueSourceType values.
 */
export enum ValueSourceType {
  PARENT = 'PARENT',
  DIRECTLY_SPECIFIED = 'DIRECTLY_SPECIFIED',
  UNKNOWN = 'UNKNOWN',
}
