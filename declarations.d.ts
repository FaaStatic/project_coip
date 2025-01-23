/// <reference types="@testing-library/jest-native" />

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.otf' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.css';
