function Error (e, modal) {
  Promise.resolve(e).then((data) => {
    if (data.error !== undefined) {
      modal.setModal(data.error);
    } else {
      modal.setModal(data);
    }
  });
}

export default Error;
