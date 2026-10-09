export function validateEmail(v: string) {
  if (!v.trim()) return 'Enter your email address.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Enter a valid email address, like name@example.com.'
  return undefined
}

export function validatePassword(v: string) {
  if (!v) return 'Enter a password.'
  if (v.length < 8) return 'Use at least 8 characters.'
  return undefined
}
