import Swal from "sweetalert2";

export const ModalImage = (model, url) => {
  return Swal.fire({
    title: `${model}`,
    imageUrl: `${url}`,
    imageHeight: 350,
    imageAlt: "Imagen del celular",
    imageWidth: 350,
    padding: 0,
  });
};
