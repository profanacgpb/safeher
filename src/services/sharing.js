export async function shareLocation(url, title = 'Minha localização') {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: 'Compartilhe este link com sua rede de apoio.',
        url,
      })
      return { shared: true, message: 'Link compartilhado com o seu dispositivo.' }
    } catch (error) {
      return { shared: false, message: 'Compartilhamento cancelado.' }
    }
  }

  await copyToClipboard(url)
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
  document.body.appendChild(tempInput)
  tempInput.select()
  document.execCommand('copy')
  document.body.removeChild(tempInput)
  return true
}
