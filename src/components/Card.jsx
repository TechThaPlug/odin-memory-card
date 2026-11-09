function Card({ card, onSelect, disabled }) {
  return (
    <button
      type="button"
      className="card"
      onClick={() => onSelect(card.id)}
      disabled={disabled}
    >
      <img src={card.image} alt={card.name} width="120" height="120" />
      <span className="card-name">{card.name}</span>
    </button>
  );
}

export default Card;
