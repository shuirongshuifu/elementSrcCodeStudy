const state = {
    isCollapse: false,
};

const mutations = {
    FOLD_MENU(state) {
        state.isCollapse = !state.isCollapse
    },
}

const actions = {
    fold_menu({ commit }) {
        commit('FOLD_MENU')
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};