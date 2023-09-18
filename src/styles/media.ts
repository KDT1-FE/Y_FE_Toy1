import { css } from 'styled-components';

export const media = {
  desktop_2xl: (styles: string) => css`
    @media screen and (max-width: 1440px) {
      ${styles}
    }
  `,
  desktop_xl: (styles: string) => css`
    @media screen and (max-width: 1280px) {
      ${styles}
    }
  `,
  desktop_lg: (styles: string) => css`
    @media screen and (max-width: 1024px) {
      ${styles}
    }
  `,
  tablet: (styles: string) => css`
    @media screen and (max-width: 768px) {
      ${styles}
    }
  `,
  mobile: (styles: string) => css`
    @media screen and (max-width: 576px) {
      ${styles}
    }
  `,
};
