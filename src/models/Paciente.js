import { bancoEmMemoria } from "../data/memoria.js";
import { validarTexto, validarNumero } from "../utils/Validacao.js";

export function cadastrarPaciente(nome, cpf, idade) {
  if (
    !validarTexto(nome, "Nome") ||
    !validarTexto(cpf, "CPF") ||
    !validarNumero(idade, "Idade")
  ) {
    return false;
  }

  const cpfExistente = bancoEmMemoria.pacientes.some(
    (p) => p.cpf === cpf.trim(),
  );

  if (cpfExistente) {
    console.log(`\n O CPF ${cpf} já está Cadastrado.`);
    return false;
  }

  const novoPaciente = {
    id: Date.now(),
    nome: nome.trim(),
    cpf: cpf.trim(),
    idade: Number(idade),
  };

  bancoEmMemoria.pacientes.push(novoPaciente);
  console.log(`\n Paciente ${nome} cadastrado com sucesso!`);

  return true;
}

export function listarPacientes() {
  if (bancoEmMemoria.pacientes.length === 0) {
    console.log("\n Nenhum paciente cadastrado.");
    return;
  }

  console.log("\n === Lista de Pacientes ===");
  console.table(bancoEmMemoria.pacientes);
}

export function atualizarPaciente(id, nome, cpf, novaIdade) {
  if (!validarNumero(id, "id do paciente")) return false;

  const paciente = bancoEmMemoria.pacientes.find((p) => p.id === Number(id));

  if (!paciente) {
    console.log(`\n Paciente com ID ${id} não encontrado`);
    return false;
  }

  if (
    !validarTexto(nome, "Novo Nome") ||
    !validarNumero(novaIdade, "Nova Idade")
  ) {
    return false;
  }

  paciente.nome = nome.trim();
  paciente.idade = Number(novaIdade);

  console.log(
    `\n Dados do paicente ${paciente.nome} atualizados com sucesso! `,
  );
  return true;
}

export function deletarPaciente(id) {
  if (!validarNumero(id, "id do paciente")) return false;

  const index = bancoEmMemoria.pacientes.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    console.log(`\n Paciente com id ${id} não encontrado`);
    return false;
  }

  bancoEmMemoria.pacientes.splice(index, 1);
  console.log(`\n Paciente com id ${id} deletado com sucesso!`);
  return true;
}
