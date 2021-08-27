export function validateEmptyAndLength3(value) {
  if (!value) {
    return "*Este campo é obrigatório";
  }

  if (value.length < 3) {
    return "*Este campo precisa de no mínimo 3 caracteres";
  }

  return true;
}

export function validateEmptyAndEmail(value) {
  if (!value) {
    return "*Este campo é obrigatório";
  }

  const isValidEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i.test(value);

  if (!isValidEmail) {
    return "*Este campo precisa ser um email";
  }

  return true;
}
