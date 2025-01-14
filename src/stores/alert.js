import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    text: "",
    color: "",
    show: false,
    timeout: 2000,
  }),
  actions: {
    showSnackbar({ text, color }) {
      this.text = text;
      this.color = color;
      this.show = true;
    },
    closeSnackbar() {
      this.show = false;
    },
  },
});
