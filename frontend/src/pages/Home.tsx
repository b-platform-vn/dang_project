function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      
      {/* Tiêu đề chính */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 tracking-tight mb-8">
        Welcome to Full Stack App
      </h1>

      {/* Khối hiển thị Tech Stack */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-100">
          Tech Stack
        </h2>
        
        <ul className="text-left space-y-4 text-gray-600 text-lg ml-2">
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <strong>Frontend:</strong> React + TypeScript + Vite
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <strong>Backend:</strong> NestJS + TypeScript
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <strong>Database:</strong> Microsoft SQL Server
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <strong>ORM:</strong> TypeORM
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            <strong>Containerization:</strong> Docker
          </li>
        </ul>
      </div>

    </div>
  )
}

export default Home