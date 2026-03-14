"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import { useConfiguration } from "@/hooks/useConfiguration";
import userService from "@/services/user.service";

export default function Dashboard() {
  const router = useRouter();

  return <button onClick={userService.me}>TEST</button>;
}
