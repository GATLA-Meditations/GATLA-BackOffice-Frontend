export const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const parseShopItemsName: { [key: string]: string }  = {
  'FONDO': 'BACKGROUND',
  'ICONO': 'AVATAR'
}
