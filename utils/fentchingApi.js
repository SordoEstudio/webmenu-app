/* const API_BASE_URL = 'https://coffeemanagement-be-dhdzdwcfgta2a2hw.brazilsouth-01.azurewebsites.net'; */

export const fetchCategories = async () => {
  try {
    const response = await fetch(
      `https://coffeemanagement-be-dhdzdwcfgta2a2hw.brazilsouth-01.azurewebsites.net/api/v1/ProductCategories/full`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};
export const fetchProductDetails = async (id) => {
  if (!id) {
    throw new Error("El ID del producto es requerido");
  }
  try {
    const response = await fetch(
      `https://coffeemanagement-be-dhdzdwcfgta2a2hw.brazilsouth-01.azurewebsites.net/api/v1/Products/${id}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
/*     console.log("data", data);
 */    if (!data) {
      throw new Error("Producto no encontrado");
    }
    return data;
  } catch (error) {
    console.error("Error al obtener el detalle del producto:", error);
    throw error;
  }
};

export const fetchAllData = async () => {
  try {
    /* /api/v1/ProductCategories/full  */   
    const response = await fetch("https://coffeemanagement-be-dhdzdwcfgta2a2hw.brazilsouth-01.azurewebsites.net/api/v1/Products/full");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

export const fetchPlanConfig = async () => {
  try {
    const response = await fetch("http://localhost:3001/Plan");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la configuración del plan:", error);
    throw error;
  }
};
/* export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}; */

export const fetchThemeConfig = async () => {
  try {
    const response = await fetch("http://localhost:3001/BrandConfig");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la configuración del tema:", error);
    // Retornar la configuración por defecto en caso de error
    return defaultThemeConfig;
  }
};
export const fetchSocialLinks = async () => {
  try {
    const response = await fetch("http://localhost:3001/SocialLinks");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los enlaces de redes sociales:", error);
    throw error;
  }
};
// Configuración por defecto como fallback
const defaultThemeConfig = {
  baseColor: "#e00c0b",
  primary: {
    contrastText: "#ffffff",
    light: 0.2,
    ultraLight: 0.75,
    dark: 0.2
  },
  secondary: {
    main: "#4CAF50"
  },
  background: {
    default: "#f5f5f5",
    dark: "#121212"
  },
  socialMedia: {
    main: "#ffffff"
  },
  typographyColor: {
    white: "#fafafa",
    black: "#1a1a1a"
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif"
  },
  logo: "/logo.png",
  logoHeader: "/logo.png",
  defaultImage: "/logo.jpg"
};
