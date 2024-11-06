import express, { Request, Response } from 'express';
import taskRoutes from './routes/taskRoutes';



const app = express()

//middleware to parse JSON
app.use(express.json())

// Routes
app.use('/api', taskRoutes)

// Default route
app.get('/', (req:Request, res: Response) =>{
    res.send('Task tracker CLI running')
})



// start server
const PORT = process.env.port || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
   
})