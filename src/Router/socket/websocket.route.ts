import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

//router 인스턴스를 하나 만들고
const router = Router();

module.exports = function (globalVariable: any) {
  router.get('/webrtc', (req, res) => {
    res.render('webrtc/index.ejs');
  });

  // 👇 This is what you were missing in your code!
  return router;
};
