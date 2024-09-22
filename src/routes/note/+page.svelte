<script lang="ts">
  let { data } = $props();

  console.log(data);
</script>

{#each data.notes as note}
  <p>{note.title}</p>
  <p>{note.content}</p>
  <p>{note.contentType}</p>
{/each}
