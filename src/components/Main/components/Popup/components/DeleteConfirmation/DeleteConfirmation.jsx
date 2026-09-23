export default function DeleteConfirmation(props) {
  const { onConfirm } = props;

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <form
      className="popup__form"
      id="delete-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <button className="button popup__button" type="submit">
        Sim
      </button>
    </form>
  );
}
