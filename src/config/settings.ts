/**
 * development : 로컬 컴퓨터 개발
 * else : azure app service
 */
//let ENV_MODE = "development";
let ENV_MODE = process.env.NODE_ENV;

var typeOrmDb1 = {
  type: 'mysql',
  host: '안알랴줌',
  port: 3306,
  username: '안알랴줌',
  password: '안알랴줌',
  database: '안알랴줌',
  synchronize: false,
  logging: false,
};
const cryptoKey = 'cryptoKeySample@#@$%#%$#@!!';
const jwtKey = 'jwtKeySample@#@$%#%$#@!!';
let mongoDBConnString = '안알랴줌';
let react_project1_path = '/home/jongnode/sub1.jongnode1.com/react_project1';
let youtube_dl_path = '/home/jongnode/crawled_video';

if (ENV_MODE?.toLowerCase() === 'development') {
  typeOrmDb1.type = 'mysql';
  typeOrmDb1.host = '안알랴줌';
  typeOrmDb1.port = 3306;
  typeOrmDb1.username = '안알랴줌';
  typeOrmDb1.password = '안알랴줌';
  typeOrmDb1.database = 'test';
  typeOrmDb1.synchronize = false;
  typeOrmDb1.logging = false;

  mongoDBConnString = `안알랴줌`;
  react_project1_path = `H:/MyProjects/Express/NodeExpress_Ts_Rimraf_React_V4/react_project1`;
  youtube_dl_path = `H:/crawled_test`;
}

exports.configSettings = {
  typeOrmDb1,
  ENV_MODE,
  cryptoKey,
  jwtKey,
  mongoDBConnString,
  react_project1_path,
  youtube_dl_path,
};
