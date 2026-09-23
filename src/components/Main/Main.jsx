import { useContext } from "react";
import editIcon from "../../images/vector.png";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
import Card from "./components/Card/Card.jsx";

export default function Main(props) {
  const {
    popup,
    onOpenPopup,
    onClosePopup,
    cards,
    onCardLike,
    onCardDelete,
    onAddPlaceSubmit,
  } = props;

  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "New card",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar />,
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Avatar"
          />
          <div
            className="profile__avatar-overlay"
            onClick={() => onOpenPopup(editAvatarPopup)}
          >
            <img
              className="profile__avatar-edit-icon"
              src={editIcon}
              alt="Editar foto do perfil"
            />
          </div>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>

          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>

          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={onOpenPopup}
              handleLikeClick={onCardLike}
              handleCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={onClosePopup}
          title={popup.title}
          isConfirmation={popup.isConfirmation}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
