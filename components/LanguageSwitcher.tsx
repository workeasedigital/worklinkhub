"use client";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const {
    language,
    setLanguage,
  } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) =>
        setLanguage(
          e.target.value as
            | "en"
            | "te"
            | "hi"
        )
      }
      className="bg-gray-800 text-white px-3 py-2 rounded"
    >
      <option value="en">
        English
      </option>

      <option value="te">
        తెలుగు
      </option>

      <option value="hi">
        हिन्दी
      </option>
    </select>
  );
}