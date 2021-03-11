import axios from 'axios'

const history = {
    namespaced : true,
    state() {
        return {
            dataHistory: {},
            detailHistory:{},
            pagination: {}
        } 
    },
    mutations: {
        mutationGetHistory (state, payload) {
            state.dataHistory = payload
        },
        mutationGetDetailHistory (state, payload) {
            state.detailHistory = payload
        },
        mutationPagination(state, payload) {
            state.pagination = payload;
          }
    },
    actions: {
        insertHistory (context, data) {
            return new Promise ((resolve, reject)=>{
                axios.post(`${process.env.VUE_APP_SERVER}/history`, data, { headers: { token: localStorage.getItem('token') } }).then((response) => {
                    // console.log(response)
                    resolve(response)
                }).catch((err)=> {
                    reject(err)
                })
            })
        },
        actionGetHistory (context, data) {
            return new Promise ((resolve, reject) => {
                axios.get(`${process.env.VUE_APP_SERVER}/history?search=${data.search}&sort=${data.sort}&params=${data.params}&page=${data.page}`, { headers: { token: localStorage.getItem('token') } }).then((response)=> {
                    // console.log(response.data.data)
                    context.commit('mutationGetHistory', response.data.data)
                    context.commit('mutationPagination', response.data.pagination)
                    resolve(true)
                }).catch((err)=>{
                    console.log(err)
                    reject(err)
                })
            })
        },
        actionDetailHistory (context, invoice) {
            return new Promise ((resolve, reject) => {
                axios.get(`${process.env.VUE_APP_SERVER}/history/${invoice}`, { headers: { token: localStorage.getItem('token') } }).then((response)=> {
                    // console.log(response.data.data)
                    context.commit('mutationGetDetailHistory', response.data.data)
                    resolve(response.data.data)
                }).catch((err)=>{
                    console.log(err)
                    reject(err)
                })
            })
        }
    },
    getters: {
        getHistory(state) {
            return state.dataHistory;
          },
        detailHistory(state) {
            return state.detailHistory;
        },
        getPagination(state) {
            return state.pagination;
          },
    }
}

export default history