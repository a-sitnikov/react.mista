//@flow
import * as API from 'src/api'
import type { RequestBookmark } from 'src/api'

export type ADD_BOOKMARK_START = {
  type: 'ADD_BOOKMARK_START'
}

export type ADD_BOOKMARK_COMPLETE = {
  type: 'ADD_BOOKMARK_COMPLETE'
}

export type ADD_BOOKMARK_FAIL = {
  type: 'ADD_BOOKMARK_FAIL'
}

export type AddBookmarkAction = ADD_BOOKMARK_START | ADD_BOOKMARK_COMPLETE | ADD_BOOKMARK_FAIL;


export const addBookmark = (params: RequestBookmark): any => async (dispatch: any) => {

  dispatch({
    type: "ADD_BOOKMARK_START"
  });

  try {
    await API.postBookmark(params);

    dispatch({
      type: "ADD_BOOKMARK_COMPLETE"
    });

  } catch (err) {
    console.error('Error adding bookmark:', err);
    dispatch({
      type: "ADD_BOOKMARK_FAIL"
    });
  }

}
