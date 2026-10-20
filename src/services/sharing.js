import { Capacitor } from '@capacitor/core'
import { Share } from '@capacitor/share'

export async function shareLocation(url, title = 'Minha localização') {
  const text = 'Compartilhe este link com sua rede de apoio.'

  if (Capacitor.isNativePlatform()) {
    await Share.share({ title, text, url, dialogTitle: title })
    return { shared: true, message: 'Compartilhamento aberto no seu dispositivo.' }
  }

  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      })
      return { shared: true, message: 'Link compartilhado com o seu dispositivo.' }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return { shared: false, message: 'Compartilhamento cancelado.' }
      }
      throw error
    }
  }

  const copied = await copyToClipboard(url)
  if (!copied) throw new Error('Não foi possível copiar o link. Tente compartilhar novamente.')
  return {
    shared: false,
    message: 'Link de localização copiado. Use o compartilhamento do seu dispositivo para enviá-lo à sua rede de apoio.',
  }
}

export async function copyToClipboard(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value)
    return true
  }

  const tempInput = document.createElement('textarea')
  tempInput.value = value
  tempInput.setAttribute('readonly', '')
  tempInput.style.position = 'fixed'
  tempInput.style.opacity = '0'
  document.body.appendChild(tempInput)
  tempInput.select()
  try {
    return document.execCommand('copy')
  } finally {
    document.body.removeChild(tempInput)
  }
}
