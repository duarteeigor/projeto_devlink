
export function NotFound() {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Página não encontrada!</h2>
          <p className="text-gray-600 mb-6">A rota que você tentou acessar não existe.</p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Voltar para o início
          </a>
        </div>
      </div>
    );
  }
  