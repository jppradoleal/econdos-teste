import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

const router = Router();

interface IUserQuery {
  offset?: number;
  amount?: number;
}

router.get("/usuarios", async (req: Request<unknown, unknown, unknown, IUserQuery>, res: Response) => {
    const userRepository = await getRepository(User);
    
    const maxUsers = await userRepository.count();

    let queryBuilder = userRepository.createQueryBuilder();
    if(req.query.offset) {
      queryBuilder = queryBuilder.offset(req.query.offset);
    }
    if(req.query.amount) {
      queryBuilder = queryBuilder.limit(req.query.amount)
    }
    
    const users = await queryBuilder.orderBy("id").getMany();

    res.json({users, amount: maxUsers});
});

router.get("/usuarios/:id", async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne(req.params.id);
  res.json(user);
});

router.post("/usuarios", async (req: Request, res: Response) => {
  console.log(req.body);
  const userRepository = getRepository(User);
  const user = await userRepository.create(req.body);
  const results = await userRepository.save(user);
  res.send(results);
});

router.put("/usuarios/:id", async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(req.params.id);
  userRepository.merge(user, req.body);
  const results = await userRepository.save(user);
  res.send(results);
});

router.delete("/usuarios/:id", async (req: Request, res: Response) => {
  const results = await getRepository(User).delete(req.params.id);
  res.send(results);
});

export default router;
