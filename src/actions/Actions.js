
export const getChapters = () => dispatch => {

  dispatch({
    type: 'GET_CHAPTERS_SENT'
  });
  
  // Nest calls like a heathen. Use promises, bro!!!

  return fetch('https://cdn.contentful.com/spaces/9ilzxl5twj9p/entries?access_token=51953758c1cf7b123fbb879754de626111cfcf4b45000407be02e94be1b1079d&content_type=chapter').then(res => res.json())
    .then(chaptersResponse => {

        return fetch('https://cdn.contentful.com/spaces/9ilzxl5twj9p/entries?access_token=51953758c1cf7b123fbb879754de626111cfcf4b45000407be02e94be1b1079d&content_type=page&order=fields.page&limit=999').then(r => r.json())
          .then(pagesResponse => {

            const pagesAssets = pagesResponse.includes.Asset
        
            const pagesAssetMap = pagesAssets.reduce((obj, asset) => {
              obj[asset.sys.id] = asset.fields.file.url
              return obj
            }, {})

            const chapters = chaptersResponse.items.reduce( (obj, item) => {
              const pages = pagesResponse.items.filter(page => page.fields.chapter ===  item.fields.number).map(item => pagesAssetMap[item.fields.image.sys.id])
               obj[item.fields.number] = {
                ...item.fields,
                img: pages[0],
                pages
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

        
      })
}

export const getPages = (chapterId) => dispatch => {

  dispatch({
    type: 'GET_PAGES_SENT'
  });
  
  return fetch(`https://cdn.contentful.com/spaces/9ilzxl5twj9p/entries?access_token=51953758c1cf7b123fbb879754de626111cfcf4b45000407be02e94be1b1079d&content_type=page&fields.chapter=${ chapterId }&order=fields.page`)
      .then(r => r.json())
      .then(response => {
        
        const assets = response.includes.Asset
        
        const assetMap = assets.reduce((obj, asset) => {
          obj[asset.sys.id] = asset.fields.file.url
          return obj
        }, {})

        const pages = response.items.map(item => assetMap[item.fields.image.sys.id])
        
        dispatch({
          type: 'GET_PAGES_RECEIVED',
          payload: {
            pages
          }
        })

      })
}