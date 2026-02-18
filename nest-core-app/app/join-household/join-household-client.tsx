"use client";

import { useState } from "react";
import InvitesInbox from "@/components/invites-inbox";
import { FaHome, FaExclamationCircle } from "react-icons/fa";

import CreateHouseholdDialog from "@/components/create-household";

export default function JoinHouseholdPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateHousehold = () => {
    setIsCreateOpen(true);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-4 flex flex-col items-center gap-4 w-full">
        {/* Alert box for users not in a household */}
        <div className="bg-yellow-100 rounded-lg shadow-lg p-4 flex flex-row w-full gap-2">
          <FaExclamationCircle className="text-2xl text-yellow-500 flex-shrink-0" />
          <p className="text-center text-gray-600">
            You're not part of a household yet. Join an existing one or create
            your own below!
          </p>
        </div>

        {/* Main content for joining or creating a household */}
        <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-lg p-6 gap-6 w-full">
          {/* Invitations section */}
          <InvitesInbox />
          {/* Create household section */}
          <div className="flex flex-col items-center gap-4 bg-white rounded-lg shadow-md p-6 w-full">
            <FaHome className="text-9xl text-blue-500" />
            <h2 className="text-2xl font-bold text-center text-gray-700">
              Create a Household
            </h2>
            <p className="text-center text-gray-600">
              Start a new NestCore{" "}
              <span className="text-blue-500 font-semibold">
                for your household
              </span>{" "}
              and make your living area a better place!
            </p>
            <button
              onClick={handleCreateHousehold}
              className={`bg-blue-500 hover:bg-blue-700 text-white text-center text-xl font-bold py-2 px-4 rounded-full hover:transform hover:scale-[1.03] transition-transform duration-100 font-pacifico`}
            >
              Create New Household
            </button>
          </div>
          {/* Join by Invite Code section */}
          <div className="flex flex-row items-center gap-2 w-full justify-around">
            <p className="text-gray-600 text-center text-sm">
              Have an Invite Code?
            </p>
            <div className="flex flex-row items-center gap-2">
              <input
                className="border border-gray-300 rounded-md px-3 py-1 h-9 w-[30vw] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Code"
              ></input>
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white text-md font-bold px-4 h-9 rounded-md hover:transform hover:scale-[1.03] transition-transform duration-100 font-pacifico`}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
      {isCreateOpen && (
        <CreateHouseholdDialog onClose={() => setIsCreateOpen(false)} />
      )}
    </>
  );
}
