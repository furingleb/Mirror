
import * as React from 'react';
import { useHashLocation, parseWikilinks } from '../common/utils';
import { selectors } from '../store';
import { useSelector } from 'react-redux';
import { Markdown } from '../components';

export default () => {
  const [loc, setLoc] = useHashLocation();

  const currentCardID = loc.split('/')[2] || 'main'; //#/notes/ID
  const setCurrentCardID = id => setLoc(`/notes/${id}`);

  const cards = useSelector(selectors.boards.cards);

  return (
    <div>
      <Zettel card={cards[currentCardID]} cards={cards} />
    </div>
  );
};

const Zettel = ({ card, cards }) => {
  return <Markdown source={card.content} cards={cards} />;
};
