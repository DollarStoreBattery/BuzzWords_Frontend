import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve("../.env") });

const getSecret = () => {
  if (!process.env.REVALIDATION_SECRET) {
    throw new Error("Unable to read the revalidation secret");
  } else return process.env.REVALIDATION_SECRET;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = getSecret();
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== secret) {
    return res.status(401).json({ message: "Invalid revalidation secret`" });
  }

  try {
    // this leads to revalidating index.tsx
    await res.revalidate("/");
    return res.status(200).json({ revalidated: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error revalidating");
  }
}
