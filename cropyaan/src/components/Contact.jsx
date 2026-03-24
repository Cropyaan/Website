import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <section className="min-h-screen dark:bg-[var(--bg-main)] text-slate-900 dark:text-white px-6 lg:px-20 py-24 flex items-center">
      <div className="max-w-5xl w-full mx-auto">

        {/* Heading */}
        <h1 className="text-4xl lg:text-5xl font-semibold mb-6 tracking-tight">
          {t("contact.title")}
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mb-12 leading-relaxed">
          {t("contact.subtitle")}
        </p>

        {/* Card */}
        <div className="bg-white dark:bg-white dark:bg-[var(--bg-main)] border border-[var(--overlay-10)] dark:border-[var(--overlay-10)] rounded-2xl p-8 lg:p-10 shadow-lg backdrop-blur-sm">
          <div className="space-y-6">
            {/* Email */}
            <div>
              <p className="text-sm text-slate-500 dark:text-gray-500 mb-1">{t("contact.email_label")}</p>
              <a
                href="mailto:connect@cropyaan.com"
                className="text-lg text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition"
              >
                connect@cropyaan.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}