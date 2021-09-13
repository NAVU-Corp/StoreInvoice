

class ConfigRepository {
  constructor({ utilsDB }) {
    this.utilsDB = utilsDB;
  }

  //type: 20 - Khách hàng (mua), 10 - Nhà cung cấp (bán)
  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS config (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text,
        type int,
        status int,
        createdate datetime,
        updatedate datetime
      )`
    return this.utilsDB.run(sql);
  }

  createDefaultConfigCustomer() {
    let dateNow = new Date();

    const sql = `
      INSERT INTO config (title, type, status, createdate, updatedate)
      select title, type, status, createdate, updatedate 
      from (
        SELECT 'Đơn vị bán hàng' title, 10 type, 10 status, $createdate createdate, $updatedate updatedate 
      )
      where title not in (
        select title 
        from config 
        where status = 10 and type = 10 
      )`;

    return this.utilsDB.run(sql, {
      $createdate: dateNow,
      $updatedate: dateNow,
    });
  }

  createDefaultConfigBuyer() {
    let dateNow = new Date();

    const sql = `
      INSERT INTO config (title, type, status, createdate, updatedate)
      select title, type, status, createdate, updatedate 
      from (
        SELECT 'Tên khách hàng' title, 20 type, 10 status, $createdate createdate, $updatedate updatedate 
        union all
        SELECT 'Đơn vị' title, 20 type, 10 status, $createdate createdate, $updatedate updatedate 
        union all
        SELECT 'Tên đơn vị' title, 20 type, 10 status, $createdatecreatedate, $updatedate updatedate
        union all 
        SELECT 'Đơn vị mua hàng' title, 20 type, 10 status, $createdate createdate, $updatedate updatedate
      )
      where title not in ( 
        select title 
        from config 
        where status = 10 and type = 20 
      )`;

    return this.utilsDB.run(sql, {
      $createdate: dateNow,
      $updatedate: dateNow,
    });
  }

  create(config, { 
    dateNow,
  }) {
    const { title, type } = config;

    return this.utilsDB.run(
      `INSERT INTO config (title, type, status, createdate, updatedate)
      VALUES ($title, $type, $status, $createdate, $updatedate)`,
      {
        $title: title,
        $type: type,
        $status: 10,
        $createdate: dateNow,
        $updatedate: dateNow,
      });
  }

  update(config, { 
    dateNow,
  }) {
    const { id, title, type  } = config;

    return this.utilsDB.run(
      `UPDATE config 
      SET title = $title, type = $type, status = $status, updatedate = $updatedate 
      WHERE id = $id`,
      {
        $id: id,
        $title: title,
        $type: type,
        $status: 10,
        $updatedate: dateNow,
      });
  }

  delete(id, { 
    dateNow,
  }) {
    return this.utilsDB.run(
      `UPDATE config 
      SET status = $status, updatedate = $updatedate 
      WHERE id = $id`,
      {
        $id: id,
        $status: 90,
        $updatedate: dateNow,
      });
  }

  getById(id) {
    return this.utilsDB.get(
      `SELECT id, title, type, status, createdate, updatedate
      FROM config 
      WHERE status != 90 and id = $updatedate`,
      {
        $id: id,
      });
  }

  getList(filter) {
    filter = filter || {};

    let condition = ``;

    if(filter.type) {
      condition += ` and type = $type `;
    }

    let query =
      `SELECT id, title, type, status, createdate, updatedate
      FROM config 
      WHERE status != 90 ${condition} 
      ORDER BY createdate DESC`

    return this.utilsDB.all(query, {
      $type: filter.type,
    });
  }
}

module.exports = {
  ConfigRepository,
};