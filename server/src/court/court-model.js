import { Model } from 'objection';
import { ReservationsModel } from '../reservation/reservation-model.js';

export class CourtModel extends Model {
  static tableName = 'courts';

  id;
  surface;
  price;
  clubId;

  reservations;

  static relationMappings = {
    reservations: {
      relation: Model.HasManyRelation,
      modelClass: ReservationsModel,
      join: {
        from: 'courts.id',
        to: 'reservations.court_id',
      },
    },
  };
}
