import axios, {requestConfig}  from '../axios/axios';

//GET
const _getAuthors = (data) => {
    return ({
    type: 'GET_AUTHORS',
    data
})};

export const getAuthors = () => {
    return async (dispatch) => {
        return axios.get('author/author-list',requestConfig()).then(result => {
            let {data} = result.data;
            dispatch(_getAuthors(data));
        });
    };
};


