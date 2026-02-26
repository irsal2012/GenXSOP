import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppLayout } from '@/components/layout/AppLayout'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { useAuthStore } from '@/store/authStore'

// Lazy-loaded pages
const LoginPage      = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })))
const DashboardPage  = lazy(() => import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const DemandPage     = lazy(() => import('@/pages/DemandPage').then((m) => ({ default: m.DemandPage })))
const SupplyPage     = lazy(() => import('@/pages/SupplyPage').then((m) => ({ default: m.SupplyPage })))
const InventoryPage  = lazy(() => import('@/pages/InventoryPage').then((m) => ({ default: m.InventoryPage })))
const ForecastingPage = lazy(() => import('@/pages/ForecastingPage').then((m) => ({ default: m.ForecastingPage })))
const ScenariosPage  = lazy(() => import('@/pages/ScenariosPage').then((m) => ({ default: m.ScenariosPage })))
const SOPCyclePage   = lazy(() => import('@/pages/SOPCyclePage').then((m) => ({ default: m.SOPCyclePage })))
const KPIPage        = lazy(() => import('@/pages/KPIPage').then((m) => ({ default: m.KPIPage })))
const ProductsPage   = lazy(() => import('@/pages/ProductsPage').then((m) => ({ default: m.ProductsPage })))
const SettingsPage   = lazy(() => import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })))

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <LoadingSpinner size="lg" message="Loading..." />
    </div>
  )
}

export function App() {
  const { fetchMe, isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Restore session on app load
    if (!isAuthenticated) {
      fetchMe()
    }
  }, [])

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: '13px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/demand" element={<DemandPage />} />
            <Route path="/supply" element={<SupplyPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/forecasting" element={<ForecastingPage />} />
            <Route path="/scenarios" element={<ScenariosPage />} />
            <Route path="/sop-cycle" element={<SOPCyclePage />} />
            <Route path="/kpi" element={<KPIPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
