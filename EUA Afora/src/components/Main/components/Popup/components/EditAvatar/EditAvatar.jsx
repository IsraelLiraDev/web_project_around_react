export default function EditAvatar() {
  return (
    <form className="popup__form" id="avatar-form" noValidate>
      <input
        id="avatar-link-input"
        className="popup__input popup__input_type_url"
        name="avatar"
        placeholder="Link de Imagem"
        required
        type="url"
      />
      <span className="popup__error" id="avatar-link-input-error"></span>

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
