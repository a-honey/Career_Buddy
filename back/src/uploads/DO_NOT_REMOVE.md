// [이 파일을 절대로 지우지 마세요!!!]

// uploads 디렉토리는 multer storage로 사용하기 위해서 배정되었습니다.
// 사용자가 업로드한 파일이 여기에 임시로 저장되고, 이렇게 임시 저장된 데이터를 MongoDB로 입력해줍니다.

// Git은 파일 기반의 version control system 이므로 빈 디렉토리를 무시합니다.
// DO_NOT_REMOVE.md 파일을 지우게 되면 uploads가 빈 디렉토리가 되어버리므로 git 원격 저장소에 uploads 폴더가 생성되지 않습니다.

// uploads 폴더가 없는 상태에서 multer를 사용하게 되면, 존재하지 않는 uploads 경로를 참조하게 되어

// ENOENT: No such file or directory

// 오류가 발생하게 됩니다.

// 그래서 이 파일을 지우시면 안됩니다.