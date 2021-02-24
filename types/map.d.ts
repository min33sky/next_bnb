declare module 'googlemaps';

/**
 * 구글맵 타입
 */

declare global {
  interface Window {
    google: any;
    initMap: any;
  }
}
