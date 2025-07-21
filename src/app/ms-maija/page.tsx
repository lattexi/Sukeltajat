export const metadata = {
  title: "MS Maija - Sukeltajat ry",
  description:
    "MS Maija on Sukeltajat ry:n tukialus, joka on rakennettu vuonna 1980. Aluksessa on mahdollisuus yöpymiseen ja se on varustettu sukeltamiseen tarvittavilla laitteilla.",
};

export default function MSMaijaPage() {
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Tukialus
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            MS Maija
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Sukeltajat ry:n luotettava tukialus vuodesta 1997
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Perustiedot
            </h2>
            <div className="space-y-3 text-blue-100 mb-8">
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Rekisteritunnus:</span>
                <span>A-17966</span>
              </div>
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Kutsutunnus:</span>
                <span>OI5359</span>
              </div>
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">MMSI:</span>
                <span>230030370</span>
              </div>
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Rakennettu:</span>
                <span>Raahessa 1980</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Seuran käytössä:</span>
                <span>1997 alkaen</span>
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
                  d="M4 8V4a1 1 0 011-1h4m-5 8a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-4a2 2 0 00-2-2h-2"
                />
              </svg>
              Mitat
            </h2>
            <div className="space-y-3 text-blue-100">
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Pituus:</span>
                <span>15 m</span>
              </div>
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Leveys:</span>
                <span>4,9 m</span>
              </div>
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Syväys:</span>
                <span>2 m</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Paino:</span>
                <span>23 NT</span>
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Tekniset tiedot
            </h2>
            <div className="space-y-3 text-blue-100 mb-8">
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Moottori:</span>
                <span>Volvo TD100A 280 hp</span>
              </div>
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Vaihde:</span>
                <span>ZF302IV (ratio 1,651)</span>
              </div>
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Bunkkeri:</span>
                <span>Diesel 1600 ltr + 80 ltr</span>
              </div>
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Vesisäiliö:</span>
                <span>800 ltr</span>
              </div>
              <div className="flex justify-between border-b border-blue-400/20 pb-2">
                <span className="font-medium">Kulutus:</span>
                <span>Keskimäärin 2 l/meripeninkulma</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Makuupaikat:</span>
                <span>6 + 4</span>
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Varusteet
            </h2>
            <div className="space-y-3 text-blue-100">
              <div className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Navigointijärjestelmä Simrad NSO Offshore</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Tutka Simrad Broadband 4G</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Viistokaikuluotain Simrad StructureScanHD</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>DNA 4G internet, WLAN</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Sauna</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Kompressori Seemann Sub 240 ltr/min</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>
                  Käytettävissä: paineilma, nitrox, trimix, happi, argon
                </span>
              </div>
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Laituripaikka
          </h2>
          <div className="text-blue-100">
            <div className="mb-4 p-4 bg-white/5 rounded-lg border border-blue-400/20">
              <p className="font-medium text-white mb-2">Osoite:</p>
              <p>Laivalahden venesatama, Simppukarinkatu 2, 00810 Helsinki</p>
            </div>
            <p className="leading-relaxed">
              MS Maija on ankkuroituneena Herttoniemen Laivalahden
              satama-alueella. Reissupäivät ovat perinteisesti torstai, lauantai
              ja sunnuntai.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
