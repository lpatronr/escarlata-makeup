import type { ProductFromIdQuery } from "@/generated/shopify/types";

export type Product = ProductFromIdQuery["product"];

export type ProductRecommendation = ProductFromIdQuery["productRecommendations"];
