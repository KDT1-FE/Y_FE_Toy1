import { useMediaQuery } from "react-responsive";

export const IsMobile = () => {
  return useMediaQuery({maxWidth: 600})
}