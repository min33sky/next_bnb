declare module 'googlemaps';

/**
 * 구글맵 타입 설정
 */

declare global {
  interface Window {
    google: any;
    initMap: any;
  }
}
