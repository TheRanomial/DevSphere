import { NextApiRequest, NextApiResponse } from "next";
import { StreamChat, Permission, PermissionObject } from "stream-chat";
import { AnyResource, AnyRole, Allow, Deny } from "stream-chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  const apiSecret = process.env.GET_STREAM_SECRET_KEY!;

  if (!apiKey || !apiSecret) {
    return res.status(500).json({ message: "Server configuration error" });
  }

  const client = StreamChat.getInstance(apiKey, apiSecret);

  try {
    const { grants } = await client.getChannelType("messaging");
    
    await client.updateChannelType("messaging", {
      grants: {
        channel_member: [
          "read-channel", // allow access to the channel
          "create-message", // create messages in the channel
          "update-message-owner", // update own user messages
          "delete-message-owner", // delete own user messages
        ],
      },
    });
    res.status(200).json({ message: "Channel type updated successfully" });
  } catch (error) {
    console.error("Error updating channel type:", error);
    res.status(500).json({ message: "Error updating channel type" });
  }
}
