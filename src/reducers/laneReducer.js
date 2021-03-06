import update from "react-addons-update";
import { DETACH_FROM_LANE, ATTACH_TO_LANE, UPDATE_LANE, MOVE } from '../actions/actionTypes';

const initialState = [
  {
    id: 1,
    name: 'Lane 1',
    cards: [
      'mockWeather_SF',
      'mockWeather_MEM',
      "mockStock_AAPL",
    ]
  },
  {
    id: 2,
    name: 'Lane 2',
    cards: [
      "mockWeather_NY",
    ]
  },
  {
    id: 3,
    name: 'Lane 3',
    cards: [
      "mockStock_GOOG"
    ]
  }, // TODO: implement delete lane
  // ,{
  //   id: 'deleteLane',
  //   name: 'Delete',
  //   cards: []
  // }
];

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LANE:
      return state.map(lane => {
        if (lane.id === action.id) {
          const { type, ...updatedLane } = action;
          return Object.assign({}, lane, updatedLane);
        }
        return lane;
      });

    case ATTACH_TO_LANE:
      const laneId = action.laneId;
      const cardId = action.cardId;

      return state.map(lane => {
        const index = lane.cards.indexOf(cardId);

        if (index >= 0) {
          return {
            ...lane,
            cards:
              lane.cards.length > 1
                ? lane.cards.slice(0, index).concat(lane.cards.slice(index + 1))
                : []
          }
        }
        if (lane.id === laneId) {
          return {
            ...lane,
            cards: [...lane.cards, cardId],
          }
        }
        return lane;
      });

    case DETACH_FROM_LANE:
      return state.map(lane => {
        if (lane.id === action.laneId) {
          return {
            ...lane,
            cards: lane.cards.filter(id => id !== action.cardId),
          }
        }
        return lane;
      });

    case MOVE:
      const { sourceId, targetId } = action;

      const lanes = state;
      const sourceLane = lanes.filter(lane => lane.cards.indexOf(sourceId) >= 0 )[0];
      const targetLane = lanes.filter(lane => lane.cards.indexOf(targetId) >= 0 )[0];
      const sourceNoteIndex = sourceLane.cards.indexOf(sourceId);
      const targetNoteIndex = targetLane.cards.indexOf(targetId);

      if (sourceLane === targetLane) {
        return state.map(lane => {
          return lane.id === sourceLane.id
            ? Object.assign({}, lane, {
                cards: update(sourceLane.cards, {
                  $splice: [
                    [sourceNoteIndex, 1],
                    [targetNoteIndex, 0, sourceId]
                  ]
                })
              })
            : lane;
        });
      } else {
        return state.map(lane => { // remove card from current lane
          if (lane === sourceLane) {
            return Object.assign({}, lane, {
              cards:
                lane.cards.length > 1
                  ? lane.cards
                      .slice(0, sourceNoteIndex)
                      .concat(lane.cards.slice(sourceNoteIndex + 1))
                  : []
            });
          }
          if (lane === targetLane) { // move card to target
            return {
              ...lane,
              cards: lane.cards
              .slice(0, targetNoteIndex)
              .concat([sourceId])
              .concat(lane.cards.slice(targetNoteIndex))
            }
          }
          return lane;
        });
      }
      return state;
    default:
      return state;
  }
}
