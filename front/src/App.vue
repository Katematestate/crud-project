<script setup>
</script>
<template>
  <h1>{{ single_project.name }}</h1>
  <form @submit="create_project" action="/">
    <div>
      <label>name:</label>
      <input type="text" placeholder="project name" v-model="body_data.name">
    </div>
    <div>
      <label>image:</label>
      <input type="text" placeholder="add image" v-model="body_data.imageURL">
    </div>
    <div>
      <label>author:</label>
      <input type="text" placeholder="enter author" v-model="body_data.author">
    </div>
    <div>
      <label>portfolio url:</label>
      <input type="text" placeholder="enter portfolio link" v-model="body_data.url">
    </div>
    <button type="submit" @click="create_project">[ADD NEW PROJECT]</button>
  </form>

  <h3 v-for="project in project_list">
    <span @click="fetch_single_project(project._id)">{{ project.name }}</span>
    <span @click="delete_project(project._id)">[DELETE]</span>
    <span @click="update_project(project._id)">[UPDATE]</span>
  </h3>
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
      this.body_data={};
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