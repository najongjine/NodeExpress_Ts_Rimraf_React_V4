/**
 * dev : 로컬 컴퓨터 개발
 * else : azure app service
 */
const ENV_MODE = 'development';

var typeOrmDb1 = {
  type: '',
  host: '',
  port: 3306,
  username: '',
  password: '',
  database: '',
  synchronize: false,
  logging: false,
};
const cryptoKey = 'cryptoKeySample@#@$%#%$#@!!';
const jwtKey = 'jwtKeySample@#@$%#%$#@!!';
let mongoDBConnString = '';
let react_project1_path = '';

if (ENV_MODE === 'development') {
  typeOrmDb1.type = 'mysql';
  typeOrmDb1.host = 'localhost';
  typeOrmDb1.port = 3306;
  typeOrmDb1.username = 'najongjine';
  typeOrmDb1.password = 'jongjin2';
  typeOrmDb1.database = 'test';
  typeOrmDb1.synchronize = false;
  typeOrmDb1.logging = false;

  mongoDBConnString = `mongodb+srv://안알랴줌`;

  react_project1_path = `H:/MyProjects/Express/NodeExpress_Ts_Rimraf_React_V4/react_project1`;
} else {
  typeOrmDb1.type = '안알랴줌';
  typeOrmDb1.host = '안알랴줌';
  typeOrmDb1.port = 3306;
  typeOrmDb1.username = '안알랴줌';
  typeOrmDb1.password = '안알랴줌';
  typeOrmDb1.database = 'test';
  typeOrmDb1.synchronize = false;
  typeOrmDb1.logging = false;

  mongoDBConnString = `안알랴줌`;
  react_project1_path = `H:/MyProjects/Express/NodeExpress_Ts_Rimraf_React_V4/react_project1`;
}

exports.configSettings = {
  typeOrmDb1,
  ENV_MODE,
  cryptoKey,
  jwtKey,
  mongoDBConnString,
  react_project1_path,
};
