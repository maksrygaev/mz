export const sliceCardUserName = (userName: string) => {
  if(userName?.length > 20) return `${userName.slice(0, 20)} ...`;

  return userName;
};
