import categoriesData from '@/data/categoriesData.json'
import productsData from '@/data/demoData.json'

const API_BASE_URL =
  'https://coffeemanagement-be-dhdzdwcfgta2a2hw.brazilsouth-01.azurewebsites.net'

export const fetchCategories = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/ProductCategories/full`
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    // Si no hay error pero los datos están vacíos, usar fallback del JSON local
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('Datos vacíos de categorías desde API, usando fallback')
      return categoriesData.items || []
    }
    return data
  } catch (error) {
    console.warn('Error al obtener categorías desde API, usando fallback:', error)
    // Fallback a JSON local
    return categoriesData.items || []
  }
}

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/Products/full`)
    console.log("response de fetch products", response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    // Si no hay error pero los datos están vacíos, usar fallback del JSON local
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('Datos vacíos de productos desde API, usando fallback')
      return productsData.items || []
    }
    return data
  } catch (error) {
    console.warn('Error al obtener productos desde API, usando fallback:', error)
    // Fallback a JSON local
    return productsData.items || []
  }
}

export const fetchAllData = async () => {
  try {
    // Intentar obtener categorías y productos desde la API
    let [categories, products] = await Promise.all([
      fetchCategories(),
      fetchProducts(),
    ])

    // Si alguna de las respuestas queda vacía, cargarla desde el JSON local
    if (!Array.isArray(categories) || categories.length === 0) {
      categories = categoriesData.items || []
      console.warn('Fallback de categorías aplicado en fetchAllData')
    }
    if (!Array.isArray(products) || products.length === 0) {
      products = productsData.items || []
      console.warn('Fallback de productos aplicado en fetchAllData')
    }

    return { categories, products }
  } catch (error) {
    console.warn('Error al obtener datos desde API, usando fallback:', error)
    // Fallback a JSON local
    return {
      categories: categoriesData.items || [],
      products: productsData.items || [],
    }
  }
}

export const fetchProductDetails = async (id: string) => {
  if (!id) {
    throw new Error('El ID del producto es requerido')
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/Products/${id}`)
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

