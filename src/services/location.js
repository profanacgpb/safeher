export function getDemoLocation() {
  return {
    latitude: -5.7945,
    longitude: -35.211,
    timestamp: Date.now(),
  }
}

export async function requestLocation() {
  if (!navigator.geolocation) {
    throw new Error('Localização não disponível neste navegador.')
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
        })
      },
      (error) => {
        const message = error.code === 1
          ? 'Não conseguimos acessar sua localização. Verifique as permissões do navegador e tente novamente.'
          : 'Não foi possível obter sua localização agora.'

        reject(new Error(message))
      },
      { enableHighAccuracy: true, timeout: 15000 },
    )
  })
}

export function buildLocationUrl(latitude, longitude) {
  return `https://maps.google.com/?q=${latitude},${longitude}`
}
