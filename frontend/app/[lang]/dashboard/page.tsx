"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import { useConfiguration } from "@/hooks/useConfiguration";

export default function Dashboard() {
  const router = useRouter();
  const { locale, appName, loading: configLoading } = useConfiguration();

  if (configLoading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg space-y-8">
        <div className="bg-white p-8 shadow-sm sm:rounded-lg dark:bg-gray-800/50 dark:outline dark:-outline-offset-1 dark:outline-white/10">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Dashboard
          </h1>

          <div className="space-y-4">
            <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                Authenticated successfully
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                User info
              </h2>
              <dl className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600 dark:text-gray-300">
                    Email
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.email}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600 dark:text-gray-300">
                    Roles
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.roles.join(", ")}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Server configuration
              </h2>
              <dl className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600 dark:text-gray-300">
                    Locale
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    {locale}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600 dark:text-gray-300">
                    App name
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    {appName || "—"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <button
            onClick={() => {
              authService.logout();
              router.push(`/${locale}/login`);
            }}
            className="mt-6 w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
