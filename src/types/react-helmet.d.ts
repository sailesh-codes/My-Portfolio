import * as React from 'react';

declare module 'react-helmet' {
  export interface HelmetProps {
    base?: any;
    bodyAttributes?: any;
    defaultTitle?: string;
    defer?: boolean;
    encodeSpecialCharacters?: boolean;
    htmlAttributes?: any;
    link?: any[];
    meta?: any[];
    noscript?: any[];
    onChangeClientState?: (newState: any, addedTags: any, removedTags: any) => void;
    script?: any[];
    style?: any[];
    title?: string;
    titleAttributes?: any;
    titleTemplate?: string;
    children?: React.ReactNode;
  }

  export class Helmet extends React.Component<HelmetProps> {}
  export default Helmet;
}
