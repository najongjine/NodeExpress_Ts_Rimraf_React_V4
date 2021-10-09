import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

//router 인스턴스를 하나 만들고
const router = Router();

// router.get('/webrtc', function (요청, 응답) {
//   응답.render('socket/webrtc.ejs');
// });
// router.get('/nodemedia', function (요청, 응답) {
//   응답.render('socket/nodemedia.ejs');
// });

// // 등록된 라우터를 export
// export default router;

module.exports = function (globalVariable: any) {
  router.get('/webrtc/action', (req, res) => {
    res.render('webrtc/action.ejs');
  });
  router.get('/webrtc/index', (req, res) => {
    res.render('webrtc/index.ejs');
  });
  router.post(
    '/login',
    globalVariable.authenticate('local', {
      failureRedirect: '/fail',
      failureFlash: true,
    }),
    function (요청, 응답) {
      응답.redirect('/');
    },
  );

  // 👇 This is what you were missing in your code!
  return router;
};
