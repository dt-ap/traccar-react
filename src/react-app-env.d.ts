// eslint-disable-next-line spaced-comment
/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_ROOT_URL: string;
    REACT_APP_ROOT_WS_URL: string;
  }
}
