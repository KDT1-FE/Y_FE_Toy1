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
  desktop_1120: (styles: string) => css`
    @media screen and (max-width: 1120px) {
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
  tablet_680: (styles: string) => css`
    @media screen and (max-width: 680px) {
      ${styles}
    }
  `,

  tablet_625: (styles: string) => css`
    @media screen and (max-width: 625px) {
      ${styles}
    }
  `,
  mobile: (styles: string) => css`
    @media screen and (max-width: 576px) {
      ${styles}
    }
  `,
  mobile_430: (styles: string) => css`
    @media screen and (max-width: 430px) {
      ${styles}
    }
  `,
};
