import update from "react-addons-update";
// import * as types from "../actions/lanes";
import { DETACH_FROM_LANE, ATTACH_TO_LANE, UPDATE_LANE, MOVE } from '../actions/actionTypes';

const initialState = [
  {
    id: 1,
    name: 'lane1',
    cards: [
      'mockWeather_SF',
      'mockWeather_MEM'
    ]
  },
  {
    id: 2,
    name: 'lane2',
    cards: ["mockWeather_NY"]
  }
];

export default function lanes(state = initialState, action) {
  console.log('laneReducer', action.type, action.laneId);
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
          return Object.assign({}, lane, {
            cards:
              lane.cards.length > 1
                ? lane.cards.slice(0, index).concat(lane.cards.slice(index + 1))
                : []
          });
        }
        if (lane.id === laneId) {
          return Object.assign({}, lane, {
            cards: [...lane.cards, cardId]
          });
        }

        return lane;
      });

    case DETACH_FROM_LANE:
      return state.map(lane => {
        if (lane.id === action.laneId) {
          return Object.assign({}, lane, {
            cards: lane.cards.filter(id => id !== action.cardId)
          });
        }

        return lane;
      });


    // case types.CREATE_LANE:
    //   return [...state, action.lane];
    // case types.DELETE_LANE:
    //   return state.filter(lane => lane.id !== action.id);

    case MOVE:
      const sourceId = action.sourceId;
      const targetId = action.targetId;

      const lanes = state;
      const sourceLane = lanes.filter(lane => {
        return lane.cards.indexOf(sourceId) >= 0;
      })[0];
      const targetLane = lanes.filter(lane => {
        return lane.cards.indexOf(targetId) >= 0;
      })[0];
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
        return state.map(lane => {
          if (lane === sourceLane) {
            // get rid of the source note
            return Object.assign({}, lane, {
              cards:
                lane.cards.length > 1
                  ? lane.cards
                      .slice(0, sourceNoteIndex)
                      .concat(lane.cards.slice(sourceNoteIndex + 1))
                  : []
            });
          }

          if (lane === targetLane) {
            // and move it to target
            return Object.assign({}, lane, {
              cards: lane.cards
                .slice(0, targetNoteIndex)
                .concat([sourceId])
                .concat(lane.cards.slice(targetNoteIndex))
            });
          }

          return lane;
        });
      }

      return state;

    default:
      return state;
  }
}
