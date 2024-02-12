import { Model } from 'objection';
import { UserModel } from '../user/user-model.js';

export class MessagesModel extends Model {
  static tableName = 'messages';

  id;
  userId1;
  userId2;
  data;
  time;

  user1;
  user2;

  static relationMappings = {
    user1: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'messages.user1_id',
        to: 'users.id',
      },
    },
    user2: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'messages.user2_id',
        to: 'users.id',
      },
    },
  }
}
