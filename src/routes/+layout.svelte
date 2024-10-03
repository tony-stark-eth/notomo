<script lang="ts">
  import { enhance } from '$app/forms';
  import MdiHamburgerMenu from 'virtual:icons/mdi/hamburger-menu';
  import MdiLightbulbOutline from 'virtual:icons/mdi/lightbulb-outline';

  import '../app.css';

  const { children, data } = $props();
  import { page } from '$app/stores';
  import { PUBLIC_UMAMI_ID } from '$env/static/public';
  import { clickOutside } from '$lib/eventHandler/clickOutside';

  const activeUrl = $derived($page.url.pathname);

  let iconMenuHovered: boolean = $state(false);
  let wasOpenedManually: boolean = $state(false);
</script>

<svelte:head>
  <title>Notomo</title>
  <script crossorigin="anonymous" data-website-id={PUBLIC_UMAMI_ID} defer src="/stats/script.js"></script>
</svelte:head>

<div class="navbar bg-base-100 shadow">
  <div class="flex-none">
    <button class="btn btn-square btn-ghost">
      <MdiHamburgerMenu
        onclick={() => {
          iconMenuHovered = !iconMenuHovered;
          wasOpenedManually = !wasOpenedManually;
        }}
        style="font-size:2em"
      />
    </button>
  </div>
  <div class="flex-1">
    <a class="btn btn-ghost text-xl" href="/">Notomo</a>
  </div>
  <div class="flex-none gap-2">
    <div class="form-control">
      <input class="input input-bordered w-24 md:w-auto" placeholder="Search" type="text" />
    </div>
    <div class="dropdown dropdown-end">
      {#if data.session === null}
        <div class="avatar placeholder">
          <div class="w-10 rounded-full bg-neutral text-neutral-content">
            <span class="text-1xl">D</span>
          </div>
        </div>
      {:else if data.session.attributes?.avatar}
        <div class="avatar btn btn-circle btn-ghost" role="button" tabindex="0">
          <div class="w-10 rounded-full">
            <img alt={String(data.session.attributes?.username)} src={String(data.session.attributes?.avatar)} />
          </div>
        </div>
      {:else}
        <div class="avatar placeholder">
          <div class="w-10 rounded-full bg-neutral text-neutral-content">
            <span class="text-1xl">D</span>
          </div>
        </div>
      {/if}
      <ul class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
        <li>
          <form action="?/logout" method="POST" tabindex="-1" use:enhance>
            <button type="submit">Logout</button>
          </form>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="flex min-h-screen">
  <ul
    class={'w-30 flex-none hover:w-1/6 hover:shadow' + (iconMenuHovered ? ' w-1/6 shadow' : '')}
    onblur={() => (iconMenuHovered = wasOpenedManually)}
    onclick_outside={() => {
      iconMenuHovered = false;
      wasOpenedManually = false;
    }}
    onfocus={() => {
      iconMenuHovered = true;
    }}
    onmouseout={() => (iconMenuHovered = wasOpenedManually)}
    onmouseover={() => {
      iconMenuHovered = true;
    }}
    use:clickOutside
  >
    <li class="p-3">
      <a class="flex items-center gap-6" href="/">
        <MdiLightbulbOutline class={'rounded-2xl hover:bg-amber-200' + (activeUrl === '/' ? ' bg-amber-200' : '')} style="font-size:2em" />
        <span class:hidden={!iconMenuHovered}>Notes</span>
      </a>
    </li>
  </ul>

  <main class="mt-5 w-full flex-initial">
    <div class="container mx-auto w-1/2">
      {@render children()}
    </div>
  </main>
</div>
