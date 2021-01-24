import Types from "../actions/Types";

export const list_init_state = [];

const ListReducer = (state, action) => {
    switch (action.type) {
        case Types.GET_ALL_DATA:
            return [...action.payload];//return an array
        case Types.ADD_DATA:
            return [action.payload, ...state];//return array
        case Types.UPDATE_DATA:
            //let objIndex = state.findIndex((obj => obj.id == action.payload.id));
            //state[objIndex] = action.payload;
            state = state.map(itm => {
                if (itm.id === action.payload.id)
                    return action.payload;
                else
                    return itm;
            });
            return state;
        case Types.CHANGE_STOCK:
            state = state.map(itm => {
                if (itm.id === action.payload.id) {
                    itm[action.payload.field] += action.payload.inc_dec
                    return itm;
                } else {
                    return itm;
                }
            });
            return state;
        case Types.DELETE_DATA:
            state = state.filter(itm => {
                if (itm.id === action.payload)//id
                    return false;
                else
                    return true;
            });
            return state;

        default:
            return state;
    }
}
export default ListReducer;

