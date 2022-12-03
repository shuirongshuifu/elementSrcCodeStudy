// 外层getters中转一下数据，供外界store.getters.isCollapse（xxx）使用
const getters = {
    isCollapse: state => state.menu.isCollapse,
};
export default getters;
