export function validarTexto(valor, campo) {
  if (!valor || typeof valor !== "string" || valor.trim() === "") {
    console.log(
      `\n O Campo ${campo} é obrigatório e deve ser uma string não vazia.\n`,
    );
    return false;
  }
  return true;
}

export function validarNumero(valor, campo) {
  const num = Number(valor);

  if (valor === "" || valor === null || isNaN(num) || num <= 0) {
    console.log(
      `\n O Campo ${campo} é obrigatório e deve ser um número válido maior que zero\n`,
    );
    return false;
  }
  return true;
}

export function validarData(dataString, campo) {
  if (!validarTexto(dataString, campo)) return false;

  const data = /^(\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})$/;
  if (!data.test(dataString.trim())) {
    console.log(
      `\n O Campo ${campo} deve ser uma data válida no formato YYYY-MM-DD ou DD/MM/YYYY\n`,
    );
    return false;
  }
  return true;
}
