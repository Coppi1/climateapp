class User {
  constructor(codUser, nome, email, senha, codCidade, dataHoraCadastro) {
    this.codUser = codUser;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.codCidade = codCidade;
    this.dataHoraCadastro = dataHoraCadastro;
  }
}

module.exports = { User };
