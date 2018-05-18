import axios from 'axios';

//  STATE
const initialState = {
    user: {},
    friends: []
}

//  ACTION TYPES
const GET_USER = 'GET_USER'
const GET_FRIENDS = 'GET_FRIENDS'
const GET_FRIENDS_BY_CATEGORY = 'GET_FRIENDS_BY_CATEGORY'
const ADD_REC_FRIEND = 'ADD_REC_FRIEND'

//  REDUCER
export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_USER + '_FULFILLED':
            console.log(`GET_USER hit in reducer`);
            return Object.assign({}, state, { user: action.payload });

        case GET_FRIENDS + '_FULFILLED':
            console.log('GET_FRIENDS hit in reducer', action.payload);
            return Object.assign({}, state, { friends: action.payload })

        case GET_FRIENDS_BY_CATEGORY + '_FULFILLED':
            console.log('GET_FRIENDS_BY_CATEGORY hit in reducer', action.payload)
            return Object.assign({}, state, { friends: action.payload })

        case ADD_REC_FRIEND + '_FULFILLED':
            return Object.assign({}, state, {friends: action.payload})

        default:
            return state;
    }
}

// ACTION CREATORS
export function getUser() {
    const user = axios.get(`/auth/authenticated`).then(res => {
        return res.data;
    });
    return {
        type: GET_USER,
        payload: user
    }
}

export function getfriends() {
    const friends = axios.get(`/api/friend/list`).then(res => {
        return res.data;
    })
    return {
        type: GET_FRIENDS,
        payload: friends
    }
}

export function getFriendByCategory(category, user) {
    const catFriends = axios({
        method: 'post',
        url: `/api/recommended`,
        data: {
            category,
            user
        }
    }).then(res => {
        return res.data;
    })
    return {
        type: GET_FRIENDS_BY_CATEGORY,
        payload: catFriends
    }
}

export function addFriend(id){
    const rec_friends = axios({
        method: 'post',
        url: `/api/recommended/add`,
        data:{
            id
        }
    })
    return{
        type: ADD_REC_FRIEND,
        payload: rec_friends
    }
}