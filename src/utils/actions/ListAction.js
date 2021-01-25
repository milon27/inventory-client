import axios from 'axios'
import Types from './Types';
import Define from './../Define';

axios.defaults.baseURL = `${Define.BASE_URL}`
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


const ListAction = {
    dispatch: null,
    source: null,
    getInstance: (dispatch) => {
        ListAction.dispatch = dispatch;
        return ListAction;
    },
    getSource: () => {
        ListAction.source = axios.CancelToken.source();
        return ListAction.source;
    },
    getOne: async (table, id) => {
        return new Promise((resolve, reject) => {
            axios.get(`v1/get-data/${table}/${id}`
                , {
                    cancelToken: ListAction.source.token
                }
            ).then(res => {
                const message = res.data.message;
                if (res.status === 200) {
                    const objData = res.data.response;
                    resolve({ message, data: objData });
                } else {
                    reject({ message, data: {} });
                }
            })
                .catch(e => {
                    if (axios.isCancel(e)) {
                        reject({ message: "canceled the request" });
                    } else {
                        reject(e);
                    }
                });
        });
    },
    //get all data without range without season
    //v1/get/${table}/
    getAll: async (table) => {
        return new Promise((resolve, reject) => {
            axios.get(`v1/get-data/${table}/`
                , {
                    cancelToken: ListAction.source.token
                }
            ).then(res => {
                const message = res.data.message;
                if (res.status === 200) {
                    const arrData = res.data.response;
                    //dispatch the global state
                    if (process.browser) {
                        ListAction.dispatch({
                            type: Types.GET_ALL_DATA,
                            payload: arrData//an array
                        });
                    }
                    resolve({ message, data: arrData });
                } else {
                    reject({ message, data: [] });
                }
            })
                .catch(e => {
                    if (axios.isCancel(e)) {
                        reject({ message: "canceled the request" });
                    } else {
                        reject(e);
                    }
                });
        });
    },
    getAllFromSub: async (table, subtable, table_id) => {
        return new Promise((resolve, reject) => {
            axios.get(`v1/get-data/${table}/${subtable}/${table_id}`
                , {
                    cancelToken: ListAction.source.token
                }
            ).then(res => {
                const message = res.data.message;
                if (res.status === 200) {
                    const arrData = res.data.response;
                    //dispatch the global state
                    if (process.browser) {
                        ListAction.dispatch({
                            type: Types.GET_ALL_DATA,
                            payload: arrData//an array
                        });
                    }
                    resolve({ message, data: arrData });
                } else {
                    reject({ message, data: [] });
                }
            })
                .catch(e => {
                    if (axios.isCancel(e)) {
                        reject({ message: "canceled the request" });
                    } else {
                        reject(e);
                    }
                });
        });
    },
    //add data
    addData: (url, newdata) => {
        return new Promise((resolve, reject) => {
            axios.post(url, newdata).then((res) => {
                if (res.status === 200) {
                    //dispatch the global state
                    ListAction.dispatch({
                        type: Types.ADD_DATA,
                        payload: res.data.response//new object
                    });
                    resolve({ message: res.data.message });
                } else {
                    reject({ message: res.data.message });
                }
            }).catch((e) => {
                console.error("erroe: ", e)
                reject(e);
            })
        });
    },
    updateData: (url, updateData) => {
        return new Promise((resolve, reject) => {
            axios.put(url, updateData).then((res) => {
                if (res.status === 200) {
                    //dispatch the global state

                    const updated_obj = res.data.response

                    ListAction.dispatch({
                        type: Types.UPDATE_DATA,
                        payload: updated_obj
                    });
                    resolve({ message: res.data.message });
                } else {
                    reject({ message: res.data.message });
                }
            }).catch((e) => {
                console.error("erroe: ", e)
                reject(e);
            })
        });
    }, updateDataPatch: (url, updateData) => {
        return new Promise((resolve, reject) => {
            axios.patch(url, updateData).then((res) => {
                if (res.status === 200) {
                    //dispatch the global state

                    const updated_obj = res.data.response

                    ListAction.dispatch({
                        type: Types.UPDATE_DATA,
                        payload: updated_obj
                    });
                    resolve({ message: res.data.message });
                } else {
                    reject({ message: res.data.message });
                }
            }).catch((e) => {
                console.error("erroe: ", e)
                reject(e);
            })
        });
    },
    updateStock: (url, inc_dec, field) => {
        return new Promise((resolve, reject) => {
            axios.put(url).then((res) => {
                if (res.status === 200) {
                    //dispatch the global state

                    const updated_id = res.data.response.id
                    //inc_dec: how much increse/descrese

                    ListAction.dispatch({
                        type: Types.CHANGE_STOCK,
                        payload: {
                            id: updated_id,
                            inc_dec: inc_dec,
                            field: field
                        }
                    });
                    resolve({ message: res.data.message });
                } else {
                    reject({ message: res.data.message });
                }
            }).catch((e) => {
                console.error("erroe: ", e)
                reject(e);
            })
        });
    },
    deleteData: (url, id) => {
        return new Promise((resolve, reject) => {
            axios.delete(url).then((res) => {
                if (res.status === 200) {
                    //dispatch the global state
                    ListAction.dispatch({
                        type: Types.DELETE_DATA,
                        payload: id//send id
                    });
                    resolve({ message: res.data.message });
                } else {
                    reject({ message: res.data.message });
                }
            }).catch((e) => {
                console.error("erroe: ", e)
                reject(e);
            })
        });
    }
}

export default ListAction;
