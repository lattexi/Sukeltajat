import Link from "next/link";

export const metadata = {
  title: "Uutiset - Sukeltajat ry",
  description:
    "Sukeltajat ry:n uutiset ja ajankohtaiset kuulumiset sukeltamisesta ja seuran toiminnasta.",
};

export default function UutisetPage() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100/10 backdrop-blur-sm text-blue-100 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-blue-400/20">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            Uutisarkisto
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Uutiset
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Sukeltajat ry:n ajankohtaiset kuulumiset ja uutiset syvyyksistä
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {years.map((year) => (
            <Link
              key={year}
              href={`/uutiset/${year}`}
              className="group bg-white/10 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center border border-blue-400/20 hover:border-blue-300/40 hover:bg-white/15 hover:scale-105"
            >
              <div className="text-3xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                {year}
              </div>
              <div className="text-sm text-blue-200 group-hover:text-blue-100 transition-colors">
                Vuoden uutiset
              </div>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 mx-auto text-blue-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-blue-600/80 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-blue-500/80 transition-all duration-200 group border border-blue-400/30"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Takaisin etusivulle
          </Link>
        </div>
      </div>
    </div>
  );
}
