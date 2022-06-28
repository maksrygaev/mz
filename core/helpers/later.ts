export const later = (delay: number, value: any): Promise<any> =>
  new Promise(resolve => setTimeout(resolve, delay, value));
