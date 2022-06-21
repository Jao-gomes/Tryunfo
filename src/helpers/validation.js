const validateButton = (state) => {
  const {
    cardName,
    cardDescription,
    cardImage,
    cardRare,
    cardAttr1,
    cardAttr2,
    cardAttr3,
  } = state;
  const maxAtt = 90;
  const minAtt = 0;
  const maxSum = 210;
  const validationCard = !cardName || !cardDescription || !cardImage || !cardRare;
  const validationNumber = (Number(cardAttr1) > maxAtt
    || Number(cardAttr1) < minAtt
    || Number(cardAttr2) > maxAtt
    || Number(cardAttr2) < minAtt
    || Number(cardAttr3) > maxAtt
    || Number(cardAttr3) < minAtt);
  const totalSumAtributtesValidation = (
    Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) > maxSum);
  if (validationCard || validationNumber || totalSumAtributtesValidation) {
    return true;
  } return false;
};

export default validateButton;
