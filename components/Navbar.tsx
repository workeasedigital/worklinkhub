export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <h1 className="text-2xl font-bold text-orange-500">
          WorkLinkHub
        </h1>

        <div className="flex gap-6">
          <a href="/">Home</a>
          <a href="/workers">Workers</a>
          <a href="/register">Join</a>
        </div>

      </div>
    </nav>
  );
}