const createApplication = async (client, { form_data }) => {
  const query = `insert into applications (form_data) values ($1) returning *`;
  const res = await client.query(query, [form_data]);

  if (res.rows.length === 0) {
    return null;
  }

  return res.rows[0];
};

module.exports = createApplication;
