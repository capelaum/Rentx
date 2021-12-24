import { randomUUID } from "crypto";
import { hash } from "bcrypt";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = randomUUID();
  const password = await hash("admin", 8);

  await connection.query(`
    INSERT INTO users
      (id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES
      ('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, NOW(), '123456')
  `);

  await connection.close();
}

create().then(() => console.log("User admin created"));
