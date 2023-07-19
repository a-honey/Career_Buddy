import multer, { diskStorage } from 'multer';
import { extname, basename } from "path";
// storage 안에는 어디에 (destination) 어떤 이름으로 (filename) 저장할지를 넣는다.

const storage = diskStorage({
    // req:요청, file:업로드한 파일에 대한 정보,done:콜백함수.
    // done (에러가 있다면 에러, 실제 경로/파일 이름)
    // req와 file의 데이터를 가공해 done 함수로 넘김
    destination: function (req, file, done) {
        done(null, "../db/uploads")
    },
    filename: function (req, file, done) {
        const ext = extname(file.originalname);
        const fileName = basename(file.originalname, ext) + ext;
    
        done(null,fileName + '-' + Date.now())
    },
    limits : {fileSize : 5 * 1024 * 1024},
})


const file_upload=multer({storage:storage})
