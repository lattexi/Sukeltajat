export const metadata = {
  title: "Yhteystiedot - Sukeltajat ry",
  description:
    "Sukeltajat ry:n yhteystiedot. MS Maijan sijainti Herttoniemen Laivalahden satamassa.",
};

export default function YhteystiedotPage() {
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
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Yhteystiedot
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Yhteystiedot
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Ota yhteyttä ja löydä meidät syvyyksistä
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              MS Maijan sijainti
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8 border border-blue-400/20">
              <div className="space-y-3 text-blue-100">
                <p className="font-medium text-white">Osoite:</p>
                <div className="pl-4 border-l-2 border-blue-400/30">
                  <p>Laivalahden venesatama</p>
                  <p>Simppukarinkatu 2</p>
                  <p>00810 Helsinki</p>
                </div>
              </div>
            </div>

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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Yhdistyksen tiedot
            </h2>
            <div className="space-y-3 text-blue-100">
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Nimi:</span>
                <span>Sukeltajat ry</span>
              </div>
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Perustettu:</span>
                <span>1976</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Jäsen:</span>
                <span>Suomen Sukeltajaliitto</span>
              </div>
            </div>
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Ota yhteyttä
            </h2>
            <div className="space-y-6 text-blue-100">
              <p className="leading-relaxed">
                Kiinnostaako seuran toiminta? Ota yhteyttä seuran hallituksen
                jäseniin tai täytä jäsenyyttä koskeva lomake.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:info@sukeltajat.fi"
                  className="inline-flex items-center px-6 py-3 bg-blue-600/80 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-blue-500/80 transition-all duration-200 group border border-blue-400/30"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Lähetä sähköpostia
                </a>

                <div>
                  <a
                    href="https://www.facebook.com/groups/sukeltajat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-blue-100 font-medium rounded-xl hover:bg-white/20 transition-all duration-200 group border border-blue-400/30"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook-ryhmä
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
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
                  </a>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mb-6 mt-8 flex items-center">
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
              Reissut
            </h2>
            <div className="text-blue-100 space-y-4">
              <p className="leading-relaxed">
                Reissupäivät ovat perinteisesti torstai, lauantai ja sunnuntai.
                Tarkemmat tiedot reissuista löydät kalenterista.
              </p>
              <p className="leading-relaxed">
                Seuran reissuille pääsee mukaan myös ulkopuoliset sukeltajat.
                Ilmoittautumiset tapahtuvat Nimenhuuto-palvelussa.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-blue-600/20 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-blue-400/30 shadow-2xl">
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
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Löydä meidät kartalta
          </h2>
          <div className="text-blue-100 space-y-4">
            <p className="leading-relaxed">
              MS Maija sijaitsee Herttoniemen Laivalahden satama-alueella.
              Satamaan pääsee helposti julkisilla kulkuneuvoilla tai autolla.
            </p>
            <p className="text-blue-200">
              Tarkemmat opasteet satamaan löydät Helsingin kaupungin
              verkkosivuilta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
