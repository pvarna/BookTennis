import { Model } from 'objection';
import { UserModel } from '../user/user-model.js';
import { CourtModel } from '../court/court-model.js';

export class ClubModel extends Model {
  static tableName = 'clubs';

  id;
  name;
  city;
  userId;

  owner;
  courts;

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'clubs.user_id',
        to: 'users.id',
      },
    },
    courts: {
      relation: Model.HasManyRelation,
      modelClass: CourtModel,
      join: {
        from: 'clubs.id',
        to: 'courts.club_id',
      },
    },
  };
}
