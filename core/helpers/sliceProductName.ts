export const sliceProductName = (productName: string): string => {
  if(productName?.length > 38 && window.innerWidth > 996) {
    return `${productName?.slice(0, 38)?.toUpperCase()} ...`
  }

  if(productName?.length > 18 && window.innerWidth > 768 &&  window.innerWidth < 996) {
    return `${productName?.slice(0, 18)?.toUpperCase()} ...`
  }

  if(productName?.length > 13 && window.innerWidth < 768) {
    return `${productName?.slice(0, 13)?.toUpperCase()} ...`
  }

  return productName?.toUpperCase();
};
