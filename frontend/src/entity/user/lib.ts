"use server";

import { cookies } from "next/headers";
import type { ApiResponse, UserDTO } from "shared/api";

export type PreloadedState = {
  userSlice: { user: UserDTO | null };
};

const getDefaultState = (user: UserDTO | null = null): PreloadedState => ({
  userSlice: { user },
});

export async function preloadState(): Promise<PreloadedState> {
  const user = await getMeOnServer();

  if (!user) {
    return getDefaultState();
  }

  return getDefaultState(user);
}

export const getMeOnServer = async (): Promise<UserDTO | null> => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    return null;
  }

  let meRes: Response | null = null;

  try {
    try {
      meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: "GET",
        cache: "no-store",
        headers: {
          Cookie: `jwt=${jwt}`,
        },
      });
    } catch {
      console.log("Invalid jwt");
    }

    if (!meRes) {
      return null;
    }

    const meData: ApiResponse<UserDTO> = await meRes.json();
    const user = meData.data;

    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    console.error("Failed to parse user", err);
    return null;
  }
};
