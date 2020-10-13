const authorsReducerDefaultState = [];

export default (state = authorsReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_AUTHORS':
            return action.data;
        default:
            return state;
    }
};