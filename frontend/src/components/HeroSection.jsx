import { Button } from "./UI/button"

export function HeroSection() {
  return (
    <main className="flex items-center justify-between px-6 py-16 max-w-7xl mx-auto">
      {/* Left Content */}
      <div className="flex-1 max-w-2xl">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 text-balance">Welcome To ARTHUB</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, sint magni ut accusamus velit rerum veniam
          veritatis accusantium.
        </p>
        <div className="flex items-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
            Explore
          </Button>
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Join Now
          </Button>
        </div>
      </div>

      {/* Right Logo Graphic */}
      <div className="flex-1 flex justify-center items-center">
        <div className="relative w-80 h-80">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Main diamond shape */}
            <polygon points="100,20 160,80 100,140 40,80" fill="url(#heroGradient1)" className="drop-shadow-lg" />
            {/* Orange accent */}
            <polygon points="100,20 160,80 130,50" fill="url(#heroGradient2)" className="drop-shadow-md" />
            {/* Blue accent */}
            <polygon points="40,80 100,140 70,110" fill="url(#heroGradient3)" className="drop-shadow-md" />
            <defs>
              <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="heroGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
              <linearGradient id="heroGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </main>
  )
}
