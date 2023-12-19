import { Model } from 'objection';
import { UserModel } from './user';

export class ClubModel extends Model {
  static tableName = 'clubs';

  id;
  name;
  city;
  userId;

  owner;

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'clubs.user_id',
        to: 'users.id',
      },
    },
  }
}
