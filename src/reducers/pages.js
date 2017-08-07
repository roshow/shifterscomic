

const pages = (state=[], { type, payload }={} ) => {
  switch (type) {

    case 'GET_PAGES_RECEIVED':
      return [
        ...payload.pages
      ]

    default:
      return state;
  }
};

export default pages;