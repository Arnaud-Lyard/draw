import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import Link from "next/link";
import {
  TrophyIcon,
  UserGroupIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

const features = [
  { key: "tournaments" as const, icon: TrophyIcon },
  { key: "teams" as const, icon: UserGroupIcon },
  { key: "calendar" as const, icon: CalendarDaysIcon },
];

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const translations = dict.home;

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            {translations.hero.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {translations.hero.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`/${lang}/register`}
              className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              {translations.hero.cta}
            </Link>
            <Link
              href={`/${lang}/login`}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {translations.hero.ctaSecondary} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {features.map((feature) => {
              const featureData = translations.features[feature.key];
              return (
                <div
                  key={feature.key}
                  className="relative rounded-2xl border border-gray-200 p-8 dark:border-white/10"
                >
                  <div className="flex items-center gap-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {featureData.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {featureData.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
