"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export type Invite = {
  id: string;
  household_id: string;
  inviter_id: string;
  invitee_id: string;
  status: string;
  created_at: string;
  households: {
    name: string;
  };
  inviter: {
    name: string;
  };
};

const createdAtToTimeAgo = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};

export default function InvitesInbox() {
  const supabase = createClient();
  const user = useCurrentUser();
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const setup = async () => {
      if (!user) return;

      // Fetch current invites for the user when the component mounts
      const fetchInvites = async () => {
        const { data, error } = await supabase
          .from("household_invitations")
          .select(
            "*, households(name), inviter:users!household_invitations_inviter_id_fkey(name)",
          )
          .eq("invitee_id", user.id);
        if (error) {
          console.error("Error fetching invites:", error);
        } else {
          setInvites(data);
        }
        setLoading(false);
      };

      fetchInvites();

      // Subscribe only to rows where I'm the invitee
      channel = supabase
        .channel("invites-inbox")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "household_invitations",
            filter: `invitee_id=eq.${user.id}`,
          },
          async (payload) => {
            // Handle DELETE events by removing the invite from state
            if (payload.eventType === "DELETE") {
              const deleted = payload.old as { id: string };
              setInvites((prev) => prev.filter((i) => i.id !== deleted.id));
              return;
            }

            // INSERT or UPDATE: refetch with joins
            const rowId = payload.new.id as string;
            const { data, error } = await supabase
              .from("household_invitations")
              .select(
                "*, households(name), inviter:users!household_invitations_inviter_id_fkey(name)",
              )
              .eq("id", rowId)
              .single();

            if (!error && data) {
              setInvites((prev) =>
                payload.eventType === "INSERT"
                  ? [data, ...prev]
                  : prev.map((i) => (i.id === data.id ? data : i)),
              );
            }
          },
        )
        .subscribe();
    };

    setup();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [supabase, user]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <div className="flex flex-row gap-2 items-center mb-4">
        <MdOutlineMailOutline className="text-1xl text-blue-500 flex-shrink-0" />
        <h2 className="text-lg font-bold text-gray-700">Invitations</h2>
        {!loading && (
          <div className="bg-blue-500 w-4 h-4 rounded-full flex items-center justify-center p-3">
            <p className="text-xs text-white font-bold">{invites.length}</p>
          </div>
        )}
      </div>
      {/*TODO: Add skeleton loader here*/}
      {loading ? (
        <div className="animate-pulse">
          <div className="h-[8vh] bg-gray-200 rounded"></div>
        </div>
      ) : invites.length === 0 ? (
        <p className="text-gray-600">
          You don't have any pending invitations at the moment
        </p>
      ) : (
        <ul className="space-y-2">
          {invites.map((invite) => (
            <li
              key={invite.id}
              className="bg-white p-2 rounded border border-gray-200"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-[1px]">
                  <b>{invite.households.name}</b>
                  <p className="text-sm text-gray-600">
                    Invited by {invite.inviter.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Sent {createdAtToTimeAgo(invite.created_at)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-0 md:mb-8 ml-10">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:transform hover:scale-[1.03] transition-transform duration-100 flex items-center">
                    <IoIosCheckmarkCircleOutline className="inline-block mr-1 text-md" />
                    Accept
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs border border-gray-300 hover:transform hover:scale-[1.03] transition-transform duration-100 flex items-center">
                    <IoIosRemoveCircleOutline className="inline-block mr-1 text-md" />
                    Decline
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
