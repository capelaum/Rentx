import { ICreteUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UsersToken } from "@modules/accounts/infra/typeorm/entities/UsersToken";

import { IUsersTokenRepository } from "../IUsersTokenRepository";

class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  usersTokens: UsersToken[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreteUserTokenDTO): Promise<UsersToken> {
    const userToken = new UsersToken();

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersToken> {
    const userToken = this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((userToken) => userToken.id === id);
    const userTokenIndex = this.usersTokens.indexOf(userToken);

    this.usersTokens.splice(userTokenIndex);
  }

  async findByRefreshToken(refresh_token: string): Promise<UsersToken> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userToken;
  }
}

export { UsersTokenRepositoryInMemory };
