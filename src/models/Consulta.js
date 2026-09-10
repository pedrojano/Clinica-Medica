// let consultas = [];

// let proximoId = 1;

// export function agendarConsulta(paciente, medico, data, hora) {
//   let conflito = consultas.find(function (consulta) {
//     return consulta.medico === medico && consulta.data === data && consulta.hora === hora;
//   });

//   if (conflito) {
//     console.log("Erro: O médico: " + medico + ", já tem consulta marcada em " + data + " às " + hora + ".");
//     return;
//   }

//   let novaConsulta = {
//     id: proximoId,
//     paciente: paciente,
//     medico: medico,
//     data: data,
//     hora: hora,
//     status: "AGENDADA"
//   };

//   consultas.push(novaConsulta);
//   proximoId = proximoId + 1;

//   console.log("Consulta agendada com sucesso! ID: " + novaConsulta.id);
// }

//  export function cancelarConsulta(id) {
//   let consulta = consultas.find(function (c) {
//     return c.id === id;
//   });

//   if (!consulta) {
//     console.log("Erro: consulta com id " + id + " não encontrada.");
//     return;
//   }

//   consulta.status = "CANCELADA";
//   console.log("Consulta " + id + " CANCELADA.");
// }

// export function listarConsultas() {
//   console.log("\n--- Lista de Consultas ---");

//   if (consultas.length === 0) {
//     console.log("Nenhuma consulta cadastrada.");
//     return;
//   }

//   for (let i = 0; i < consultas.length; i++) {
//     let c = consultas[i];
//     console.log(
//       "ID: " + c.id +
//       " | Paciente: " + c.paciente +
//       " | Médico: " + c.medico +
//       " | Data: " + c.data +
//       " | Hora: " + c.hora +
//       " | Status: " + c.status
//     );
//   }
// }

// export function buscarPorPaciente(nomePaciente) {
//   let resultado = consultas.filter(function (c) {
//     return c.paciente.toLowerCase() === nomePaciente.toLowerCase();
//   });

//   console.log("\n--- Consultas de " + nomePaciente + " ---");

//   if (resultado.length === 0) {
//     console.log("Nenhuma consulta encontrada para este paciente.");
//     return;
//   }

//   resultado.forEach(function (c) {
//     console.log("Médico: " + c.medico + " | Data: " + c.data + " | Hora: " + c.hora + " | Status: " + c.status);
//   });
// }

// // agendarConsulta("Maria Silva", "Dr. João", "10/09/2026", "14:00");
// // agendarConsulta("Carlos Souza", "Dra. Ana", "10/09/2026", "09:30");
// // agendarConsulta("Fernanda Lima", "Dr. João", "10/09/2026", "14:00");

// // listarConsultas();

// // cancelarConsulta(1);

// // listarConsultas();

// // buscarPorPaciente("José Alfredo");

// src/models/Consulta.js
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
