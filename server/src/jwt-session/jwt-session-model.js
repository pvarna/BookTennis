import { Model } from 'objection';

export class JwtSessionModel extends Model {
  static tableName = 'jwt_sessions';

  id;
  userId;
  payload;
}
