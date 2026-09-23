export default function Popup(props) {
  const { onClose, title, children, isConfirmation } = props;

  const contentClassName = [
    "popup__content",
    !title ? "popup__content_content_image" : "",
    isConfirmation ? "popup__content_type_confirmation" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="popup">
      <div className={contentClassName}>
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        />

        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}
