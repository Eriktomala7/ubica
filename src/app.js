import express from "express";
import clientes_routes from "./routes/clientes_routes.js";
import usuarios_routes from "./routes/usuarios_routes.js";
import trabajador_routes from "./routes/trabajador_routes.js";
import consumo_routes from "./routes/consumo_routes.js";
import ubicaciones_routes from "./routes/ubicaciones_routes.js";


import cors from "cors"; // Importa CORS



const app = express();
app.use(cors({ origin: 'http://localhost:8100' }));

app.use(express.json()); //interprete los objetos enviados como json
/* app.use("/api",clientes_routes)
app.use("/api",usuarios_routes)
app.use("/api",trabajador_routes)
app.use("/api",consumo_routes) */
app.use("/api",ubicaciones_routes)





app.use((req,res,next)=>{
    res.status(400).json({message:"Pagina no encontrada"});
})

export default app;