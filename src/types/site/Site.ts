import { DateTime } from "../common";
import { DisapprovalReason } from "./DisapprovalReason";

/**
 * Represents a site in the network.
 * 
 * @see https://www.google.com/apis/ads/publisher/v202408
 */
export type Site = {
  /**
   * The unique ID of the site.
   */
  id: number;

  /**
   * The URL of the site.
   */
  url: string;

  /**
   * The child network code associated with the site.
   */
  childNetworkCode: string;

  /**
   * The approval status of the site.
   */
  approvalStatus: ApprovalStatus;

  /**
   * Indicates whether the site is active.
   */
  active: boolean;

  /**
   * The date and time when the approval status was last updated.
   */
  approvalStatusUpdateTime: DateTime;

  /**
   * A list of disapproval reasons if the site was disapproved.
   */
  disapprovalReasons: DisapprovalReason[];
};

/**
 * Enumeration of possible approval statuses for the site.
 */
export enum ApprovalStatus {
  DRAFT = 'DRAFT', // The site is still in draft status.
  UNCHECKED = 'UNCHECKED', // The site has not yet been checked for approval.
  APPROVED = 'APPROVED', // The site has been approved.
  DISAPPROVED = 'DISAPPROVED', // The site has been disapproved.
  REQUIRES_REVIEW = 'REQUIRES_REVIEW', // The site requires additional review.
  UNKNOWN = 'UNKNOWN', // The approval status is unknown.
}
