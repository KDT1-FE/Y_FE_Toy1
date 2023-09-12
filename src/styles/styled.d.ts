import 'styled-components';
import { ColorType, FontSizeType, SizeType } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorType;
    fontSize: FontSizeType;
    size: SizeType;
  }
}
