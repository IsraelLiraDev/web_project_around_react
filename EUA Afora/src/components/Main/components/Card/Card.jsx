import ImagePopup from "../Popup/components/ImagePopup/ImagePopup.jsx";

export default function Card(props) {
  const { card, handleOpenPopup, handleLikeClick } = props;
  const { _id, name, link, isLiked } = card;

  const imagePopup = {
    title: null,
    children: <ImagePopup card={card} />,
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
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          onClick={() => handleLikeClick(_id)}
        />
      </div>
    </li>
  );
}
