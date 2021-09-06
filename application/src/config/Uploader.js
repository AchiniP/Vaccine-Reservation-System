import multer from 'multer';

const diskStorage = multer.diskStorage({
  destination: '/tmp/covid-reservation-system-uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: diskStorage });

export default upload;