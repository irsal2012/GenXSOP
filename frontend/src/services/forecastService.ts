import api from './api'
import type { Forecast, GenerateForecastRequest, ForecastAccuracy, PaginatedResponse } from '@/types'

export const forecastService = {
  async generateForecast(data: GenerateForecastRequest): Promise<Forecast[]> {
    const res = await api.post<Forecast[]>('/forecasting/generate', data)
    return res.data
  },

  async getResults(params?: { product_id?: number; model_type?: string; page?: number; page_size?: number }): Promise<PaginatedResponse<Forecast>> {
    const res = await api.get<PaginatedResponse<Forecast>>('/forecasting/results', { params })
    return res.data
  },

  async getResult(id: number): Promise<Forecast> {
    const res = await api.get<Forecast>(`/forecasting/results/${id}`)
    return res.data
  },

  async getModels() {
    const res = await api.get('/forecasting/models')
    return res.data
  },

  async getAccuracy(params?: { product_id?: number; model_type?: string }): Promise<ForecastAccuracy[]> {
    const res = await api.get<ForecastAccuracy[]>('/forecasting/accuracy', { params })
    return res.data
  },

  async detectAnomalies(productId: number) {
    const res = await api.post('/forecasting/anomalies/detect', { product_id: productId })
    return res.data
  },

  async getAnomalies(params?: { product_id?: number }) {
    const res = await api.get('/forecasting/anomalies', { params })
    return res.data
  },
}
