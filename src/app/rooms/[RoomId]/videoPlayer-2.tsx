"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { OriginalRoom } from "@/interfaces";
import {
  Allow,
  AnyResource,
  AnyRole,
  Deny,
  Permission,
  StreamChat,
} from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { generateTokenAction } from "./actions";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

export function DevFinderVideo({ room }: { room: OriginalRoom }) {
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<any>(null);
  const [call, setCall] = useState<Call | null>(null);
  const router = useRouter();

  const updateChannelPermissions = async () => {
    try {
      const response = await fetch("/api/updateChannelPermission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update channel permissions");
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error updating channel permissions:", error);
    }
  };


  useEffect(() => {
    if (!room) return;
    if (!session.data) {
      return;
    }
    const userId = session.data.user.id;
    const userName = session.data.user.name ?? undefined;
    const userImage = session.data.user.image ?? undefined;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: session.data.user.name ?? undefined,
        image: session.data.user.image ?? undefined,
      },
      tokenProvider: () => generateTokenAction(),
    });
    const call = client.call("default", room.RoomId);
    call.join({ create: true });

    const chatClient = StreamChat.getInstance(apiKey);
    chatClient.connectUser(
      { id: userId, name: userName, image: userImage },
      async () => await generateTokenAction()
    );

    const channelId = `room-${room.RoomId}`;
    const channel = chatClient.channel("messaging", channelId, {
      name: `Chat for ${room.RoomId}`,
    });
    channel.create();
    
    setClient(client);
    setChatClient(chatClient);
    setCall(call);
    setChannel(channel);
    updateChannelPermissions();

    return () => {
      call
        .leave()
        .then(() => client.disconnectUser())
        .catch(console.error);

      chatClient.disconnectUser();
    };
  }, [session, room]);

  return (
    client &&
    chatClient &&
    call &&
    channel && (
      <div style={{ display: "flex", width: "100%", gap: "15px" }}>
        <div style={{ flex: "70%", maxWidth: "70%" }}>
          <StreamVideo client={client}>
            <StreamTheme>
              <StreamCall call={call}>
                <SpeakerLayout />
                <CallControls
                  onLeave={() => {
                    router.push("/");
                  }}
                />
                <CallParticipantsList onClose={() => undefined} />
              </StreamCall>
            </StreamTheme>
          </StreamVideo>
        </div>
        <div style={{ flex: "30", maxWidth: "30%", height: "100%" }}>
          <Chat client={chatClient} theme="str-chat__theme-light">
            <Channel channel={channel}>
              <Window>
                <MessageList />
                <MessageInput />
              </Window>
            </Channel>
          </Chat>
        </div>
      </div>
    )
  );
}
