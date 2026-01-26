const axios = require('axios');

const api = axios.create({
  baseURL: 'https://meupadrinho.com.br/api',
});

module.exports = {
  async getLatestJobs(level) {
    const { data } = await api.get(`vagas?niveis=${level}&page=0`);
    return data;
  },

  async getJobDetails(nanoId) {
    const { data } = await api.get(`/vagas/${nanoId}`);
    return data;
  },

  async getJobTechnologies(nanoId) {
    const { data } = await api.get(`/vagas/${nanoId}/tecnologias`);
    return data;
  },
};
