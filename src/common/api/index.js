/**
 * Created by yuqian on 2017/5/20.
 */
import axios from 'axios'
import isString from 'lodash/isString'
import querystring from 'querystring'

const MOCK_URL = 'bio/meiyan/api'

export default (dispatch) => {
    const request = (method) => (params = {}) => {
        const payload = method === 'get' ?
        { params } :
            (isString(params) ? params : querystring.stringify(params));

        return (
            axios[method](MOCK_URL, payload)
                .then((response) => {
                    if (response.data.error) {
                        throw response.data
                    }
                    return response.data
                })
                .catch(err => {
                    throw err
                })
        )
    }

    return {
        get: request('get'),
        post: request('post')
    }
}

