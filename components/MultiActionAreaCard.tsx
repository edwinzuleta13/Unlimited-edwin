import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Image from "next/image";

export interface MultiActionAreaCardProps {
  title?: string;
  description?: string;
  image?: string;
  alt?: string;
  maxWidth?: number;
  children?: React.ReactNode;
  sx?: any;

  pexelsId?: string;
  pexelsQuery?: string;
  perPage?: number;

  imageHeight?: number | string;
  imageFit?: "cover" | "contain" | "fill";
  imageBorderRadius?: number | string;
  imagePaddingTop?: number | string;
  imagePadding?: number | string;
  bgColor?: string;

  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
  hoverColor?: string;
  innerPadding?: number | string;
  innerPaddingTop?: number | string;
  circular?: boolean;
  textColorHover?: string; // <<---- NUEVO
}

const MultiActionAreaCard: React.FC<MultiActionAreaCardProps> = ({
  title = "Lizard",
  description = "Lizards are a widespread group of squamate reptiles...",
  image = "/static/images/cards/contemplative-reptile.jpg",
  alt = "image",
  maxWidth = 345,
  children,
  sx,
  pexelsId,
  pexelsQuery,
  perPage = 1,
  imageHeight = 140,
  imageFit = "cover",
  imageBorderRadius = 0,
  imagePaddingTop = 0,
  imagePadding = 0,
  bgColor,
  titleClassName,
  descriptionClassName,
  className,
  hoverColor,
  innerPadding,
  innerPaddingTop,
  textColorHover,
  circular = false, // <- aquí lo desestructuramos y le damos default false
}) => {

  const [remoteImage, setRemoteImage] = useState<string | null>(null);
  const [loadingRemote, setLoadingRemote] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // FETCH PEXELS
  useEffect(() => {
    let mounted = true;

    const fetchFromServer = async () => {
      if (!pexelsId && !pexelsQuery) return;

      setLoadingRemote(true);

      try {
        let endpoint = "/api/pexels-media?type=image&per_page=" + perPage;

        if (pexelsId)
          endpoint = `/api/pexels-media?id=${encodeURIComponent(
            pexelsId
          )}&type=image`;
        else if (pexelsQuery)
          endpoint = `/api/pexels-media?query=${encodeURIComponent(
            pexelsQuery
          )}&type=image&per_page=${perPage}`;

        const res = await fetch(endpoint);
        if (!mounted) return;

        const data = await res.json();
        if (data?.media?.src) setRemoteImage(data.media.src);
        else if (Array.isArray(data.media)) setRemoteImage(data.media[0]?.src);
      } catch (err) {
        console.error(err);
      } finally {
        mounted && setLoadingRemote(false);
      }
    };

    fetchFromServer();
    return () => {
      mounted = false;
    };
  }, [pexelsId, pexelsQuery, perPage]);

  const usedImage = remoteImage || image;

  return (
    <Card
      className={className}
      sx={{
        maxWidth,
        backgroundColor: isHovered
          ? hoverColor || bgColor
          : bgColor || "rgba(124,58,237,0.12)",
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        border: "2px solid #9167F1",
        boxShadow: isHovered
          ? "0 0 26px 6px #A47BFF80"
          : "0 0 12px 2px #9167F180",
        transform: isHovered ? "scale(1.03)" : "scale(1)",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
        cursor: "pointer",
        ...sx,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardActionArea style={{ position: "relative", zIndex: 1 }}>
<div
  style={{
    position: "relative",
    width: "100%",
    height: typeof imageHeight === "number" ? `${imageHeight}px` : imageHeight,
    overflow: "hidden", // necesario para recortar
    padding: typeof imagePadding === "number" ? `${imagePadding}px` : imagePadding,
    marginTop: typeof imagePaddingTop === "number" ? `${imagePaddingTop}px` : imagePaddingTop,
    borderRadius: circular ? "50%" : imageBorderRadius ?? 0, // redondeo total si es circular
    aspectRatio: circular ? "1 / 1" : undefined, // fuerza cuadrado si es circular
  }}
>
  <Image
    src={usedImage}
    alt={alt}
    fill
    priority
    style={{
      objectFit: imageFit,
    }}
  />
</div>

        <CardContent
          style={{
            padding: innerPadding ?? 16,
            paddingTop: innerPaddingTop ?? innerPadding ?? 16,
            color: isHovered ? textColorHover : "white", // <<--- APLICA EL COLOR AQUÍ
            transition: "color 0.3s ease",
          }}
        >
          <h3
            className={
              titleClassName || "text-xl font-semibold text-center"
            }
            style={{
              color: isHovered ? textColorHover : "white", // <<---
            }}
          >
            {title}
          </h3>

          <p
            className={
              descriptionClassName ||
              "mt-3 text-sm text-center"
            }
            style={{
              color: isHovered ? textColorHover : "white", // <<---
            }}
          >
            {description}
          </p>

          {children}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MultiActionAreaCard;
