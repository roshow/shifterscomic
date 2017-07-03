

const chapters = (state={}, { type, payload }={} ) => {
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