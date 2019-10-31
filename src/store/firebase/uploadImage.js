import firebase from "../../Firebase";

const storage = firebase.storage();
const storageRef = storage.ref();

const uploadImage = (img, metadata, reference) => {
  return new Promise((resolve, reject) => {
    const meta = {
      contentType: metadata
    };

    const uploadTask = storageRef.child(reference + img.name).put(img, meta);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
            break;
        }
      },
      error => {
        return reject(error.code);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          return resolve(downloadURL);
        });
      }
    );
  });
};

export default uploadImage;
