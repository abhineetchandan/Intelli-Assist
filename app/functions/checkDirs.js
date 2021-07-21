import RNFetchBlob from "rn-fetch-blob";

export default function checkDirs() {
  let isDirCreated;
  RNFetchBlob.fs
    .isDir(`${RNFetchBlob.fs.dirs.DocumentDir}/chats`)
    .then((isDir) => {
      if (isDir) {
        isDirCreated = true;
      } else {
        RNFetchBlob.fs
          .mkdir(`${RNFetchBlob.fs.dirs.DocumentDir}/chats`)
          .catch((err) => {
            isDirCreated = false;
          })
          .then();
        RNFetchBlob.fs
          .mkdir(`${RNFetchBlob.fs.dirs.DocumentDir}/pictures`)
          .catch((err) => {
            isDirCreated = false;
            returnValue();
          })
          .then();
        RNFetchBlob.fs
          .mkdir(`${RNFetchBlob.fs.dirs.DocumentDir}/profile`)
          .catch((err) => {
            isDirCreated = false;
            returnValue();
          })
          .then();
        RNFetchBlob.fs
          .mkdir(`${RNFetchBlob.fs.dirs.DocumentDir}/videos`)
          .catch((err) => {
            isDirCreated = false;
            returnValue();
          })
          .then(() => {
            isDirCreated = true;
          });
      }
    });
  return isDirCreated;
}

function returnValue() {
  return false;
}
