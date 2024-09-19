/**
 * Represents the reason for disapproval of an entity, including the type and details of the disapproval.
 * 
 * @see https://www.google.com/apis/ads/publisher/v202408
 */
export type DisapprovalReason = {
  /**
   * The type of disapproval reason.
   */
  type: DisapprovalReason.Type;

  /**
   * Additional details explaining the reason for disapproval.
   */
  details: string;
};

/**
 * Enumeration of possible disapproval reason types.
 */
export namespace DisapprovalReason {
  export enum Type {
    CONTENT = 'CONTENT', // Disapproved due to content issues.
    OWNERSHIP = 'OWNERSHIP', // Disapproved due to ownership-related issues.
    OTHER = 'OTHER', // Disapproved for another reason not specified.
    UNKNOWN = 'UNKNOWN', // Disapproval reason is unknown.
  }
}
