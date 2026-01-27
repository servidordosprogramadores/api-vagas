const MeuPadrinhoService = require('../services/MeuPadrinhoService');

// Armazena cache por nível: { estagio: { data, time }, pleno: { ... } }
const cache = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

async function getLatestByLevel(req, res, level) {
  try {
    const now = Date.now();

    // Inicializa o cache do nível se não existir
    if (!cache[level]) {
      cache[level] = { data: null, time: 0 };
    }

    // Verificar se o cache é válido para este nível
    if (cache[level].data && (now - cache[level].time < CACHE_DURATION)) {
      return res.json(cache[level].data);
    }

    // 1. Retornar a lista de vagas filtrada pelo nível
    const listResponse = await MeuPadrinhoService.getLatestJobs(level);

    if (!listResponse || !listResponse.vagas || listResponse.vagas.length === 0) {
      return res.status(404).json({ error: `No jobs found for level: ${level}` });
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

    // Atualizar o cache específico deste nível
    cache[level].data = response;
    cache[level].time = now;

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getEstagio(req, res) {
    return getLatestByLevel(req, res, 'estagio');
  },
  getJunior(req, res) {
    return getLatestByLevel(req, res, 'junior');
  },
  getPleno(req, res) {
    return getLatestByLevel(req, res, 'pleno');
  },
  getSenior(req, res) {
    return getLatestByLevel(req, res, 'senior');
  }
};
