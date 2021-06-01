import * as types from '../../actions/types'

const initialState = {
    loading: false,
}

const loader = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.LOADING_START:
            return {
                loading: true,
            };
        case types.LOADING_STOP:
            return {
                loading: false,
            };
        default:
            return state;
    }
};

export default loader;