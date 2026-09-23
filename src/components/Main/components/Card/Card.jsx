import ImagePopup from "../Popup/components/ImagePopup/ImagePopup.jsx";
import DeleteConfirmation from "../Popup/components/DeleteConfirmation/DeleteConfirmation.jsx";

export default function Card(props) {
  const { card, handleOpenPopup, handleLikeClick, handleCardDelete } = props;
  const { _id, name, link, isLiked } = card;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const imagePopup = {
    title: null,
    children: <ImagePopup card={card} />,
  };

  const deletePopup = {
    title: "Tem certeza?",
    isConfirmation: true,
    children: <DeleteConfirmation onConfirm={() => handleCardDelete(_id)} />,
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imagePopup)}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={() => handleOpenPopup(deletePopup)}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => handleLikeClick(_id, isLiked)}
        />
      </div>
    </li>
  );
}
