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