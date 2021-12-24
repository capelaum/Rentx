import { ICreteUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UsersToken } from "../infra/typeorm/entities/UsersToken";

interface IUsersTokenRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreteUserTokenDTO): Promise<UsersToken>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersToken>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refresh_token: string): Promise<UsersToken>;
}

export { IUsersTokenRepository };
