import { Button } from "./UI/button"

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,10 80,40 50,70 20,40" fill="url(#logoGradient)" />
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="text-xl font-bold text-gray-900">ARTHUB</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
          COMMUNITY
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
          ART
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
          ABOUT
        </a>
      </nav>

      {/* User Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
          Visitor
        </Button>
        <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
          Artist
        </Button>
        <Button variant="outline" size="sm">
          Login
        </Button>
        <Button variant="outline" size="sm">
          Register
        </Button>
      </div>
    </header>
  )
}
