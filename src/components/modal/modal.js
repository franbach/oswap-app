import oSModal from './oSModal.vue';

const oSModalShow = (name) => {
  let event = new CustomEvent("oSShow", { detail: { name } })
  dispatchEvent(event);
}

const oSModalClose = (name) => {
  let event = new CustomEvent("oSClose", { detail: { name } })
  dispatchEvent(event);
}

export { oSModal, oSModalShow, oSModalClose }