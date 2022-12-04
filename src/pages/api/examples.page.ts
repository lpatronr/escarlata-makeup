import type { NextApiRequest, NextApiResponse } from "next";

const examples = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  res.status(200).json("Hello World");
};

export default examples;
