import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import ApplicationShell from "./ApplicationShell";

export default async function ApplicationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : "en";
  const dictionary = await getDictionary(locale);

  return (
    <ApplicationShell dict={dictionary} lang={lang}>
      {children}
    </ApplicationShell>
  );
}
