import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo({ name: data.name, about: data.about })
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar({ avatar: data.avatar })
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  async function handleCardLike(cardId, isLiked) {
    try {
      const newCard = await api.changeLikeCardStatus(cardId, isLiked);
      setCards((state) =>
        state.map((card) => (card._id === cardId ? newCard : card))
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCardDelete(cardId) {
    try {
      await api.deleteCard(cardId);
      setCards((state) => state.filter((card) => card._id !== cardId));
      handleClosePopup();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddPlaceSubmit(data) {
    try {
      const newCard = await api.addCard({ name: data.name, link: data.link });
      setCards((cards) => [newCard, ...cards]);
      handleClosePopup();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page__content">
        <Header />
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
