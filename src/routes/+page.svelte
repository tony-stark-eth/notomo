<script lang="ts">
  import { enhance } from '$app/forms';
  import { ContentType } from '$lib/database/enum/ContentType';

  let { data, form } = $props();
  import { clickOutside } from '$lib/eventHandler/clickOutside';
  import { SvelteMap } from 'svelte/reactivity';

  let openedModals: SvelteMap<string, boolean> = $state(new SvelteMap<string, boolean>());
  let creationMaskVisible = $state(false);
</script>

<form action="?/createNote" class="rounded p-5 outline outline-base-200" method="POST" onclick_outside={() => (creationMaskVisible = false)} use:clickOutside use:enhance>
  <div class="form-control" class:mb-5={creationMaskVisible}>
    <input
      class="placeholder input input-bordered w-full"
      name="title"
      onclick={() => (creationMaskVisible = true)}
      onfocus={() => (creationMaskVisible = true)}
      placeholder="Notiz schreiben..."
      type="text"
      value={form?.title ?? ''}
    />
  </div>
  <div class="form-control mb-5" class:hidden={!creationMaskVisible}>
    <textarea class="textarea textarea-bordered" name="content">{form?.content ?? ''}</textarea>
  </div>
  <input name="contentType" type="hidden" value={ContentType.Text} />
  <button class="btn" class:hidden={!creationMaskVisible} type="submit">Add note</button>
</form>

<ul class="grid grid-cols-2 overflow-hidden pl-5">
  {#each data.notes as note}
    <li class="h-34 m-5 ml-0 overflow-hidden rounded p-5 shadow outline outline-base-200">
      <a
        href="#openModal"
        onclick={() => {
          openedModals.set(note.uuid, true);
        }}
        role="button"
        tabindex="0"
      >
        <form action="?/removeNote" method="POST" use:enhance>
          <input name="uuid" type="hidden" value={note.uuid} />
          <button class="delete" type="submit">❌</button>
        </form>
        <span class="mb-5 inline-block font-bold">{note.title}</span>
        <p>{note.content}</p>
      </a>
    </li>
  {/each}
</ul>

{#each data.notes as note}
  <dialog class="modal" class:modal-open={openedModals.has(note.uuid) && openedModals.get(note.uuid)} id="modal_{note.uuid}">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{note.title}</h3>
      <p>{note.content}</p>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            class="btn"
            onclick={() => {
              openedModals.set(note.uuid, false);
            }}
            >Close
          </button>
        </form>
      </div>
    </div>
  </dialog>
{/each}
