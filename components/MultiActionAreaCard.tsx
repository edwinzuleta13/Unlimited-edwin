import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'


export type CardAction = {
  label: string
  onClick?: () => void
  href?: string
  color?: 'primary' | 'secondary' | 'inherit' | 'success' | 'error' | 'info' | 'warning'
}

export interface MultiActionAreaCardProps {
  title?: string
  description?: string
  image?: string
  alt?: string
  maxWidth?: number
  actions?: CardAction[]
  children?: React.ReactNode
  sx?: any
  // Optional: fetch image from server-side proxy (Pexels)
  pexelsId?: string
  pexelsQuery?: string
  perPage?: number
  // Optional: control image rendering size & fit
  imageHeight?: number | string
  imageFit?: 'cover' | 'contain' | 'fill'
  // Optional: background color for the Card (CSS color string)
  bgColor?: string
  // Custom class names for title and description
  titleClassName?: string
  descriptionClassName?: string
}

const MultiActionAreaCard: React.FC<MultiActionAreaCardProps> = ({
  title = 'Lizard',
  description = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  image = '/static/images/cards/contemplative-reptile.jpg',
  alt = 'image',
  maxWidth = 345,
  children,
  sx,
  pexelsId,
  pexelsQuery,
  perPage = 1,
  imageHeight = 140,
  imageFit = 'cover',
  bgColor,
  titleClassName,
  descriptionClassName,
}) => {
  const [remoteImage, setRemoteImage] = useState<string | null>(null)
  const [loadingRemote, setLoadingRemote] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  useEffect(() => {
    let mounted = true

    const fetchFromServer = async () => {
      // if no pexels params provided, don't attempt
      if (!pexelsId && !pexelsQuery) return
      setLoadingRemote(true)
      try {
        let endpoint = '/api/pexels-media?type=image&per_page=' + encodeURIComponent(String(perPage))
        if (pexelsId) endpoint = `/api/pexels-media?id=${encodeURIComponent(pexelsId)}&type=image`
        else if (pexelsQuery) endpoint = `/api/pexels-media?query=${encodeURIComponent(pexelsQuery)}&type=image&per_page=${encodeURIComponent(String(perPage))}`

        const res = await fetch(endpoint)
        if (!mounted) return
        if (!res.ok) {
          const body = await res.text().catch(() => '<no body>')
          console.error('[MultiActionAreaCard] /api/pexels-media error', res.status, body)
          setRemoteImage(null)
          setLoadingRemote(false)
          return
        }
      } catch (err) {
        console.error('[MultiActionAreaCard] error fetching remote image', err)
        setRemoteImage(null)
      } finally {
        if (mounted) setLoadingRemote(false)
      }
    }

    fetchFromServer()

    return () => { mounted = false }
  }, [pexelsId, pexelsQuery, perPage])

  const usedImage = remoteImage || image

  return (
    <Card
      sx={{
        maxWidth: maxWidth,
        backgroundColor: bgColor ?? undefined,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
        border: '2px solid #9167F1',
        boxShadow: '0 0 12px 2px #9167F180', // brillo más sutil
        transition: 'box-shadow 0.9s cubic-bezier(.4,2,.6,1), border-color 0.9s cubic-bezier(.4,2,.6,1)',
        ...sx,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Borde blanco animado eliminado, solo brillo base */}
      {/* Overlay animado desde abajo */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          background: '#2C1B52',
          zIndex: 10,
          pointerEvents: 'none',
          transform: isHovered ? 'translateY(0%)' : 'translateY(100%)',
          transition: 'transform 0.9s cubic-bezier(.4,2,.6,1)',
          opacity: 0.95,
          willChange: 'transform',
          borderRadius: 12,
        }}
      />
      <CardActionArea style={{ position: 'relative', zIndex: 20 }}>
        {usedImage ? (
          <CardMedia
            component="img"
            src={usedImage}
            alt={alt}
            loading="lazy"
            sx={{
              height: typeof imageHeight === 'number' ? `${imageHeight}px` : imageHeight,
              width: '100%',
              objectFit: imageFit,
            }}
          />
        ) : (
          <div
            style={{
              height: typeof imageHeight === 'number' ? `${imageHeight}px` : imageHeight,
              backgroundColor: bgColor ?? '#0b0b0b',
            }}
            aria-hidden
          />
        )}
        <CardContent>
          <h3 className={titleClassName || "text-xl font-semibold text-white"} style={{marginBottom: 8}}>
            {title}
          </h3>
          <p className={descriptionClassName || "mt-3 text-purple-200 text-center"} style={{marginBottom: 8}}>
            {description}
          </p>
          {children}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default MultiActionAreaCard
