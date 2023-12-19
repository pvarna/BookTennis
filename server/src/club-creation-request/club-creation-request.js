import { Model } from 'objection';
import { UserModel } from './user';

export class ClubCreationRequestModel extends Model {
  static tableName = 'club_creation_requests';

  id;
  userId;
  name;
  city;

  createdBy;

  static relationMappings = {
    createdBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'club_creation_requests.user_id',
        to: 'users.id',
      },
    },
  }
}
