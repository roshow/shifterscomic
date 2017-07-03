
export const getChapters = () => dispatch => {

  dispatch({
    type: 'GET_CHAPTERS_SENT'
  });
  
  return fetch('https://cdn.contentful.com/spaces/9ilzxl5twj9p/entries?access_token=51953758c1cf7b123fbb879754de626111cfcf4b45000407be02e94be1b1079d&content_type=chapter')
    .then(res => res.json())
    .then(response => {

        const assets = response.includes.Asset
        
        const assetMap = assets.reduce((obj, asset) => {
          obj[asset.sys.id] = asset.fields.file.url
          return obj
        }, {})
        
        const chapters = response.items.reduce( (obj, item) => {
           obj[item.fields.number] = {
            ...item.fields,
            img: assetMap[item.fields.cover.sys.id]
          }
           return obj
        }, {})

        dispatch({
          type: 'GET_CHAPTERS_RECEIVED',
          payload: {
            chapters
          }
        })
        
      })
}