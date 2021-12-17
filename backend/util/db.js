import { Sequelize } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('voting-app', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql' 
});

export default sequelize