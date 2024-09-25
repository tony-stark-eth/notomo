// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import 'unplugin-icons/types/svelte';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      session: import('lucia').Session | null;
      user: import('lucia').User | null;
    }

    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

declare module 'svelte/elements' {
  export interface HTMLAttributes {
    onclick_outside?: boolean | string | unknown;
  }
}

export {};
