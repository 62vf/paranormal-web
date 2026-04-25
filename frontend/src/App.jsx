import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cases from './pages/Cases'
import CaseDetails from './pages/CaseDetails'
import SubmitReport from './pages/SubmitReport'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

const App = () => (
  <div className="relative min-h-screen overflow-x-hidden">
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-ghost/8 blur-lg" />
      <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-arcane/8 blur-lg" />
      <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-blood/8 blur-lg" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.03),transparent_26%),radial-gradient(circle_at_80%_40%,rgba(103,232,249,0.08),transparent_30%)]" />
    </div>

    <Navbar />
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:kind/:id" element={<CaseDetails />} />
          <Route
            path="/submit-report"
            element={
              <ProtectedRoute>
                <SubmitReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </main>
    <Footer />
  </div>
)

export default App
