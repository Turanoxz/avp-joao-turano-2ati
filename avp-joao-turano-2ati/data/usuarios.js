const usuarios = [];

function getProximoId() {
  return usuarios.length + 1;
}

module.exports = {
  usuarios,
  getProximoId
};
