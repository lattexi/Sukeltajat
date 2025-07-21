import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Sivua ei löytynyt
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          Hakemaasi sivua ei löytynyt. Se on ehkä siirretty tai poistettu.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Takaisin etusivulle
          </Link>

          <Link
            href="/uutiset"
            className="block w-full px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Selaa uutisia
          </Link>
        </div>
      </div>
    </div>
  );
}
