'use client'

import { useEffect, useRef, useState } from 'react'

export default function GoogleMap() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [useIframe, setUseIframe] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      setUseIframe(true)
      setIsLoaded(true)
      return
    }

    setIsLoaded(true)

    if (window.google && window.google.maps) {
      initMap()
      return
    }

    if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
      const checkGoogle = () => {
        if (window.google && window.google.maps) {
          initMap()
        } else {
          setTimeout(checkGoogle, 100)
        }
      }
      checkGoogle()
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.defer = true

    script.onload = () => {
      initMap()
    }

    script.onerror = () => {
      setError('Failed to load Google Maps. Please check your API key and internet connection.')
      setUseIframe(true)
    }

    document.head.appendChild(script)

    function initMap() {
      if (!mapRef.current || !window.google || !window.google.maps) return

      try {
        const location = { lat: 48.161361, lng: 28.304194 }

        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          zoom: 16,
          center: location,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry.fill',
              stylers: [{ weight: '2.00' }]
            },
            {
              featureType: 'all',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#9c9c9c' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'landscape',
              elementType: 'all',
              stylers: [{ color: '#f2f2f2' }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'road',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { lightness: 45 }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: [{ color: '#eeeeee' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#7b7b7b' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'all',
              stylers: [{ visibility: 'simplified' }]
            },
            {
              featureType: 'road.arterial',
              elementType: 'labels.icon',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'water',
              elementType: 'all',
              stylers: [{ color: '#46bcec' }, { visibility: 'on' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry.fill',
              stylers: [{ color: '#c8d7d4' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#070707' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#ffffff' }]
            }
          ],
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true
        })

        const marker = new window.google.maps.Marker({
          position: location,
          map: mapInstanceRef.current,
          title: 'Crissval - Magazin alimentar sănătos',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#16a34a" stroke="white" stroke-width="4"/>
                <path d="M20 10L26 22H14L20 10Z" fill="white"/>
                <circle cx="20" cy="16" r="3" fill="#16a34a"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40)
          }
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="font-family: system-ui, sans-serif; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #16a34a; font-weight: 600;">Crissval</h3>
              <p style="margin: 0; color: #666; font-size: 14px;">Magazin alimentar sănătos</p>
              <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">+373 696 20 052</p>
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker)
        })

        setTimeout(() => {
          infoWindow.open(mapInstanceRef.current, marker)
        }, 1000)
      } catch (err) {
        console.error('Error initializing Google Maps:', err)
        setError('Error loading the map. Please try again later.')
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        // Clean up map instance if needed
      }
    }
  }, [isLoaded])

  const location = { lat: 48.161361, lng: 28.304194 }
  const embedSrc = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`

  if (error && !useIframe) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-b-3xl flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Eroare la încărcarea hărții</h3>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-b-3xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă harta...</p>
        </div>
      </div>
    )
  }

  if (useIframe) {
    return (
      <div className="w-full h-full rounded-b-3xl overflow-hidden bg-gray-100">
        <iframe
          title="Harta Crissval"
          src={embedSrc}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full rounded-b-3xl" />
    </div>
  )
}