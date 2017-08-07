
const initState = {
  "1": {
    pages: []
  }
}
const chapters = (state=initState, { type, payload }={} ) => {
  switch (type) {

    case 'GET_CHAPTERS_RECEIVED':
      return {
        ...payload.chapters
      }

    default:
      return state;
  }
};

export default chapters;