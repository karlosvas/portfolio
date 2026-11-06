/// <reference types="../.astro/types.d.ts" />

declare module "*.glsl?raw" {
  const content: string;
  export default content;
}
