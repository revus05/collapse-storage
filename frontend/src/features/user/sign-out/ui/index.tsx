"use client";

import { signOut, useSignOutUserMutation } from "entity/user";
import { LogOut } from "lucide-react";
import { useAppDispatch } from "shared/lib/hooks";
import { Button } from "shared/ui/button";

export const SignOutButton = () => {
  const [signOutQuery] = useSignOutUserMutation();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    await signOutQuery();
    dispatch(signOut());
  };

  return (
    <Button
      onClick={handleSignOut}
      type="button"
      variant="destructive"
      className="flex border-none items-center gap-1 hover:bg-secondary px-4 py-2 tetx-sm [&_svg]:size-6! cursor-pointer justify-start"
    >
      <LogOut /> <span>Выйти</span>
    </Button>
  );
};
