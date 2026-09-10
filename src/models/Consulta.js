import { bancoEmMemoria } from "../data/memoria.js";

export function agendarConsulta(paciente, medico, data, hora) {
  const conflito = bancoEmMemoria.consultas.find(function (consulta) {
    return (
      String(consulta.medico).toLowerCase() === String(medico).toLowerCase() &&
      consulta.data === data &&
      consulta.hora === hora
    );
  });

  if (conflito) {
    console.log(
      `\n O médico "${medico}" já possui consulta marcada em ${data} às ${hora}.`,
    );
    return false;
  }

  const novoId =
    bancoEmMemoria.consultas.length > 0
      ? Math.max(...bancoEmMemoria.consultas.map((c) => Number(c.id) || 0)) + 1
      : 1;

  const novaConsulta = {
    id: novoId,
    paciente: paciente,
    medico: medico,
    data: data,
    hora: hora,
    status: "AGENDADA",
  };

  bancoEmMemoria.consultas.push(novaConsulta);
  console.log(`\n Consulta agendada com sucesso! ID: ${novaConsulta.id}`);
  return true;
}

export function cancelarConsulta(id) {
  const idNumerico = Number(id);
  const consulta = bancoEmMemoria.consultas.find(function (c) {
    return Number(c.id) === idNumerico;
  });

  if (!consulta) {
    console.log(`\n Consulta com ID "${id}" não encontrada.`);
    return false;
  }

  consulta.status = "CANCELADA";
  console.log(`\n Consulta ID ${id} CANCELADA.`);
  return true;
}

export function atualizarConsulta(id, novoStatus) {
  const idNumerico = Number(id);
  const consulta = bancoEmMemoria.consultas.find(function (c) {
    return Number(c.id) === idNumerico;
  });

  if (!consulta) {
    console.log(`\n Consulta com ID "${id}" não encontrada.`);
    return false;
  }

  consulta.status = String(novoStatus).toUpperCase();
  console.log(
    `\n Status da consulta ID ${id} atualizado para "${consulta.status}".`,
  );
  return true;
}

export function listarConsultas() {
  console.log("\n--- Lista de Consultas ---");

  if (bancoEmMemoria.consultas.length === 0) {
    console.log("Nenhuma consulta cadastrada.");
    return;
  }

  console.table(bancoEmMemoria.consultas);
}

export function buscarPorPaciente(nomePaciente) {
  const resultado = bancoEmMemoria.consultas.filter(function (c) {
    return (
      String(c.paciente).toLowerCase() === String(nomePaciente).toLowerCase()
    );
  });

  console.log(`\n--- Consultas de ${nomePaciente} ---`);

  if (resultado.length === 0) {
    console.log("Nenhuma consulta encontrada para este paciente.");
    return;
  }

  console.table(resultado);
}
