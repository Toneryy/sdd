// src/types/style.d.ts
declare module "*.module.scss" {
  const styles: { [className: string]: string };
  export default styles;
}
