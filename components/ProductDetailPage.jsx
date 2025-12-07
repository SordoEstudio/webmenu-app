import React, { useEffect, useState } from "react";
import ProductDetailComponent from "@/components/ProductDetailComponent";
import { Box, LinearProgress } from "@mui/material";
import { useParams } from "next/navigation";
import { useMenu } from "@/context/MenuContext";
import { logger } from "@/utils/logger";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { products } = useMenu();

  useEffect(() => {
    const findProduct = () => {
      try {
        let foundProduct = null;

        // Buscar el producto en todas las categorías
        allData.items.some((category) =>
          category.products.some((product) => {
            if (product.id === productId) {
              foundProduct = product;
              return true; // Detiene la búsqueda una vez encontrado
            }
            return false;
          })
        );

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Producto no encontrado");
        }
      } catch (err) {
        logger.error("Error buscando el producto:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (products && products.length > 0) {
      findProduct();
    }
  }, [productId, products]);



  if (loading) {
    return (
      <Box sx={{ width: "100%", mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
     <Box>

      <ProductDetailComponent product={product} />
    </Box> 
  );
}
