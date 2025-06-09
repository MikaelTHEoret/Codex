'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Activity, Users, FileText, BarChart3, Settings, Home, Brain, Zap, Database } from 'lucide-react'

export default function Dashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeUsers: 89,
    totalPosts: 3421,
    engagement: 68
  })

  // Synthwave glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      const glowElements = document.querySelectorAll('.synthwave-glow')
      glowElements.forEach(el => {
        el.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px rgba(255, 0, 255, 0.5), 0 0 ${Math.random() * 40 + 20}px rgba(0, 255, 255, 0.3)`
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-grid-cyan-500/[0.2] bg-[size:50px_50px] animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-cyan-500/30 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              size="sm"
              className="synthwave-glow border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              RETURN TO NEXUS
            </Button>
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-magenta-400" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                  NEXUS COMMAND CENTER
                </h1>
                <p className="text-cyan-300/70 text-sm">Enhanced Mastermind Intelligence Protocol</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-green-500 text-green-400 synthwave-glow">
              ONLINE
            </Badge>
            <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="synthwave-glow bg-black/40 border-cyan-500/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-300">Neural Networks</CardTitle>
              <Users className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-100">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-cyan-400/70">+180 from last cycle</p>
            </CardContent>
          </Card>

          <Card className="synthwave-glow bg-black/40 border-magenta-500/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-magenta-300">Active Processes</CardTitle>
              <Activity className="h-4 w-4 text-magenta-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-magenta-100">{stats.activeUsers}</div>
              <p className="text-xs text-magenta-400/70">+20% efficiency</p>
            </CardContent>
          </Card>

          <Card className="synthwave-glow bg-black/40 border-purple-500/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">Data Fragments</CardTitle>
              <FileText className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-100">{stats.totalPosts.toLocaleString()}</div>
              <p className="text-xs text-purple-400/70">+12% from last scan</p>
            </CardContent>
          </Card>

          <Card className="synthwave-glow bg-black/40 border-green-500/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-300">System Harmony</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-100">{stats.engagement}%</div>
              <p className="text-xs text-green-400/70">Optimal resonance</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Status */}
          <Card className="lg:col-span-2 synthwave-glow bg-black/40 border-cyan-500/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>NEURAL ACTIVITY MATRIX</span>
              </CardTitle>
              <CardDescription className="text-cyan-400/70">
                Real-time consciousness harmonics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Alpha Wave Processing', 'Beta Pattern Recognition', 'Gamma State Synthesis', 'Delta Deep Learning'].map((process, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-500/30">
                  <span className="text-cyan-200">{process}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-black/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-magenta-400 rounded-full animate-pulse"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      />
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                      ACTIVE
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="synthwave-glow bg-black/40 border-magenta-500/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-magenta-300 flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>COMMAND PROTOCOLS</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Initialize Deep Scan', color: 'cyan' },
                { label: 'Execute Pattern Analysis', color: 'magenta' },
                { label: 'Harmonize Frequencies', color: 'purple' },
                { label: 'Sync Neural Networks', color: 'green' }
              ].map((action, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className={`w-full justify-start border-${action.color}-500 text-${action.color}-400 hover:bg-${action.color}-500/20 transition-all duration-300 synthwave-glow`}
                >
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="synthwave-glow bg-black/40 border-purple-500/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-300">RECENT NEURAL PATHWAYS</CardTitle>
            <CardDescription className="text-purple-400/70">
              Latest consciousness interfacing events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                'Fractal pattern recognition enhanced - 432Hz resonance detected',
                'Neural pathway optimization complete - 15% efficiency gain',
                'Consciousness bridge established - User interface synchronized',
                'Harmonic frequency calibration successful - Golden ratio achieved'
              ].map((activity, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-purple-200 text-sm">{activity}</span>
                  <span className="text-purple-400/50 text-xs ml-auto">
                    {Math.floor(Math.random() * 60)} min ago
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .bg-grid-cyan-500\\/\\[0\\.2\\] {
          background-image: linear-gradient(cyan 1px, transparent 1px),
                            linear-gradient(90deg, cyan 1px, transparent 1px);
        }
        
        .synthwave-glow {
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}
