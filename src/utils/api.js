import {createClient} from 'contentful'

const client = createClient({
  space: '9ilzxl5twj9p',
  accessToken: '51953758c1cf7b123fbb879754de626111cfcf4b45000407be02e94be1b1079d'
})

client.getEntries({
  content_type: 'page'
})
  .then(console.log)


export default client