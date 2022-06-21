import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Form from './components/Form';
import Card from './components/Card';
import Filter from './components/Filter';
import validateButton from './helpers/validation';
import './app.scss';

class App extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.acessStateButton = this.acessStateButton.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      searchInputDisabled: false,
      hasTrunfo: false,
      savedCards: [],
      searchName: '',
      searchRare: '',
    };
  }

  handleSearch = ({ target: { name, type, checked, value } }) => {
    const result = type === 'checkbox' ? checked : value;
    this.setState({ [name]: result });
  }

  onSaveButtonClick = () => {
    this.setState((prevState) => ({
      savedCards: [...prevState.savedCards, { ...prevState, id: uuidv4() }],
    }), () => this.setState((prevState) => ({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      hasTrunfo: prevState.savedCards.some((card) => card.cardTrunfo === true) })));
  }

  removeCard = (id) => {
    const { savedCards } = this.state;
    const filteredCard = savedCards.filter((card) => card.id !== id);
    this.setState({
      savedCards: filteredCard,
    }, () => this.setState((prevState) => ({
      hasTrunfo: prevState.savedCards.some((card) => card.cardTrunfo === true),
    })));
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.setState((prevState) => ({
      isSaveButtonDisabled: validateButton(prevState),
    })));
  }

    acessStateButton = () => {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }

    render() {
      const {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
        isSaveButtonDisabled,
        searchInputDisabled,
        hasTrunfo,
        savedCards,
        searchName,
        searchRare,
      } = this.state;
      return (
        <div className="page">
          <h1>TryUnfo</h1>
          <Form
            onInputChange={ this.handleChange }
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onSaveButtonClick={ this.onSaveButtonClick }
            hasTrunfo={ hasTrunfo }
          />
          <Card
            onInputChange={ this.handleChange }
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
          />
          <aside>
            <Filter
              handleSearch={ this.handleSearch }
              searchName={ searchName }
              searchRare={ searchRare }
              searchInputDisabled={ searchInputDisabled }
            />

            <section>
              {(searchInputDisabled
                ? savedCards.filter((card) => card.cardTrunfo)
                : savedCards
                  .filter((card) => card.cardName.includes(searchName))
                  .filter((card) => (searchRare
                    ? card.cardRare === searchRare
                    : card)))
                .map((savedCard, i) => (
                  <section key={ i }>
                    <h3 data-testid="name-card">{savedCard.cardName}</h3>
                    <img
                      src={ savedCard.cardImage }
                      alt={ savedCard.cardName }
                      data-testid="image-card"
                    />
                    <p data-testid="description-card">{savedCard.cardDescription}</p>
                    <ul>
                      <li data-testid="attr1-card">{savedCard.cardAttr1}</li>
                      <li data-testid="attr2-card">{savedCard.cardAttr2}</li>
                      <li data-testid="attr3-card">{savedCard.cardAttr3}</li>
                    </ul>
                    <p data-testid="rare-card">{savedCard.cardRare}</p>
                    {savedCard.cardTrunfo
                     && <p data-testid="trunfo-card">Super Trunfo</p>}
                    <button
                      data-testid="delete-button"
                      type="button"
                      onClick={ () => this.removeCard(savedCard.id) }
                    >
                      Apagar
                    </button>
                  </section>

                ))}
            </section>
          </aside>
        </div>
      );
    }
}

export default App;
