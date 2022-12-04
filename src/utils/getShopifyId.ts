export default function getShopifyId(handle: string): string {
  return handle.split("/")[4] ?? "";
}
