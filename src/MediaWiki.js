import axios from 'axios';

function cleanUpResponse(reactionsText) {
  const updatedText = reactionsText.substring(0, reactionsText.length - 2).split('|');
  updatedText.splice(0, 1);
  console.log('cleanUpResponse', updatedText);
  return updatedText;
}

function parseReactions(reactionsList) {
  const res = {};
  if (reactionsList.length > 0) {
    reactionsList.forEach((reactionInfo) => {
      const split = reactionInfo.split('=');
      const category = split[0];
      const names = split[1];
      const namesList = names.split(',');
      res[category] = namesList;
    });
  }
  console.log('parsed reactions', res);
  return res;
}

function getGiftingReactions(baseUrl, itemName, sectionIndex) {
  const actionsGiftingLeft = 'action=parse&format=json&section=';
  const actionsGiftingRight = '&prop=wikitext&page=';
  const giftingUrl = baseUrl + actionsGiftingLeft + sectionIndex
    + actionsGiftingRight + itemName;
  console.log('giftingReactionsUrl', giftingUrl);
  axios.get(giftingUrl)
    // .then(res => res.json())
    .then(
      (result) => {
        const parseWikitext = result.data.parse.wikitext;
        console.log('fetched wikitext', parseWikitext);
        const reactionsList = cleanUpResponse(parseWikitext['*']);

        return parseReactions(reactionsList);
      },
    )
    .catch(
      (error) => {
        console.error('error from fetch for getGiftingReactions', error);
      },
    );
}

function getSectionIndex(baseUrl, itemName) {
  const actionsSection = 'action=parse&format=json&prop=sections&page=';
  const sectionUrl = baseUrl + actionsSection + itemName;
  console.log('sectionsUrl', sectionUrl);
  let sectionIndex = -1;
  axios.get(sectionUrl)
    // .then(res => res.json())
    .then(
      (result) => {
        const parseSections = result.data.parse.sections;
        console.log('fetched sections result', parseSections);
        const giftingSection = parseSections.filter(section => section.line === 'Gifting')[0];
        sectionIndex = giftingSection.index;
        return sectionIndex;
      },
    )
    .then(
      () => getGiftingReactions(baseUrl, itemName, sectionIndex),
    )
    .catch(
      (error) => {
        console.error('error from fetch for getSectionIndex', error);
      },
    );
}

function mediaWikiCall(itemName) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://stardewvalleywiki.com/mediawiki/api.php?';
  const baseUrl = proxyUrl + apiUrl;
  return getSectionIndex(baseUrl, itemName);
}

export {
  cleanUpResponse,
  parseReactions,
  getGiftingReactions,
  getSectionIndex,
  mediaWikiCall,
};
