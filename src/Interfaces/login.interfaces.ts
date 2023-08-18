import { z } from "zod";
import { loginCreate } from "../Schema";

type loginCreate = z.infer<typeof loginCreate>;
type loginReturn = { token: string };

export { loginCreate, loginReturn };
