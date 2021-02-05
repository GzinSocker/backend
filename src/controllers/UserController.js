import connection from '../connection';

export default {
  async index(req, res) {
    try {
      const { id } = req.params;
      const data = await connection
        .select('*')
        .from('usuario')
        .join('doador', 'doador.id_doador', 'usuario.id')
        .where('doador.id_doador', id);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ Error: `${error}` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, telefone, senha, email } = req.body;
      const ddd = telefone.slice(0, 2);
      const tel = telefone.slice(2, 11);
      await connection('doador')
        .where('id_doador', id)
        .update('nom_doador', nome)
        .update('nro_ddd', ddd)
        .update('nro_telefone', tel)
        .update('des_email', email);

      await connection('usuario').where('id', id).update('des_senha', senha);

      return res.json({ Sucesso: 'Dados atualizados' });
    } catch (error) {
      return res.status(400).json({ Error: `${error}` });
    }
  },
};
