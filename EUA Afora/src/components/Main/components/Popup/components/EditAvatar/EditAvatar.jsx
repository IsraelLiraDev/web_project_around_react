import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext.js";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarLinkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarLinkRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-link-input"
        className="popup__input popup__input_type_url"
        name="avatar"
        placeholder="Link de Imagem"
        required
        type="url"
        ref={avatarLinkRef}
      />
      <span className="popup__error" id="avatar-link-input-error"></span>

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
