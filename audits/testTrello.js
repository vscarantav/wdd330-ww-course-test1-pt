async function getTrelloCardData() {
  try {
    // const cardsUrl = `https://api.trello.com/1/boards/${boardId}/cards?key=${apiKey}&token=${apiToken}`;
    const boardURL = "https://trello.com/b/Hh1x49tl/sleepoutside-team-y"
    const response = await fetch(boardURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const cards = await response.json();
    const cardData = cards.map((card) => ({
      id: card.id,
      name: card.name,
      description: card.desc,
      url: card.url,
      shortUrl: card.shortUrl,
      listId: card.idList,
      labels: card.labels.map((label) => ({
        id: label.id,
        name: label.name,
        color: label.color,
      })),
      members: card.idMembers,
      checklists: card.idChecklists,
      due: card.due,
      dueComplete: card.dueComplete,
      pos: card.pos,
    }));

    return cardData;
  } catch (error) {
    console.error("Error fetching Trello card data:", error);
    return null;
  }
}

// Example usage (replace with your actual board ID, API key, and API token):
// const boardId = "YOUR_BOARD_ID";
// const apiKey = "YOUR_API_KEY";
// const apiToken = "YOUR_API_TOKEN";

getTrelloCardData(boardId, apiKey, apiToken).then((cardData) => {
  if (cardData) {
    console.log("Trello Card Data:", cardData);
    // Process the card data as needed
  }
});

//Example to get a list name
async function getTrelloListName() {
  try {
    // const listUrl = `https://api.trello.com/1/lists/${listId}?key=${apiKey}&token=${apiToken}`;
    const listUrl = `https://api.trello.com/1/lists/Done?key=${apiKey}&token=ATATT3xFfGF0cObGThmpZv5jFnrFzYrrn-KN2GlXSeFHD9KmlJfk17JnsJ8vkYY3q5AqbceIpA1bjLI6S_QlR52LchnXsFlKXoj4KYzmTLQE5OLB8UUdc2RLDJIWjhcvo7SJNRlH0yUSsRxPDq-5w5Uz0cQL0OObIDP_K5ZMjSnGgrQLoEQxfq4=D5B6B4E5`;
    const response = await fetch(listUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const list = await response.json();
    return list.name;
  }
  catch (error) {
    console.error("Error fetching Trello list data:", error)
    return null;
  }
}

//Example to get List names for each card.
async function getTrelloCardDataWithListNames(boardId, apiKey, apiToken) {
  const cardData = await getTrelloCardData(boardId, apiKey, apiToken);
  if (cardData) {
    const cardDataWithListNames = await Promise.all(cardData.map(async (card) => {
      const listName = await getTrelloListName(card.listId, apiKey, apiToken);
      return { ...card, listName: listName }
    }));
    return cardDataWithListNames;
  }
  return null;
}

getTrelloCardDataWithListNames(boardId, apiKey, apiToken).then(cardData => {
  if (cardData) {
    console.log("Trello Card Data with List Names:", cardData);
  }
});