const MeuPadrinhoService = require('../services/MeuPadrinhoService');

let cachedData = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

module.exports = {
  async getLatest(req, res) {
    try {
      const now = Date.now();

      // Verificar se o cache é válido
      if (cachedData && (now - lastCacheTime < CACHE_DURATION)) {
        return res.json(cachedData);
      }

      // 1. Retornar a lista de vagas
      const listResponse = await MeuPadrinhoService.getLatestJobs();

      if (!listResponse || !listResponse.vagas || listResponse.vagas.length === 0) {
        return res.status(404).json({ error: 'No jobs found' });
      }

      // 2. Retornar a vaga mais recente (first item of 'vagas')
      const latestJobSummary = listResponse.vagas[0];
      const nanoId = latestJobSummary.nano_id;

      // 3. Buscar detalhes e tecnologias da vaga mais recente
      const [details, technologiesData] = await Promise.all([
        MeuPadrinhoService.getJobDetails(nanoId),
        MeuPadrinhoService.getJobTechnologies(nanoId)
      ]);

      // 4. Combinar e retornar a resposta
      const response = {
        titulo_vaga: details.titulo_vaga,
        local: details.local,
        horario_registro: details.horario_registro,
        link_vaga: details.link_vaga,
        plataforma: details.plataforma,
        forma_trabalho: details.forma_trabalho,
        cargo: details.cargo,
        nivel: details.nivel,
        slug: details.slug,
        descricao_vaga: details.descricao_vaga,
        requisitos_tecnicos: details.requisitos_tecnicos,
        beneficios_empresa: details.beneficios_empresa,
        requisitos_desejaveis: details.requisitos_desejaveis,
        nivel_vaga: details.nivel_vaga,
        tipo_contrato: details.tipo_contrato,
        salario: details.salario,
        email_contato: details.email_contato,
        nome_empresa: details.nome_empresa,
        link_pagina_linkedin: details.link_pagina_linkedin,
        link_empresa: details.link_empresa,
        tecnologias: technologiesData ? technologiesData.tecnologias : [],
      };

      // Atualizar o cache
      cachedData = response;
      lastCacheTime = now;

      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
