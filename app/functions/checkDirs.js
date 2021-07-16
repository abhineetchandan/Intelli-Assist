import RNFetchBlob from "rn-fetch-blob";

export default function checkDirs() {
  RNFetchBlob.fs
    .isDir(`${RNFetchBlob.fs.dirs.DocumentDir}/chats`)
    .then((isDir) => {
      if (isDir) return true;
      else {
        RNFetchBlob.fs
          .mkdir(`${RNFetchBlob.fs.dirs.DocumentDir}/chats`)
          .catch((err) => returnValue())
          .then();
        RNFetchBlob.fs
          .mkdir(`${RNFetchBlob.fs.dirs.DocumentDir}/pictures`)
          .catch((err) => returnValue())
          .then();
        RNFetchBlob.fs
          .mkdir(`${RNFetchBlob.fs.dirs.DocumentDir}/profile`)
          .catch((err) => returnValue())
          .then();
        RNFetchBlob.fs
          .mkdir(`${RNFetchBlob.fs.dirs.DocumentDir}/videos`)
          .catch((err) => returnValue())
          .then(() => {
            return true;
          });
      }
    });
}

function returnValue() {
  return false;
}
