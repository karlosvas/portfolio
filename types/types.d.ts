// types.d.ts
declare module "*.astro" {
    const value: string;
    export default value;
}

declare module "astro/dist/virtual-modules/transitions-router" {
    export interface TransitionRouterModule {
      getFallback: any;
    }
}