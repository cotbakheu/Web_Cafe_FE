import axios from 'axios'

const history = {
    namespaced : true,
    state() {
        return {

        } 
    },
    mutations: {

    },
    actions: {
        insertHistory (context, data) {
            console.log(data)
            return new Promise ((resolve, reject)=>{
                axios.post(`${process.env.VUE_APP_SERVER}/history`, data, { headers: { token: localStorage.getItem('token') } }).then((response) => {
                    console.log(response)
                    // resolve(response)
                }).catch((err)=> {
                    reject(err)
                })
            })
        }
    },
    getters: {

    }
}

export default history