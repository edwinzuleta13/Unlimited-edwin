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
  href?: string; // <<---- URL para redirección
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
  href, // <- URL para redirección
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
          ? hoverColor || "rgba(147,51,234,0.2)"
          : bgColor || "rgba(124,58,237,0.12)",
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        border: isHovered
          ? "2px solid #A855F7"
          : "2px solid #9167F1",
        boxShadow: isHovered
          ? "0 0 40px 8px rgba(168,85,247,0.6), 0 20px 40px -10px rgba(147,51,234,0.4)"
          : "0 0 12px 2px rgba(145,103,241,0.5), 0 8px 16px -4px rgba(124,58,237,0.3)",
        transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transition:
          "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isHovered
            ? "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(147,51,234,0.05) 100%)"
            : "transparent",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none",
          zIndex: 0,
        },
        ...sx,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardActionArea
        style={{ position: "relative", zIndex: 1 }}
        onClick={() => {
          if (href) {
            window.open(href, '_blank', 'noopener,noreferrer');
          }
        }}
      >
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
