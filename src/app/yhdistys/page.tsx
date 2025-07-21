export const metadata = {
  title: "Yhdistys - Sukeltajat ry",
  description:
    "Sukeltajat ry on vuonna 1976 perustettu sukeltajaseura Helsingistä. Tutkimme hylkyjä Suomenlahdella.",
};

export default function YhdistysPage() {
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Sukeltajat ry
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Yhdistys
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Sukeltamista hyvässä seurassa jo vuodesta 1976
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-blue-400/20 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-3 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Historia
            </h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Sukeltajat ry on perustettu 1976 aktiivisten sukeltajien
              suosiollisella avustuksella tarkoituksena etsiä ja tutkia
              mahdollisimman monia hylkyjä Suomenlahdella ja Saaristomerellä.
              Tietysti asiaan on kuulunut myös ulkomaiset kohteet sekä Suomen
              sisävedet ja kaivokset.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-3 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Toiminta
            </h2>
            <p className="text-blue-100 leading-relaxed">
              Seuran toiminta pyörii kesäisin tukialuksen ympärillä ja talvisin
              tehdään reissuja kaivoksiin ja mahdollisuuksien mukaan myös
              rannikkovesille jäiden alle. Lisäksi talvella on kerhoiltoja,
              joissa yleensä jokin merellinen tai sukelluksellinen teema.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-blue-400/20 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-3 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Reissut vesille
            </h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              MS Maija on Herttoniemenrannassa, Laivalahden satama-alueella ja
              reissupäivät ovat perinteisesti olleet torstai, lauantai ja
              sunnuntai. Seuran reissuille pääsee mukaan myös ulkopuoliset
              sukeltajat.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-3 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              Tutkimustoiminta
            </h2>
            <p className="text-blue-100 leading-relaxed">
              Seura on mukana meriarkeologisessa kenttätoiminnassa ja
              osallistunut useiden tahojen kanssa moninaisiin tutkimuksiin.
              Tutkimme aktiivisesti hylkyjä Suomenlahdella ja dokumentoimme
              löydöksiä.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
