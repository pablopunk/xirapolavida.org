export default function goToUrl(url: string) {
  if (typeof window != null) {
    window.location.href = url
  }
}
