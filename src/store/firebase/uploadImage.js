import firebase from "./firebaseConfig";

const storage = firebase.storage();
const storageRef = storage.ref();

const uploadImage = (img, reference) => {
  return new Promise((resolve, reject) => {
    const meta = {
      contentType: img.type
    };

    const uploadTask = storageRef.child(reference + img.name).put(img, meta);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => null,
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
