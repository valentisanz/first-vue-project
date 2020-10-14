export const UserModule = {
    namespaced: true,
    state: {
        user: null
    },
    //functions that affect the state
    mutations: {
        SET_USER(state, user) {
            state.user = user
        }
    },
    //actions that you call through your application that call mutations
    actions: {
        setUser({ commit }, user) {
            commit('SET_USER', user)
        }
    },

}