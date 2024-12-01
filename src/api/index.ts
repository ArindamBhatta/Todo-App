import express, { Request, Response, IRouter } from "express"
import { HttpMethod, ApiVersion } from "../constants"
import { auth } from "./middleware/index"
import route from "./route"

const router = express.Router()

export default (): IRouter => {
  const mwCtxForPost = {}
  const mwCtxForGet = {}

  const postMWs = [auth].map((fn) => fn(mwCtxForPost))
  const getMWs = [auth].map((fn) => fn(mwCtxForGet))

  const callService = async (
    method: HttpMethod,
    req: Request,
    res: Response
  ) => {
    const apiVersion = req.params.apiversion || ApiVersion.V1
    const serviceName = req.params.service
    console.log("callService", { method, serviceName })
    let serviceDef

    switch (apiVersion) {
      case ApiVersion.V1:
        serviceDef = route[method][serviceName]
        break
      case ApiVersion.V2:
        serviceDef = route[method][serviceName]
        break
      default:
    }

    if (!serviceDef) {
      serviceDef = () => "Service not found"
    }

    try {
      const resp = await serviceDef({ req, res })
      res.json({ resp })
    } catch (err) {
      console.log(err)
    }
  }

  router.get(
    "/:apiversion/:service",
    ...getMWs,
    (req: Request, res: Response) => {
      callService(HttpMethod.GET, req, res)
    }
  )

  router.post(
    "/:apiversion/:service",
    ...postMWs,
    (req: Request, res: Response) => {
      callService(HttpMethod.POST, req, res)
    }
  )

  router.put(
    "/:apiversion/:service/:id",
    ...getMWs,
    (req: Request, res: Response) => {
      callService(HttpMethod.PUT, req, res)
    }
  )
  router.delete(
    "/:apiversion/:service/:id",
    ...getMWs,
    (req: Request, res: Response) => {
      callService(HttpMethod.DELETE, req, res)
    }
  )

  return router
}
