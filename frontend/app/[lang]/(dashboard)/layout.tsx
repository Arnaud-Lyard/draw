import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import DashboardShell from "./DashboardShell";

export default async function DashboardLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : "en";
  const dictionary = await getDictionary(locale);

  return (
    <DashboardShell dict={dictionary} lang={lang}>
      {children}
    </DashboardShell>
  );
}
