import { useMemo, useState } from 'react'
import { buildLocationUrl, getDemoLocation } from '../services/location'

export function useSos() {
  const [demoMode, setDemoMode] = useState(false)
  const [currentLink, setCurrentLink] = useState('')

  const demoLocation = useMemo(() => getDemoLocation(), [])

  const activateDemo = () => {
    const location = buildLocationUrl(demoLocation.latitude, demoLocation.longitude)
    setCurrentLink(location)
    setDemoMode(true)
    return {
      location: demoLocation,
      url: location,
      label: 'Modo demonstração ativo',
    }
  }

  return { demoMode, currentLink, activateDemo, setDemoMode }
}
