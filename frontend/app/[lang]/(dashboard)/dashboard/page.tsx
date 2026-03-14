"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import { useConfiguration } from "@/hooks/useConfiguration";
import userService from "@/services/user.service";

export default function Dashboard({ params }: PageProps<"/[lang]/dashboard">) {
  return <div>DASHBOARD INDEX</div>

}
