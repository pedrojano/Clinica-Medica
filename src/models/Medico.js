import { bancoEmMemoria } from "../data/memoria.js";
import { validarTexto, validarNumero } from "../utils/Validacao.js";

function validarId(id) {
  if (!validarNumero(id, "ID")) {
    throw new Error("ID inválido. Digite um número positivo.");
  }
  return Number(id);
}

// LISTAR
export function listar() {
  return [...bancoEmMemoria.medicos];
}

// BUSCAR POR ID
export function buscarPorId(id) {
  const idNumerico = validarId(id);

  const medico = bancoEmMemoria.medicos.find((m) => m.id === idNumerico);

  if (!medico) {
    throw new Error(`Médico com ID ${idNumerico} não encontrado.`);
  }

  return medico;
}

// CADASTRAR
export function cadastrar(dados) {
  if (!dados || typeof dados !== "object") {
    throw new Error("Os dados do médico são obrigatórios.");
  }

  if (
    !validarTexto(dados.nome, "Nome do Médico") ||
    !validarTexto(dados.crm, "CRM") ||
    !validarTexto(dados.especialidade, "Especialidade") ||
    !validarTexto(dados.telefone, "Telefone")
  ) {
    return null;
  }

  const nome = dados.nome.trim();
  const crm = dados.crm.trim();
  const especialidade = dados.especialidade.trim();
  const telefone = dados.telefone.trim();

  const crmJaExiste = bancoEmMemoria.medicos.some((m) => m.crm === crm);

  if (crmJaExiste) {
    throw new Error(`Já existe um médico cadastrado com o CRM ${crm}.`);
  }

  const novoId =
    bancoEmMemoria.medicos.length > 0
      ? Math.max(...bancoEmMemoria.medicos.map((m) => Number(m.id) || 0)) + 1
      : 1;

  const medico = {
    id: novoId,
    nome,
    crm,
    especialidade,
    telefone,
    criadoEm: new Date(),
  };

  bancoEmMemoria.medicos.push(medico);

  return medico;
}

// ATUALIZAR
export function atualizar(id, dados) {
  const idNumerico = validarId(id);
  const medico = buscarPorId(idNumerico);

  if (!dados || typeof dados !== "object") {
    throw new Error("Os dados para atualização são obrigatórios.");
  }

  if (dados.nome !== undefined && dados.nome !== "") {
    if (!validarTexto(dados.nome, "Novo Nome")) return null;
    medico.nome = dados.nome.trim();
  }

  if (dados.crm !== undefined && dados.crm !== "") {
    if (!validarTexto(dados.crm, "Novo CRM")) return null;
    const crmTratado = dados.crm.trim();

    const crmDeOutro = bancoEmMemoria.medicos.some(
      (m) => m.crm === crmTratado && m.id !== idNumerico,
    );

    if (crmDeOutro) {
      throw new Error(
        `Já existe outro médico cadastrado com o CRM ${crmTratado}.`,
      );
    }

    medico.crm = crmTratado;
  }

  if (dados.especialidade !== undefined && dados.especialidade !== "") {
    if (!validarTexto(dados.especialidade, "Nova Especialidade")) return null;
    medico.especialidade = dados.especialidade.trim();
  }

  if (dados.telefone !== undefined && dados.telefone !== "") {
    if (!validarTexto(dados.telefone, "Novo Telefone")) return null;
    medico.telefone = dados.telefone.trim();
  }

  return medico;
}

// REMOVER
export function remover(id) {
  const idNumerico = validarId(id);
  const medico = buscarPorId(idNumerico);

  const possuiConsultasAtivas = bancoEmMemoria.consultas.some((c) => {
    return (
      (c.medicoId === idNumerico || c.idMedico === idNumerico) &&
      String(c.status).toLowerCase() !== "cancelada"
    );
  });

  if (possuiConsultasAtivas) {
    throw new Error(
      `Não é possível remover o médico "${medico.nome}" pois existem consultas ativas vinculadas a ele.`,
    );
  }

  const indice = bancoEmMemoria.medicos.findIndex((m) => m.id === idNumerico);
  bancoEmMemoria.medicos.splice(indice, 1);

  return medico;
}

// BUSCAR
export function buscar(filtros = {}) {
  if (!filtros || typeof filtros !== "object") {
    throw new Error("Os filtros devem ser informados como um objeto.");
  }

  return bancoEmMemoria.medicos.filter((medico) => {
    if (filtros.nome) {
      if (
        !medico.nome
          .toLowerCase()
          .includes(String(filtros.nome).trim().toLowerCase())
      ) {
        return false;
      }
    }

    if (filtros.especialidade) {
      if (
        !medico.especialidade
          .toLowerCase()
          .includes(String(filtros.especialidade).trim().toLowerCase())
      ) {
        return false;
      }
    }

    if (filtros.crm) {
      if (
        !medico.crm
          .toLowerCase()
          .includes(String(filtros.crm).trim().toLowerCase())
      ) {
        return false;
      }
    }

    return true;
  });
}
