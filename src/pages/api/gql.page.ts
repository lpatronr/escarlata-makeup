import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const response = await fetch(process.env.SHOPIFY_GRAPHQL_URL as string, {
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
    },
    method: "POST",
  });

  const data = await response.json();

  res.status(response.status).send(data);
}
