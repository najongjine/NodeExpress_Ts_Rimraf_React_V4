import { Router } from 'express';
import express, { Express, Request, Response } from 'express';
let Validator = require('validatorjs');
import typeorm from 'typeorm';
import encryption from '../../utils/encryption';

import * as types from './types'

//router 인스턴스를 하나 만들고
const router = Router();

let mysql1: typeorm.Connection;
let imgUpload = require('../../multer/imageUpload');

function getTypeormMysqlInstance(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  mysql1 = req.app.get('mysql1');
  next();
}
router.use(getTypeormMysqlInstance);

router.get('/', async function (요청, 응답) {
  try {
    let testTxtEnc = encryption.txtEncrypt('test');
    let testTxtDecc = encryption.txtDecrypt(testTxtEnc);
    let testOjbEnc = encryption.objEncrypt({ test: 'test' });
    let testObjDec = encryption.objDecrypt(testOjbEnc);
    응답.status(200).json({ testTxtEnc, testTxtDecc, testOjbEnc, testObjDec });
  } catch (error: any) {
    응답.status(200).json({
      success: false,
      data: null,
      custMsg: '',
      errMsg: error.stack,
    });
  }
});

let rules = {
  name: 'required',
  email: 'required|email',
  age: 'digits_between:0,900',
};
/** https://www.npmjs.com/package/validatorjs */
router.post('/validate', function (요청, 응답) {
  let personInfo:types.validateBody=요청.body.personInfo
  let personValidation = new Validator(personInfo, rules);
  if (personValidation.fails()) {
    return 응답.status(200).json({
      success: false,
      data: personInfo,
      custMsg: 'data validation failed',
      errMsg: personValidation.errors,
    });
  }

  응답.status(200).json(personValidation);
});

// 등록된 라우터를 export
export default router;
