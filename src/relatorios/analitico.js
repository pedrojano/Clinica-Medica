import { bancoEmMemoria } from "../data/memoria.js";

export function buscarConsultasAvancada(filtros = {}) {
  const { idMedico, idPaciente, status, data } = filtros;

  const resultados = bancoEmMemoria.consultas.filter((consulta) => {
    const atendeMedico = !idMedico || consulta.isMedico === Number(idMedico);
    const atendePaciente =
      !idPaciente || consulta.idPaciente === Number(idPaciente);
    const atendeStatus =
      !status ||
      consulta.status.toLowerCase().trim() === status.toLowerCase().trim();
    const atendeData = !data || consulta.data === data.trim();

    return atendeMedico && atendePaciente && atendeStatus && atendeData;
  });

  const relatorioDetalhado = resultados.map((consulta) => {
    const paciente = bancoEmMemoria.paciente.find(
      (p) => p.id === consulta.idPaciente,
    );
    const medico = bancoEmMemoria.medicos.find(
      (m) => m.id === consulta.idMedico,
    );

    return {
      idConsulta: consulta.id,
      paciente: paciente ? paciente.nome : "Não Encontrado",
      medico: medico ? medico.nome : "Não Encontrado",
      especialidade: medico ? medico.especialidade : "-",
      data: consulta.data,
      status: consulta.status,
      valor: `R$ ${consulta.valor.toFixed(2)}`,
    };
  });

  if (relatorioDetalhado.length === 0) {
    console.log(`\n Nenhuma consulta encontrada com os filtros aplicados.`);
    return [];
  }

  console.log(
    `\n === Resultado da busca Analítica (${relatorioDetalhado.length} encontrada) ===`,
  );
  console.table(relatorioDetalhado);
  return relatorioDetalhado;
}

export function gerarResumoAnalitico() {
  const totalConsultas = bancoEmMemoria.consultas.length;

  if (totalConsultas === 0) {
    console.log(
      `\n Não há dados suficientes para gerar o processamento análitico.`,
    );
    return;
  }

  let faturamentoTotal = 0;
  let realizados = 0;
  let agendadas = 0;
  let canceladas = 0;

  bancoEmMemoria.consultas.forEach((consulta) => {
    faturamentoTotal += Number(consulta.valor) || 0;

    const statusLower = consulta.status.toLowerCase();
    if (statusLower === "realizada") realizados++;
    else if (statusLower === "agendada") agendadas++;
    else if (statusLower === "cancelada") canceladas++;
  });

  const mediaValor = faturamentoTotal / totalConsultas;

  console.log("\n===============================\n");
  console.log("=== Gráfico Analítico da Clínica ===");
  console.log("=====================================");
  console.log(`Total de Consultas:   ${totalConsultas}`);
  console.log(`  - Realizadas:    ${realizados}`);
  console.log(`  - Agendadas:     ${agendadas}`);
  console.log(`  - Canceladas:    ${canceladas}`);
  console.log("======================================");
  console.log(`Faturamento Total:   R$ ${faturamentoTotal.toFixed(2)}`);
  console.log(`Ticket Médio / Consulta:    R$ ${mediaValor.toFixed(2)}`);
  console.log("======================================");
}
