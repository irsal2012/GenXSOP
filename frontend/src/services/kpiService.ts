import api from './api'
import type { KPIMetric, CreateKPIRequest, PaginatedResponse } from '@/types'

export const kpiService = {
  async getMetrics(params?: { page?: number; page_size?: number; category?: string; period?: string }): Promise<PaginatedResponse<KPIMetric>> {
    const res = await api.get<PaginatedResponse<KPIMetric>>('/kpi/metrics', { params })
    return res.data
  },

  async getMetric(name: string): Promise<KPIMetric[]> {
    const res = await api.get<KPIMetric[]>(`/kpi/metrics/${name}`)
    return res.data
  },

  async createMetric(data: CreateKPIRequest): Promise<KPIMetric> {
    const res = await api.post<KPIMetric>('/kpi/metrics', data)
    return res.data
  },

  async getDashboard() {
    const res = await api.get('/kpi/dashboard')
    return res.data
  },

  async getTrends(params?: { category?: string; months?: number }) {
    const res = await api.get('/kpi/trends', { params })
    return res.data
  },

  async getAlerts() {
    const res = await api.get('/kpi/alerts')
    return res.data
  },

  async getSummary() {
    const res = await api.get('/kpi/summary')
    return res.data
  },
}
