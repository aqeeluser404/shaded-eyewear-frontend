import { reactive } from "vue";

export const orderState = reactive({
  currentOrderId: localStorage.getItem("currentOrderId") || null,
});

export function setCurrentOrderId(id) {
  orderState.currentOrderId = id || null;
  if (id) {
    localStorage.setItem("currentOrderId", id);
  } else {
    localStorage.removeItem("currentOrderId");
  }
}
