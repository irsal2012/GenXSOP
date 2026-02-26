import api from './api'
import type { Inventory, UpdateInventoryRequest, PaginatedResponse } from '@/types'

export const inventoryService = {
  async getInventory(params?: { page?: number; page_size?: number; status?: string; product_id?: number }): Promise<PaginatedResponse<Inventory>> {
    const res = await api.get<PaginatedResponse<Inventory>>('/inventory', { params })
    return res.data
  },

  async getByProduct(productId: number): Promise<Inventory> {
    const res = await api.get<Inventory>(`/inventory/${productId}`)
    return res.data
  },

  async updateInventory(id: number, data: UpdateInventoryRequest): Promise<Inventory> {
    const res = await api.put<Inventory>(`/inventory/${id}`, data)
    return res.data
  },

  async getHealth() {
    const res = await api.get('/inventory/health')
    return res.data
  },

  async getAlerts() {
    const res = await api.get('/inventory/alerts')
    return res.data
  },
}
