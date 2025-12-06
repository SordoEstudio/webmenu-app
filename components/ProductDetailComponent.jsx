"use client";

import React, { useState } from "react";
import { Box, Typography, useTheme, Avatar } from "@mui/material";
import { formatPrice } from "../utils/formatters";
import ImageModal from "@/components/ImageModal";
const ProductDetailComponent = ({ product }) => {
  /*    product =product?product:productData; */
  const theme = useTheme();

  // Manejo de variantes (si existen)
  const initialVariant =
    product.variants && product.variants.length > 0
      ? product.variants[0]?.variantsOptions?.find((option) => option.default)
      : null;

  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [currentPrice, setCurrentPrice] = useState(
    selectedVariant === null ? product.price : selectedVariant.price
  );

  // Validar URL de imagen
  const isValidImageUrl = (url) => {
    return url && (url.startsWith("http") || url.startsWith("/"));
  };

  const imageUrl = isValidImageUrl(product.image)
    ? product.image
    : theme.extras?.defaultImage;

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setCurrentPrice(variant.price);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Imagen del producto */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 300, sm: 400, md: 500 },
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "grey.100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isValidImageUrl(imageUrl) && (
          <img
            src={imageUrl}
            alt={product.name}
            style={{ objectFit: "contain" }}
            onClick={handleOpenModal}
          />
        )}
      </Box>

      {/* Nombre y precio */}
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            mb: 1,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", flex: 1 }}>
            {product.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            {product.currency || "$"} {formatPrice(currentPrice)}
          </Typography>
        </Box>

        {/* Subtítulo */}
        {product.subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {product.subtitle}
          </Typography>
        )}

        {/* Opciones de tamaño/variantes */}
        {product.variants &&
          product.variants.length > 0 &&
          product.variants[0]?.variantsOptions && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: "medium" }}>
                Tamaño:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {product.variants[0].variantsOptions.map((variant, index) => (
                  <Box
                    key={index}
                    onClick={() => handleVariantChange(variant)}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      border: 2,
                      borderColor:
                        selectedVariant?.id === variant.id
                          ? "primary.main"
                          : "grey.300",
                      bgcolor:
                        selectedVariant?.id === variant.id
                          ? "primary.light"
                          : "transparent",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: "primary.light",
                      },
                    }}
                  >
                    <Typography variant="body2">
                      {variant.name || variant.title} -{" "}
                      {product.currency || "$"} {formatPrice(variant.price)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

        {/* Descripción o detalles */}
        {product.details && (
          <Typography variant="body1" sx={{ mt: 2, whiteSpace: "pre-line" }}>
            {product.details}
          </Typography>
        )}

        {/* Información adicional */}
        {product.additionalInfo && product.additionalInfo.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {product.additionalInfo.map((info, index) => (
              <Typography
                key={index}
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                • {info}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
      <ImageModal
        open={isModalOpen}
        onClose={handleCloseModal}
        image={imageUrl}
        onError={(e) => {
          e.target.onerror = null; // Evita un bucle infinito si la imagen de reemplazo también falla
          e.target.src = theme.extras.defaultImage; // Carga la imagen por defecto
        }}
        description={product.name}
      />
    </Box>
  );
};

export default ProductDetailComponent;
