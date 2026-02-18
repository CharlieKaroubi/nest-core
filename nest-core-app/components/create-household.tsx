"use client";

import { createClient } from "@/lib/supabase/client";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

export default function CreateHouseholdDialog({
  onClose,
}: {
  onClose: () => void;
}) {
  const supabase = createClient();
  const user = useCurrentUser();
  const router = useRouter();
  const [householdName, setHouseholdName] = useState("");
  const [emptyNameError, setEmptyNameError] = useState(false);

  const handleCreateHousehold = async () => {
    if (!householdName.trim()) {
      setEmptyNameError(true);
      return;
    }
    if (!user) {
      console.error("User must be logged in to create a household");
      router.push("/landing-page");
      return;
    }

    // Create the household in the database
    const { data, error } = await supabase
      .from("households")
      .insert({ name: householdName, owner_id: user.id })
      .select("id")
      .single();

    if (error) {
      console.error("Error creating household:", error);
      return;
    }

    const householdId = data.id;

    // Add the creator as a member of the household
    const { error: memberError } = await supabase
      .from("household_members")
      .insert({ household_id: householdId, user_id: user.id });

    if (memberError) {
      console.error("Error adding user to household:", memberError);
      return;
    }

    setEmptyNameError(false);
    router.push(`/household/${householdId}`);
  };

  const inputBorder = emptyNameError ? "border-red-500" : "border-gray-200";
  const inputFocusBorder = emptyNameError
    ? "focus:ring-red-500"
    : "focus:ring-blue-500";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-[95%] max-w-md flex flex-col items-center">
        <button
          onClick={onClose}
          className="self-start text-blue-500 hover:text-blue-700 focus:outline-none text-2xl"
        >
          <IoIosCloseCircleOutline className="text-2xl" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create a Household
        </h2>
        <input
          type="text"
          className={`border ${inputBorder} ${inputFocusBorder} bg-white rounded-md px-4 py-2 mb-4 w-[80%] focus:outline-none focus:ring-1`}
          placeholder="Household Name"
          value={householdName}
          onChange={(e) => setHouseholdName(e.target.value)}
        />
        {emptyNameError && (
          <p className="text-red-500 text-sm mb-2">
            Household name is required
          </p>
        )}
        <button
          onClick={handleCreateHousehold}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full hover:transform hover:scale-[1.03] transition-transform duration-100 text-center font-pacifico"
        >
          Create
        </button>
      </div>
    </div>
  );
}
