import { getApiBaseUrl } from './tenant'

// Obtener API Base URL (variable de entorno con fallback)
const getApiBaseUrlValue = () => {
  return getApiBaseUrl()
}

// Headers comunes para todas las llamadas a la API
// El coffeeShopId se pasa como parámetro desde el contexto del tenant
const getHeaders = (coffeeShopId: string): HeadersInit => ({
  'coffeeShopId': coffeeShopId,
  'Content-Type': 'application/json',
}) 
export const fetchCategories = async (coffeeShopId: string, apiBaseUrl?: string) => {
  try {
    const baseUrl = apiBaseUrl || getApiBaseUrlValue()
    const response = await fetch(
      `${baseUrl}/api/v1/ProductCategories`,
      {
        headers: getHeaders(coffeeShopId),
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    } 
    const data = await response.json()
    console.log("data de fetch categories", data);

    return data
  } catch (error) {
    console.warn('Error al obtener categorías desde API:', error)
    throw error
  }
}

export const fetchProducts = async (coffeeShopId: string, apiBaseUrl?: string) => {
  try {
    const baseUrl = apiBaseUrl || getApiBaseUrlValue()
    const response = await fetch(`${baseUrl}/api/v1/Products/Full`, {
      headers: getHeaders(coffeeShopId),
    })
    console.log("response de fetch products", response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    return data
  } catch (error) {
    console.warn('Error al obtener productos desde API:', error)
    throw error
  }
}

export const fetchAllData = async (coffeeShopId: string, apiBaseUrl?: string) => {
  try {
    // Intentar obtener categorías y productos desde la API
    let [categories, products] = await Promise.all([
      fetchCategories(coffeeShopId, apiBaseUrl),
      fetchProducts(coffeeShopId, apiBaseUrl),
    ])


    return { categories, products }
  } catch (error) {
    console.warn('Error al obtener datos desde API, usando fallback:', error)
    throw error
  }
}

export const fetchProductDetails = async (id: string, coffeeShopId: string, apiBaseUrl?: string) => {
  if (!id) {
    throw new Error('El ID del producto es requerido')
  }
  try {
    const baseUrl = apiBaseUrl || getApiBaseUrlValue()
    const response = await fetch(`${baseUrl}/api/v1/Products/${id}`, {
      headers: getHeaders(coffeeShopId),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    // Si no hay error pero los datos están vacíos o nulos, lanzar el error igual
    if (!data || Object.keys(data).length === 0) {
      throw new Error('Producto no encontrado (respuesta vacía)')
    }
    return data
  } catch (error) {
    console.error('Error al obtener el detalle del producto:', error)
    throw error
  }
}

