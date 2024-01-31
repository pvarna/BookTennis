import { Model } from 'objection';
import { UserModel } from '../user/user-model.js';

export class ReservationsModel extends Model {
  static tableName = 'reservations';

  id;
  userId;
  courtId;
  startTime;
  durationInMinutes;

  createdBy;

  static relationMappings = {
    createdBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'reservations.user_id',
        to: 'users.id',
      },
    },
  };
}
