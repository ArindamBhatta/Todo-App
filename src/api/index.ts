import express, { Request, Response, IRouter, Router } from "express";
import { HttpMethod, ApiVersion } from "../constants";
import { auth } from "./middleware/index";
import route from "./route";

const router: Router = express.Router();

export function apiRoutes(): IRouter {
  const mwCtxForPost: object = {};
  const mwCtxForGet: object = {};

  const postMWs: any[] = [auth].map(function (iterablePostMw) {
    return iterablePostMw(mwCtxForPost);
  });

  const getMWs = [auth].map(function (iterableGetMw) {
    return iterableGetMw(mwCtxForGet);
  });

  async function callService(
    method: HttpMethod,
    req: Request,
    res: Response
  ): Promise<any> {
    const apiVersion = req.params.apiversion || ApiVersion.V1;
    const serviceName = req.params.service;

    let serviceDef: Function;

    switch (apiVersion) {
      case ApiVersion.V1:
        serviceDef = route[method][serviceName];
        break;
      case ApiVersion.V2:
        serviceDef = route[method][serviceName];
        break;
      default:
    }

    if (!serviceDef) {
      serviceDef = () => "Service not found";
    }

    try {
      const resp = await serviceDef({ req, res });
      res.json({ resp: resp });
    } catch (err) {
      console.log(err);
    }
  }

  router.get(
    "/:apiversion/:service",
    ...getMWs,
    (req: Request, res: Response) => {
      callService(HttpMethod.GET, req, res);
    }
  );

  router.post(
    "/:apiversion/:service",
    ...postMWs,
    (req: Request, res: Response) => {
      callService(HttpMethod.POST, req, res);
    }
  );

  router.put(
    "/:apiversion/:service/:id",
    ...getMWs,
    (req: Request, res: Response) => {
      callService(HttpMethod.PUT, req, res);
    }
  );
  router.delete(
    "/:apiversion/:service/:id",
    ...getMWs,
    (req: Request, res: Response) => {
      callService(HttpMethod.DELETE, req, res);
    }
  );

  return router;
}
