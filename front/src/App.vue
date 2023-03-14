<script setup>
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
</script>
<template>
  <h1>{{ single_project.name }}</h1>
  <form @submit="create_project" action="/">
    <div>
      <InputText type="text" placeholder="project name" v-model="body_data.name" />
    </div>
    <div>
      <InputText type="text" placeholder="add image" v-model="body_data.imageURL" />
    </div>
    <div>
      <InputText type="text" placeholder="enter author" v-model="body_data.author" />
    </div>
    <div>
      <InputText type="text" placeholder="enter portfolio link" v-model="body_data.url" />
    </div>
    <Button type="submit" @click="create_project">[ADD NEW PROJECT]</Button>
  </form>

  <DataTable :value="project_list" tableStyle="min-width: 50rem" @row-click="fetch_single_project($event.data._id)">
    <Column field="imageURL" header="Image">
      <template #body="slotProps">
        <img :src="`${slotProps.data.imageURL}`" height="200" />
      </template>
    </Column>
    <Column field="name" header="Name"></Column>
    <Column field="author" header="Author"></Column>
    <Column field="url" header="Portfolio Link"></Column>
    <Column>
      <template #body="slotProps">
        <Button severity="danger" outlined icon="pi pi-trash" @click="delete_project(slotProps.data._id)" />
        <Button severity="secondary" outlined icon="pi pi-sync" @click="update_project(slotProps.data._id)" />
      </template>
    </Column>
  </DataTable>

</template>
<style scoped></style>
<script>
export default {
  data() {
    return {
      project_list: [],
      single_project: { name: '', imageURL: '', author: '', url: '' },
      body_data: { name: '', imageURL: '', author: '', url: '' }
    }
  },
  methods: {
    async fetch_all_projects() {
      const response = await fetch("http://localhost:4000/projects/");
      const received_data = await response.json();
      this.project_list = received_data;
    },
    async fetch_single_project(id) {
      const response = await fetch("http://localhost:4000/projects/get/" + id);
      const received_data = await response.json();
      this.single_project = received_data;
      this.body_data = received_data;
    },
    async delete_project(id) {
      let fetch_url = 'http://localhost:4000/projects/delete/' + id;
      const response = await fetch(fetch_url, { method: "DELETE" });
      const received_data = await response.json();
      this.fetch_all_projects();
    },
    async update_project(id) {
      const response = await fetch("http://localhost:4000/projects/update/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.body_data)
      });
      const received_data = await response.json();
      this.fetch_all_projects();
    },
    async create_project(e) {
      e.preventDefault();
      const response = await fetch("http://localhost:4000/projects/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.body_data)
      });
      const received_data = await response.json();
      this.fetch_all_projects();
      this.body_data = {};
    },
    async fetch_sample() {
      const response = await fetch(url, { /* info about fetch */ });
    }
  },
  created() {
    this.fetch_all_projects();
  }
}
</script>