>> setup firebase

* create a file called fb.js
```
import firebase from 'firebase/app'
import 'firebase/storage'
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
//firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = firebase.storage();

export default firebase

```

 * create another file called FileUtil.js

```
import { storage } from './fb';

const FileUtil = {
    //file: e.target.files[0]
    uploadFile: async (file) => {
        try {
            const ref = storage.ref()
            const fileRef = ref.child(file.name)
            await fileRef.put(file)
            //console.log("res=", res);
            const url = await fileRef.getDownloadURL()
            //console.log("url=", url);
            return { error: false, url }//upload success
        } catch (e) {
            return { error: true, url: null }
        }
    }
}

export default FileUtil;
```

 * use it now

```
FileUtil.uploadFile(data.img)
    .then(res => {
        //success upload & upload new data
        data.img = res.url
        //
    }).catch(e => {
       
    })

```