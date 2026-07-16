export const formatPhone = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
  }
  return phone
}

export const maskPhone = (phone) => {
  if (!phone || phone.length < 4) return phone
  return `******${phone.slice(-4)}`
}
