const express = require('express');
const app = express();
const multer = require('multer');
const mimetypes = require('mime-types');
const path = require('path');

const storage = multer.diskStorage({
    destination: (rec, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        //cb("", Date.now() + '.' + )
        cb("", file.originalname /*+ "." + mimetypes.extension(file.mimetype)*/ )
    }
})

const upload = multer({ storage });

//settings
app.set('port', process.env.PORT || 3000);

//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/files', upload.single('avatar'), (req, res) => {
    console.log(req.file)
    res.send('archivos enviados correctamente');
})

let dobleinput = upload.fields([{ name: 'foto' }, { name: 'archivos', maxCount: 2 }]);
app.post('/multifile', dobleinput, (req, res) => {
    console.log(req.file);
    res.send('archivos enviados correctamente');
})

//statics files
app.use(express.static(path.join(__dirname, 'Public')));


app.listen(app.get('port'), () => {
    console.log(`servidor activo en el puerto 3000`)
})