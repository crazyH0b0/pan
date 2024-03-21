"use server"
import { User } from "@prisma/client";
import { cookies } from "next/headers";

export async function getCookieCredential () {
  const cookieStore = cookies();
  const currentUser = JSON.parse(cookieStore.get('user')?.value!) as User;
  return currentUser
}


