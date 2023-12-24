import { Model } from 'objection';
import { CourtModel } from './court';
import { UserModel } from './user';

export class ReservationsModel extends Model {
  static tableName = 'reservations';

  id;
  userId;
  courtId;
  startTime;
  duration;

  createdBy;
  court;

  static relationMappings = {
    createdBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'courts.user_id',
        to: 'users.id',
      },
    },
    club: {
      relation: Model.BelongsToOneRelation,
      modelClass: CourtModel,
      join: {
        from: 'reservations.court_id',
        to: 'courts.id',
      },
    },
  }
}
