const { PORT } = process.env;

const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const createRole = require("./src/helpers/createRoles/createRoles.js");
const createUser = require("./src/helpers/createUser/createUser.js")


conn.sync({ after: true }).then(async () => {
  await createRole();
  await createUser();
  server.listen(PORT, () => {
    console.log('%s listening at 3001');
  });
});
