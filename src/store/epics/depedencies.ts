/* eslint-disable @typescript-eslint/ban-types */
// import { ajax as RxAjax } from 'rxjs/ajax';
import { ajax as RxAjax } from 'rxjs/ajax';
import { webSocket } from 'rxjs/webSocket';
import { AjaxRequest } from 'rxjs/internal/observable/dom/AjaxObservable';

const defaultConfig: AjaxRequest = {
  crossDomain: true,
  withCredentials: true,
};

// Hacky ajax.
const ajax = (req: AjaxRequest) => {
  let config: AjaxRequest = defaultConfig;

  const { headers } = config;
  config = { ...config, ...req };
  config.headers = { ...headers, ...req.headers };
  return RxAjax(config);
};

const socket = webSocket<any>({
  url: `${process.env.REACT_APP_ROOT_WS_URL}api/socket`
});

export const depedencies = { ajax, socket };
export type Depedencies = typeof depedencies;
