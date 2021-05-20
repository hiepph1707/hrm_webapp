import {createSelector} from 'reselect'

const selectDataWorkShift = state => state.workshiftReducer.dataWorkShift

export const getDataWorkShift = createSelector(
  selectDataWorkShift,
  dataWorkShift => dataWorkShift
)
