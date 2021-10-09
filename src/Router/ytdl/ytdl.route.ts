import { Router } from 'express';
import express, { Express, Request, Response } from 'express';
const { configSettings } = require('../../config/settings');

import { User } from '../../entity/User';
import typeorm from 'typeorm';
import { Post } from '../../entity/Post';
import { SubPost } from '../../entity/SubPost';

//router 인스턴스를 하나 만들고
const router = Router();

let mysql1;
import imgUpload from '../../multer/imageUpload';

function getTypeormMysqlInstance(
  req: { app: { get: (arg0: string) => any } },
  res: any,
  next: () => void,
) {
  mysql1 = req.app.get('mysql1');
  next();
}
router.use(getTypeormMysqlInstance);

const cp = require('child_process');
const readline = require('readline');
// External modules
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');

router.get('/', async function (req, res) {
  try {
    const ref = 'https://www.youtube.com/watch?v=3MB8DBXzEos';
    //const ref = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
    const tracker = {
      start: Date.now(),
      audio: { downloaded: 0, total: Infinity },
      video: { downloaded: 0, total: Infinity },
      merged: { frame: 0, speed: '0x', fps: 0 },
    };

    // Get audio and video streams
    const audio = ytdl(ref, { quality: 'highestaudio' }).on(
      'progress',
      (_: any, downloaded: any, total: any) => {
        tracker.audio = { downloaded, total };
      },
    );
    const video = ytdl(ref, { quality: 'highestvideo' }).on(
      'progress',
      (_: any, downloaded: any, total: any) => {
        tracker.video = { downloaded, total };
      },
    );

    // Prepare the progress bar
    let progressbarHandle: any = null;
    const progressbarInterval = 1000;
    const showProgress = () => {
      readline.cursorTo(process.stdout, 0);
      const toMB = (i: number) => (i / 1024 / 1024).toFixed(2);

      process.stdout.write(
        `Audio  | ${(
          (tracker.audio.downloaded / tracker.audio.total) *
          100
        ).toFixed(2)}% processed `,
      );
      process.stdout.write(
        `(${toMB(tracker.audio.downloaded)}MB of ${toMB(
          tracker.audio.total,
        )}MB).${' '.repeat(10)}\n`,
      );

      process.stdout.write(
        `Video  | ${(
          (tracker.video.downloaded / tracker.video.total) *
          100
        ).toFixed(2)}% processed `,
      );
      process.stdout.write(
        `(${toMB(tracker.video.downloaded)}MB of ${toMB(
          tracker.video.total,
        )}MB).${' '.repeat(10)}\n`,
      );

      process.stdout.write(
        `Merged | processing frame ${tracker.merged.frame} `,
      );
      process.stdout.write(
        `(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(
          10,
        )}\n`,
      );

      process.stdout.write(
        `running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(
          2,
        )} Minutes.`,
      );
      readline.moveCursor(process.stdout, 0, -3);
    };

    // Start the ffmpeg child process
    const ffmpegProcess = cp.spawn(
      ffmpeg,
      [
        // Remove ffmpeg's console spamming
        '-loglevel',
        '8',
        '-hide_banner',
        // Redirect/Enable progress messages
        '-progress',
        'pipe:3',
        // Set inputs
        '-i',
        'pipe:4',
        '-i',
        'pipe:5',
        // Map audio & video from streams
        '-map',
        '0:a',
        '-map',
        '1:v',
        // Keep encoding
        '-c:v',
        'copy',
        // Define output file
        `${configSettings.youtube_dl_path}/out${Date.now()}.mkv`,
      ],
      {
        windowsHide: true,
        stdio: [
          /* Standard: stdin, stdout, stderr */
          'inherit',
          'inherit',
          'inherit',
          /* Custom: pipe:3, pipe:4, pipe:5 */
          'pipe',
          'pipe',
          'pipe',
        ],
      },
    );
    ffmpegProcess.on('close', () => {
      console.log('# done');
      // Cleanup
      process.stdout.write('\n\n\n\n');
      clearInterval(progressbarHandle);
    });

    // Link streams
    // FFmpeg creates the transformer streams and we just have to insert / read data
    ffmpegProcess.stdio[3].on('data', (chunk: { toString: () => string }) => {
      // Start the progress bar
      if (!progressbarHandle)
        progressbarHandle = setInterval(showProgress, progressbarInterval);
      // Parse the param=value list returned by ffmpeg
      const lines = chunk.toString().trim().split('\n');
      const args: any = {};
      for (const l of lines) {
        const [key, value] = l.split('=');
        args[key.trim()] = value.trim();
      }
      tracker.merged = args;
    });
    audio.pipe(ffmpegProcess.stdio[4]);
    video.pipe(ffmpegProcess.stdio[5]);
    res.status(200).send('this router works');
  } catch (error: any) {
    res
      .status(200)
      .json({ success: false, data: null, custMsg: '', err: error.message });
  }
});

// 등록된 라우터를 export
export default router;
