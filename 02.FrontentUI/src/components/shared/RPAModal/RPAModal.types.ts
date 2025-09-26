export interface RPAModalProps {
  type?: "info"| "success" | "warning" | "error",
  icon?: string,
  label: string,
  description: string,
}