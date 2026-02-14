"use client";

import NavBar from "@/components/nav-bar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FaHome } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

export default function JoinHouseholdPage() {
  const user = useCurrentUser();

  return (
    <>
      <NavBar user={user} />
      <div className="max-w-3xl mx-auto p-4 flex flex-col items-center gap-4">
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
          <div className="bg-gray-100 rounded-lg shadow-md p-4 w-full">
            <div className="flex flex-row gap-2 items-center mb-4">
              <MdOutlineMailOutline className="text-1xl text-blue-500 flex-shrink-0" />
              <h2 className="text-lg font-bold text-gray-700">Invitations</h2>
              <div className="bg-blue-500 w-4 h-4 rounded-full flex items-center justify-center p-3">
                <p className="text-xs text-white font-bold">0</p>
              </div>
            </div>
            <p className="text-gray-600">
              You don't have any pending invitations at the moment
            </p>
          </div>
          {/* Create household section */}
          <div className="flex flex-col items-center gap-4 bg-white rounded-lg shadow-md p-6 w-full">
            <FaHome className="text-9xl text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-700">
              Create a Household
            </h2>
            <p className="text-center text-gray-600">
              Start a new NestCore{" "}
              <span className="text-blue-500 font-semibold">
                for your household
              </span>{" "}
              and invite your housemates to join you and make your living area a
              better place!
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded-full hover:transform hover:scale-[1.03] transition-transform duration-100">
              Create New Household
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
