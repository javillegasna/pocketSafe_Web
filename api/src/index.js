import app from './app'
const PORT= process.env.PORT_API || 8000

const server = app.listen(PORT, () => console.log(`The server is all fired up on port ${PORT}`));
