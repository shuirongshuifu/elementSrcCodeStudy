export default {
    // 在绑定元素的插入钩子中进行相应的操作
    inserted: function (el, binding) {
        // 获取传入指令的值（即要渲染的HTML字符串）
        const htmlStr = binding.value; 
        // 将HTML内容添加到元素内部
        el.innerHTML = htmlStr;
    },
    // update钩子中更新变化时，修改内容
    update: function (el, binding) {
        // 当新值不等于旧值时，才更改内容
        if (binding.oldValue !== binding.value) {
            el.innerHTML = binding.value;
        }
    }
}