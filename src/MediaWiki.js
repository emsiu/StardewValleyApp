import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class MediaWiki extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reactionsList: [],
    };
    this.cleanUpResponse = this.cleanUpResponse.bind(this);
    this.parseReactions = this.parseReactions.bind(this);
    this.getGiftingReactions = this.getGiftingReactions.bind(this);
    this.getSectionIndex = this.getSectionIndex.bind(this);
    this.mediaWikiCall = this.mediaWikiCall.bind(this);
  }

  async componentDidMount() {
    const { itemName } = this.props;
    this.mediaWikiCall(itemName);
  }

  cleanUpResponse(reactionsText) {
    const updatedText = reactionsText.substring(0, reactionsText.length - 2).split('|');
    updatedText.splice(0, 1);
    console.log('cleanUpResponse', updatedText);
    return updatedText;
  }

  parseReactions(reactionsList) {
    const parsedReactions = {};
    if (reactionsList.length > 0) {
      reactionsList.forEach((reactionInfo) => {
        const split = reactionInfo.split('=');
        const category = split[0];
        const names = split[1];
        const namesList = names.split(',');
        parsedReactions[category] = namesList;
      });
    }
    console.log('parsed reactions', parsedReactions);
    this.setState({
      reactionsList: parsedReactions,
    });
    console.log('res', parsedReactions);
    return parsedReactions;
  }

  getGiftingReactions(baseUrl, itemName, sectionIndex) {
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
          const reactionsList = this.cleanUpResponse(parseWikitext['*']);

          return this.parseReactions(reactionsList);
        },
      )
      .catch(
        (error) => {
          console.error('error from fetch for getGiftingReactions', error);
        },
      );
  }

  getSectionIndex(baseUrl, itemName) {
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
        () => this.getGiftingReactions(baseUrl, itemName, sectionIndex),
      )
      .catch(
        (error) => {
          console.error('error from fetch for getSectionIndex', error);
        },
      );
  }

  mediaWikiCall(itemName) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://stardewvalleywiki.com/mediawiki/api.php?';
    const baseUrl = proxyUrl + apiUrl;
    return this.getSectionIndex(baseUrl, itemName);
  }

  render() {
    const { reactionsList } = this.state;
    console.log('render reactionsList', reactionsList);
    return (
      <div>
        <ul>
          <li>
            Love:
            {reactionsList.love}
          </li>
          <li>
            Like:
            {reactionsList.like}
          </li>
          <li>
            Neutral:
            {reactionsList.neutral}
          </li>
          <li>
            Dislike:
            {reactionsList.dislike}
          </li>
          <li>
            Hate:
            {reactionsList.hate}
          </li>
        </ul>
      </div>
    );
  }
}


MediaWiki.propTypes = {
  itemName: PropTypes.string,
};

MediaWiki.defaultProps = {
  itemName: null,
};

export default MediaWiki;
