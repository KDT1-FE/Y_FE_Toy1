import { useMediaQuery } from "react-responsive";

export const IsMobile = () => {
  return useMediaQuery({maxWidth: 600})
}

export const top = 100
export const left = 0