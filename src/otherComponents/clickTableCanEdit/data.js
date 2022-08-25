import Vue from "vue";
import definedInput from "./input.vue";
import definedSpan from "./span.vue";

const inputC = Vue.extend(definedInput);
const spanC = Vue.extend(definedSpan);

export default {
    inputC,
    spanC,
}