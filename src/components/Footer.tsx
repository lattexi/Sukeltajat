import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 text-white border-t border-blue-800/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Sukeltajat ry</h3>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Sukeltamista hyvässä seurassa jo vuodesta 1976
            </p>
            <p className="text-blue-300 text-sm">
              Scuba diving in a great team since 1976
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Sivut</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/yhdistys"
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-200 flex items-center group"
                >
                  <span>Seurasta</span>
                  <svg
                    className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200"
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
                </Link>
              </li>
              <li>
                <Link
                  href="/ms-maija"
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-200 flex items-center group"
                >
                  <span>MS Maija</span>
                  <svg
                    className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200"
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
                </Link>
              </li>
              <li>
                <Link
                  href="/kalenteri"
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-200 flex items-center group"
                >
                  <span>Kalenteri</span>
                  <svg
                    className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200"
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
                </Link>
              </li>
              <li>
                <Link
                  href="/yhteystiedot"
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-200 flex items-center group"
                >
                  <span>Yhteystiedot</span>
                  <svg
                    className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200"
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
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Yhteystiedot
            </h3>
            <div className="text-blue-200 text-sm space-y-2">
              <div className="flex items-start space-x-2">
                <svg
                  className="w-4 h-4 mt-0.5 text-blue-300"
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
                <div>
                  <p>Laivalahden venesatama</p>
                  <p>Simppukarinkatu 2</p>
                  <p>00810 Helsinki</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800/30 mt-12 pt-8 text-center text-sm text-blue-300">
          <p>&copy; {currentYear} Sukeltajat ry. Kaikki oikeudet pidätetään.</p>
        </div>
      </div>
    </footer>
  );
}
