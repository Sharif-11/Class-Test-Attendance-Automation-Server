import app from './app'
import config from './config/index'
async function bootstrap() {
  try {
    app.listen(config.port, () => {
      console.log('app listening to port ', config.port)
    })
  } catch (error) {
    console.log('failed to listening port')
  }
}
bootstrap()
