/**
 * Extracts the Shopify resource ID from a given handle.
 *
 * @param {string} handle - The handle from which to extract the resource ID.
 * @return {string} The resource ID, or an empty string if the handle is invalid.
 */
export default function extractShopifyResourceId(handle: string): string {
  return handle.split("/")[4] ?? "";
}
